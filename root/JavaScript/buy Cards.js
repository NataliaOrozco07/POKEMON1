const url = "https://pokeapi.co/api/v2/pokemon";
const parentElement = document.querySelector(".grid-container");
let remainingCards = 0;

const btnMore = document.querySelector(".moreCard");
let next;
btnMore.addEventListener("click", () => showMore(next));

const showMore = async (url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        next = data.next;
        data.results.forEach(async pokemon => {

            const res = await fetch(pokemon.url);
            const detallesPokemon = await res.json();

            //tomando de detalles pokemon los typos del pokemon
            const [type1, type2] = detallesPokemon.types.map((pokeType) => pokeType.type.name)
           //estamos obteniendo el texto de la barra de navegacion que este seleccionada en el momento
            const navActive = document.querySelector('.active').textContent.toLowerCase();
          //estoy preguntando si la barra activa es all o sino se muestra segun el tipo
            if('all' === navActive){
                drawCard(pokemon,detallesPokemon,type1,type2);
            } else if (type1 === navActive || type2 === navActive) {
                drawCard(pokemon,detallesPokemon,type1,type2);
            }
        });
    } catch (error) {
        const errorMsg = document.createElement('p');
        errorMsg.textContent = `error : ${error.message}`
        parentElement.appendChild(errorMsg);
    }
};

function drawCard(pokemon,detallesPokemon,type1, type2) {
    const card = document.createElement("div");
    const divName = document.createElement("div");
    const namePke = document.createElement("p");
    const icon = document.createElement("i");
    const img = document.createElement("img");
    const divLevel = document.createElement("div");
    const levelPke = document.createElement("p");
    const bottonBuy = document.createElement("button");

    card.setAttribute('pokemontype1', type1);
    card.setAttribute('pokemontype2', type2);

    namePke.textContent = pokemon.name;

    img.src = detallesPokemon.sprites.other["home"].front_default;
    levelPke.textContent = detallesPokemon.base_experience;

    card.className = 'card';
    divName.className = 'name'
    namePke.className = 'pName';
    icon.className = "fa fa fa-heart";
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

    remainingCards++;
    const carCount = document.querySelector('.count');
    carCount.textContent = `${remainingCards} cards`;
}



const navAll = document.querySelectorAll('.nav-all');
navAll.forEach((item) => {
    item.addEventListener('click', (event) => {
        const active = document.querySelector('.active');
        active.classList.replace('active', 'inactive');
        event.target.classList.replace('inactive', 'active');
        event.preventDefault();
        const type = item.textContent.toLowerCase();
        filterByType(type);
    });
});

const filterByType = (type) => {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
        const cardType1 = card.getAttribute('pokemontype1');
        const cardType2 = card.getAttribute('pokemontype2');
        if (type === 'all' || cardType1 === type || cardType2 === type) {
            card.classList.remove('hide');
        } else {
            card.classList.add('hide');
        }
    });
};

showMore(url);



