document.addEventListener("DOMContentLoaded", function() {
    const darkModeButton = document.querySelector(".dark_mode");
    const body = document.querySelector("body");

    darkModeButton.addEventListener("click", function() {
        body.classList.toggle("darkMode");
    });
});

const url = "https://pokeapi.co/api/v2/pokemon";
const parentElement = document.querySelector(".grid-container");
const countElement = document.querySelector('.count');
let remainingCards = 0;

const btnMore = document.querySelector(".moreCard");    
let next;
btnMore.addEventListener("click", () => pokePage(next));

const navAll = document.querySelectorAll('.nav-all');
navAll.forEach(item => {
    console.log('miraos que es item',item, item.getAttribute('pokemontype'));
    item.addEventListener('click',() => filterByType(item.getAttribute('pokemontype')));
});

const pokePage = async (url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log('pokemons', data);
        next = data.next;
        console.log('next url', next);

        remainingCards = data.count;

        data.results.forEach(async pokemon => {
            const card = document.createElement("div");
            const divName = document.createElement("div");
            const namePke = document.createElement("p");
            const icon = document.createElement("i");
            const img = document.createElement("img");
            const divLevel = document.createElement("div");
            const levelPke = document.createElement("p");
            const bottonBuy = document.createElement("button");

            namePke.textContent = pokemon.name;

            const res  = await fetch(pokemon.url);
            const detallesPokemon = await res.json();
            
            img.src = detallesPokemon.sprites.front_default;
            console.log(detallesPokemon);
            levelPke.textContent = detallesPokemon.base_experience;

            const [type1, type2] = detallesPokemon.types.map((pokeType) => pokeType.type.name)
            console.log('esta es el type1 y el type2', type1, type2);
            card.setAttribute('pokemontype1', type1);
            card.setAttribute('pokemontype2', type2);

            card.className = 'card';
            divName.className= 'name'
            namePke.className ='pName';
            icon.className = "fa-sharp fa-regular fa-heart";
            img.className = 'imgPokemon'
            divLevel.className = 'level';
            levelPke.className = 'pLevel'
            bottonBuy.className = 'btnlevel';
            bottonBuy.textContent = 'Buy';

            parentElement.appendChild(card);
            card.appendChild(divName);
            divName.appendChild(namePke);
            divName.appendChild(icon);
            card.appendChild(img);
            card.appendChild(divLevel);
            divLevel.appendChild(levelPke);
            divLevel.appendChild(bottonBuy);

        });

        countElement.textContent = `totalLoadCards: ${remainingCards}`;
    } catch (error){
        const errorMsg = document.createElement('p');
        errorMsg.textContent =`error : ${error.message}`
        parentElement.appendChild(errorMsg);
    }
};


const filterByType = (type) => {
    const cards = document.querySelectorAll('.card');
    cards.forEach( card => {
        console.log('hola estan la funcion filter by type', card)
        const cardType1 = card.getAttribute('pokemontype1');
        const cardType2 = card.getAttribute('pokemontype2');
        console.log ('Estamos mirando el cardType', cardType1, cardType2, type)
        if (type === 'All' || cardType1 === type || cardType2 === type) {
            card.classList.add('show');
            card.classList.remove('hide');
        } else{
            card.classList.add('hide');
            card.classList.remove('show');
        }
    });
    countElement.textContent = `totalLoadCards: ${document.querySelectorAll('.card.show').length}`;
};

pokePage(url);



