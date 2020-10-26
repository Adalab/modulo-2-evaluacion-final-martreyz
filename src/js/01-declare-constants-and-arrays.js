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
const themeButton = document.querySelector(".js-themeButton");
const pageBody = document.querySelector(".body");

//Declare empty arrays to manage results and favourites:

let favouriteSeries = [];
let searchSeries = [];
