from flask import Flask
from flask import jsonify, request
import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import jieba

app = Flask(__name__)

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

def cosine_similarity(dataLIST, new_article_title, filter):
    titleLIST = [i['article_title'] for i in dataLIST]
    titleLIST.insert(0, new_article_title)
    all_title = segmentation(titleLIST)
    tfidf_vectorizer = TfidfVectorizer()
    tfidf_matrix = tfidf_vectorizer.fit_transform(dataLIST)
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
    cosine_sim_target = cosine_sim[0].tolist()
    title_similarity = dict()
    for i in range(len(cosine_sim_target)):
        title_similarity[all_title[i]] = cosine_sim_target[i]
        target_title = sorted(title_similarity.items(), key=lambda item: item[1], reverse=True) 
    return target_title[:filter]

@app.route("/")
def welcome():
    return "Welcome to PTT API"

@app.route("/ptt/all", methods=['GET'])
def ptt_all():
    return jsonify(dataLIST)

@app.route("/ptt/title", methods=['GET'])
def ptt_title():
    titleLIST = []
    for article in dataLIST:
        titleLIST.append(article['article_title'])
    return jsonify(titleLIST)

@app.route("/similarity", methods=['GET'])
def get_similarity():
    """
    request url: http://127.0.0.1/similarity?title={input_title}&filter={input_filter}
    """
    if 'title' in request.args and 'filter' in request.args:
        new_article_title = request.args['title']
        filter = request.args['filter']
        similar_articles = cosine_similarity(dataLIST=dataLIST, new_article_title=new_article_title, filter=filter)
        similar_articles_list = [similar_article[0] for similarity, similar_article in enumerate(similar_articles)]
        return jsonify(similar_articles_list)



if __name__ == '__main__':
    app.debug = False
    app.run(host='localhost', port=5000)