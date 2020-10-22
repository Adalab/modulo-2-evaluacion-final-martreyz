"use strict";

const searchInput = document.querySelector(".js-inputSearch");
const searchButton = document.querySelector(".js-button");
const resultsList = document.querySelector(".js-resultsList");

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
        console.log(seriesImages);
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
  serieImageElement.src = seriesImages;
  serieImageElement.title = seriesTitles;
  serieImageElement.alt = seriesTitles;
  serieImageElement.classList.add("main__result-pic");
  serieTitleElement.appendChild(serieTitleContent);

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
