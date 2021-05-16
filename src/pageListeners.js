module.exports.addPageListeners = async (page) => {
  await page.on("onResourceRequested", function(requestData) {
    console.info('Requesting', requestData.url)
  });
  await page.on('onConsoleMessage', function(msg) {
    console.log(msg);
  })

  let loadInProgress = false;
// page.onAlert = function(msg) {
//   console.log('alert!!> ' + msg);
// };

  await page.on('onLoadStarted', function() {
    loadInProgress = true;
    console.log("load started");
  })

  await page.on('onLoadFinished', function(status) {
    loadInProgress = false;
    if (status !== 'success') {
      console.log('Unable to access network', status);
      // instance.exit();
    } else {
      console.log("load finished");
    }
  })
}
