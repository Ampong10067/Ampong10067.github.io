document.getElementById("saveBtn").addEventListener("click", function (event) {
  event.preventDefault(); // prevent form reload

  // get values
  const idNumber = document.getElementById("idNumber").value.trim();
  const firstName = document.getElementById("firstName").value.trim();
  const middleName = document.getElementById("middleName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const age = document.getElementById("age").value; // number input

  // check if required fields are empty
  if (!idNumber || !firstName || !lastName || !age) {
    alert("Please fill in all required fields.");
    return;
  }

  // ensure age is valid
  const ageNum = parseInt(age);
  if (isNaN(ageNum) || ageNum <= 0) {
    alert("Please enter a valid age.");
    return;
  }

  // add data to the table
  const tableBody = document.querySelector("#dataTable tbody");
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td>${idNumber}</td>
    <td>${firstName}</td>
    <td>${middleName}</td>
    <td>${lastName}</td>
    <td>${ageNum}</td>
  `;
  tableBody.appendChild(newRow);

  // clear the form
  document.getElementById("signupForm").reset();
});
