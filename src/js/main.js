"use strict";

const searchInput = document.querySelector(".js-inputSearch");
const searchButton = document.querySelector(".js-button");
const resultsList = document.querySelector(".js-resultsList");
const favourites = document.querySelector(".js-favourites");
const resultsContainer = document.querySelector(".js-resultsContainer");

const clearAllFav = document.querySelector(".js-clearFavourites");
const closeFavs = document.querySelector(".js-closeFav");
const asideFavs = document.querySelector(".js-aside");
const openFavs = document.querySelector(".js-favButton");
const moreButton = document.querySelector(".js-moreButton");

//Declare empty arrays to manage results and favourites:

let favouriteSeries = [];
let searchSeries = [];

//Get favourites from localStorage in case of existing:

function getAndRenderFavourites() {
  if (localStorage.getItem("favourite")) {
    let favSeries = JSON.parse(localStorage.getItem("favourite"));
    for (const favSerie of favSeries) {
      favouriteSeries.push(favSerie);
    }
    renderFavourites();
  }
}
getAndRenderFavourites();

//Get info from API and clean the result and render the result:

function getSeries() {
  searchSeries = [];
  const searchInputValue = searchInput.value;
  fetch(`http://api.tvmaze.com/search/shows?q=${searchInputValue}`)
    .then((results) => results.json())
    .then((data) => {
      cleanApiData(data);
      renderResults();
    });
}

function cleanApiData(data) {
  for (const serie of data) {
    const serieInfo = {};
    serieInfo.name = serie.show.name;
    serieInfo.id = serie.show.id;
    if (serie.show.image !== null) {
      serieInfo.image = serie.show.image.original;
    } else {
      serieInfo.image = "../assets/images/image.png";
    }
    searchSeries.push(serieInfo);
  }
}

searchButton.addEventListener("click", getSeries);

function renderResults() {
  resultsContainer.classList.remove("js-hidden");
  searchInput.value = "";
  resultsList.innerHTML = "";
  for (let i = 0; i < searchSeries.length; i++) {
    let serieListElement = document.createElement("li");
    let serieTitleElement = document.createElement("h3");
    let serieImageElement = document.createElement("img");
    let serieButtonElement = document.createElement("button");
    resultsList.appendChild(serieListElement);
    serieListElement.appendChild(serieTitleElement);
    serieListElement.appendChild(serieImageElement);
    serieListElement.appendChild(serieButtonElement);
    serieListElement.classList.add("js-result-item");
    serieTitleElement.classList.add("main__result-item-title");
    serieListElement.classList.add("main__result-item");
    serieImageElement.classList.add("main__result-item-pic");
    serieButtonElement.classList.add("main__result-item-button");
    serieListElement.id = i;
    serieButtonElement.title = "Añadir a favoritos";
    serieListElement.setAttribute("data", searchSeries[i].id);
    serieImageElement.src = searchSeries[i].image;
    serieImageElement.title = searchSeries[i].name;
    serieImageElement.alt = searchSeries[i].name;
    let serieTitleContent = document.createTextNode(searchSeries[i].name);
    serieTitleElement.appendChild(serieTitleContent);
    for (const serie of favouriteSeries) {
      if (serie.id === searchSeries[i].id) {
        serieButtonElement.title = "Eliminar de favoritos";
        serieButtonElement.classList.add("js-selectedButton");
        serieListElement.classList.add("js-selected");
        serieListElement.classList.remove("js-result-item");
        serieListElement.classList.add("js-resultFav-item");
      }
    }
  }
  listenResults();
  listenFavResult();
}

//Prevents input-enter from refreshing the page and triggers click on button
function changeEnterAction(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    searchButton.click();
  }
}

searchInput.addEventListener("keydown", changeEnterAction);

//Favourites: Push elements set as favourite into the array to be saved in LocalStorage. Render the information into the page:

function addToFavourites(event) {
  let favouriteSerie = event.currentTarget;
  let favouriteSerieId = favouriteSerie.id;
  if (favouriteSeries.indexOf(searchSeries[favouriteSerieId]) !== -1) {
    let serieIndex = favouriteSeries.indexOf(searchSeries[favouriteSerieId]);
    favouriteSeries.splice(serieIndex, 1);
  } else {
    favouriteSeries.push(searchSeries[favouriteSerieId]);
  }
  renderResults();
  renderFavourites();
  saveInLocalStorage();
}

