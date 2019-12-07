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
        window.location.reload()
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
