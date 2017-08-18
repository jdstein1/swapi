/* scripts.js */

var newDL = document.createElement('dl'),
  newDT = document.createElement('dt'),
  newDD = document.createElement('dd');

var crawls = document.getElementById('crawls');

var films = [];

var favMost = "Harry Potter"; // default
var favLeast = "Rupert Grint"; // default


/* Misc Functions */
getSwapi("GET", "people/23", renderFavMost);
// console.log('favMost: ', favMost);

getSwapi("GET", "people/58", renderFavLeast);
// console.log('favLeast: ', favLeast);

getSwapi("GET", "films", renderGraph);
// console.log('films: ', films);

getSwapi("GET", "films", renderCards);
// console.log('films: ', films);




/* Misc Functions */

function renderFavMost (data) {
  console.log('data: ', data);
  document.getElementById('favMost').innerHTML = data.name;
}

function renderFavLeast (data) {
  console.log('data: ', data);
  document.getElementById('favLeast').innerHTML = data.name;
}

function renderGraph (data) {
  console.log('data: ', data);

  for (var i = 0; i < data.results.length; i++) {
    var dt = newDT.cloneNode();
    // console.log('data.results[i].title: ', data.results[i].title);
    dt.innerHTML = data.results[i].title;
    // console.log('data.results[i].opening_crawl: ', data.results[i].opening_crawl);
    var dd = newDD.cloneNode();
    // console.log('data.results[i].opening_crawl.length: ', data.results[i].opening_crawl.length);
    dd.innerHTML = data.results[i].opening_crawl.length;
    dt.appendChild(dd);
    crawls.appendChild(dt);
  }
}

function renderCards (data) {
  console.log('data: ', data);

  for (var i = 0; i < data.results.length; i++) {
    console.log('data.results[i]: ', data.results[i]);
  }
  // document.getElementById('favLeast').innerHTML = data.name;

  // for (var i = 0; i < data.length; i++) {
  //   console.log('data[i]: ', data[i]);
  //   films.push(data[i]);
  // }
  // console.log('films: ', films);

}