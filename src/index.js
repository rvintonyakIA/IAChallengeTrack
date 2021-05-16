require("regenerator-runtime");
const phantom = require('phantom');

var login = require('./logIn');
var CREDS = require('./constants');
const {addPageListeners} = require("./pageListeners");

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function sleep(fn, ...args) {
  console.log('BEFORE timeout')
  await timeout(10000);
  console.log('AFTER timeout')
  return fn(...args);
}

(async function() {
  const instance = await phantom.create();
  const page = await instance.createPage();
  page.navigationLocked = false
  await addPageListeners(page)

  await page.open('https://www.strava.com/login');
  await page.evaluate(login.setInputValue, {elementId: 'email', text: CREDS.user});
  await page.evaluate(login.setInputValue, {elementId: 'password', text: CREDS.password});
  await page.evaluate(() => {
    document.getElementById('login-button').click()
  });


  async function makeRequest() {
    await page.render('afterLogin.png')

    const sessionStatus = await page.open('https://www.strava.com/athletes/41352944#interval?interval=202117&interval_type=week&chart_type=miles&year_offset=0');
    console.log('***********************************', sessionStatus);

    await page.render('example.png')
    await instance.exit();
  }

  await sleep(makeRequest);
}());
