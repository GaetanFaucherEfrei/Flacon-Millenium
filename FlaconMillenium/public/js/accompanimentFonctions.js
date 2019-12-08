
function createAccompanimentForm (fonction, path, id, dishType, description) {
  document.getElementById('editorAccompanimentForm').innerHTML = `<div class="form-popup" id="myAccompanimentForm">
      <form class="form-container" >
        <h1>Edit</h1>
        <div class="form-input">
          <label for="dishType"><b>DishType</b></label>
          <input type="text" value="' + dishType + '" name="dishType" required="required" />
          <br />
          <label for="description"><b>Description</b></label>
          <input type="text" value="' + description + '" name="description" />
        </div>
        <br />
        <button type="button" class="btn" onclick="' + fonction + '(' + path + ',' + id + ')">Submit</button> </br>
        <button type="button" class="btn cancel" onclick="closeForm(editorAccompanimentForm)">Cancel</button>
        </form>
      </div>``
}

function postAccompanimentById (path, id) {
  $.ajax({
    type: 'POST',
    url: path,
    data: {
      id: id,
      dishType: document.querySelectorAll('#myAccompanimentForm > form > div > input[name="dishType"]')[0].value,
      description: document.querySelectorAll('#myAccompanimentForm > form > div > input[name="description"]')[0].value
    },
    success: function (answer, status) {
      console.log('success : ' + status)
      closeForm('editorAccompanimentForm')
      window.location.reload()
    },
    error: function (answer, status, error) {
      console.log('success : ' + status)
      window.alert(answer.responseText)
    },
    complete: function (answer, status) {}
  })
}

function patchAccompanimentById (path, id) {
  $.ajax({
    type: 'PATCH',
    url: path,
    data: {
      id: id,
      dishType: document.querySelectorAll('#myAccompanimentForm > form > div > input[name="dishType"]')[0].value,
      description: document.querySelectorAll('#myAccompanimentForm > form > div > input[name="description"]')[0].value
    },
    success: function (answer, status) {
      console.log('success : ' + status)
      console.log('success answer : ' + answer.name)
      closeForm('editorAccompanimentForm')
      window.location.reload()
    },
    error: function (answer, status, error) {
      console.log('Error : ' + error)
      window.alert(answer.responseText)
    },
    complete: function (answer, status) {}
  })
}
