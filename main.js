let newsList = []
const menus = document.querySelectorAll(".menus button")
menus.forEach(menu => menu.addEventListener("click", (event)=>getNewsByCategory(event)))

const getLatestNews = async () => {
    const url = new URL(`https://newspage100.netlify.app/top-headlines?country=kr`)
    const response = await fetch(url)
    const data = await response.json()
    newsList = data.articles
    console.log(newsList)
    render()
}

const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase()
    console.log("category", category)
    const url = new URL(`https://newspage100.netlify.app/top-headlines?country=kr&category=${category}`)
    const response = await fetch(url)
    const data = await response.json()
    newsList = data.articles
    render()
}

const searchNews = async() => {
    const keyword = document.getElementById("search-input").value
    console.log("keyword", keyword)
    const url = new URL(`https://newspage100.netlify.app/top-headlines?country=kr&q=${keyword}`)
    const response = await fetch(url)
    const data = await response.json()
    newsList = data.articles
    render()
}

const render = () => {
    const newsHTML = newsList.map(
        (news) => `<div class="row news">
          <div class="col-lg-4">
            <img class="news-img-size" src="${news.urlToImage ||"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"}" onerror="this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU';"/>
          </div>
          <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>${
                news.description == null || news.description == ""
                    ? "내용없음"
                    : news.description.length > 200
                    ? news.description.substring(0, 200) + "..."
                    : news.description
            }</p>
            <div>${news.source.name || "no source"} - ${moment(
                news.publishedAt
            ).fromNow()}</div>
            </div>
        </div>`).join('')

    document.getElementById("news-board").innerHTML = newsHTML
}

const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
};
  
const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
 };

const openSearchBox = () => {
    let inputArea = document.getElementById("input-area");
    if (inputArea.style.display === "inline") {
        inputArea.style.display = "none";
    } else {
        inputArea.style.display = "inline";
    }
};

getLatestNews()

// 1. 버튼에 클릭 이벤트 주기
// 2. 카테고리별 뉴스 가져오기
// 3. 뉴스 보여주기