function saveInLocalStorage() {
  localStorage.setItem("favourite", JSON.stringify(favouriteSeries));
}

function renderFavourites() {
  favourites.innerHTML = "";
  asideFavs.classList.remove("js-hidden");
  for (let i = 0; i < favouriteSeries.length; i++) {
    let serieListElement = document.createElement("li");
    let serieTitleElement = document.createElement("h3");
    let serieImageElement = document.createElement("img");
    let serieButtonElement = document.createElement("button");
    favourites.appendChild(serieListElement);
    serieListElement.appendChild(serieTitleElement);
    serieListElement.appendChild(serieImageElement);
    serieListElement.appendChild(serieButtonElement);
    serieTitleElement.classList.add("aside__favourites-item-title");
    serieListElement.classList.add("js-favourite-item");
    serieListElement.classList.add("aside__favourites-item");
    serieImageElement.classList.add("aside__favourites-item-pic");
    serieButtonElement.classList.add("aside__favourites-item-button");
    serieListElement.id = i;
    serieButtonElement.title = "Eliminar de favoritos";
    serieImageElement.src = favouriteSeries[i].image;
    serieImageElement.title = favouriteSeries[i].name;
    serieImageElement.alt = favouriteSeries[i].name;
    let serieTitleContent = document.createTextNode(favouriteSeries[i].name);
    serieTitleElement.appendChild(serieTitleContent);
  }
  if (favouriteSeries.length <= 2) {
    favourites.classList.add("js-showMore");
  }
  listenFavourites();
}

function listenResults() {
  const resultsListItems = document.querySelectorAll(".js-result-item");
  for (const resultsItem of resultsListItems) {
    resultsItem.addEventListener("click", addToFavourites);
  }
}

//Delete series from favourites (render and localStorage replacement)

function removeFromFavourites(event) {
  let favouriteToRemove = event.currentTarget;
  let indexFavourite = favouriteToRemove.id;
  favouriteSeries.splice(indexFavourite, 1);
  saveInLocalStorage();
  renderFavourites();
  renderResults();
}

function listenFavourites() {
  const favouriteListItems = document.querySelectorAll(".js-favourite-item");
  for (const favouritesItem of favouriteListItems) {
    favouritesItem.addEventListener("click", removeFromFavourites);
  }
}

//Detele favourites from result

function removeFavResult(event) {
  let favResult = event.currentTarget;
  let favResultID = favResult.getAttribute("data");
  for (const serie of favouriteSeries) {
    console.log(serie.id);
    console.log(favResultID);
    if (serie.id == favResultID) {
      let favIndex = favouriteSeries.indexOf(serie);
      favouriteSeries.splice(favIndex, 1);
    }
  }
  saveInLocalStorage();
  renderFavourites();
  renderResults();
}

function listenFavResult() {
  const favResult = document.querySelectorAll(".js-resultFav-item");
  for (const fav of favResult) {
    fav.addEventListener("click", removeFavResult);
  }
}

//Delete all favourites

function clearFavourites() {
  favouriteSeries = [];
  saveInLocalStorage();
  renderFavourites();
  renderResults();
}

clearAllFav.addEventListener("click", clearFavourites);

//Funcions for decorative purposes:

function showBigTV() {
  resultsContainer.classList.add("js-hidden");
}

searchInput.addEventListener("click", showBigTV);

//Navigation:

function closeAsideFav() {
  asideFavs.classList.add("js-hidden");
}

closeFavs.addEventListener("click", closeAsideFav);

function openAsideFav() {
  asideFavs.classList.remove("js-hidden");
}

openFavs.addEventListener("click", openAsideFav);

//Collapse favourites list for esthetic purposes:

function showMoreFavs() {
  favourites.classList.toggle("js-showMore");
  if (favourites.classList.contains("js-showMore")) {
    moreButton.title = "Mostrar menos favoritos";
  } else {
    moreButton.title = "Mostrar todos los favoritos";
  }
}

moreButton.addEventListener("click", showMoreFavs);
