
function createStorageForm (fonction, path, id, location, name, nbLigne, nbColone, nbPlace, description) {
  document.getElementById('editorStorageForm').innerHTML = `<div class="form-popup" id="myStorageForm">
      <form class="form-container" >
        <h1>Edit</h1>
        <div class="form-input">
          <label for="location"><b>Location</b></label>
          <input type="text" value="' + location + '" name="location" required="required" />
          <br />
          <label for="name"><b>Name</b></label>
          <input type="text" value="' + name + '" name="name" required="required" />
          <br />
          <label for="nbLigne"><b>Number of ligne</b></label>
          <input type="number" value="' + nbLigne + '" name="nbLigne" required="required" />
          <br />
          <label for="nbColone"><b>Number of colone</b></label>
          <input type="number" value="' + nbColone + '" name="nbColone" required="required" />
          <br />
          <label for="nbPlace"><b>Number of place by unit</b></label>
          <input type="number" value="' + nbPlace + '" name="nbPlace" required="required" />
          <br />
          <label for="description"><b>Description</b></label>
          <input type="text" value="' + description + '" name="description" />
        </div>
        <br />
        <button type="button" class="btn" onclick="' + fonction + '(' + path + ',' + id + ')">Submit</button> </br>
        <button type="button" class="btn cancel" onclick="closeForm(editorStorageForm)">Cancel</button>
        </form>
      </div>`
}

function postStorageById (path, id) {
  console.log('test')
  $.ajax({
    type: 'POST',
    url: path,
    data: {
      id: id,
      location: document.querySelectorAll('#myStorageForm > form > div > input[name="location"]')[0].value,
      name: document.querySelectorAll('#myStorageForm > form > div > input[name="name"]')[0].value,
      nbLigne: document.querySelectorAll('#myStorageForm > form > div > input[name="nbLigne"]')[0].value,
      nbColone: document.querySelectorAll('#myStorageForm > form > div > input[name="nbColone"]')[0].value,
      nbPlace: document.querySelectorAll('#myStorageForm > form > div > input[name="nbPlace"]')[0].value,
      description: document.querySelectorAll('#myStorageForm > form > div > input[name="description"]')[0].value
    },
    success: function (answer, status) {
      console.log('success : ' + status)
      closeForm('editorStorageForm')
      window.location.reload()
    },
    error: function (answer, status, error) {
      console.log('success : ' + status)
      window.alert(answer.responseText)
    },
    complete: function (answer, status) {}
  })
}

function patchStorageById (path, id) {
  $.ajax({
    type: 'PATCH',
    url: path,
    data: {
      id: id,
      location: document.querySelectorAll('#myStorageForm > form > div > input[name="location"]')[0].value,
      name: document.querySelectorAll('#myStorageForm > form > div > input[name="name"]')[0].value,
      nbLigne: document.querySelectorAll('#myStorageForm > form > div > input[name="nbLigne"]')[0].value,
      nbColone: document.querySelectorAll('#myStorageForm > form > div > input[name="nbColone"]')[0].value,
      nbPlace: document.querySelectorAll('#myStorageForm > form > div > input[name="nbPlace"]')[0].value,
      description: document.querySelectorAll('#myStorageForm > form > div > input[name="description"]')[0].value
    },
    success: function (answer, status) {
      console.log('success : ' + status)
      console.log('success answer : ' + answer.name)
      closeForm('editorStorageForm')
      window.location.reload()
    },
    error: function (answer, status, error) {
      console.log('Error : ' + error)
      window.alert(answer.responseText)
    },
    complete: function (answer, status) {}
  })
}
