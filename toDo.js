var audio = new Audio("iphone.mp3");
function addTask() {
  var taskInput = document.getElementById("taskInput");
  var dateInput = document.getElementById("dateInput");
  var timeInput = document.getElementById("timeInput");

  var taskTable = document
    .getElementById("taskTable")
    .getElementsByTagName("tbody")[0];
  var task = taskInput.value;
  var date = dateInput.value;
  var time = timeInput.value;

  if (task.trim() !== "" && date && time) {
    var rowCount = taskTable.rows.length;
    var row = taskTable.insertRow();
    row.innerHTML = `
    <td class="sn">${rowCount + 1}</td>
      <td>${task}</td>
      <td>${date}</td>
      <td>${time}</td>
      <td class="action-btns">
        <button onclick="editTask(this)">Edit</button>
        <button onclick="deleteTask(this)">Delete</button>
      </td>
    `;
    taskInput.value = "";
    dateInput.value = "";
    timeInput.value = "";
  } else {
    alert("Please make sure to fill out the task description, date, and time.");
  }
}

// Functionality to edit a task
function editTask(btn) {
  var row = btn.parentNode.parentNode;
  var taskCell = row.cells[1]; // Assuming the task description is in the second cell
  var dateCell = row.cells[2];
  var timeCell = row.cells[3];

  // Save current values
  var currentTask = taskCell.textContent;
  var currentDate = dateCell.textContent;
  var currentTime = timeCell.textContent;

  // Create input fields for editing
  taskCell.innerHTML = '<input type="text" value="' + currentTask + '">';
  dateCell.innerHTML = '<input type="date" value="' + currentDate + '">';
  timeCell.innerHTML = '<input type="time" value="' + currentTime + '">';

  // Change the Edit button to a Save button
  btn.textContent = "Save";
  btn.onclick = function () {
    saveTask(this);
  };
}

function saveTask(btn) {
  var row = btn.parentNode.parentNode;
  var taskInput = row.cells[1].querySelector("input");
  var dateInput = row.cells[2].querySelector("input");
  var timeInput = row.cells[3].querySelector("input");

  // Update the row with the new values
  row.cells[1].textContent = taskInput.value;
  row.cells[2].textContent = dateInput.value;
  row.cells[3].textContent = timeInput.value;

  // Change the Save button back to an Edit button
  btn.textContent = "Edit";
  btn.onclick = function () {
    editTask(this);
  };
}

// function to delete task

function deleteTask(btn) {
  var row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

// Event listener for the Enter key
document
  .getElementById("taskInput")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

// Adjust the S/N when a task is deleted
function deleteTask(btn) {
  var row = btn.parentNode.parentNode;
  var tbody = row.parentNode;
  tbody.removeChild(row);
  updateSerialNumbers(tbody);
}

// Function to update the serial numbers
function updateSerialNumbers(tbody) {
  for (var i = 0; i < tbody.rows.length; i++) {
    tbody.rows[i].cells[0].textContent = i + 1;
  }
}

// TO ADD SET ALERM FUNCTIONALITY

// Function to set an alarm for a task
function setAlarm() {
  var taskInput = document.getElementById("taskInput").value;
  var dateInput = document.getElementById("dateInput").value;
  var timeInput = document.getElementById("timeInput").value;
  var reminderSection = document.getElementById("reminderSection");

  // Check if task description, date, and time are provided
  if (taskInput.trim() !== "" && dateInput && timeInput) {
    // Calculate the time difference from now to the task time
    var taskDateTime = new Date(dateInput + " " + timeInput);
    var now = new Date();
    var timeDiff = taskDateTime.getTime() - now.getTime();

    // Set a timeout to trigger an alert at the task time
    if (timeDiff > 0) {
      setTimeout(function () {
        // Display the reminder in the reminder section
        // reminderSection.innerHTML = "Reminder: " + taskInput;
        reminderSection.innerHTML = `
        <h2 class="head-text task-text">REMINDER</h2>
        Alarm: <span class="alarm-text"> ${taskInput}
        ${timeInput} 
        <button id="stopMusicButton" onclick="stopMusic()">Stop Alarm</button>`;
        // Play a song from your system
        audio.play();
      }, timeDiff);
    } else {
      alert("The specified time is in the past. Please choose a future time.");
    }
  } else {
    alert("Please make sure to fill out the task description, date, and time.");
  }
}

// display text to show alarm set
document.getElementById("alarmMessage").addEventListener("click", function () {
  // Show the message
  var messageElement = document.getElementById("message");
  messageElement.style.display = "block";

  // Hide the message after 2 seconds
  setTimeout(function () {
    messageElement.style.display = "none";
  }, 2000); // 2000 milliseconds = 2 seconds
});
// Add the setAlarm function to the existing event listener for the Enter key
document
  .getElementById("taskInput")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
      setAlarm(); // Set an alarm for the new task
    }
  });

// Function to stop the music
function stopMusic() {
  if (audio) {
    audio.pause(); // Stop the music
    audio.currentTime = 0; // Reset the audio to the beginning
  }
}
