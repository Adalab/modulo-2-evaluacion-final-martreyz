"use strict";

const searchInput = document.querySelector(".js-inputSearch");
const searchButton = document.querySelector(".js-button");
const resultsList = document.querySelector(".js-resultsList");
const favourites = document.querySelector(".js-favourites");

let seriesTitles;
let seriesImages;
function getSeries() {
  resultsList.innerHTML = "";
  const searchInputValue = searchInput.value;
  fetch(`http://api.tvmaze.com/search/shows?q=${searchInputValue}`)
    .then((results) => results.json())
    .then((data) => {
      for (const serie of data) {
        seriesTitles = serie.show.name;
        if (serie.show.image !== null) {
          seriesImages = serie.show.image.original;
        } else {
          seriesImages = "../assets/images/imagealt.png";
        }
        paintResults();
      }
    });
}

searchButton.addEventListener("click", getSeries);

function paintResults() {
  let serieListElement = document.createElement("li");
  let serieTitleElement = document.createElement("h2");
  let serieImageElement = document.createElement("img");
  let serieTitleContent = document.createTextNode(seriesTitles);
  resultsList.appendChild(serieListElement);
  serieListElement.appendChild(serieTitleElement);
  serieListElement.appendChild(serieImageElement);
  serieListElement.classList.add("js-result-item");
  serieImageElement.src = seriesImages;
  serieImageElement.title = seriesTitles;
  serieImageElement.alt = seriesTitles;
  serieImageElement.classList.add("main__result-pic");
  serieTitleElement.appendChild(serieTitleContent);

  listenResults();
  // resultsList.innerHTML += `<li><h2>${seriesTitles}</h2><img src="${seriesImages}" alt="${seriesTitles}" title="${seriesTitles}" class="main__result-pic"></li>`;
}

//Prevents input-enter from refreshing the page and triggers click on button
function changeEnterAction(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    searchButton.click();
  }
}

searchInput.addEventListener("keydown", changeEnterAction);

//Favourites

const favouriteSeries = [];

function addToFavourites(event) {
  let favouriteSerie = event.currentTarget;
  favouriteSerie.classList.toggle("selected");
  if (favouriteSeries.indexOf(favouriteSerie.innerHTML) !== -1) {
    let serieIndex = favouriteSeries.indexOf(favouriteSerie.innerHTML);
    favouriteSeries.splice(serieIndex, 1);
  } else {
    favouriteSeries.push(favouriteSerie.innerHTML);
  }
  localStorage.setItem("favourite", JSON.stringify(favouriteSeries));
}

function listenResults() {
  const resultsListItems = document.querySelectorAll(".js-result-item");
  for (const resultsItem of resultsListItems) {
    resultsItem.addEventListener("click", addToFavourites);
  }
}
