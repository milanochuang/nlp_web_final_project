from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import config
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import jieba
from PyPtt import PTT

app = Flask(__name__)
CORS(app)

# 讀取以爬取過後的語料庫，以計算餘弦相似度
with open("./data/data.json") as f:
    full_json = json.load(f)
    dataLIST = full_json['articles']

# 斷詞
def segmentation(title):
  all_title = []
  for i in title:
    cut_title = jieba.cut(i)
    seg_title = ' '.join(cut_title)
    all_title.append(seg_title)

  return all_title

# 計算餘弦相似度後，回去語料庫找出原文
def matching_article(dataLIST, clean_title):
    similar_full_article = []
    for i in range(len(dataLIST)):
        for j in clean_title:
            if dataLIST[i]['clean_article_title'] == j:
                similar_full_article.append(dataLIST[i])
    return similar_full_article

# 回傳相似文章的標題
def get_similar_article(dataLIST, new_article_title):
    """
    dataLIST: list -> 以 list of dictionaries 的形式餵入函式
    new_article_title: str -> 網頁前端傳入的新標題
    """
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

# 爬取 PTT 文本時的錯誤處理
def crawl_handler(post_info):
    """
    post_info: ptt_bot.get_post()所得的參數
    形式為ptt_bot.get_post(
            board=<board name>, 
            post_index=<index>
            )
    """
    if post_info.delete_status != PTT.data_type.post_delete_status.NOT_DELETED:
        if post_info.delete_status == PTT.data_type.post_delete_status.MODERATOR:
            print(f'[板主刪除][{post_info.author}]')
        elif post_info.delete_status == PTT.data_type.post_delete_status.AUTHOR:
            print(f'[作者刪除][{post_info.author}]')
        elif post_info.delete_status == PTT.data_type.post_delete_status.UNKNOWN:
            print(f'[不明刪除]')
        return

    print(f'[{post_info.aid}][{post_info.title}]')

# Welcome page of the api
@app.route("/")
def welcome():
    return "Welcome to PTT API"

# 要求存取語料庫內的所有文章（架設網站測試用，實際網站並無使用）
@app.route("/api/ptt/all", methods=['GET'])
def ptt_all():
    return jsonify(dataLIST)

# 要求存取語料庫內所有文章的標題（架設網站測試用，實際網站並無使用）
@app.route("/api/ptt/title", methods=['GET'])
def ptt_title():
    titleLIST = []
    for article in dataLIST:
        titleLIST.append(article['article_title'])
    return jsonify(titleLIST)

# 回傳所有相似的標題、推文，以及其文章內容
@app.route("/api/similarity", methods=['GET'])
def get_similar_article():
    """
    利用以下網址 request，並取得所有相似的標題、推文、以及文章內容，參數為網站傳入標題、回傳文章數量、相似度、是否需要留言
    request url: http://127.0.0.1:5000/similarity?title={input_title}&filter={input_filter}&similarity={input_similarity}&message={needMessage}
    """
    requestDICT = request.args.to_dict()
    if 'title' in requestDICT:
        new_article_title = requestDICT['title']
        if 'num' in requestDICT:
            input_num = requestDICT['num']
            input_num = int(input_num)
        else:
            input_num = 10
        if 'similarity' in requestDICT:
            input_similarity = requestDICT['similarity']
            input_similarity = float(input_similarity)
        else:
            input_similarity = 0.5
        if 'message' in requestDICT:
            if requestDICT['message'] == "true":
                print("I have come into the fact that needMessage is true")
                needMessage = True
            else:
                print("I have come into the fact that needMessage is false")
                needMessage = False
        similar_articles = get_similar_article(dataLIST=dataLIST, new_article_title=new_article_title)
        similar_articles_list = [similar_article[0].replace(" ", "") for similarity, similar_article in enumerate(similar_articles) if similarity > input_similarity]
        similar_articles_list = similar_articles_list[:input_num]
        for i in range(len(dataLIST)):
            dataLIST[i]['clean_article_title'] = dataLIST[i]['article_title'].replace(" ", "")
        matchLIST = matching_article(dataLIST, similar_articles_list)
        resultLIST = []
        for i in matchLIST:
            resultDICT={
                "author": str,
                "article_title": str,
                "content": str,
            }
            resultDICT['author'] = i['author']
            resultDICT['article_title'] = i['clean_article_title']
            resultDICT['content'] = i['content']
            if needMessage:
                resultDICT['message'] = []
                for j in i['messages']:
                    resultDICT['message'].append(j['push_content'])
            resultLIST.append(resultDICT)
        if resultLIST:
            return jsonify(resultLIST)
        else:
            return 404

# 即時爬蟲最新的文章
@app.route("/api/crawler", methods=['GET'])
def get_crawler_data():
    """
    利用以下網址 request 啟動爬蟲，並取得所有最新的八卦板文章，參數為 load_time 即載入次數，在「更多文章」（MORE）時，可以得到載入次數*10的文章數
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
    