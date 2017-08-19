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
newCard.classList.add("card","flex-item","flex-container");
newMovie.classList.add("movie","flex-item");

// cache some existing DOM elements.
var deckEl = document.getElementById('deck'), 
  crawls = document.getElementById('crawls'), 
  crawlsBars = document.getElementById('crawls_bars'), 
  crawlsLabels = document.getElementById('crawls_labels');

// empty array for films data.
var films = [];

// if these defaults display in the view, we have a problem:
var favMost = "Harry Potter"; // default most fav character
var favLeast = "Rupert Grint"; // default least fav character

/* START AJAX Calls */
// callSwapi("GET", swapiRoot+"djfhgjhd", function (data) {
//   console.log('djfhgjhd data: ', data);
// });


/** 
* API appears to have no person at ID 17.  I'm assigning a range of 
* characters to most favorite and another range to the least favorites.
*/
// cal SWAPI to get a random MOST favorite character and render in page 
// with a unique callback.
callSwapi("GET", swapiRoot+"people/"+randomVal(1,16), renderFavMost);
// cal SWAPI to get a random LEAST favorite character and render in page 
// with a unique callback.
callSwapi("GET", swapiRoot+"people/"+randomVal(18,87), renderFavLeast);

// cal SWAPI to get films array.
callSwapi("GET", swapiRoot+"films", function (data) {
  console.log('callSwapi("GET", swapiRoot+"films"): ', data);
  // put array of films into a variable
  films = data.results;
  console.log('films.length: ', films.length);
  // execute function that renders bar graph
  renderGraph(films);
  // execute function that renders film cards
  renderCards(films);
})

/* START Utility Functions */

function randomVal(min, max) {
  return Math.floor(Math.random() * (max - min) + 1) + min;
}

/* START Render Functions */

/**
* function grabs HTML element for most favorite character and 
* adds randomly chosen name to ES6 template literal while appending
* template to element.
*/
function renderFavMost (data) {
  // console.group('START renderFavMost');
  // console.log('data: ', data);
  document.getElementById('favMost').innerHTML += `<h4 class="most">${data.name}</h4>`;
  // console.groupEnd();
}

/**
* function grabs HTML element for least favorite character and 
* adds randomly chosen name to ES6 template literal while appending
* template to element.
*/
function renderFavLeast (data) {
  // console.group('START renderFavLeast');
  // console.log('data: ', data);
  document.getElementById('favLeast').innerHTML += `<h4 class="least">${data.name}</h4>`;
  // console.groupEnd();
}

function renderChar (data) {
  console.group('START renderChar');
  console.log('data: ', data);
  // var label = `<h5 class="label">${data.name}</h5>`;
  console.groupEnd();
}

function renderGraph (data) {
  // console.group('START renderGraph');
  // console.log('data: ', data);

  for (var i = 0; i < data.length; i++) {

    // console.log('data['+i+']: ', data[i]);

    var label = `<h5 class="flex-item label" id="label${data[i].episode_id}" style="width:${(100/data.length)}%;">${data[i].title}</h5>`;
    // console.log('label: ', label);
    crawlsLabels.innerHTML += label;

    var bar = `<div class="flex-item barBox" id="bar${data[i].episode_id}" style="width:${(100/data.length)}%;">
    <div class="flex-item bar" id="bar${data[i].episode_id}" style="height:${(data[i].opening_crawl.length/600)*100}%; background:hsl(
    ${(360/data.length)*data[i].episode_id}
    ,90%,70%);">${data[i].opening_crawl.length}</div>
    </div>`;
    // console.log('bar: ', bar);
    crawlsBars.innerHTML += bar;

  }
  // console.groupEnd();
}

function renderCards (data) {
  console.group('START renderCards');
  console.log('data: ', data);
  var k = 0;

  // loop over films array
  for (var i = 0; i < data.length; i++) {

    // console.log('data[i]: ', data[i]);
    var movie = data[i];
    console.log('movie: ', movie);

    // create a card if "i" is odd...
    if (i%2 === 0 ) {
      var cardEl = newCard.cloneNode();
      cardEl.id = "card"+k;
      console.log('cardEl: ', cardEl);
      k++;
    }
    console.dir(cardEl);


    // clone a DIV for the movie info container
    var movieEl = newMovie.cloneNode();

    // clone an H3 for the movie title
    var posterEl = newPoster.cloneNode();
    posterEl.classList.add("poster");
    posterEl.src = "img/sw"+movie.episode_id+".jpg";
    posterEl.style.cssText = "width:5em; height:auto; float:left; margin:0 1rem 1rem 0;";

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
      console.log('i: ', i);
      console.log('j: ', j);

      console.log('films['+i+']characters['+j+']: ', films[i].characters[j]);
      var urlChar = movie.characters[j];
      // console.log('character['+j+']: ', callSwapi("GET", urlChar, renderChar));
      callSwapi("GET", urlChar, function (data) {

        console.log('character: ', data.name);
        var charEl = newLI.cloneNode();
        charEl.classList.add("character");
        charEl.innerHTML = data.name;
        charsEl.appendChild(charEl);

      });

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

/*    var movie = `<div class="flex-item movie">
  <img src="${movie.poster}" alt="${movie.title}">
  <h3>${movie.title}</h3>
  <h4>${movie.director}</h4>
  <ul>
    <li>${movie.characters[0]}</li>
    <li>${movie.characters[1]}</li>
    <li>${movie.characters[2]}</li>
  </ul>
</div>`;*/
    // var card = `<div class="flex-item card flex-container">${movie}</div>`;
  }
  // document.getElementById('favLeast').innerHTML = data.name;

  // for (var i = 0; i < data.length; i++) {
  //   console.log('data[i]: ', data[i]);
  //   films.push(data[i]);
  // }
  // console.log('films: ', films);
  console.groupEnd();
}
