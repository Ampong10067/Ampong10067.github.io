// Array to store all user data
let users = [];

// Function to display the data in the table
function displayData() {
  const tableBody = document.querySelector("#dataTable tbody");
  tableBody.innerHTML = "";

  users.forEach((user) => {
    const row = document.createElement("tr");
    for (const key in user) {
      const cell = document.createElement("td");
      cell.textContent = user[key];
      row.appendChild(cell);
    }
    tableBody.appendChild(row);
  });
}

// Function to save form data
function saveData() {
  // Get input values
  const idNumber = document.getElementById("idNumber").value;
  const firstName = document.getElementById("firstName").value;
  const middleName = document.getElementById("middleName").value;
  const lastName = document.getElementById("lastName").value;
  const gender = document.getElementById("gender").value;
  const birthday = document.getElementById("birthday").value;

  // Create an object to store user info
  const user = {
    idNumber,
    firstName,
    middleName,
    lastName,
    gender,
    birthday
  };

  // Push the object into the users array
  users.push(user);

  // Display data in table
  displayData();

  // Reset the form
  document.getElementById("signupForm").reset();

  // Change button color dynamically
  const saveBtn = document.getElementById("saveBtn");
  saveBtn.style.backgroundColor = "#28a745";
  saveBtn.textContent = "Saved!";
  setTimeout(() => {
    saveBtn.style.backgroundColor = "#0078d4";
    saveBtn.textContent = "Save";
  }, 1000);
}

// Add event listener to button
document.getElementById("saveBtn").addEventListener("click", saveData);
