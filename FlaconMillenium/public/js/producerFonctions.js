function createProducerForm (fonction, path, id, name, address, region, country, comment, phone, email, website) {
  document.getElementById('editorProducerForm').innerHTML = `<div class="form-popup" id="myProducerForm">
      <form class="form-container" >
        <h1>Edit</h1>
        <div class="form-input">
          <label for="name"><b>Name</b></label>
          <input type="text" value="` + name + `" name="name" required="required" />
          <br />
          <label for="address"><b>Address</b></label>
          <input type="text" value="` + address + `" name="address" />
          <br />
          <label for="region"><b>Region</b></label>
          <input type="text" value="` + region + `" name="region" />
          <br />
          <label for="country"><b>Country</b></label>
          <input type="text" value="` + country + `" name="country" />
          <br />
          <label for="comment"><b>Comment</b></label>
          <input type="text" value="` + comment + `" name="comment" />
          <br />
          <label for="phone"><b>Phone</b></label>
          <input type="number" value="` + phone + `" name="phone" />
          <br />
          <label for="email"><b>Email</b></label>
          <input type="text" value="` + email + `" name="email" />
          <br />
          <label for="website"><b>Website</b></label>
          <input type="text" value="` + website + `" name="website" />
        </div>
        <br />
        <button type="button" class="btn" onclick="` + fonction + '(\'' + path + '\',\'' + id + `')">Submit</button> </br>
        <button type="button" class="btn cancel" onclick="closeForm('editorProducerForm')">Cancel</button>
        </form>
      </div>`
}

function postProducerById (path, id) {
  $.ajax({
    type: 'POST',
    url: path,
    data: {
      id: id,
      name: document.querySelectorAll('#myProducerForm > form > div > input[name="name"]')[0].value,
      address: document.querySelectorAll('#myProducerForm > form > div > input[name="address"]')[0].value,
      region: document.querySelectorAll('#myProducerForm > form > div > input[name="region"]')[0].value,
      country: document.querySelectorAll('#myProducerForm > form > div > input[name="country"]')[0].value,
      comment: document.querySelectorAll('#myProducerForm > form > div > input[name="comment"]')[0].value,
      phone: document.querySelectorAll('#myProducerForm > form > div > input[name="phone"]')[0].value,
      email: document.querySelectorAll('#myProducerForm > form > div > input[name="email"]')[0].value,
      website: document.querySelectorAll('#myProducerForm > form > div > input[name="website"]')[0].value
    },
    success: function (answer, status) {
      console.log('success : ' + status)
      closeForm('editorProducerForm')
      window.location.reload()
    },
    error: function (answer, status, error) {
      console.log('success : ' + status)
      window.alert(answer.responseText)
    },
    complete: function (answer, status) {}
  })
}

function patchProducerById (path, id) {
  $.ajax({
    type: 'PATCH',
    url: path,
    data: {
      id: id,
      name: document.querySelectorAll('#myProducerForm > form > div > input[name="name"]')[0].value,
      address: document.querySelectorAll('#myProducerForm > form > div > input[name="address"]')[0].value,
      region: document.querySelectorAll('#myProducerForm > form > div > input[name="region"]')[0].value,
      country: document.querySelectorAll('#myProducerForm > form > div > input[name="country"]')[0].value,
      comment: document.querySelectorAll('#myProducerForm > form > div > input[name="comment"]')[0].value,
      phone: document.querySelectorAll('#myProducerForm > form > div > input[name="phone"]')[0].value,
      email: document.querySelectorAll('#myProducerForm > form > div > input[name="email"]')[0].value,
      website: document.querySelectorAll('#myProducerForm > form > div > input[name="website"]')[0].value
    },
    success: function (answer, status) {
      console.log('success : ' + status)
      console.log('success answer : ' + answer.name)
      closeForm('editorProducerForm')
      window.location.reload()
    },
    error: function (answer, status, error) {
      console.log('Error : ' + error)
      window.alert(answer.responseText)
    },
    complete: function (answer, status) {}
  })
}
