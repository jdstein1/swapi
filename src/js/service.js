/* service.js */

function callSwapi (methodType, url) {
  console.group('START callSwapi: ', url);
  var promiseObj = new Promise(function(resolve, reject){

    var data;

    var xhr = new XMLHttpRequest();

    // console.log('xhr: ', xhr);

    xhr.open(methodType, url, true);

    // console.log('url: ', url);

    xhr.send(null);

    xhr.onreadystatechange = function() {
      // console.log('xhr.readyState: ', xhr.readyState);
      // console.log('xhr.status: ', xhr.status);
      if (xhr.readyState === 1) {
        // console.log('OPENED: ', xhr.readyState);
      } else if (xhr.readyState === 2) {
        // console.log('HEADERS_RECEIVED: ', xhr.readyState);
      } else if (xhr.readyState === 3) {
        // console.log('LOADING: ', xhr.readyState);
      } else if (xhr.readyState === 4) {
        // console.log('DONE: ', xhr.readyState);
        if (xhr.status === 200) {
          console.log('async success!');
          data = JSON.parse(xhr.response);
          console.log('async data: ', data);
          resolve(data);
        } else {
          console.error('async error processing request: ', xhr.status);
          reject(xhr.status);
        }
      } else {
        // console.log('UNSENT: ', xhr.readyState);
      }
      // console.groupEnd();
    }
  });

  console.groupEnd();

  return promiseObj;

}