let donationCount = 0;
let donationGoal = 5;
let userGoals = [];

// Toggle profile popup when clicking the Boxicons user icon
function toggleProfile() {
    document.getElementById("profile-popup").classList.toggle("hidden");
}

// Function to add a donation
function addDonation() {
    donationCount++;
    document.getElementById("donation-count").textContent = donationCount;

    // Update progress bar
    let progressBar = document.getElementById("progress-bar");
    progressBar.value = donationCount;
    document.getElementById("progress-text").textContent = `${donationCount} / ${donationGoal} donations`;

    // Check if goal is reached
    if (donationCount >= donationGoal) {
        awardBadge();
    }

    // Update user-defined goals
    updateGoals();
}

// Function to award a badge when the goal is reached
function awardBadge() {
    let achievementDiv = document.getElementById("achievements");
    if (!document.getElementById("badge")) {
        let badge = document.createElement("p");
        badge.id = "badge";
        badge.innerHTML = "🏅 Goal Achieved!";
        achievementDiv.appendChild(badge);
    }
}

// Function to set a new goal
function setNewGoal() {
    let goal = prompt("Enter your donation goal:");
    if (goal && !isNaN(goal) && goal > 0) {
        userGoals.push({ goal: parseInt(goal), progress: 0 });
        updateGoals();
    }
}

// Function to update user-defined goals and progress
function updateGoals() {
    let goalList = document.getElementById("goal-list");
    goalList.innerHTML = "";

    userGoals.forEach((goal, index) => {
        let listItem = document.createElement("li");
        listItem.classList.add("goal-item");

        let progressText = document.createElement("span");
        progressText.textContent = `${goal.progress} / ${goal.goal}`;

        let progressBar = document.createElement("progress");
        progressBar.classList.add("goal-progress");
        progressBar.value = goal.progress;
        progressBar.max = goal.goal;

        listItem.appendChild(progressText);
        listItem.appendChild(progressBar);
        goalList.appendChild(listItem);

        // Update progress when a donation is made
        if (donationCount > goal.progress) {
            userGoals[index].progress = donationCount;
            progressBar.value = userGoals[index].progress;
            progressText.textContent = `${userGoals[index].progress} / ${userGoals[index].goal}`;
        }
    });
}
