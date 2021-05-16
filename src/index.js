var page = require('webpage').create()
var login = require('./logIn');
var CREDS = require('./constants');

var loadInProgress = false;
page.onConsoleMessage = function(msg) {
  console.log(msg);
};

page.onAlert = function(msg) {
  console.log('alert!!> ' + msg);
};

page.onLoadStarted = function() {
  loadInProgress = true;
  console.log("load started");
};

page.onLoadFinished = function(status) {
  loadInProgress = false;
  if (status !== 'success') {
    console.log('Unable to access network');
    phantom.exit();
  } else {
    console.log("load finished", page.url);
  }
};

// module.exports.tryToLogIn = function () {
  page.open('https://www.strava.com/login', function (status) {
    if (status !== 'success') {
      console.log('Couldn\'t load login page')
    }

    page.evaluate(login.setInputValue, {elementId: 'email', text: CREDS.user});
    page.evaluate(login.setInputValue, {elementId: 'password', text: CREDS.password});

    page.evaluate(function() {
      var loginButton = document.getElementById('login-button');
      console.log(loginButton.id, loginButton.innerText)
      loginButton.click()
    });

    window.setTimeout(function () {
      console.log(page.url);
      page.render('afterclick.png');
      phantom.exit();
    }, 10000);
    // console.log('element is ' + logInButton.id, logInButton.offsetLeft, logInButton.offsetTop);

    page.render('example.png')
    // phantom.exit()
  })
// }
