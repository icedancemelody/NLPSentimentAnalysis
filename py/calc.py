import json
import os

# 生产/开发模式
devMode = True

# 生产/模式使用不同路径
if not devMode:
    pyDir = os.getcwd() + '/resources/app/py/'
else:
    pyDir = os.getcwd() + '/py/'
path_dataToPy = pyDir + 'dataToPy.json'
path_dataToNodeJs = pyDir + 'dataToNodeJs.json'

# 读取输入，输入字符串放在 data 里
f_input = open(path_dataToPy, 'r', encoding="utf-8")
data = json.loads(f_input.read())
f_input.close()

if 'comment' in data:  # 单条分析，评论通过 json.loads(f.read()).comment 获得
    # 应用模型，输出放在 output
    # ...
    output = '{ "theDimension": "评论角度", "theAttitude": "评论态度", "theTextFeatures": "文字特征", "theReply": "自动回复" }'
elif 'data' in data:  # 批量分析，评论数组通过 json.loads(f.read()).data 获得
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
