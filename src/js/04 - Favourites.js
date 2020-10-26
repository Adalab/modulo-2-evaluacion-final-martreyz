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
    serieListElement.tabIndex = "6";
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

function listenEnterKeyFav(event) {
  if (event.keyCode === 13) {
    event.currentTarget.click();
  }
}

function listenResults() {
  const resultsListItems = document.querySelectorAll(".js-result-item");
  for (const resultsItem of resultsListItems) {
    resultsItem.addEventListener("click", addToFavourites);
    resultsItem.addEventListener("keyup", listenEnterKeyFav);
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
    favouritesItem.addEventListener("keyup", listenEnterKeyFav);
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
    fav.addEventListener("keyup", listenEnterKeyFav);
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
