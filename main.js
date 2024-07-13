let newsList = []
let url = new URL(`https://newspage100.netlify.app/top-headlines?country=kr`)
let totalResults = 0
let page = 1
const pageSize = 10
const groupSize = 5
const menus = document.querySelectorAll(".menus button")
const sideMenus = document.querySelectorAll(".side-menu-list button")
menus.forEach(menu => menu.addEventListener("click", (event)=>getNewsByCategory(event)))
sideMenus.forEach(menu => menu.addEventListener("click", (event)=> {getNewsByCategory(event); closeNav();}))
let topButton = document.getElementById("topBtn");
window.onscroll = function() {scrollFunction()};


const getNews = async(category) => {
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
    page = 1
    await getNews()
}

const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase()
    url = new URL(`https://newspage100.netlify.app/top-headlines?country=kr&category=${category}`)
    page = 1
    await getNews()
}

const searchNews = async() => {
    const keyword = document.getElementById("search-input").value
    url = new URL(`https://newspage100.netlify.app/top-headlines?country=kr&q=${keyword}`)
    page = 1
    await getNews()
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
    let firstPage = lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

    let paginationHTML = ''

    if(firstPage >= 6){
        paginationHTML = `<li class="page-item" onclick="moveToPage(1)">
                            <a class="page-link" href='#'>&lt;&lt;</a>
                        </li>
                        <li class="page-item" onclick="moveToPage(${page - 1})">
                            <a class="page-link" href="#">&lt</a>
                        </li>`
    }


    for(let i = firstPage; i <= lastPage; i++){
        paginationHTML += `<li class="page-item ${i===page?"active":""}">
                            <a class="page-link" href="#" onclick="moveToPage(${i})">${i}</a>
                            </li>`
    }

    if(lastPage < totalPages){
        paginationHTML += `<li class="page-item" onclick="moveToPage(${page + 1})">
                        <a  class="page-link" href='#'>&gt;</a>
                       </li>
                       <li class="page-item" onclick="moveToPage(${totalPages})">
                        <a class="page-link" href='#'>&gt;&gt;</a>
                       </li>`;
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

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) { // 스크롤 시 보이도록 설정
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome
}

getLatestNews()