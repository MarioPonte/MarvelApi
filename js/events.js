function toggleMenu(){
    var menuToggle = document.querySelector('.toggle');
    var navigation = document.querySelector('.navigation');

    menuToggle.classList.toggle('active');
    navigation.classList.toggle('active');
}

// Request api da marvel

const url = "https://gateway.marvel.com/v1/public/events?apikey=13211d1e170e426bd4688717129310e6&ts=1&hash=95520260e855ed5e627a8f270f9c9505";

async function getDados() {
    const dados = await fetch(url);
    const response = await dados.json();

    const pegueiDados = JSON.parse(JSON.stringify(response));

    for(var i=0; i<(pegueiDados.data.results).length; i++){
        $('#infoSection').append('<div id="' + i + '" class="serieInfo" onclick="showModal(' + i + ')"><img src="' + pegueiDados.data.results[i].thumbnail.path + '.' + pegueiDados.data.results[i].thumbnail.extension + '" alt="" srcset="" class="serieImg"></div>');
    }

    $('#footerId').append("<a class='marvelLink' href='http://marvel.com' target='_Blank'>" + pegueiDados.attributionText + " / Site created by Mário Ponte</a>");

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



    var comicsHero = "";
    if(pegueiDadosModal.data.results[clickedElement].comics.available!=0){
        for(var i=0; i<pegueiDadosModal.data.results[clickedElement].comics.items.length; i++) comicsHero += "<li>" + pegueiDadosModal.data.results[clickedElement].comics.items[i].name + "</li>";
    }else comicsHero = '<p class="text-danger"><i class="fa-solid fa-ban"></i> No comics available </p>';

    var charactersSerie = "";
    if(pegueiDadosModal.data.results[clickedElement].characters.available!=0){
        for(var i=0; i<pegueiDadosModal.data.results[clickedElement].characters.items.length; i++) charactersSerie += "<li>" + pegueiDadosModal.data.results[clickedElement].characters.items[i].name + "</li>";
    }else charactersSerie = '<p class="text-danger"><i class="fa-solid fa-ban"></i> No characters available </p>';

    if(pegueiDadosModal.data.results[clickedElement].description != null) document.getElementById("modalHero").innerHTML = '<div class="modal-dialog modal-lg"><div class="modal-content"> <div class="modal-header"> <h5 id="modalSerieName" class="modal-title">' + pegueiDadosModal.data.results[clickedElement].title + '</h5> <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button> </div> <div class="modal-body"> <strong><p>Description:</p></strong> <p>' + pegueiDadosModal.data.results[clickedElement].description + '</p> <div><p class="creators"><strong>Creators:</strong> ' + allCreators + '</p></div><div class="heroHistory"> <button type="button" class="btn btn-primary btnInfoHero" data-bs-toggle="collapse" data-bs-target="#collapseComics" aria-expanded="false" aria-controls="collapseComics">Comics</button> <button type="button" class="btn btn-primary btnInfoHero" data-bs-toggle="collapse" data-bs-target="#collapseCharacters" aria-expanded="false" aria-controls="collapseCharacters">Characters</button> <div class="collapse" id="collapseComics"> <div class="card card-body"> <ul>' + comicsHero + '</ul> </div></div> <div class="collapse" id="collapseCharacters"> <div class="card card-body"> <ul>' + charactersSerie + '</ul> </div></div> </div> </div> </div>';
    else document.getElementById("modalHero").innerHTML = '<div class="modal-dialog modal-lg"><div class="modal-content"> <div class="modal-header"> <h5 id="modalSerieName" class="modal-title">' + pegueiDadosModal.data.results[clickedElement].title + '</h5> <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button> </div> <div class="modal-body"><div><p class="creators"><strong>Creators:</strong> ' + allCreators + '</p></div> <div class="heroHistory"> <button type="button" class="btn btn-primary btnInfoHero" data-bs-toggle="collapse" data-bs-target="#collapseComics" aria-expanded="false" aria-controls="collapseComics">Comics</button> <button type="button" class="btn btn-primary btnInfoHero" data-bs-toggle="collapse" data-bs-target="#collapseCharacters" aria-expanded="false" aria-controls="collapseCharacters">Characters</button> <div class="collapse" id="collapseComics"> <div class="card card-body"> <ul>' + comicsHero + '</ul> </div></div> <div class="collapse" id="collapseCharacters"> <div class="card card-body"> <ul>' + charactersSerie + '</ul> </div></div></div> </div></div> </div>';
    
    let modalHero = new bootstrap.Modal(document.getElementById("modalHero")).show();
}

