/* service.js */

function callSwapi (methodType, url, callback) {
  console.group('START callSwapi: ', url);

  var data;

  var xhr = new XMLHttpRequest();
  console.log('xhr: ', xhr);

  xhr.open(methodType, url, true);

  xhr.onreadystatechange = function() {
    // console.log('xhr.readyState: ', xhr.readyState);
    // console.log('xhr.status: ', xhr.status);
    if (xhr.readyState === 1) {
      // console.log('OPENED: ', xhr.readyState);
    } else if (xhr.readyState === 2) {
      // console.log('HEADERS_RECEIVED: ', xhr.readyState);
    } else if (xhr.readyState === 3) {
      // console.log('LOADING: ', xhr.readyState);
    } else if (xhr.readyState === 4 && xhr.status === 200) {
      // console.log('DONE: ', xhr.readyState);
      data = JSON.parse(xhr.response);
      // console.log('data: ', data);
      callback(data);
    } else {
      // console.log('UNSENT: ', xhr.readyState);
    }
    // console.groupEnd();
  }

  console.log('url: ', url);
  xhr.send(null);

  console.groupEnd();

}