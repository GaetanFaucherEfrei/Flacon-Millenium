
function createSizeForm (fonction, path, id, name, size, description) {
  document.getElementById('editorSizeForm').innerHTML = `<div class="form-popup" id="mySizeForm">
      <form class="form-container" >
        <h1>Edit</h1>
        <div class="form-input">
          <label for="name"><b>Name</b></label>
          <input type="text" value="' + name + '" name="name" required="required" />
          <br />
          <label for="size"><b>Size</b></label>
          <input type="Number" value="' + size + '" name="size" />
          <br />
          <label for="description"><b>Description</b></label>
          <input type="text" value="' + description + '" name="description" />
        </div>
        <br />
        <button type="button" class="btn" onclick="' + fonction + '(' + path + ',' + id + ')">Submit</button> </br>
        <button type="button" class="btn cancel" onclick="closeForm(editorSizeForm)">Cancel</button>
        </form>
      </div>`
}

function postSizeById (path, id) {
  $.ajax({
    type: 'POST',
    url: path,
    data: {
      id: id,
      name: document.querySelectorAll('#mySizeForm > form > div > input[name="name"]')[0].value,
      size: document.querySelectorAll('#mySizeForm > form > div > input[name="size"]')[0].value,
      description: document.querySelectorAll('#mySizeForm > form > div > input[name="description"]')[0].value
    },
    success: function (answer, status) {
      console.log('success : ' + status)
      closeForm('editorSizeForm')
      window.location.reload()
    },
    error: function (answer, status, error) {
      console.log('success : ' + status)
      window.alert(answer.responseText)
    },
    complete: function (answer, status) {}
  })
}

function patchSizeById (path, id) {
  $.ajax({
    type: 'PATCH',
    url: path,
    data: {
      id: id,
      name: document.querySelectorAll('#mySizeForm > form > div > input[name="name"]')[0].value,
      size: document.querySelectorAll('#mySizeForm > form > div > input[name="size"]')[0].value,
      description: document.querySelectorAll('#mySizeForm > form > div > input[name="description"]')[0].value
    },
    success: function (answer, status) {
      console.log('success : ' + status)
      console.log('success answer : ' + answer.name)
      closeForm('editorSizeForm')
      window.location.reload()
    },
    error: function (answer, status, error) {
      console.log('Error : ' + error)
      window.alert(answer.responseText)
    },
    complete: function (answer, status) {}
  })
}
