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
