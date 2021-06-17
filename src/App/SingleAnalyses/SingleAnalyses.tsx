// 该文件为单条分析页面的视图部分
import getFormatComment from '../getFormatComment'
import './SingleAnalyses.css'
import useSingleAnalyses from './useSingleAnalyses'

export default function SingleAnalyses() {
    const {
        commentText,
        attitude,
        textFeatures,
        textAreaRef,
        analyze
    } = useSingleAnalyses()

    return (
        <main id="single-analyses" key="单条分析">
            <article className="introduction">
                <h1>使用说明</h1>
                {
                    [
                        '该页面利用人工智能分析对手机产品的评论。',
                        '输入评论内容，点击开始分析按钮，将输出其评论角度、评论态度。',
                        '评论角度可分为外观、屏幕、充电、音效、拍照、运行、手感。',
                        '评论态度可分为积极、消极、中性。'
                    ].map((item, index) => <p key={index}>{item}</p>)
                }
            </article>
            <article className="input-area">
                <h1>输入评论内容</h1>
                <textarea className="text-area" ref={textAreaRef} />
                <button className="ms-button primary" onClick={analyze}>开始分析</button>
            </article>
            <article className="output-area">
                <h1>分析结果</h1>
                <h2>评论原文</h2>
                <p>{getFormatComment(commentText, textFeatures)}</p>
                <h2>评论态度</h2>
                <p>{attitude}</p>
            </article>
        </main>
    )
}