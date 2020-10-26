//Get info from API and clean the result and render the result:

function getSeries() {
  searchSeries = [];
  const searchInputValue = searchInput.value;
  fetch(`//api.tvmaze.com/search/shows?q=${searchInputValue}`)
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
      serieInfo.image = "./assets/images/image.png";
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
    serieListElement.tabIndex = "5";
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
