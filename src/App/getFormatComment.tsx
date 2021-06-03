export default function getFormatComment(commentText: string, textFeatures: {
    words: [string, string][],
    wordIndexs: [number, number][]
}) {
    if (!(textFeatures.words)) return ([<span>{commentText} </span>])
    const words = commentText.split('')
    let feature_i = 0
    let word_start = 0
    let word_end = 0
    let eles = [] as JSX.Element[]
    while (true) {
        if (word_end >= words.length) break
        if (feature_i >= textFeatures.words.length) {
            eles.push(
                <span>
                    {words.slice(word_start, words.length).join('')}
                </span>
            )
            break
        }
        if (word_end === textFeatures.wordIndexs[feature_i][0]) {
            if (word_end !== word_start) {
                eles.push(
                    <span>
                        {words.slice(word_start, word_end).join('')}
                    </span>
                )
            }
            eles.push(
                <span className={'dms-span ' + textFeatures.words[feature_i][1]} >
                    {words.slice(word_end, textFeatures.wordIndexs[feature_i][1]).join('')}
                </span>
            )
            word_start = textFeatures.wordIndexs[feature_i][1]
            word_end = word_start
            feature_i++
            continue
        }
        word_end++
    }
    return eles
}