
// Define URL for HTTP request
const request_URL = 'https://amhep.pythonanywhere.com'; 

// Function to get the grades from the backend
function getGrades() {

  // XMLHttpRequest Object names request
  var request = new XMLHttpRequest();

  // Function to handle response when server is ready
  request.onreadystatechange = function() {
    
    // If the request is complete + response status is okay...
    if (this.readyState == 4 && this.status == 200) {

      // We will parse the JSON into JS object
      const data = JSON.parse(this.responseText);

      // And clear the existing content of grades/clears div (prevents there from being 2 tables)
      document.getElementById("grades").innerHTML = ""; 
      
      // From here we create a table element
      let table = document.createElement("table");

      // Create our header/first table row element
      let header_row = document.createElement("tr");

      // Create our name header
      let name_header = document.createElement("th");
      name_header.textContent = "Name";

      // Create our grade header
      let grade_header = document.createElement("th");
      grade_header.textContent = "Grade";

      // Create our edit header
      let edit_header = document.createElement("th");
      edit_header.textContent = "Edit";

      // Create our delete header
      let delete_header = document.createElement("th");
      delete_header.textContent = "Delete";

      // Append the headers to their respective positions on the site
      header_row.appendChild(edit_header);
      header_row.appendChild(delete_header);
      header_row.appendChild(name_header);
      header_row.appendChild(grade_header);

      // Append the header row to the table
      table.appendChild(header_row);

      // While we loop through the data object
      for (let name in data) {
        
        // Create a row
        let row = document.createElement("tr");

        // Create a table cell for the student's name
        let name_cell = document.createElement("td");
        name_cell.textContent = name;
        
        // Create a table cell for the student's grade
        let grade_cell = document.createElement("td");
        grade_cell.textContent = data[name];

        //  Create a table cell to edit the student's grade
        let edit_cell = document.createElement("td");
        let edit_button = document.createElement("button");
        edit_button.textContent = "Edit";

        //  Create a table cell to delete the student's grade
        let delete_cell = document.createElement("td");
        let delete_button = document.createElement("button");
        delete_button.textContent = "Delete";

        // Append buttons to edit and delete cells 
        edit_cell.appendChild(edit_button);
        delete_cell.appendChild(delete_button);

        // Append name and grade cells from backend into the row
        row.appendChild(edit_cell);
        row.appendChild(delete_cell);
        row.appendChild(name_cell);
        row.appendChild(grade_cell);

        // Append the row to table
        table.appendChild(row);

        // Event Listener to the delete button, once it's clicked...
        delete_button.addEventListener("click", () => {

          // We let the program know what will be influenced as a result of the delete button...
          let name = delete_button.parentElement.parentElement.querySelector("td:nth-child(3)").textContent; 

          // And put it through our delete function
          deleteStudent(name);
        });

        // Event Listeneer to the edit button, once it's clicked...
        edit_button.addEventListener("click", () => {

          // We let the program know what will be influenced as a result of the edit button...
          let name = edit_button.parentElement.parentElement.querySelector("td:nth-child(3)").textContent;

          // And put it through our edit function
          editStudent(name, grade_cell);
        });

      }

      // Set table as content of grades div/element
      document.getElementById("grades").appendChild(table);

      // Filter out the list for each student search
      document.getElementById("search_button").addEventListener("click", searchStudent);

    }

  };

  // Open GET request to the specified URL
  request.open("GET", request_URL + "/grades", true);

  // Send the request
  request.send();

}

// Function to search a specific student
function searchStudent() {

  // Get the search query from the input field
  var searchQuery = document.getElementById("search").value.trim().toLowerCase();
  
  // Get all the rows in the table
  var rows = document.querySelectorAll("#grades table tr:not(:first-child)");

  // Loop through the rows
  for (var i = 0; i < rows.length; i++) {

    // Get our current rows
    var row = rows[i];

    // Given that the name is in the third column we will record the specific cell
    var nameCell = row.querySelector("td:nth-child(3)");

    // If the name cell matches that of the user input (regardless of if it is lowercase or uppercase)...
    if (nameCell && nameCell.textContent.trim().toLowerCase().match(new RegExp("\\b" + searchQuery + "\\b", "i"))) {
      
      // Show the row
      row.style.display = "";
    } 
    
    // Otherwise...
    else {

      // Hide the row
      row.style.display = "none";
    }
  }
}


// Function to add a student in our table
function addStudent(){
  
  // XMLHttpRequest Object names request
  var request = new XMLHttpRequest();

  // Open a POST request to the specified URL
  request.open("POST", request_URL + "/grades");
  
  // Set the request header to specify JSON data
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  // Get the name + grade from the input fields
  var name = document.getElementById("add_name").value;
  var grade = document.getElementById("add_grade").value;

  // Define onload function call
  request.onload = function(){

    // Call get Grades to automatically refresh the table once we add a new name
    getGrades();

    // update the addGrade element with the response text
    document.getElementById("addGrade").innerHTML = this.responseText;
  };

  // Create an add_info object of the student's name and grade
  const add_info = {"name": name, "grade": grade};

  // Send the add_info object as a JSON string
  request.send(JSON.stringify(add_info));

}

// Function to edit a student's grade
function editStudent(name, gradeCell) {

  // Create an input field for editing
  const inputField = document.createElement("input");
  inputField.value = gradeCell.textContent;
  
  // Create a "Save" button
  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";

  // Replace the grade cell content with the input field and save button
  gradeCell.innerHTML = "";
  gradeCell.appendChild(inputField);
  gradeCell.appendChild(saveButton);

  // Add an event listener to the "Save" button
  saveButton.addEventListener("click", () => {

    // Get the new grade from the input field 
    const newGrade = inputField.value;

    // Call our save edited grade function
    saveEditedGrade(name, newGrade, gradeCell);
  });
}

// Function to save an edited grade
function saveEditedGrade(name, newGrade, gradeCell) {

  // XMLHttpRequest Object names request
  var request = new XMLHttpRequest();

  // Open a PUT request to the specified URL to update the student grade
  request.open("PUT", request_URL + "/grades/" + name);
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  // Define the updated grade as an updated_grade object
  const updated_grade = { "name": name, "grade": newGrade };

  // Define onload function call
  request.onload = function () {

    // If the request was successful (status code 200)
    if (request.status === 200) {

      // Update the grade cell with the new grade
      gradeCell.textContent = newGrade;
    } 
    
    // Otherwise...
    else {

      // Handle errors by logging this message to the console
      console.error("Error updating grade");
    }
  };

  // Send the updated_grade object as a JSON string
  request.send(JSON.stringify(updated_grade));
}

// Function to delete a student name and grade
function deleteStudent(name){

  // XMLHttpRequest Object names request
  var request = new XMLHttpRequest();

  // Open a DELETE request to the specified URL to delete the student grade and name
  request.open("DELETE", request_URL + "/grades/" + name);

  // Define onload function call
  request.onload = function(){

    // Call get Grades to automatically refresh the table once we delete the student's info
    getGrades(); 
  };
  
  // Send the delete request
  request.send(null);
}
