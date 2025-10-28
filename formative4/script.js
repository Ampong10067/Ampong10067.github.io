document.getElementById("saveBtn").addEventListener("click", saveData);

const userData = [];

function saveData() {
  const idNumber = document.getElementById("idNumber").value;
  const firstName = document.getElementById("firstName").value;
  const middleName = document.getElementById("middleName").value;
  const lastName = document.getElementById("lastName").value;
  const gender = document.querySelector('input[name="gender"]:checked');

  if (!idNumber || !firstName || !lastName || !gender) {
    alert("Please fill in all required fields.");
    return;
  }

  const person = {
    idNumber,
    firstName,
    middleName,
    lastName,
    gender: gender.value
  };

  userData.push(person);
  updateTable();
  document.getElementById("signupForm").reset();
}

function updateTable() {
  const tbody = document.querySelector("#dataTable tbody");
  tbody.innerHTML = "";

  userData.forEach(data => {
    const row = `
      <tr>
        <td>${data.idNumber}</td>
        <td>${data.firstName}</td>
        <td>${data.middleName}</td>
        <td>${data.lastName}</td>
        <td>${data.gender}</td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}
document.getElementById("saveBtn").addEventListener("click", saveData);

const userData = [];

function saveData() {
  const idNumber = document.getElementById("idNumber").value;
  const firstName = document.getElementById("firstName").value;
  const middleName = document.getElementById("middleName").value;
  const lastName = document.getElementById("lastName").value;
  const gender = document.querySelector('input[name="gender"]:checked')?.value;

  if (!idNumber || !firstName || !lastName || !gender) {
    alert("Please fill in all required fields.");
    return;
  }

  const person = { idNumber, firstName, middleName, lastName, gender };
  userData.push(person);

  updateTable();
  document.getElementById("signupForm").reset();
}

function updateTable() {
  const tbody = document.querySelector("#dataTable tbody");
  tbody.innerHTML = "";

  userData.forEach(data => {
    const row = `
      <tr>
        <td>${data.idNumber}</td>
        <td>${data.firstName}</td>
        <td>${data.middleName}</td>
        <td>${data.lastName}</td>
        <td>${data.gender}</td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}
