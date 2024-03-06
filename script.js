const API_KEY = "pub_39071428dc051099af0092a38808736212831";
const url = "https://newsdata.io/api/1/news?";
// https://newsdata.io/api/1/news?apikey=pub_382913f3350be2fba3e927c99fdad97348631&q=pizza
// https://newsdata.io/api/1/news?apikey=pub_39071428dc051099af0092a38808736212831&q=pizza

window.addEventListener("load", () => fetchNews("mobile"))

function reload(){
    window.location.reload()
}

async function fetchNews(query) {
    const res = await fetch(`${url}apikey=${API_KEY}&q=${query}&language=en`);
    const data = await res.json();
    console.log(data);
    bindData(data.results);
}


function bindData(results) {
    const cardsContainer = document.getElementById("cards-container")
    const newsCardsTemplate = document.getElementById("template-news-card")

    cardsContainer.innerHTML = "";

    results.forEach((result) => {
        if (result.image_url === null && result.video_url === null) return; // Skip iteration if image_url is null
        const cardClone = newsCardsTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, result);
        cardsContainer.appendChild(cardClone);
    });
}


function fillDataInCard(cardClone, results) {
    const newsImg = cardClone.querySelector("#news-img")
    const newsTitle = cardClone.querySelector("#news-title")
    const newsSource = cardClone.querySelector("#news-source")
    const newsDesc = cardClone.querySelector("#news-desc")

    newsImg.src = results.image_url;
    newsTitle.innerHTML = results.title;
    newsDesc.innerHTML = results.description;

    const date = new Date(results.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    })
    // newsSource.innerHTML = `${results.source.name} . ${date}`
    
    cardClone.firstElementChild.addEventListener("click", () =>{
        window.open(results.link, "_blank");
    });
}

let curSelectedNav = null
function onNavItemClick(id){
    fetchNews(id)
    const navitem = document.getElementById(id)
    curSelectedNav?.classList.remove('active')
    curSelectedNav = navitem
    curSelectedNav.classList.add('active')
}

const searchButton = document.getElementById("search-button")
const searchInput = document.getElementById("search-input")

searchButton.addEventListener('click', () =>{
    const query = searchInput.value;
    if(!query) return;
    fetchNews(query)
    curSelectedNav?.classList.remove('active')
    curSelectedNav = null
})