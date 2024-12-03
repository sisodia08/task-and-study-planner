// Load tasks from localStorage when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const prioritySelect = document.getElementById("prioritySelect");
    const taskList = document.getElementById("taskList");

    const task = taskInput.value.trim();
    const priority = prioritySelect.value;

    if (task === "") {
        alert("Please enter a task.");
        return;
    }

    // Create a new task object
    const newTask = {
        text: task,
        priority: priority,
    };

    // Save the task in localStorage
    saveTaskToLocalStorage(newTask);

    // Add the task to the DOM
    createTaskElement(newTask);

    // Clear input fields
    taskInput.value = "";
    prioritySelect.value = "High";

    // Re-sort tasks by priority
    sortTasks();
}

// Function to create a task element and add it to the DOM
function createTaskElement(task) {
    const taskList = document.getElementById("taskList");

    // Create a new list item
    const listItem = document.createElement("li");
    listItem.classList.add(task.priority.toLowerCase());

    // Add task text
    const taskText = document.createElement("span");
    taskText.textContent = `${task.text} (${task.priority} Priority)`;
    listItem.appendChild(taskText);

    // Add delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = () => {
        deleteTaskFromLocalStorage(task.text, task.priority);
        listItem.remove();
        sortTasks();
    };
    listItem.appendChild(deleteBtn);

    // Append the list item to the task list
    taskList.appendChild(listItem);
}

// Function to save a task to localStorage
function saveTaskToLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to delete a task from localStorage
function deleteTaskFromLocalStorage(taskText, taskPriority) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = tasks.filter(
        (t) => t.text !== taskText || t.priority !== taskPriority
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

// Function to load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => createTaskElement(task));
    sortTasks();
}

// Function to sort tasks by priority
function sortTasks() {
    const taskList = document.getElementById("taskList");
    const tasks = Array.from(taskList.children);

    // Define priority levels
    const priorityOrder = {
        High: 1,
        Medium: 2,
        Low: 3,
    };

    // Sort tasks based on priority
    tasks.sort((a, b) => {
        const priorityA = a.classList.contains("high")
            ? "High"
            : a.classList.contains("medium")
            ? "Medium"
            : "Low";
        const priorityB = b.classList.contains("high")
            ? "High"
            : b.classList.contains("medium")
            ? "Medium"
            : "Low";

        return priorityOrder[priorityA] - priorityOrder[priorityB];
    });

    // Clear the task list and re-append sorted tasks
    taskList.innerHTML = "";
    tasks.forEach((task) => taskList.appendChild(task));
}

// Logout function
function logout() {
    window.location.href = "index.html";
}

// Load profile from localStorage when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
    loadProfile();
});

// Save profile and profile picture
function saveProfile() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const bio = document.getElementById("bio").value.trim();
    const notifications = document.getElementById("notifications").checked;

    const profilePicElement = document.getElementById("profilePic");
    const profilePicSrc = profilePicElement.src;

    // Validate inputs
    if (name === "" || email === "") {
        alert("Name and email are required.");
        return;
    }

    const profileData = {
        name,
        email,
        bio,
        notifications,
        profilePicSrc,
    };

    // Save profile to localStorage
    localStorage.setItem("userProfile", JSON.stringify(profileData));
    alert("Profile saved successfully!");
}

// Load profile from localStorage
function loadProfile() {
    const savedProfile = JSON.parse(localStorage.getItem("userProfile"));

    if (savedProfile) {
        document.getElementById("name").value = savedProfile.name || "";
        document.getElementById("email").value = savedProfile.email || "";
        document.getElementById("bio").value = savedProfile.bio || "";
        document.getElementById("notifications").checked =
            savedProfile.notifications || false;

        // Load profile picture if available
        const profilePicElement = document.getElementById("profilePic");
        profilePicElement.src =
            savedProfile.profilePicSrc || "default-profile.png";
    }
}

// Preview uploaded profile picture and save it
function previewImage(event) {
    const image = document.getElementById("profilePic");
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            image.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}
// Open Settings Modal
function openSettings() {
    const settingsModal = document.getElementById('settingsModal');
    settingsModal.style.display = 'block';

    // Load settings from localStorage
    const savedSettings = JSON.parse(localStorage.getItem('userSettings')) || {};
    document.getElementById('notificationToggle').checked = savedSettings.notifications ?? true;
    document.getElementById('languageSelect').value = savedSettings.language || 'en';
}

// Close Settings Modal
function closeSettings() {
    const settingsModal = document.getElementById('settingsModal');
    settingsModal.style.display = 'none';
}

// Save Settings
function saveSettings() {
    const notifications = document.getElementById('notificationToggle').checked;
    const language = document.getElementById('languageSelect').value;

    const settings = { notifications, language };
    localStorage.setItem('userSettings', JSON.stringify(settings));

    alert('Settings saved successfully!');
    closeSettings();
}

// Toggle Menu Sidebar
function toggleMenu() {
    const sidebar = document.getElementById('menuSidebar');
    sidebar.style.width = sidebar.style.width === '250px' ? '0' : '250px';
}

