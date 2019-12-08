function createCepageForm (fonction, path, id, name, type, region, country, climate, description) {
  document.getElementById('editorCepageForm').innerHTML = '<div class="form-popup" id="myCepageForm">' +
      '<form class="form-container" >' +
      '  <h1>Edit</h1>' +
      '  <div class="form-input">' +
      '    <label for="name"><b>Name</b></label>' +
      '    <input type="text" value="' + name + '" name="name" required="required" />' +
      '    <br />' +
      '    <label for="type"><b>Type</b></label>' +
      '    <input type="text" value="' + type + '" name="type" />' +
      '    <br />' +
      '    <label for="region"><b>Region</b></label>' +
      '    <input type="text" value="' + region + '" name="region" />' +
      '    <br />' +
      '    <label for="country"><b>Country</b></label>' +
      '    <input type="text" value="' + country + '" name="country" />' +
      '    <br />' +
      '    <label for="climate"><b>Climate</b></label>' +
      '    <input type="text" value="' + climate + '" name="climate" />' +
      '    <br />' +
      '    <label for="description"><b>Description</b></label>' +
      '    <input type="text" value="' + description + '" name="description" />' +
      '  </div>' +
      '  <br />' +
      '  <button type="button" class="btn" onclick="' + fonction + '(\'' + path + '\',\'' + id + '\')">Submit</button> </br>' +
      '  <button type="button" class="btn cancel" onclick="closeForm(\'editorCepageForm\')">Cancel</button>' +
      '  </form>' +
      '</div>'
}

function postCepageById (path, id) {
  $.ajax({
    type: 'POST',
    url: path,
    data: {
      id: id,
      name: document.querySelectorAll('#myCepageForm > form > div > input[name="name"]')[0].value,
      type: document.querySelectorAll('#myCepageForm > form > div > input[name="type"]')[0].value,
      region: document.querySelectorAll('#myCepageForm > form > div > input[name="region"]')[0].value,
      country: document.querySelectorAll('#myCepageForm > form > div > input[name="country"]')[0].value,
      climate: document.querySelectorAll('#myCepageForm > form > div > input[name="climate"]')[0].value,
      description: document.querySelectorAll('#myCepageForm > form > div > input[name="description"]')[0].value
    },
    success: function (answer, status) {
      console.log('success : ' + status)
      closeForm('editorCepageForm')
      window.location.reload()
    },
    error: function (answer, status, error) {
      console.log('success : ' + status)
      window.alert(answer.responseText)
    },
    complete: function (answer, status) {}
  })
}

function patchCepageById (path, id) {
  $.ajax({
    type: 'PATCH',
    url: path,
    data: {
      id: id,
      name: document.querySelectorAll('#myCepageForm > form > div > input[name="name"]')[0].value,
      type: document.querySelectorAll('#myCepageForm > form > div > input[name="type"]')[0].value,
      region: document.querySelectorAll('#myCepageForm > form > div > input[name="region"]')[0].value,
      country: document.querySelectorAll('#myCepageForm > form > div > input[name="country"]')[0].value,
      climate: document.querySelectorAll('#myCepageForm > form > div > input[name="climate"]')[0].value,
      description: document.querySelectorAll('#myCepageForm > form > div > input[name="description"]')[0].value
    },
    success: function (answer, status) {
      console.log('success : ' + status)
      console.log('success answer : ' + answer.name)
      closeForm('editorCepageForm')
      window.location.reload()
    },
    error: function (answer, status, error) {
      console.log('Error : ' + error)
      window.alert(answer.responseText)
    },
    complete: function (answer, status) {}
  })
}
