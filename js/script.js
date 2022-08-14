function toggleMenu(){
    var menuToggle = document.querySelector('.toggle');
    var navigation = document.querySelector('.navigation');

    menuToggle.classList.toggle('active');
    navigation.classList.toggle('active');
}

// Request api da marvel

const url = "https://gateway.marvel.com/v1/public/characters?apikey=13211d1e170e426bd4688717129310e6&ts=1&hash=95520260e855ed5e627a8f270f9c9505";

async function getDados() {
    const dados = await fetch(url);
    const response = await dados.json();

    const pegueiDados = JSON.parse(JSON.stringify(response));

    for(var i=0; i<(pegueiDados.data.results).length; i++){
        $('#infoSection').append('<div class="heroInfo" onclick="showModal()"><img src="' + pegueiDados.data.results[i].thumbnail.path + '.' + pegueiDados.data.results[i].thumbnail.extension + '" alt="" srcset="" class="heroImg"><h2 class="heroName">' + pegueiDados.data.results[i].name + '</h2></div>');
    }

}

let inputValue = document.getElementById("searchHero").value;

async function searchData() {

    let inputValue = document.getElementById("searchHero").value;

    const searchUrl = "https://gateway.marvel.com/v1/public/characters?name=" + inputValue + "&apikey=13211d1e170e426bd4688717129310e6&ts=1&hash=95520260e855ed5e627a8f270f9c9505";

    const searchDados = await fetch(searchUrl);
    const searchResponse = await searchDados.json();

    const searchPegueiDados = JSON.parse(JSON.stringify(searchResponse));

    for(var i=0; i<(searchPegueiDados.data.results).length; i++){
        $('#infoSection').prepend('<div class="heroInfo" onclick="showModal()"><img src="' + searchPegueiDados.data.results[i].thumbnail.path + '.' + searchPegueiDados.data.results[i].thumbnail.extension + '" alt="" srcset="" class="heroImg"><h2 class="heroName">' + searchPegueiDados.data.results[i].name + '</h2></div>');
    }
}
getDados();