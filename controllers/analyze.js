module.exports = {
    'POST /analyze': async (ctx, next) => {
        ctx.response.body = {
            data: [
                { "commentText": "item", "dimension": "外观", "attitude": "负", "textFeatures": "文字特征", "reply": "自动回复" },
                { "commentText": "item", "dimension": "性能", "attitude": "正", "textFeatures": "文字特征", "reply": "自动回复" },
                { "commentText": "item", "dimension": "外观", "attitude": "负", "textFeatures": "文字特征", "reply": "自动回复" },
                { "commentText": "item", "dimension": "性能", "attitude": "正", "textFeatures": "文字特征", "reply": "自动回复" },
                { "commentText": "item", "dimension": "手感", "attitude": "负", "textFeatures": "文字特征", "reply": "自动回复" },
                { "commentText": "item", "dimension": "性能", "attitude": "正", "textFeatures": "文字特征", "reply": "自动回复" },
                { "commentText": "item", "dimension": "外观", "attitude": "正", "textFeatures": "文字特征", "reply": "自动回复" },
                { "commentText": "item", "dimension": "性能", "attitude": "正", "textFeatures": "文字特征", "reply": "自动回复" },
                { "commentText": "item", "dimension": "外观", "attitude": "正", "textFeatures": "文字特征", "reply": "自动回复" },
                { "commentText": "item", "dimension": "性能", "attitude": "正", "textFeatures": "文字特征", "reply": "自动回复" }
            ]
        }
    }
}
