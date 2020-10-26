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

//Change webpage palette to high contrast and back:

function changeTheme() {
  pageBody.classList.toggle("js-body");
  if (pageBody.classList.contains("js-body")) {
    themeButton.title = "Cambiar a paleta original";
  } else {
    themeButton.title = "Cambiar a paleta de alto contraste";
  }
}

themeButton.addEventListener("click", changeTheme);
