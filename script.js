let totalDonations = 0; // Total donations (donations)
let currentGoal = 0; // User-selected goal
let currentProgress = 0; // Number of button presses (progress)
let goalSet = false; // Track if a goal is set

// Populate the goal selection dropdown (1 to 20)
document.addEventListener("DOMContentLoaded", function () {
    let goalSelection = document.getElementById("goal-selection");
    for (let i = 1; i <= 20; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = `${i} Donations`;
        goalSelection.appendChild(option);
    }

    // Hide the "Please select a goal" message when the user selects an option
    goalSelection.addEventListener("change", function () {
        document.getElementById("goal-warning").style.display = "none";
    });
});

// Toggle profile popup
function toggleProfile() {
    document.getElementById("profile-popup").classList.toggle("active");
}

// Close the profile popup
function closeProfile() {
    document.getElementById("profile-popup").classList.remove("active");
}

// Function to set a new goal
function setNewGoal() {
    let goalSelection = document.getElementById("goal-selection").value;
    let goalWarning = document.getElementById("goal-warning");

    if (!goalSelection) {
        goalWarning.textContent = "Please select a goal.";
        goalWarning.style.display = "block";
       // Show warning message
        return;
    } else {
        goalWarning.style.display = "none"; // Hide warning if selection is valid
    }

    currentGoal = parseInt(goalSelection);
    currentProgress = 0;
    goalSet = true;

    // Update progress bar to the maximum value
    let progressBar = document.getElementById("progress-bar");
    progressBar.max = currentGoal;
    progressBar.value = currentProgress;
    document.getElementById("progress-text").textContent = `${currentProgress} / ${currentGoal} donations`;

    // Disable dropdown and button until goal is achieved
    document.getElementById("goal-selection").disabled = true;
    document.getElementById("set-goal-btn").disabled = true;
}

// Function to add a donation (button press)
function addDonation() {
   // Increase total button presses

    let donationAmount = parseInt(document.getElementById("donation-amount").value) || 0;

    if (donationAmount <= 0) {
        showPopupMessage("Please enter a valid donation amount.");
        return;
    }

    // Update total donation amount
    totalDonations += donationAmount;
    document.getElementById("total-donations").textContent = `$${totalDonations}`;
    document.getElementById("total-donations").textContent = totalDonations;
    

    if (!goalSet) {
        document.getElementById("goal-warning").textContent = "You can set a goal!";
        document.getElementById("goal-warning").style.display = "block";
        return;
    }

    // Increase progress by one per button press. For the donation progress
    currentProgress++;
    if (currentProgress > currentGoal) {
        currentProgress = currentGoal; // Prevent exceeding the goal
    }

    let progressBar = document.getElementById("progress-bar");
    progressBar.value = currentProgress;
    document.getElementById("progress-text").textContent = `${currentProgress} / ${currentGoal} donations`;

    // Check if goal is achieved
    if (currentProgress >= currentGoal) {
        awardBadge();
        allowNewGoal(); // Enable setting a new goal
    }
}

// Function to award a trophy when a goal is reached
function awardBadge() {
    let achievementDiv = document.getElementById("achievements");
    let trophy = document.createElement("i");
    trophy.className = "bx bxs-trophy"; 
    trophy.style.color = "gold";
    trophy.style.fontSize = "24px";
    trophy.style.marginLeft = "10px";
    achievementDiv.appendChild(trophy);

    let tooltip = document.createElement("span");
    tooltip.className = "tooltip";
    tooltip.textContent = "Goal Achieved! ";
}

// Allow user to set a new goal after the previous one is achieved
function allowNewGoal() {
    goalSet = false;
    
    // Enable dropdown and button for setting a new goal
    document.getElementById("goal-selection").disabled = false;
    document.getElementById("set-goal-btn").disabled = false;
    
    document.getElementById("goal-warning").textContent = " Goal Achieved! Set a new goal!";
    document.getElementById("goal-warning").style.color = "green";
    document.getElementById("goal-warning").style.display = "block";

    // Reset progress bar for next goal
    document.getElementById("progress-bar").value = 0;
    document.getElementById("progress-text").textContent = `0 / ${currentGoal} donations`;
}

// Opens the donation form
function openDonationForm(event) {
    event.stopPropagation(); 
    document.getElementById("donation-form-popup").style.display = "block";
}

// Submit donation and update progress
function submitDonation() {
    let amount = parseInt(document.getElementById("donation-amount").value);
    let goalWarning = document.getElementById("goal-warning");

    if (isNaN(amount) || amount <= 0) {
        goalWarning.textContent = "Please enter a valid donation amount.";
        goalWarning.style.display = "block";
        return;
    } else {
        goalWarning.style.display = "none";
    }

    addDonation(amount); // Call the function to update total and progress

    alert(" Thank you for your donation!.  Pls click on the profile icon to see your status"); // Show success message

    // Reset form & close popup
    document.getElementById("donation-amount").value = "";
    closeDonationForm();
}

// Close donation form
function closeDonationForm() {
    document.getElementById("donation-form-popup").style.display = "none";
}




let currentIndex = 0;

function moveSlide(direction) {
    const gridWrapper = document.querySelector(".grid-wrapper");
    const slides = document.querySelectorAll(".grid1-slide");
    const totalSlides = slides.length;

    currentIndex += direction;
    if (currentIndex >= totalSlides) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    }

    gridWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Auto-slide every 20 seconds
const totalSlides = document.querySelectorAll(".grid1-slide").length;
if (totalSlides > 1) {
    setInterval(() => moveSlide(1), 20000);
}
// Select all FAQ items
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
    item.addEventListener("click", () => {
        item.classList.toggle("active");
    });
});
