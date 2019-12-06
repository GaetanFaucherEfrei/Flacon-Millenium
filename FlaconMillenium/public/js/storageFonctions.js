
function createForm (fonction, path, id, location, name, nbLigne, nbColone, nbPlace, description) {
  document.getElementById('editorForm').innerHTML = '<div class="form-popup" id="myForm">' +
      '<form class="form-container" >' +
      '  <h1>Edit</h1>' +
      '  <div class="form-input">' +
      '    <label for="location"><b>Location</b></label>' +
      '    <input type="text" value="' + location + '" name="location" required="required" />' +
      '    <br />' +
      '    <label for="name"><b>Name</b></label>' +
      '    <input type="text" value="' + name + '" name="name" required="required" />' +
      '    <br />' +
      '    <label for="nbLigne"><b>Number of ligne</b></label>' +
      '    <input type="number" value="' + nbLigne + '" name="nbLigne" required="required" />' +
      '    <br />' +
      '    <label for="nbColone"><b>Number of colone</b></label>' +
      '    <input type="number" value="' + nbColone + '" name="nbColone" required="required" />' +
      '    <br />' +
      '    <label for="nbPlace"><b>Number of place by unit</b></label>' +
      '    <input type="number" value="' + nbPlace + '" name="nbPlace" required="required" />' +
      '    <br />' +
      '    <label for="description"><b>Description</b></label>' +
      '    <input type="text" value="' + description + '" name="description" />' +
      '  </div>' +
      '  <br />' +
      '  <button type="button" class="btn" onclick="' + fonction + '(\'' + path + '\',\'' + id + '\')">Submit</button> </br>' +
      '  <button type="button" class="btn cancel" onclick="closeForm(\'editorForm\')">Cancel</button>' +
      '  </form>' +
      '</div>'
}

function closeForm (id) {
  document.getElementById(id).innerHTML = ''
}

function postById (path, id) {
  $.ajax({
    type: 'POST',
    url: path,
    data: {
      id: id,
      location: document.querySelectorAll('.form-container input[name="location"]')[0].value,
      name: document.querySelectorAll('.form-container input[name="name"]')[0].value,
      nbLigne: document.querySelectorAll('.form-container input[name="nbLigne"]')[0].value,
      nbColone: document.querySelectorAll('.form-container input[name="nbColone"]')[0].value,
      nbPlace: document.querySelectorAll('.form-container input[name="nbPlace"]')[0].value,
      description: document.querySelectorAll('.form-container input[name="description"]')[0].value
    },
    success: function (answer, status) {
      console.log('success : ' + status)
      closeForm('editorForm')
      window.location.reload()
    },
    error: function (answer, status, error) {
      console.log('success : ' + status)
      window.alert(answer.responseText)
    },
    complete: function (answer, status) {}
  })
}

function patchById (path, id) {
  $.ajax({
    type: 'PATCH',
    url: path,
    data: {
      id: id,
      location: document.querySelectorAll('.form-container input[name="location"]')[0].value,
      name: document.querySelectorAll('.form-container input[name="name"]')[0].value,
      nbLigne: document.querySelectorAll('.form-container input[name="nbLigne"]')[0].value,
      nbColone: document.querySelectorAll('.form-container input[name="nbColone"]')[0].value,
      nbPlace: document.querySelectorAll('.form-container input[name="nbPlace"]')[0].value,
      description: document.querySelectorAll('.form-container input[name="description"]')[0].value
    },
    success: function (answer, status) {
      console.log('success : ' + status)
      console.log('success answer : ' + answer.name)
      closeForm('editorForm')
      window.location.reload()
    },
    error: function (answer, status, error) {
      console.log('Error : ' + error)
      window.alert(answer.responseText)
    },
    complete: function (answer, status) {}
  })
}

function deleteById (path, id) {
  var answer = window.confirm('Are you sure you want to delete ?')
  if (answer === true) {
    $.ajax({
      type: 'DELETE',
      url: path,
      data: {
        id: id
      },
      success: function (answer, status) {
        console.log('success : ' + status)
        window.alert('The operation was succesfull.')
        window.location.replace('/storage/list')
      },
      error: function (answer, status, error) {
        console.log('success : ' + status)
        window.alert(answer.responseText)
      },
      complete: function (answer, status) {}
    })
  }
}

// exemple :
// <button type="button" onclick="getById('/storage/unit','id')">details</button>
function getById (path, id) {
  $.ajax({
    type: 'GET',
    contentType: 'application/json',
    dataType: 'json',
    url: path,
    data: {
      id: id
    },
    success: function (answer, status) {
      console.log('success : ' + status)
    },
    error: function (answer, status, error) {
      console.log('success : ' + status)
      window.alert(answer.responseText)
    },
    complete: function (answer, status) {}
  })
}

function capitalizeFirstLetter (word) {
  return word[0].toUpperCase() + word.slice(1)
}
