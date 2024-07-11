let newsList = []
let url = new URL(`https://newspage100.netlify.app/top-headlines?country=kr`)
let totalResults = 0
let page = 1
const pageSize = 10
const groupSize = 5
const menus = document.querySelectorAll(".menus button")
const sideMenus = document.querySelectorAll(".side-menu-list button")
menus.forEach(menu => menu.addEventListener("click", (event)=>getNewsByCategory(event)))
sideMenus.forEach(menu => menu.addEventListener("click", (event)=>getNewsByCategory(event)))

const getNews = async() => {
    try{
        url.searchParams.set("page", page) // &page=page
        url.searchParams.set("pageSize", pageSize)
        const response = await fetch(url)
        const data = await response.json()
        if(response.status === 200){
            if(data.articles.length === 0){
                throw new Error("No result for this search")
            }
            newsList = data.articles
            totalResults = data.totalResults
            render()
            paginationRender()
        }else{
            throw new Error(data.message)
        }
        
    }catch(error){
        errorRender(error.message)
    } 
}

const getLatestNews = async () => {
    url = new URL(`https://newspage100.netlify.app/top-headlines?country=kr`)
    getNews()
}

const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase()
    url = new URL(`https://newspage100.netlify.app/top-headlines?country=kr&category=${category}`)
    getNews()
}

const searchNews = async() => {
    const keyword = document.getElementById("search-input").value
    url = new URL(`https://newspage100.netlify.app/top-headlines?country=kr&q=${keyword}`)
    getNews()
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

const errorRender = (errorMessage) => {
    const errorHTML = `<div class="alert alert-danger" role="alert">
    ${errorMessage}
    </div>`

    document.getElementById("news-board").innerHTML = errorHTML
}

const paginationRender = () => {
    //totalResult & Page & PageSize & GroupSize 
    // PageGroup & lastPage & firstPage & totalPages
    const pageGroup = Math.ceil(page / groupSize)
    let lastPage = pageGroup * groupSize
    const totalPages = Math.ceil(totalResults / pageSize)
    // 마지막 페이지 그룹이 그룹 사이즈보다 작을 경우, lastPage = totalPages
    if(lastPage > totalPages){
        lastPage = totalPages
    }
    const firstPage = lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

    let paginationHTML = ``
    for(let i = firstPage; i <= lastPage; i++){
        paginationHTML += `<li class="page-item ${i===page?"active":""}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`
    }
    document.querySelector(".pagination").innerHTML = paginationHTML

}

const moveToPage = (pageNum) => {
    console.log("movetopage", pageNum)
    page = pageNum
    getNews()
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