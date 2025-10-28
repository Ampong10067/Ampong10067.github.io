// Array to store all entries
let userList = [];

// Function to show data in table
function showTable() {
  const tableBody = document.querySelector("#dataTable tbody");
  tableBody.innerHTML = ""; // clear old rows

  // Loop through array and display each user
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

// Function to save user data
function saveUser() {
  // Get input values (variables)
  let id = document.getElementById("idNumber").value;
  let first = document.getElementById("firstName").value;
  let middle = document.getElementById("middleName").value;
  let last = document.getElementById("lastName").value;
  let gender = document.getElementById("gender").value;
  let birthday = document.getElementById("birthday").value;

  // Store in object
  let user = {
    id: id,
    first: first,
    middle: middle,
    last: last,
    gender: gender,
    birthday: birthday
  };

  // Add object to array
  userList.push(user);

  // Show in table
  showTable();

  // Reset form
  document.getElementById("signupForm").reset();

  // Change button color briefly
  let btn = document.getElementById("saveBtn");
  btn.style.backgroundColor = "lightgreen";
  setTimeout(function() {
    btn.style.backgroundColor = "lightblue";
  }, 700);
}

// Add event listener for button click
document.getElementById("saveBtn").addEventListener("click", saveUser);
