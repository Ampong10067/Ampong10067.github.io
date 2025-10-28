// Array to store all user data
let userList = [];

// Function to show data in the table
function showTable() {
  const tableBody = document.querySelector("#dataTable tbody");
  tableBody.innerHTML = "";

  // Loop through the array and add each user
  userList.forEach(function(user) {
    const row = document.createElement("tr");
    for (let key in user) {
      const cell = document.createElement("td");
      cell.textContent = user[key];
      row.appendChild(cell);
    }
    tableBody.appendChild(row);
  });
}

// Function to save form data
function saveUser() {
  let id = document.getElementById("idNumber").value;
  let first = document.getElementById("firstName").value;
  let middle = document.getElementById("middleName").value;
  let last = document.getElementById("lastName").value;
  let gender = document.getElementById("gender").value;
  let birthday = document.getElementById("birthday").value;

  // Create object
  let user = {
    id: id,
    first: first,
    middle: middle,
    last: last,
    gender: gender,
    birthday: birthday
  };

  // Add to array
  userList.push(user);

  // Display on table
  showTable();

  // Reset the form
  document.getElementById("signupForm").reset();

  // Button color change
  let btn = document.getElementById("saveBtn");
  btn.style.backgroundColor = "lightgreen";
  setTimeout(function() {
    btn.style.backgroundColor = "lightblue";
  }, 700);
}

// Event listener for the button
document.getElementById("saveBtn").addEventListener("click", saveUser);
