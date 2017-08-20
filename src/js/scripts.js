/* scripts.js */

// create some new DOM elements.
var newDiv = document.createElement('div'), 
  newCard = document.createElement('div'), 
  newMovie = document.createElement('div'), 
  newPoster = document.createElement('img'), 
  newUL = document.createElement('ul'), 
  newLI = document.createElement('li'), 
  newH3 = document.createElement('h3'), 
  newH4 = document.createElement('h4'), 
  newH5 = document.createElement('h5');

// add attributes to new DOM elements.
newCard.classList.add("card","flex1","flex-container");
newMovie.classList.add("movie","flex1");
newPoster.classList.add("poster");

// cache some existing DOM elements.
var deckEl = document.getElementById('deck'), 
  crawls = document.getElementById('crawls'), 
  crawlsBars = document.getElementById('crawls_bars'), 
  crawlsLabels = document.getElementById('crawls_labels');

// empty array for films data.
var filmsArr = [], 
  charsArr = [];
      console.log('filmsArr: ', filmsArr);
      console.log('charsArr: ', charsArr);

// if these defaults display in the view, we have a problem:
var favMost = "Harry Potter"; // default most fav character
var favLeast = "Rupert Grint"; // default least fav character

/* START AJAX Calls */

/** 
* NOTE: the "people" API appears to have no person at ID 17.  I'm 
* assigning a range of characters to most favorite and another range 
* to the least favorite.
*/

// cal SWAPI to get a random MOST favorite character and render
callSwapi("GET", swapiRoot+"people/"+randomVal(1,16)).then(renderFavMost);

// cal SWAPI to get a random LEAST favorite character and render
callSwapi("GET", swapiRoot+"people/"+randomVal(18,87)).then(renderFavLeast);

// cal SWAPI to get all films and make an array
callSwapi("GET", swapiRoot+"films")
.then(function (data) {

  console.group('MAKE FILMS DATA AVAILABLE');
  console.log('films data: ', data);

  // put array of films into a variable
  films = data.results;
  console.log('films: ', films);

  console.groupEnd();

})
.then(renderGraph)
.then(renderCards)
.then(renderPeople);


/* START Utility Functions */

function randomVal(min, max) {
  return Math.floor(Math.random() * (max - min) + 1) + min;
}

/* START Render Functions */

/**
* this function grabs HTML element for most favorite character and 
* adds randomly chosen name to ES6 template literal while appending
* template to element in DOM.
*/

function renderFavMost (data) {
  // console.group('START renderFavMost');
  // console.log('data: ', data);
  document.getElementById('favMost').innerHTML += `<h4 class="most">${data.name}</h4>`;
  // console.groupEnd();
}

/**
* this function grabs HTML element for least favorite character and 
* adds randomly chosen name to ES6 template literal while appending
* template to element in DOM.
*/

function renderFavLeast (data) {
  // console.group('START renderFavLeast');
  // console.log('data: ', data);
  document.getElementById('favLeast').innerHTML += `<h4 class="least">${data.name}</h4>`;
  // console.groupEnd();
}

function renderGraph () {
  // console.group('START renderGraph');

  for (var i = 0; i < films.length; i++) {

    var wordArr = films[i].opening_crawl.split(/\s+/);
    console.log('wordArr: ', wordArr);
    var wordcount = wordArr.length;
    console.log('wordcount: ', wordcount);

    var label = `<h5 class="flex-item label" id="label${films[i].episode_id}" style="width:${(100/films.length)}%;">${films[i].title}</h5>`;
    // console.log('label: ', label);
    crawlsLabels.innerHTML += label;

    var bar = `<div class="flex-item barBox" id="bar${films[i].episode_id}">
      <div class="flex-item bar" 
        id="bar${films[i].episode_id}" 
        style="height:${(wordcount/100)*100}%; background:hsl(${(360/films.length)*films[i].episode_id}
    ,90%,70%);">${wordcount}</div>
    </div>`;
    // console.log('bar: ', bar);
    crawlsBars.innerHTML += bar;

  }
  // console.groupEnd();
}

/**
* FUNCTION renderCards()
* loop over the array of film data to grab bits of information.  take 
* those bits and create new DOM objects to put them in.  append those 
* DOM objects to the 'div#deck' element.
*/

function renderCards () {
  console.group('START renderCards');
  var k = 0;

  // loop over films array
  for (var i = 0; i < films.length; i++) {

    // console.log('films[i]: ', films[i]);
    var movie = films[i];
    console.log('movie: ', movie);

    // create a card if "i" is odd...
    if (i%2 === 0 ) {
      var cardEl = newCard.cloneNode();
      cardEl.id = "card"+k;
      console.log('cardEl: ', cardEl);
    }
    console.dir(cardEl);


    // clone a DIV for the movie info container
    var movieEl = newMovie.cloneNode();
    movieEl.dataset.episode = movie.episode_id;

    // clone an H3 for the movie title
    var posterEl = newPoster.cloneNode();
    posterEl.src = "img/sw"+movie.episode_id+".jpg";

    // clone an H3 for the movie title
    var titleEl = newH3.cloneNode();
    titleEl.classList.add("title");
    titleEl.innerHTML = `<small>Star Wars <span class="nowrap">Episode ${movie.episode_id}:</span></small><br>${movie.title}`;

    // clone an H4 for the movie director
    var dirEl = newH4.cloneNode();
    dirEl.classList.add("director");
    dirEl.innerHTML = movie.director;

    var charsEl = newUL.cloneNode();
    charsEl.classList.add("characters");

    // loop over characters array for the first 3 characters
    for (var j = 0; j < 3; j++) {
      console.log('k (card): ', k);
      console.log('i (movie): ', i);
      console.log('movie.episode_id: ', movie.episode_id);
      console.log('j (char): ', j);

      // console.log('filmsArr['+i+']characters['+j+']: ', films[i].characters[j]);
      var urlChar = movie.characters[j];
      var charEl = newLI.cloneNode();
      charEl.classList.add("character");
      charEl.dataset.movie = movie.episode_id;
      charEl.dataset.url = urlChar;
      charsEl.appendChild(charEl);

    }

    // append movie info elements to container
    movieEl.appendChild(posterEl);
    movieEl.appendChild(titleEl);
    movieEl.appendChild(dirEl);
    movieEl.appendChild(charsEl);

    // append movie container to card
    cardEl.appendChild(movieEl);

    // append card to deck
    deckEl.appendChild(cardEl);

    if (i%2 === 0 ) {
      k++;
    }

  }

  console.groupEnd();

}

/**
* FUNCTION renderPeople()
* loop over the array of list item DOM elements to cache and grab API 
* URL from each.  
*/

function renderPeople () {
  console.group('START renderPeople');
  var charListItems = document.querySelectorAll(".character");
  // console.log('charListItems: ', charListItems);

  for (var i = 0; i < charListItems.length; i++) {
    // console.log('charListItems['+i+']: ', charListItems[i]);
    var item = charListItems[i];
    // console.log('charListItems['+i+']: ', charListItems[i].dataset.url);
    var url = charListItems[i].dataset.url;

    // put API call for individual people in an external function
    getPeople(item, url);

  }

  console.groupEnd();
}

/**
* FUNCTION getPeople()
* Grab name of person from API and put it in the correct DOM element.  
*/

function getPeople (el, url) {
  callSwapi("GET", url).then(function (data) {

    // console.log('getPeople data: ', data.name);

    // console.log('el: ', el);

    var name = "Dumbledore";

    name = data.name;

    el.innerHTML = name;

  });
}
