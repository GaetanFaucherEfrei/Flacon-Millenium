
function createDesignationForm (fonction, path, id, name, description) {
  document.getElementById('editorDesignationForm').innerHTML = `<div class="form-popup" id="myDesignationForm">
      <form class="form-container" >
        <h1>Edit</h1>
        <div class="form-input">
          <label for="name"><b>Name</b></label>
          <input type="text" value="' + name + '" name="name" required="required" />
          <br />
          <label for="description"><b>Description</b></label>' +
          <input type="text" value="' + description + '" name="description" />
        </div>
        <br />
        <button type="button" class="btn" onclick="' + fonction + '(' + path + ',' + id + ')">Submit</button> </br>
        <button type="button" class="btn cancel" onclick="closeForm(editorDesignationForm)">Cancel</button>
        </form>
      </div>`
}

function postDesignationById (path, id) {
  $.ajax({
    type: 'POST',
    url: path,
    data: {
      id: id,
      name: document.querySelectorAll('#myDesignationForm > form > div > input[name="name"]')[0].value,
      description: document.querySelectorAll('#myDesignationForm > form > div > input[name="description"]')[0].value
    },
    success: function (answer, status) {
      console.log('success : ' + status)
      closeForm('editorDesignationForm')
      window.location.reload()
    },
    error: function (answer, status, error) {
      console.log('success : ' + status)
      window.alert(answer.responseText)
    },
    complete: function (answer, status) {}
  })
}

function patchDesignationById (path, id) {
  $.ajax({
    type: 'PATCH',
    url: path,
    data: {
      id: id,
      name: document.querySelectorAll('#myDesignationForm > form > div > input[name="name"]')[0].value,
      description: document.querySelectorAll('#myDesignationForm > form > div > input[name="description"]')[0].value
    },
    success: function (answer, status) {
      console.log('success : ' + status)
      console.log('success answer : ' + answer.name)
      closeForm('editorDesignationForm')
      window.location.reload()
    },
    error: function (answer, status, error) {
      console.log('Error : ' + error)
      window.alert(answer.responseText)
    },
    complete: function (answer, status) {}
  })
}
