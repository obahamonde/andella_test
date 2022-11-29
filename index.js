import fetch from 'node-fetch'

const baseUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/"

let test_words = ["act","action","activity","actually","add","address","administration","admit","adult","affect","after","again","against","age","agency","agent","ago","agree","agreement","ahead","air","all","allow","almost"]

const fetchWord = async (word) =>   {
    let responses = []
    const response = await fetch(baseUrl + word)
    const data = await response.json()
    data.forEach((item) => {
        item["meanings"].forEach((meaning) => {
            meaning["partOfSpeech"] === "noun" ? responses.push(word) : null
        })
    })
    responses.length === 0 ? responses.push(null) : null
    return responses
}

const fetchWords = async (words) => {
    let responses = []
    for (const word of words) {
        responses.push(...(await fetchWord(word)))
    }
    return responses
}

const main = async () => {
    const responses = await fetchWords(test_words)
    console.log(responses)
}

main()