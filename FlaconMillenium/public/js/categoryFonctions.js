
function createCategoryForm (fonction, path, id, name, description) {
  document.getElementById('editorCategoryForm').innerHTML = `<div class="form-popup" id="myCategoryForm">
      <form class="form-container" >
        <h1>Edit</h1>
        <div class="form-input">
          <label for="name"><b>Name</b></label>
          <input type="text" value="` + name + `" name="name" required="required" />
          <br />
          <label for="description"><b>Description</b></label>
          <input type="text" value="` + description + `" name="description" />
        </div>
        <br />
        <button type="button" class="btn" onclick="` + fonction + `('` + path + `','` + id + `')">Submit</button> </br>
        <button type="button" class="btn cancel" onclick="closeForm('editorCategoryForm')">Cancel</button>
        </form>
      </div>`
}

function postCategoryById (path, id) {
  $.ajax({
    type: 'POST',
    url: path,
    data: {
      id: id,
      name: document.querySelectorAll('#myCategoryForm > form > div > input[name="name"]')[0].value,
      description: document.querySelectorAll('#myCategoryForm > form > div > input[name="description"]')[0].value
    },
    success: function (answer, status) {
      console.log('success : ' + status)
      closeForm('editorCategoryForm')
      window.location.reload()
    },
    error: function (answer, status, error) {
      console.log('success : ' + status)
      window.alert(answer.responseText)
    },
    complete: function (answer, status) {}
  })
}

function patchCategoryById (path, id) {
  $.ajax({
    type: 'PATCH',
    url: path,
    data: {
      id: id,
      name: document.querySelectorAll('#myCategoryForm > form > div > input[name="name"]')[0].value,
      description: document.querySelectorAll('#myCategoryForm > form > div > input[name="description"]')[0].value
    },
    success: function (answer, status) {
      console.log('success : ' + status)
      console.log('success answer : ' + answer.name)
      closeForm('editorCategoryForm')
      window.location.reload()
    },
    error: function (answer, status, error) {
      console.log('Error : ' + error)
      window.alert(answer.responseText)
    },
    complete: function (answer, status) {}
  })
}
