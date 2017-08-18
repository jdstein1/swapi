/* service.js */

function getSwapi (methodType, url, callback) {
  console.group('START getSwapi: ', url);

  var data;
  var api = swapiRoot+url;

  var xhr = new XMLHttpRequest();
  console.log('xhr: ', xhr);

  // xhr.addEventListener("progress", updateProgress);
  // xhr.addEventListener("load", transferComplete);
  // xhr.addEventListener("error", transferFailed);
  // xhr.addEventListener("abort", transferCanceled);

  xhr.open(methodType, api, true);
  xhr.onreadystatechange = function() {
    // console.log('xhr.readyState: ', xhr.readyState);
    // console.log('xhr.status: ', xhr.status);
      if (xhr.readyState === 1) {
        console.log('OPENED');
      } else if (xhr.readyState === 2) {
        console.log('HEADERS_RECEIVED');
      } else if (xhr.readyState === 3) {
        console.log('LOADING');
      } else if (xhr.readyState === 4 && xhr.status === 200) {
        console.log('DONE');
        data = JSON.parse(xhr.response);
        // console.log('data: ', data);
        callback(data);
      } else {
        console.log('UNSENT');
      }
      // console.groupEnd();
  }

  // console.log('api: ', api);
  xhr.send(null);

  console.groupEnd();

}

  /* XHR Listener Event Functions */

  // progress on transfers from the server to the client (downloads)
  function updateProgress (event) {
    console.log('updateProgress event.type: ', event.type);
    if (event.lengthComputable) {
      var percentComplete = event.loaded / event.total;
      // ...
    } else {
      // Unable to compute progress information since the total size is unknown
    }
  }

  function transferComplete(event) {
    console.log('transferComplete event.type: ', event.type);
    console.log("The transfer is complete.");

    // console.log('response: ', response);
    // console.log('transferComplete event.target: ', event.target);
    // console.log('transferComplete event.target.response: ', event.target.response);
    // console.log('transferComplete event.target.response.results: ', event.target.response.results);
    data = JSON.parse(event.target.response);
    console.log('data: ', data);
    return data;
    
  }

  function transferFailed(event) {
    console.log('transferFailed event.type: ', event.type);
    console.log("An error occurred while transferring the file.");
  }

  function transferCanceled(event) {
    console.log('transferCanceled event.type: ', event.type);
    console.log("The transfer has been canceled by the user.");
  }