// /Mostrar Modal

function searchUrl(){
    let inputValue = document.getElementById("searchHero").value;
    return "https://gateway.marvel.com/v1/public/events?nameStartsWith=" + inputValue + "&ts=1&hash=95520260e855ed5e627a8f270f9c9505&apikey=13211d1e170e426bd4688717129310e6";
}

async function searchData() {

    const searchDados = await fetch(searchUrl());
    const searchResponse = await searchDados.json();

    const searchPegueiDados = JSON.parse(JSON.stringify(searchResponse));

    $("#infoSectionSearch").empty();

    for(var i=0; i<(searchPegueiDados.data.results).length; i++){
        $('#infoSectionSearch').prepend('<div id="' + i + '" class="heroInfo" onclick="showModalSearch(' + i + ')"><img src="' + searchPegueiDados.data.results[i].thumbnail.path + '.' + searchPegueiDados.data.results[i].thumbnail.extension + '" alt="" srcset="" class="heroImg"></div>');
    }
}

$('#searchHero').keypress(function(event){
    if(event.keyCode == 13){
      $('#btnSearchHero').click();
    }
});

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



    var comicsHero = "";
    if(pegueiDadosModal.data.results[clickedElement].comics.available!=0){
        for(var i=0; i<pegueiDadosModal.data.results[clickedElement].comics.items.length; i++) comicsHero += "<li>" + pegueiDadosModal.data.results[clickedElement].comics.items[i].name + "</li>";
    }else comicsHero = '<p class="text-danger"><i class="fa-solid fa-ban"></i> No comics available </p>';

    var charactersSerie = "";
    if(pegueiDadosModal.data.results[clickedElement].characters.available!=0){
        for(var i=0; i<pegueiDadosModal.data.results[clickedElement].characters.items.length; i++) charactersSerie += "<li>" + pegueiDadosModal.data.results[clickedElement].characters.items[i].name + "</li>";
    }else charactersSerie = '<p class="text-danger"><i class="fa-solid fa-ban"></i> No characters available </p>';

    if(pegueiDadosModal.data.results[clickedElement].description != null) document.getElementById("modalHero").innerHTML = '<div class="modal-dialog modal-lg"><div class="modal-content"> <div class="modal-header"> <h5 id="modalSerieName" class="modal-title">' + pegueiDadosModal.data.results[clickedElement].title + '</h5> <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button> </div> <div class="modal-body"> <strong><p>Description:</p></strong> <p>' + pegueiDadosModal.data.results[clickedElement].description + '</p> <div><p class="creators"><strong>Creators:</strong> ' + allCreators + '</p></div><div class="heroHistory"> <button type="button" class="btn btn-primary btnInfoHero" data-bs-toggle="collapse" data-bs-target="#collapseComics" aria-expanded="false" aria-controls="collapseComics">Comics</button> <button type="button" class="btn btn-primary btnInfoHero" data-bs-toggle="collapse" data-bs-target="#collapseCharacters" aria-expanded="false" aria-controls="collapseCharacters">Characters</button> <div class="collapse" id="collapseComics"> <div class="card card-body"> <ul>' + comicsHero + '</ul> </div></div> <div class="collapse" id="collapseCharacters"> <div class="card card-body"> <ul>' + charactersSerie + '</ul> </div></div> </div> </div> </div>';
    else document.getElementById("modalHero").innerHTML = '<div class="modal-dialog modal-lg"><div class="modal-content"> <div class="modal-header"> <h5 id="modalSerieName" class="modal-title">' + pegueiDadosModal.data.results[clickedElement].title + '</h5> <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button> </div> <div class="modal-body"><div><p class="creators"><strong>Creators:</strong> ' + allCreators + '</p></div> <div class="heroHistory"> <button type="button" class="btn btn-primary btnInfoHero" data-bs-toggle="collapse" data-bs-target="#collapseComics" aria-expanded="false" aria-controls="collapseComics">Comics</button> <button type="button" class="btn btn-primary btnInfoHero" data-bs-toggle="collapse" data-bs-target="#collapseCharacters" aria-expanded="false" aria-controls="collapseCharacters">Characters</button> <div class="collapse" id="collapseComics"> <div class="card card-body"> <ul>' + comicsHero + '</ul> </div></div> <div class="collapse" id="collapseCharacters"> <div class="card card-body"> <ul>' + charactersSerie + '</ul> </div></div></div> </div></div> </div>';
    
    let modalHero = new bootstrap.Modal(document.getElementById("modalHero")).show();
}

// /Mostrar Modal Pesquisa


getDados();