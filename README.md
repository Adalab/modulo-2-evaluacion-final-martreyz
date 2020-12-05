# Evaluación final módulo 2 [Adalab](www.adalab.es)
## Ejercicio de evaluación final del módulo 2 de Adalab: Desarrollo de una aplicación web de búsqueda de series de TV, que nos permite des/marcarlas como favoritas y guardarlas en el LocalStorage

La web contiene también una parte de maquetación HTML y Sass y cumple los siguientes puntos:

- Uso de código JavaScript con la sintaxis correcta y bien estructurado, utilizando variables y constantes, condicionales, arrays y objetos, funciones, eventos y DOM avanzado.
- Peticiones AJAX y APIs: crear peticiones con fetch y promesas, usar el localStorage y manejar el formato .json.
- Uso de partials y estructuración correcta de ficheros y carpetas en el proyecto.
- Maquetación libre con HTML y Sass.

El desarrollo del ejercicio se ha llevado a cabo utilizando el [Adalab Starter Kit](https://github.com/Adalab/adalab-web-starter-kit), creado en node y gulp. Este Kit incluye un motor de plantillas HTML, el preprocesador SASS y un servidor local; además de otras herramientas, como por ejemplo Gulp para la automatización de tareas o motor de plantillas.

![FireShot Capture 006 - ¡Gestiona tus series! - martreyz github io](https://user-images.githubusercontent.com/69849664/101239886-76022a80-36eb-11eb-86e7-8b292e03e6ae.png)


## Composición del código según indicaciones:

- Sobre una estructura básica compuesta por un input de texto y un botón de buscar, hacer que el botón de búsqueda se conecte al API abierto de TVMaze para la búsqueda de series.
- Un apartado de resultados, donde se renderiza un array que acumula las series de la búsqueda. El renderizado ha de hacerse en tarjetas, incluyendo el título y fotografía de cada una de las series mostradas.
  - Para realizar este renderizado se ha utilizado DOM avanzado.
- Un apartado de favoritos, donde se renderiza un segundo array que acumula las series guardadas en favoritos. El renderizado ha de hacerse en tarjetas, incluyendo el título y fotografía de cada una de las series guardadas en favoritos.

  - Las series favoritas deben distinguirse del resto por un cambio en el color de fondo y de fuente. Debe variar tanto en el apartado de favoritos como en los propios resultados.
  - Las series favoritas deben mostrarse permanentemente en pantalla, incluso aunque la usuaria realice otra búsqueda.
  - El array de series favoritas debe almacenarse en el LocalStorage a vistas de que estén disponibles aunque se recargue la página.
  - Otros resquisitos para la sección de favoritos (BONUS del ejercicio):

    - Al hacer click en cualquier serie de favoritos, en el icono reservado para ello, la serie debe borrarse del listado renderizado y del localStorage.
    - Es posible marcar/desmarcar favoritos desde el apartado de resultados.
    - Si se realiza una búsqueda de una serie que ya está en favoritos, debe mostrarse con el estilo adecuado ya en el renderizado de resultados.
    - Botón en el apartado de favoritos para borrarlos todos a la vez.

- Afinar la maquetación (BONUS del ejercicio): Para maquetar este ejercicio se ha utilizado un diseño acorde a la finalidad de la página, creando con Sass una TV en el contenedor de la búsqueda. Se ha reservado un apartado a la izquierda para el listado de favoritos, que como indicado se encuentra siempre visible pero que cuenta con un botón para cerrar el apartado si fuera necesario.
  Además, la TV diseñada cuenta con dos botones: uno que reabre el apartado de favoritos en caso de que éste se encuentre cerrado, y otro que cambia la paleta de colores utilizada en la página a una de alto contraste para mejorar la accesibilidad.
  Además, se ha utilizado JavaScript para funciones con motivos de navegación y decorativos:
  - Botón de cierre de favoritos.
  - Botones de la TV: apertura de favoritos y cambio de paleta de la página.
  - El apartado de resultados se encuentra oculto hasta que realizamos una búsqueda, si después de realizarla clickamos en el input para realizar una nueva búsqueda se vuelve a ocultar.
  - Botón de "Mostrar más" y "Mostrar menos" en la sección de favoritos para hacer la página más agradable al usuario en caso de que existan muchos elementos marcados como fav.
  
  ![FireShot Capture 009 - ¡Gestiona tus series! - martreyz github io](https://user-images.githubusercontent.com/69849664/101239904-a4800580-36eb-11eb-9e79-7f9d80ee5ae3.png)


## Composición del código:

- HTML: Dividido en tres partials base: main y aside.
- CSS: Dividido en partials:
  - Core: Conotiene los partials referentes a la hoja de Reset y variables de valores con carácter repetitivo en el diseño.
  - Layout: Contiene los partials referentes a las particiones HTML, conteniendo los estilos de cada una de ellas.
  
## Arranque del proyecto:

- npm install: Para instalar las dependencias
<img width="624" alt="install" src="https://user-images.githubusercontent.com/69849664/101142786-61a02e00-3616-11eb-877a-cff3666ceee5.PNG">

- npm start: Para arrancar el proyecto y probarlo en desarrollo a través de la URL '//localhost:3000/#/'
<img width="625" alt="start" src="https://user-images.githubusercontent.com/69849664/101142795-649b1e80-3616-11eb-9c46-ea5a31cef5a2.PNG">

- npm run docs: Para publicar el proyecto a producción
<img width="628" alt="docs" src="https://user-images.githubusercontent.com/69849664/101142807-66fd7880-3616-11eb-9b84-2c1ecd7a9672.PNG">

Hecho con :cat2: por @martreyz



# Final evaluation module 2 [Adalab](www.adalab.es)
## Final evaluation exercise for the module 2 in Adalab: Development of an application web to search TV series, that also allows to mark and unmark them as favourites and save them in LocalStorage.

The website is mocked-up with HTML and SASS, and has to meet the following requirements:

- Use of JavaScript with a correct sintaxis and well structured, using variables and constants, conditionals, arrays and objects, functions, events and advanced DOM.
- AJAX Requests and APIs: create requests with fetch and promises, use LocalStorage and manage .json format.
- Use of partials and correct structuring of folders and files in the project. 
- Free mock-up with HTML and SASS.

The development of the exercise has been done using the [Adalab Starter Kit](https://github.com/Adalab/adalab-web-starter-kit), created in node and gulp. This Kit includes a templates engine, preprocessor SASS and a local server; as well as other tools, as for example Gulp for tasks authomation. 

![FireShot Capture 006 - ¡Gestiona tus series! - martreyz github io](https://user-images.githubusercontent.com/69849664/101239886-76022a80-36eb-11eb-86e7-8b292e03e6ae.png)


## Code composition as per indications:

- Over a basic structure composed by a text input and a search button, make the click event on button connect with the TVMaze opened API for the TV series search.
- A results section, where the array of results will render. This render must be done in cards, including in each card the serie's title and picture. 
  - In order to make this render advanced DOM is used.
- A favourites section, where to render a second array with all the series that have been saved in favourites. This render must be done in cards, including in each card the serie's title and picture. 
- Favourite series must be differenced from the others by a style change (background color and font color). This series must have this styles both in the results and favourites lists.
- Favourite series must be shown permanently in screen, eventhough the user makes another search.
- Favourite series' array must be storaged in LocalStorage for them to be available eventhought the webpage is refreshed.
- Other requirements for the favourites section (exercise BONUS):

    - When making click in any favourite serie, it must be removed both from the rendered list and the LocalStorage. 
    - It is possible to mark/unmark favourites from the results section. 
    - If a new search includes in results any serie already saved in favourites, its card must be shown already with the favourites styles.
    - Add a button in the favourites section to remove them all at once.

- Mock-up (Exercise's BONUS): In order to mock-up this exercise its used a design that tries to match de goal of the webpage, creating with SASS a TV in the search container. Also a left section is reserved for the favourites list, that is always shown in the page as per requirements but also has a button to hide the whole section in case of need.
  Also, the designed TV has two additional buttons: one of them reopens the favourites section once it is closed, and the other changes the color palette of the webpage to another with hight contrast and improve the accessibility. 
  Finally, JavaScript has been used to add some decorations and functionalities:
  - Favourites - closing button.
  - TV buttons: opening of favourites section and palette change. 
  - The results section is hidden until we make a search.
  - "Show more" and "Show less" button added to favourites section to improve the user experience in case there are a lot of elements saved as favourites.
  
  ![FireShot Capture 009 - ¡Gestiona tus series! - martreyz github io](https://user-images.githubusercontent.com/69849664/101239904-a4800580-36eb-11eb-9e79-7f9d80ee5ae3.png)


## Code composition:

- HTML: Divided in two basic partials: main y aside.
- CSS: Divided in partials:
  - Core: Contains partials related to the Reset stylesheet and variables with repetitive values in the design. 
  - Layout: Contains partials related to HTML partitions. 
  
## How to start the proyect:

- npm install: To install dependencies
<img width="624" alt="install" src="https://user-images.githubusercontent.com/69849664/101142786-61a02e00-3616-11eb-877a-cff3666ceee5.PNG">

- npm start: To start the project and try it in development server through URL '//localhost:3000/#/'
<img width="625" alt="start" src="https://user-images.githubusercontent.com/69849664/101142795-649b1e80-3616-11eb-9c46-ea5a31cef5a2.PNG">

- npm run docs: To publish project to production
<img width="628" alt="docs" src="https://user-images.githubusercontent.com/69849664/101142807-66fd7880-3616-11eb-9b84-2c1ecd7a9672.PNG">

Made with :cat2: by @martreyz
