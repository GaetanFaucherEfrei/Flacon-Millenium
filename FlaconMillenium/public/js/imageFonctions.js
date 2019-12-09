
function createImageForm (fonction, path, id, accessPath) {
  document.getElementById('editorImageForm').innerHTML = `<div class="form-popup" id="myImageForm">
      <form class="form-container" >
        <h1>Edit</h1>
        <div class="form-input">
          <label for="accessPath"><b>AccessPath</b></label>
          <input type="text" value="` + accessPath + `" name="accessPath" />
        </div>
        <br />
        <button type="button" class="btn" onclick="` + fonction + `('` + path + `','` + id + `')">Submit</button> </br>
        <button type="button" class="btn cancel" onclick="closeForm('editorImageForm')">Cancel</button>
        </form>
      </div>`
}

function postImageById (path, id) {
  $.ajax({
    type: 'POST',
    url: path,
    data: {
      id: id,
      accessPath: document.querySelectorAll('#myImageForm > form > div > input[name="accessPath"]')[0].value
    },
    success: function (answer, status) {
      console.log('success : ' + status)
      closeForm('editorImageForm')
      window.location.reload()
    },
    error: function (answer, status, error) {
      console.log('success : ' + status)
      window.alert(answer.responseText)
    },
    complete: function (answer, status) {}
  })
}

function patchImageById (path, id) {
  $.ajax({
    type: 'PATCH',
    url: path,
    data: {
      id: id,
      accessPath: document.querySelectorAll('#myImageForm > form > div > input[name="accessPath"]')[0].value
    },
    success: function (answer, status) {
      console.log('success : ' + status)
      console.log('success answer : ' + answer.name)
      closeForm('editorImageForm')
      window.location.reload()
    },
    error: function (answer, status, error) {
      console.log('Error : ' + error)
      window.alert(answer.responseText)
    },
    complete: function (answer, status) {}
  })
}
