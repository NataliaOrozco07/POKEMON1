document.addEventListener("DOMContentLoaded", function() {
    const darkModeButton = document.querySelector(".dark_mode");
    const body = document.querySelector("body");

    darkModeButton.addEventListener("click", function() {
        body.classList.toggle("darkMode");
    });
});

let url = "https://pokeapi.co/api/v2/pokemon";
const parentElement = document.querySelector(".grid-container");
const btnMore = document.querySelector(".moreCard");    

let next;

const pokePage = async (url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log('pokemons', data);
        next = data.next;
        console.log('next url', next);

        data.results.forEach(async pokemon => {
            const card = document.createElement("div");
            const divName = document.createElement("div");
            const icon = document.createElement("i");
            const img = document.createElement("img");
            const divLevel = document.createElement("div");
            const levelPke = document.createElement("p");
            const bottonBuy = document.createElement("button");
            const namePke = document.createElement("p");

            namePke.textContent = pokemon.name;

            const res  = await fetch(pokemon.url);
            const detallesPokemon = await res.json();
            
            img.src = detallesPokemon.sprites.front_default;
            levelPke.textContent = detallesPokemon.base_experience;

            bottonBuy.textContent = 'Buy';

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

const nextPage = function(next) {
    btnMore.addEventListener("click", (next) = pokePage(next));
}  







