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
        }
        console.log(seriesImages);
        paintResults();
      }
    });
}

searchButton.addEventListener("click", getSeries);

function paintResults() {
  resultsList.innerHTML += `<li><h2>${seriesTitles}</h2><img src="${seriesImages}" alt="${seriesTitles}" title="${seriesTitles}" class="main__result-pic"></li>`;
}
