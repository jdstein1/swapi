/* scripts.js */

var crawls = document.getElementById('crawls'), 
  crawlsBars = document.getElementById('crawls_bars'), 
  crawlsLabels = document.getElementById('crawls_labels');

var films = [];

var favMost = "Harry Potter"; // default
var favLeast = "Rupert Grint"; // default

/* Misc Functions */
getSwapi("GET", "people/"+randomVal(1,87), renderFavMost);
// console.log('favMost: ', favMost);

getSwapi("GET", "people/"+randomVal(1,87), renderFavLeast);
// console.log('favLeast: ', favLeast);

getSwapi("GET", "films", renderGraph);
// console.log('films: ', films);

getSwapi("GET", "films", renderCards);
// console.log('films: ', films);

/* UTILITY FUNCTIONS */

function randomVal(min, max) {
  return Math.floor(Math.random() * (max - min) + 1) + min;
}

/* MISC FUNCTIONS */

function renderFavMost (data) {
  console.group('START renderFavMost');
  console.log('data: ', data);
  document.getElementById('favMost').innerHTML += `<h4 class="most">${data.name}</h4>`;
  console.groupEnd();
}

function renderFavLeast (data) {
  console.group('START renderFavLeast');
  console.log('data: ', data);
  document.getElementById('favLeast').innerHTML += `<h4 class="least">${data.name}</h4>`;
  console.groupEnd();
}

function renderGraph (data) {
  console.group('START renderGraph');
  console.log('data: ', data);

  for (var i = 0; i < data.results.length; i++) {

    console.log('data.results['+i+']: ', data.results[i]);

    var label = `<h5 class="flex-item label" id="label${data.results[i].episode_id}" style="width:${(100/data.results.length)}%;">${data.results[i].title}</h5>`;
    console.log('label: ', label);
    crawlsLabels.innerHTML += label;

    var bar = `<div class="flex-item barBox" id="bar${data.results[i].episode_id}" style="width:${(100/data.results.length)}%; height:100%;">
    <div class="flex-item bar" id="bar${data.results[i].episode_id}" style="margin:0 0 0 10%; width:80%; height:${(data.results[i].opening_crawl.length/600)*100}%; background:hsl(
    ${(360/data.results.length)*data.results[i].episode_id}
    ,90%,70%);">${data.results[i].opening_crawl.length}</div>
    </div>`;
    crawlsBars.innerHTML += bar;

  }
  console.groupEnd();
}

function renderCards (data) {
  console.group('START renderCards');
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
  console.groupEnd();
}
