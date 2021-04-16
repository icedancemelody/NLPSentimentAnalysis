from py.backend import Sentiment
from py.backend import *
import json
import os

# 生产/模式使用不同路径
path_dataToPy = 'dataToPy.json'
path_dataToNodeJs = 'dataToNodeJs.json'

# 需要的函数


def load_model(word_model):
    # model = Word2Vec(vector_size=100,  # 词向量维度
    #                  min_count=5,  # 词频阈值
    #                  window=5)  # 窗口大小
    model = gensim.models.word2vec.Word2Vec.load(word_model)
    return model


def generate_id2wec(word_model):
    gensim_dict = Dictionary()
    # gensim_dict.doc2bow(model.wv.vocab.keys(), allow_update=True)
    gensim_dict.doc2bow(model.wv.index_to_key, allow_update=True)
    w2id = {v: k + 1 for k, v in gensim_dict.items()}  # 词语的索引，从1开始编号
    # print(w2id.keys())
    # for word in w2id.keys():
    #     print(model.predict_output_word(word))
    # print()
    w2vec = {word: model.wv[word] for word in w2id.keys()}  # 词语的词向量
    # print(w2vec)
    n_vocabs = len(w2id) + 1
    embedding_weights = np.zeros((n_vocabs, 100))
    for w, index in w2id.items():  # 从索引为1的词语开始，用词向量填充矩阵
        embedding_weights[index, :] = w2vec[w]
    return w2id, embedding_weights


def text_to_array(w2index, senlist):  # 文本转为索引数字模式
    sentences_array = []
    for sen in senlist:
        new_sen = [w2index.get(word, 0) for word in sen]   # 单词转索引数字
        sentences_array.append(new_sen)
    return np.array(sentences_array)


def prepare_data(w2id, sentences, labels, max_len=200):
    X_train, X_val, y_train, y_val = train_test_split(
        sentences, labels, test_size=0.2)
    X_train = text_to_array(w2id, X_train)
    X_val = text_to_array(w2id, X_val)
    X_train = pad_sequences(X_train, maxlen=max_len)
    X_val = pad_sequences(X_val, maxlen=max_len)
    return np.array(X_train), np_utils.to_categorical(y_train), np.array(X_val), np_utils.to_categorical(y_val)


# 获取词向量矩阵
model = load_model("py/word2vec.model")
w2id, embedding_weights = generate_id2wec(model)

# 导入模型
senti = Sentiment(w2id, embedding_weights, 100, 200, 3)
senti.load_model("py/sentiment.h5")

# 读取输入，输入字符串放在 data 里
f_input = open(path_dataToPy, 'r', encoding="utf-8")
data = json.loads(f_input.read())
f_input.close()

if 'comment' in data:  # 单条分析，评论通过 data.comment 获得
    label_dic = {0: "消极的", 1: "积极的", 2: "中性的"}
    inputComment = data["comment"]
    pre = senti.predict("py/sentiment.h5", inputComment)
    theAttitude = label_dic.get(pre)
    output_dic = {
        "theDimension": "评论角度",
        "theAttitude": theAttitude,
        "theTextFeatures": "文字特征",
        "theReply": "自动回复"
    }
    output = json.dumps(output_dic)
elif 'data' in data:  # 批量分析，评论数组通过 data 获得
    # 应用模型，输出放在 output
    # ...
    output = """{"data": [
        {"commentText": "item","dimension": "外观","attitude": "负","textFeatures": "文字特征","reply": "自动回复"},
        {"commentText": "item","dimension": "性能","attitude": "正","textFeatures": "文字特征","reply": "自动回复"},
        {"commentText": "item","dimension": "外观","attitude": "负","textFeatures": "文字特征","reply": "自动回复"},
        {"commentText": "item","dimension": "性能","attitude": "正","textFeatures": "文字特征","reply": "自动回复"},
        {"commentText": "item","dimension": "手感","attitude": "负","textFeatures": "文字特征","reply": "自动回复"},
        {"commentText": "item","dimension": "性能","attitude": "正","textFeatures": "文字特征","reply": "自动回复"},
        {"commentText": "item","dimension": "外观","attitude": "正","textFeatures": "文字特征","reply": "自动回复"},
        {"commentText": "item","dimension": "性能","attitude": "正","textFeatures": "文字特征","reply": "自动回复"},
        {"commentText": "item","dimension": "外观","attitude": "正","textFeatures": "文字特征","reply": "自动回复"},
        {"commentText": "item","dimension": "性能","attitude": "正","textFeatures": "文字特征","reply": "自动回复"}
    ]}"""

# 输出到文件
f_output = open(path_dataToNodeJs, 'w', encoding="utf-8")
f_output.write(output)
f_output.close()
