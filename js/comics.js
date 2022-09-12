function toggleMenu(){
    var menuToggle = document.querySelector('.toggle');
    var navigation = document.querySelector('.navigation');

    menuToggle.classList.toggle('active');
    navigation.classList.toggle('active');
}

// Request api da marvel

const url = "https://gateway.marvel.com/v1/public/comics?apikey=13211d1e170e426bd4688717129310e6&ts=1&hash=95520260e855ed5e627a8f270f9c9505";

async function getDados() {
    const dados = await fetch(url);
    const response = await dados.json();

    const pegueiDados = JSON.parse(JSON.stringify(response));

    for(var i=0; i<(pegueiDados.data.results).length; i++){
        $('#infoSection').append('<div id="' + i + '" class="comicInfo" onclick="showModal(' + i + ')"><img src="' + pegueiDados.data.results[i].thumbnail.path + '.' + pegueiDados.data.results[i].thumbnail.extension + '" alt="" srcset="" class="comicImg"></div>');
    }

}

// Mostrar Modal

async function showModal(clickedElement){

    const dadosModal = await fetch(url);
    const responseModal = await dadosModal.json();

    const pegueiDadosModal = JSON.parse(JSON.stringify(responseModal));

    var allCreators = "";

    for(var i=0; i<(pegueiDadosModal.data.results[clickedElement].creators.items).length; i++){
        allCreators += pegueiDadosModal.data.results[clickedElement].creators.items[i].name;
        if((i+1) != (pegueiDadosModal.data.results[clickedElement].creators.items).length) allCreators += ", ";
    }

    document.getElementById("modalHero").innerHTML = '<div class="modal-dialog modal-lg"><div class="modal-content"> <div class="modal-header"> <h5 id="modalHeroName" class="modal-title">' + pegueiDadosModal.data.results[clickedElement].title + '</h5> <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button> </div> <div class="modal-body"> <strong><p>Price:</strong> ' + pegueiDadosModal.data.results[clickedElement].prices[0].price + '$</p> <p><strong>Creators:</strong> ' + allCreators + '</p> </div> <div class="heroHistory"><button class="btn btn-primary btnInfoHero">More Info</button></div> </div> </div> </div> </div>';
    
    let modalHero = new bootstrap.Modal(document.getElementById("modalHero")).show();
}

// /Mostrar Modal

function searchUrl(){
    let inputValue = document.getElementById("searchHero").value;
    return "https://gateway.marvel.com/v1/public/comics?titleStartsWith=" + inputValue + "&ts=1&hash=95520260e855ed5e627a8f270f9c9505&apikey=13211d1e170e426bd4688717129310e6";
}

async function searchData() {

    const searchDados = await fetch(searchUrl());
    const searchResponse = await searchDados.json();

    const searchPegueiDados = JSON.parse(JSON.stringify(searchResponse));

    $("#infoSectionSearch").empty();

    for(var i=0; i<(searchPegueiDados.data.results).length; i++){
        $('#infoSectionSearch').prepend('<div class="comicInfo" onclick="showModalSearch(' + i + ')"><img src="' + searchPegueiDados.data.results[i].thumbnail.path + '.' + searchPegueiDados.data.results[i].thumbnail.extension + '" alt="" srcset="" class="comicImg"></div>');
    }
}

// Mostrar Modal Pesquisa

async function showModalSearch(clickedElement){
    const dadosModal = await fetch(searchUrl());
    const responseModal = await dadosModal.json();

    const pegueiDadosModal = JSON.parse(JSON.stringify(responseModal));

    var allCreators = "";

    for(var i=0; i<(pegueiDadosModal.data.results[clickedElement].creators.items).length; i++){
        allCreators += pegueiDadosModal.data.results[clickedElement].creators.items[i].name;
        if((i+1) != (pegueiDadosModal.data.results[clickedElement].creators.items).length) allCreators += ", ";
    }

    document.getElementById("modalHero").innerHTML = '<div class="modal-dialog modal-lg"><div class="modal-content"> <div class="modal-header"> <h5 id="modalHeroName" class="modal-title">' + pegueiDadosModal.data.results[clickedElement].title + '</h5> <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button> </div> <div class="modal-body"> <strong><p>Price:</strong> ' + pegueiDadosModal.data.results[clickedElement].prices[0].price + '$</p> <p><strong>Creators:</strong> ' + allCreators + '</p> </div> <div class="heroHistory"><button class="btn btn-primary btnInfoHero">More Info</button></div> </div> </div> </div> </div>';
    
    let modalHero = new bootstrap.Modal(document.getElementById("modalHero")).show();
}

// /Mostrar Modal Pesquisa


getDados();