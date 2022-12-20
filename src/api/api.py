from flask import Flask
from flask import jsonify, request
from flask_cors import CORS
import json
import config
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import jieba
from PyPtt import PTT

app = Flask(__name__)
CORS(app)

with open("./data/data.json") as f:
    full_json = json.load(f)
    dataLIST = full_json['articles']

def segmentation(title):
  all_title = []
  for i in title:
    cut_title = jieba.cut(i)
    seg_title = ' '.join(cut_title)
    all_title.append(seg_title)

  return all_title

def get_similar_article(dataLIST, new_article_title):
    titleLIST = [i['article_title'] for i in dataLIST]
    if new_article_title not in titleLIST:
        titleLIST.insert(0, new_article_title)
    all_title = segmentation(titleLIST)
    tfidf_vectorizer = TfidfVectorizer()
    tfidf_matrix = tfidf_vectorizer.fit_transform(all_title)
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
    cosine_sim_target = cosine_sim[0].tolist()
    title_similarity = dict()
    for i in range(len(cosine_sim_target)):
        title_similarity[all_title[i]] = cosine_sim_target[i]
        target_title = sorted(title_similarity.items(), key=lambda item: item[1], reverse=True)
    return target_title

def crawl_handler(post_info):

    if post_info.delete_status != PTT.data_type.post_delete_status.NOT_DELETED:
        if post_info.delete_status == PTT.data_type.post_delete_status.MODERATOR:
            print(f'[板主刪除][{post_info.author}]')
        elif post_info.delete_status == PTT.data_type.post_delete_status.AUTHOR:
            print(f'[作者刪除][{post_info.author}]')
        elif post_info.delete_status == PTT.data_type.post_delete_status.UNKNOWN:
            print(f'[不明刪除]')
        return

    print(f'[{post_info.aid}][{post_info.title}]')

@app.route("/")
def welcome():
    return "Welcome to PTT API"

@app.route("/api/ptt/all", methods=['GET'])
def ptt_all():
    return jsonify(dataLIST)

@app.route("/api/ptt/title", methods=['GET'])
def ptt_title():
    titleLIST = []
    for article in dataLIST:
        titleLIST.append(article['article_title'])
    return jsonify(titleLIST)

@app.route("/api/similarity", methods=['GET'])
def get_similarity():
    """
    request url: http://127.0.0.1:5000/similarity?title={input_title}&filter={input_filter}&similarity={input_similarity}
    """
    requestDICT = request.args.to_dict()
    if 'title' in requestDICT:
        new_article_title = requestDICT['title']
        if 'filter' in requestDICT:
            input_filter = requestDICT['filter']
            input_filter = int(input_filter)
        else:
            input_filter = 10
        if 'similarity' in requestDICT:
            input_similarity = requestDICT['similarity']
            input_similarity = float(input_similarity)
        else:
            input_similarity = 0.5
        similar_articles = get_similar_article(dataLIST=dataLIST, new_article_title=new_article_title)
        similar_articles_list = [similar_article[0].replace(" ", "") for similarity, similar_article in enumerate(similar_articles) if similarity > input_similarity]
        resultLIST = similar_articles_list[:input_filter]
        if resultLIST:
            return jsonify(resultLIST)
        else:
            return 404

@app.route("/api/crawler", methods=['GET'])
def get_crawler_data():
    """
    request url: http://127.0.0.1:5000/crawler?load={load_time}
    """
    requestDICT = request.args.to_dict()
    if 'load' in requestDICT:
        load = requestDICT['load']
    num = int(load)*10
    ptt_bot = PTT.API()
    ptt_bot.login(config.username, config.password)
    newest_index = ptt_bot.get_newest_index(
        PTT.data_type.index_type.BBS,
        board="Gossiping")
    start_index = newest_index - num + 1
    resultLIST = []
    for i in range(num):
        post_info = ptt_bot.get_post(
            board="Gossiping", 
            post_index=newest_index-i
            )
        if post_info.delete_status != PTT.data_type.post_delete_status.NOT_DELETED:
            continue
        current_post = dict()
        current_post['author'] = post_info.author
        current_post['article_title'] = post_info.title
        current_post['date'] = post_info.date
        current_post['content'] = post_info.content
        resultLIST.append(current_post)
    ptt_bot.logout()
    return jsonify(resultLIST)



if __name__ == '__main__':
    app.debug = False
    app.run(host='localhost', port=5000)