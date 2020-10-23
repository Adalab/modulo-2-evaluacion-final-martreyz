"use strict";

const searchInput = document.querySelector(".js-inputSearch");
const searchButton = document.querySelector(".js-button");
const resultsList = document.querySelector(".js-resultsList");
const favourites = document.querySelector(".js-favourites");

let favouriteSeries = [];
let searchSeries = [];

//Get favourites from localStorage if there is any:

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
    if (serie.show.image !== null) {
      serieInfo.image = serie.show.image.original;
    } else {
      serieInfo.image = "../assets/images/imagealt.png";
    }
    searchSeries.push(serieInfo);
  }
}

searchButton.addEventListener("click", getSeries);

function renderResults() {
  resultsList.innerHTML = "";
  for (let i = 0; i < searchSeries.length; i++) {
    let serieListElement = document.createElement("li");
    let serieTitleElement = document.createElement("h3");
    let serieImageElement = document.createElement("img");
    resultsList.appendChild(serieListElement);
    serieListElement.appendChild(serieTitleElement);
    serieListElement.appendChild(serieImageElement);
    serieListElement.classList.add("js-result-item");
    serieImageElement.classList.add("main__result-pic");
    serieListElement.id = i;
    serieImageElement.src = searchSeries[i].image;
    serieImageElement.title = searchSeries[i].name;
    serieImageElement.alt = searchSeries[i].name;
    let serieTitleContent = document.createTextNode(searchSeries[i].name);
    serieTitleElement.appendChild(serieTitleContent);
    for (const serie of favouriteSeries) {
      if (serie.image === searchSeries[i].image) {
        serieListElement.classList.add("selected");
        serieListElement.classList.remove("js-result-item");
        serieListElement.classList.add("js-resultInFavourites");
      }
    }
  }
  listenResults();
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
  for (let i = 0; i < favouriteSeries.length; i++) {
    let serieListElement = document.createElement("li");
    let serieTitleElement = document.createElement("h3");
    let serieImageElement = document.createElement("img");
    let serieStarElement = document.createElement("div");
    favourites.appendChild(serieListElement);
    serieStarElement.classList.add("js-star");
    serieStarElement.title = "Eliminar de favoritos";
    serieListElement.appendChild(serieTitleElement);
    serieListElement.appendChild(serieImageElement);
    serieListElement.appendChild(serieStarElement);
    serieListElement.classList.add("js-favourite-item");
    serieListElement.classList.add("main__favourite-item");
    serieImageElement.classList.add("main__favourite-pic");
    serieListElement.id = i;
    serieImageElement.src = favouriteSeries[i].image;
    serieImageElement.title = favouriteSeries[i].name;
    serieImageElement.alt = favouriteSeries[i].name;
    let serieTitleContent = document.createTextNode(favouriteSeries[i].name);
    serieTitleElement.appendChild(serieTitleContent);
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

// function listenFavouritesInResults() {
//   const favouriteItemsInResult = document.querySelectorAll(
//     ".js-resultInFavourites"
//   );
//   for (const favouritesResultItem of favouriteItemsInResult) {
//     favouritesResultItem.addEventListener("click", removeFromFavourites);
//   }
// }

//Delete all favourites

const clearAllFav = document.querySelector(".js-clearFavourites");

function clearFavourites() {
  favouriteSeries = [];
  saveInLocalStorage();
  renderFavourites();
  renderResults();
}

clearAllFav.addEventListener("click", clearFavourites);
