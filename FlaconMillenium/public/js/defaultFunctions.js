function closeForm (id) {
  document.getElementById(id).innerHTML = ''
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
        $('#' + id).remove()
        // window.location.reload()
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

function createForm (path, formId, referenceId, id) {
  var functionName = 'postById'
  if (id) {
    functionName = 'patchById'
  }

  var content = `<div class="form-popup" >
                  <form class="form-container" onsubmit = "event.preventDefault(); myValidation();">
                    <h1>Edit</h1>
                    <div class="form-input">`

  for (let index = 0; index < $('#' + referenceId + ' > td').length; index++) {
    var name = $('#' + referenceId + ' > td:nth-of-type(' + Number(index + 1) + ')').attr('name')
    var type = $('#' + referenceId + ' > td:nth-of-type(' + Number(index + 1) + ')').attr('type')
    var required = $('#' + referenceId + ' > td:nth-of-type(' + Number(index + 1) + ')').attr('required')
    var value = ''

    if (id) {
      value = $('#' + id + ' > td[name=\'' + name + '\']').text()
    }
    content += '<label for="' + name + '"><b>' + capitalizeFirstLetter(name) + `</b></label>
          <input type="` + type + '" value="' + value + '" placeholder="' + name + '" name="' + name + '" required="' + required + `" />
          <br />`
  }
  content += `</div>
              <br />
              <button type="submit" class="btn" onclick="` + functionName + '(\'' + path + '\', \'' + formId + '\', \'' + referenceId + '\',\'' + id + `')" >Submit</button> </br>
              <button type="button" class="btn cancel" onclick="closeForm('` + formId + `')" >Cancel</button>
              </form>
            </div>`

  document.getElementById(formId).innerHTML = content
}

function postById (path, formId, referenceId, id) {
  var data = { id: id }
  for (let index = 1; index <= $('#' + referenceId + ' > td').length; index++) {
    var name = $('#' + referenceId + ' > td:nth-of-type(' + Number(index) + ')').attr('name')
    var content = $('#' + formId + ' > div.form-popup > form > div > input[name=\'' + name + '\']')[0].value
    data[name] = content
  }
  $.ajax({
    type: 'POST',
    url: path,
    data: data,
    success: function (answer, status) {
      console.log('success : ' + status)
      closeForm(formId)
      console.log('answer id : ' + answer._id)
      var newContent = '<tr id="' + answer._id + '">'

      for (let index = 1; index <= $('#' + referenceId + ' > td').length; index++) {
        var name = Object.keys(data)[index]
        newContent += '<td name="' + name + '">' + answer[name] + '</td>'
      }
      newContent += '<td><a href="' + path + '?id=' + answer._id + '">Detail</a></td>'
      newContent += '<td><button type="button" class="open-button" onclick="createForm(\'' + path + '\', \'' + formId + '\', \'' + referenceId + '\', \'' + answer._id + '\')">Edit</button></td>'

      newContent += '<td><button type="button" onclick="deleteById(\'' + path + '\',\'' + answer._id + '\')">Delete</button></td>'
      newContent += '</tr>'

      $('#' + referenceId + '').after(newContent)
      // window.location.reload()
    },
    error: function (answer, status, error) {
      console.log('success : ' + status)
      window.alert(answer.responseText)
    },
    complete: function (answer, status) {}
  })
}

function patchById (path, formId, referenceId, id) {
  var data = { id: id }

  // console.log('length : ' + $('#' + referenceId + ' > td').length)
  for (let index = 1; index <= $('#' + referenceId + ' > td').length; index++) {
    var name = $('#' + referenceId + ' > td:nth-of-type(' + Number(index) + ')').attr('name')
    var content = $('#' + formId + ' > div.form-popup > form > div > input[name=\'' + name + '\']')[0].value
    // console.log('name : ' + name)
    // console.log('content : ' + content)
    // console.log('index : ' + index)
    data[name] = content
  }
  $.ajax({
    type: 'PATCH',
    url: path,
    data: data,
    success: function (answer, status) {
      closeForm(formId)

      for (let index = 1; index <= $('#' + referenceId + ' > td').length; index++) {
        var name = Object.keys(data)[index]
        // console.log('name : ' + name)
        // console.log('index : ' + index)
        // console.log('answer : ' + answer[name])
        $('#' + id + ' > td[name=\'' + name + '\']').html(answer[name])
      }
      // window.location.reload()
    },
    error: function (answer, status, error) {
      console.log('Error : ' + error)
      window.alert(answer.responseText)
    },
    complete: function (answer, status) {}
  })
}

function capitalizeFirstLetter (word) {
  return word[0].toUpperCase() + word.slice(1)
}
