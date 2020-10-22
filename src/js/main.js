"use strict";

const searchInput = document.querySelector(".js-inputSearch");
const searchButton = document.querySelector(".js-button");

function getSeries() {
  const searchInputValue = searchInput.value;
  fetch(`http://api.tvmaze.com/search/shows?q=${searchInputValue}`)
    .then((results) => results.json())
    .then((data) => {
      for (const serie of data) {
        const seriesTitles = serie.show.name;
        const seriesImages = serie.show.image;
        console.log(seriesTitles);
      }
    });
}

searchInput.addEventListener("keyup", getSeries);
