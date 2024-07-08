const API_KEY = '387e48660ac642209898e2c9f3fc9a2f'
let news = []
const getLatestNews = async () => {
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)
    const response = await fetch(url)
    const data = await response.json()
    news = data.articles
    console.log("dddd", news)
}

getLatestNews()