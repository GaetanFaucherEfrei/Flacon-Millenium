
function createSugarDosageForm (fonction, path, id, name, dosage, description) {
  document.getElementById('editorSugarDosageForm').innerHTML = `<div class="form-popup" id="mySugarDosageForm">
      <form class="form-container" >
        <h1>Edit</h1>
        <div class="form-input">
          <label for="name"><b>Name</b></label>
          <input type="text" value="` + name + `" name="name" required="required" />
          <br />
          <label for="dosage"><b>Dosage</b></label>
          <input type="Number" value="` + dosage + `" name="dosage" />
          <br />
          <label for="description"><b>Description</b></label>
          <input type="text" value="` + description + `" name="description" />
        </div>
        <br />
        <button type="button" class="btn" onclick="` + fonction + '(\'' + path + '\',\'' + id + `')">Submit</button> </br>
        <button type="button" class="btn cancel" onclick="closeForm('editorSugarDosageForm')">Cancel</button>
        </form>
      </div>`
}

function postSugarDosageById (path, id) {
  $.ajax({
    type: 'POST',
    url: path,
    data: {
      id: id,
      name: document.querySelectorAll('#mySugarDosageForm > form > div > input[name="name"]')[0].value,
      dosage: document.querySelectorAll('#mySugarDosageForm > form > div > input[name="dosage"]')[0].value,
      description: document.querySelectorAll('#mySugarDosageForm > form > div > input[name="description"]')[0].value
    },
    success: function (answer, status) {
      console.log('success : ' + status)
      closeForm('editorSugarDosageForm')
      window.location.reload()
    },
    error: function (answer, status, error) {
      console.log('success : ' + status)
      window.alert(answer.responseText)
    },
    complete: function (answer, status) {}
  })
}

function patchSugarDosageById (path, id) {
  $.ajax({
    type: 'PATCH',
    url: path,
    data: {
      id: id,
      name: document.querySelectorAll('#mySugarDosageForm > form > div > input[name="name"]')[0].value,
      dosage: document.querySelectorAll('#mySugarDosageForm > form > div > input[name="dosage"]')[0].value,
      description: document.querySelectorAll('#mySugarDosageForm > form > div > input[name="description"]')[0].value
    },
    success: function (answer, status) {
      console.log('success : ' + status)
      console.log('success answer : ' + answer.name)
      closeForm('editorSugarDosageForm')
      window.location.reload()
    },
    error: function (answer, status, error) {
      console.log('Error : ' + error)
      window.alert(answer.responseText)
    },
    complete: function (answer, status) {}
  })
}
