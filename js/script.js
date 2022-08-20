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
        $('#infoSection').append('<div id="' + i + '" class="heroInfo" onclick="showModal(' + i + ')"><img src="' + pegueiDados.data.results[i].thumbnail.path + '.' + pegueiDados.data.results[i].thumbnail.extension + '" alt="" srcset="" class="heroImg"><h2 class="heroName">' + pegueiDados.data.results[i].name + '</h2></div>');
    }

}

// Mostrar Modal

async function showModal(clickedElement){
    const dadosModal = await fetch(url);
    const responseModal = await dadosModal.json();

    const pegueiDadosModal = JSON.parse(JSON.stringify(responseModal));

    var comicsHero = "";
    for(var i=0; i<pegueiDadosModal.data.results[clickedElement].comics.items.length; i++){
        comicsHero += "<li>" + pegueiDadosModal.data.results[clickedElement].comics.items[i].name + "</li>";
    }

    var seriesHero = "";
    for(var i=0; i<pegueiDadosModal.data.results[clickedElement].series.items.length; i++){
        seriesHero += "<li>" + pegueiDadosModal.data.results[clickedElement].series.items[i].name + "</li>";
    }

    var storiesHero = "";
    for(var i=0; i<pegueiDadosModal.data.results[clickedElement].stories.items.length; i++){
        storiesHero += "<li>" + pegueiDadosModal.data.results[clickedElement].stories.items[i].name + "</li>";
    }

    var eventsHero = "";
    if(pegueiDadosModal.data.results[clickedElement].events.available!=0){
        for(var i=0; i<pegueiDadosModal.data.results[clickedElement].events.items.length; i++){
            eventsHero += "<li>" + pegueiDadosModal.data.results[clickedElement].events.items[i].name + "</li>";
        }
    }else{
        eventsHero = '<p class="text-danger"><i class="fa-solid fa-ban"></i> No events available </p>';
    }

    if(pegueiDadosModal.data.results[clickedElement].description != "") document.getElementById("modalHero").innerHTML = '<div class="modal-dialog modal-lg"><div class="modal-content"> <div class="modal-header"> <h5 id="modalHeroName" class="modal-title">' + pegueiDadosModal.data.results[clickedElement].name + '</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> </div> <div class="modal-body"> <strong><p>Description:</p></strong> <p>' + pegueiDadosModal.data.results[clickedElement].description + '</p> </div> <div class="heroHistory"> <button type="button" class="btn btn-primary btnInfoHero" data-bs-toggle="collapse" data-bs-target="#collapseComics" aria-expanded="false" aria-controls="collapseComics">Comics</button> <button type="button" class="btn btn-primary btnInfoHero" data-bs-toggle="collapse" data-bs-target="#collapseSeries" aria-expanded="false" aria-controls="collapseSeries">Series</button> <button type="button" class="btn btn-primary btnInfoHero" data-bs-toggle="collapse" data-bs-target="#collapseStories" aria-expanded="false" aria-controls="collapseStories">Stories</button> <button type="button" class="btn btn-primary btnInfoHero" data-bs-toggle="collapse" data-bs-target="#collapseEvents" aria-expanded="false" aria-controls="collapseEvents">Events</button> <div class="collapse" id="collapseComics"> <div class="card card-body"> <ul> ' + comicsHero + ' </ul> </div> </div> <div class="collapse" id="collapseSeries"> <div class="card card-body"> <ul> ' + seriesHero + ' </ul> </div> </div> <div class="collapse" id="collapseStories"> <div class="card card-body"> <ul> ' + storiesHero + ' </ul> </div> </div> <div class="collapse" id="collapseEvents"> <div class="card card-body"> <ul> ' + eventsHero + ' </ul> </div> </div> </div> </div> </div>';
    else document.getElementById("modalHero").innerHTML = '<div class="modal-dialog modal-lg"><div class="modal-content"> <div class="modal-header"> <h5 id="modalHeroName" class="modal-title">' + pegueiDadosModal.data.results[clickedElement].name + '</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> </div> <div class="modal-body"> <strong><p>Description:</p></strong> <p class="text-danger"><i class="fa-solid fa-ban"></i> No description available </p> </div> <div class="heroHistory"> <button type="button" class="btn btn-primary btnInfoHero" data-bs-toggle="collapse" data-bs-target="#collapseComics" aria-expanded="false" aria-controls="collapseComics">Comics</button> <button type="button" class="btn btn-primary btnInfoHero" data-bs-toggle="collapse" data-bs-target="#collapseSeries" aria-expanded="false" aria-controls="collapseSeries">Series</button> <button type="button" class="btn btn-primary btnInfoHero" data-bs-toggle="collapse" data-bs-target="#collapseStories" aria-expanded="false" aria-controls="collapseStories">Stories</button> <button type="button" class="btn btn-primary btnInfoHero" data-bs-toggle="collapse" data-bs-target="#collapseEvents" aria-expanded="false" aria-controls="collapseEvents">Events</button> <div class="collapse" id="collapseComics"> <div class="card card-body"> <ul> ' + comicsHero + ' </ul> </div> </div> <div class="collapse" id="collapseSeries"> <div class="card card-body"> <ul> ' + seriesHero + ' </ul> </div> </div> <div class="collapse" id="collapseStories"> <div class="card card-body"> <ul> ' + storiesHero + ' </ul> </div> </div> <div class="collapse" id="collapseEvents"> <div class="card card-body"> <ul> ' + eventsHero + ' </ul> </div> </div> </div> </div> </div>';
    
    let modalHero = new bootstrap.Modal(document.getElementById("modalHero")).show();
}

// /Mostrar Modal

let inputValue = document.getElementById("searchHero").value;

async function searchData() {

    let inputValue = document.getElementById("searchHero").value;

    const searchUrl = "https://gateway.marvel.com/v1/public/characters?name=" + inputValue + "&ts=1&hash=95520260e855ed5e627a8f270f9c9505&apikey=13211d1e170e426bd4688717129310e6";

    const searchDados = await fetch(searchUrl);
    const searchResponse = await searchDados.json();

    const searchPegueiDados = JSON.parse(JSON.stringify(searchResponse));

    for(var i=0; i<(searchPegueiDados.data.results).length; i++){
        $('#infoSection').prepend('<div class="heroInfo" onclick="showModal()"><img src="' + searchPegueiDados.data.results[i].thumbnail.path + '.' + searchPegueiDados.data.results[i].thumbnail.extension + '" alt="" srcset="" class="heroImg"><h2 class="heroName">' + searchPegueiDados.data.results[i].name + '</h2></div>');
    }
}
getDados();