document.addEventListener("DOMContentLoaded", function() {
    const darkModeButton = document.querySelector(".dark_mode");
    const body = document.querySelector("body");

    darkModeButton.addEventListener("click", function() {
        body.classList.toggle("darkMode");
    });
});

let url = "https://pokeapi.co/api/v2";
const parentElement = document.querySelector(".grid-container")

const pokePage = async (url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        
        data.results.forEach(async element => {
            
            const card = document.createElement("div");
            const divName = document.createElement("div");
            const namePke = document.createElement("p");
            const icon = document.createElement("i");
            const img = document.createElement("img");
            const divLevel = document.createElement("div");
            const levelPke = document.createElement("p");
            const bottonBuy = document.createElement("button");

            namePke.textContent = element.name;

            const res = await fetch( element.url);
            const data = await res.json();

            img.src = data.sprites.front_default;
            bottonBuy.textContent = 'Buy'

            card.className = 'card';
            namePke.className ='name';
            icon.className = "fa-sharp fa-regular fa-heart";
            img.className = 'card';
            divLevel.className = 'level';
            levelPke.className = 'card'
            bottonBuy.className = 'level';

            card.appendChild(divName);
            divName.appendChild(namePke);
            divName.appendChild(icon);
            card.appendChild(img);
            card.appendChild(divLevel);
            divLevel.appendChild(levelPke);
            divLevel.appendChild(bottonBuy);
            parentElement.appendChild(card);
        });
    } catch (error){
        const errorMsg = document.createElement('p');
        errorMsg.textContent =`error : ${error.message}`
        parentElement.appendChild(errorMsg);
    }
}

pokePage(url);

const btnMore = document.querySelector(".moreCard");
btnMore.addEventListener("click", pokePage);
