import json
import os

devMode = 'false'

# 生产模式使用下面路径
if devMode == 'false':
    path_dataToPy = os.getcwd() + '/resources/app/py/dataToPy.json'
    path_dataToNodeJs = os.getcwd() + '/resources/app/py/dataToNodeJs.json'
# 开发模式使用下面路径
else:
    path_dataToPy = os.getcwd() + '/py/dataToPy.json'
    path_dataToNodeJs = os.getcwd() + '/py/dataToNodeJs.json'

f1 = open(path_dataToPy, 'r', encoding="utf-8")
data = json.loads(f1.read())
f1.close()
if 'comment' in data:
    f = open(path_dataToNodeJs, 'w', encoding="utf-8")
    f.write('{ "theDimension": "评论角度", "theAttitude": "评论态度", "theTextFeatures": "文字特征", "theReply": "自动回复" }')  
    f.close()
elif 'data' in data:
    f = open(path_dataToNodeJs, 'w', encoding="utf-8")
    f.write(
        """
            {
                "data": [
                    {
                        "commentText": "item",
                        "dimension": "外观",
                        "attitude": "负",
                        "textFeatures": "文字特征",
                        "reply": "自动回复"
                    },
                    {
                        "commentText": "item",
                        "dimension": "性能",
                        "attitude": "正",
                        "textFeatures": "文字特征",
                        "reply": "自动回复"
                    },
                    {
                        "commentText": "item",
                        "dimension": "性能",
                        "attitude": "正",
                        "textFeatures": "文字特征",
                        "reply": "自动回复"
                    },
                    {
                        "commentText": "item",
                        "dimension": "手感",
                        "attitude": "负",
                        "textFeatures": "文字特征",
                        "reply": "自动回复"
                    },
                    {
                        "commentText": "item",
                        "dimension": "服务",
                        "attitude": "正",
                        "textFeatures": "文字特征",
                        "reply": "自动回复"
                    },
                    {
                        "commentText": "item",
                        "dimension": "价格",
                        "attitude": "正",
                        "textFeatures": "文字特征",
                        "reply": "自动回复"
                    },
                    {
                        "commentText": "item",
                        "dimension": "价格",
                        "attitude": "正",
                        "textFeatures": "文字特征",
                        "reply": "自动回复"
                    },
                    {
                        "commentText": "item",
                        "dimension": "外观",
                        "attitude": "正",
                        "textFeatures": "文字特征",
                        "reply": "自动回复"
                    },
                    {
                        "commentText": "item",
                        "dimension": "外观",
                        "attitude": "正",
                        "textFeatures": "文字特征",
                        "reply": "自动回复"
                    },
                    {
                        "commentText": "item",
                        "dimension": "外观",
                        "attitude": "正",
                        "textFeatures": "文字特征",
                        "reply": "自动回复"
                    },
                    {
                        "commentText": "item",
                        "dimension": "外观",
                        "attitude": "正",
                        "textFeatures": "文字特征",
                        "reply": "自动回复"
                    },
                    {
                        "commentText": "item",
                        "dimension": "外观",
                        "attitude": "正",
                        "textFeatures": "文字特征",
                        "reply": "自动回复"
                    },
                    {
                        "commentText": "item",
                        "dimension": "外观",
                        "attitude": "正",
                        "textFeatures": "文字特征",
                        "reply": "自动回复"
                    }
                ]
            }
        """
    )  
    f.close()