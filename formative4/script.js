document.getElementById("saveBtn").addEventListener("click", function () {
  // Get values from the form
  const idNumber = document.getElementById("idNumber").value.trim();
  const firstName = document.getElementById("firstName").value.trim();
  const middleName = document.getElementById("middleName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const age = document.getElementById("age").value.trim();

  // Validate required fields
  if (!idNumber || !firstName || !lastName || !age) {
    alert("Please fill in all required fields.");
    return;
  }

  // Check if age is a valid number
  if (isNaN(age) || age <= 0) {
    alert("Please enter a valid age.");
    return;
  }

  // Add new row to the table
  const tableBody = document.querySelector("#dataTable tbody");
  const newRow = document.createElement("tr");

  newRow.innerHTML = `
    <td>${idNumber}</td>
    <td>${firstName}</td>
    <td>${middleName}</td>
    <td>${lastName}</td>
    <td>${age}</td>
  `;

  tableBody.appendChild(newRow);

  // Clear form fields after saving
  document.getElementById("signupForm").reset();
});
