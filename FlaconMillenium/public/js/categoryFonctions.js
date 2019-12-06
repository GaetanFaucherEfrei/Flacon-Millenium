
function createForm (fonction, path, id, name, description) {
  document.getElementById('editorForm').innerHTML = '<div class="form-popup" id="myForm">' +
      '<form class="form-container" >' +
      '  <h1>Edit</h1>' +
      '  <div class="form-input">' +
      '    <label for="name"><b>Name</b></label>' +
      '    <input type="text" value="' + name + '" name="name" required="required" />' +
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
      name: document.querySelectorAll('.form-container input[name="name"]')[0].value,
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
      name: document.querySelectorAll('.form-container input[name="name"]')[0].value,
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
        window.location.replace('/category/list')
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
// <button type="button" onclick="getById('/category/unit','id')">details</button>
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
