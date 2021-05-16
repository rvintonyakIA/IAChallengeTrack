exports.setInputValue = function (params) {
  // console.log(params.elementId, params.text)
  var emailElement = document.getElementById(params.elementId);
  emailElement.value = params.text
}
