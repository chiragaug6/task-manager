// Event listener for adding a new task
document.getElementById("addTaskBtn").addEventListener("click", function () {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  // Check if the task input is empty
  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  // Get the task list container
  const taskList = document.getElementById("taskList");

  // Create a new task item
  const taskItem = document.createElement("div");
  taskItem.className = "task-item";

  // Create a span to hold the task text
  const taskSpan = document.createElement("span");
  taskSpan.textContent = taskText;

  // Create a button to mark the task as complete
  const completeBtn = document.createElement("button");
  completeBtn.textContent = "Mark Complete";
  completeBtn.className = "complete";
  completeBtn.addEventListener("click", function () {
    markTaskAsComplete(taskItem); // Mark task as completed
  });

  // Create a button to delete the task
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete";
  deleteBtn.addEventListener("click", function () {
    deleteTaskWithAnimation($(taskItem)); // Delete task with animation
  });

  // Append the task text and buttons to the task item
  taskItem.appendChild(taskSpan);
  taskItem.appendChild(completeBtn);
  taskItem.appendChild(deleteBtn);

  // Append the task item to the task list
  taskList.appendChild(taskItem);

  // Add fade-in animation to the new task
  addTaskWithAnimation($(taskItem));

  // Clear the input field
  taskInput.value = "";
});

// Function to toggle the completed state of a task
function markTaskAsComplete(taskItem) {
  taskItem.classList.toggle("completed");
}

// Function to delete a task with a fade-out animation
function deleteTaskWithAnimation($taskItem) {
  $taskItem.fadeOut(300, function () {
    $(this).remove(); // Remove the task from the DOM after fade-out
  });
}

// Function to add a task with a fade-in animation
function addTaskWithAnimation($taskItem) {
  $taskItem.hide().fadeIn(300); // Hide initially and then fade in
}

// jQuery function to filter tasks based on the dropdown selection
$(document).ready(function () {
  $("#filterTasks").on("change", function () {
    const filterValue = $(this).val(); // Get the selected filter value

    $(".task-item").each(function () {
      const $taskItem = $(this);
      const isCompleted = $taskItem.hasClass("completed");

      // Show tasks based on the selected filter
      if (filterValue === "all") {
        $taskItem.show();
      } else if (filterValue === "completed" && isCompleted) {
        $taskItem.show();
      } else if (filterValue === "pending" && !isCompleted) {
        $taskItem.show();
      } else {
        $taskItem.hide(); // Hide tasks that don't match the filter
      }
    });
  });
});
