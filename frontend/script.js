// script.js

// Function to enable editing (no DOM interaction here)
function enableEditing() {
  // Add logic here.
}

// Function to save changes
function saveChanges() {
  //Add some validation logic here
  alert('Changes saved!');
}

// Helper function to count words in a string (extracted for testing)
function wordCount(str) {
  if (!str || str.trim() === "") {
    return 0; // Handle empty or whitespace-only strings correctly
  }
  return str.split(/\s+/).filter(function (n) { return n != '' }).length;
}

// Validate Description Textarea
function validateDescription(description) {
  //Validation: Enforce that description textarea is under 75 words
  if (!description) return ""; //Handle null or undefined
  const words = description.split(/\s+/);
  if (words.length > 75) {
      return words.slice(0, 75).join(" ");
  }
  return description;
}

function isValidUsername(username) {
    if (!username) {
      return false;
    }
    const usernameRegex = /[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?\s]/;
    return usernameRegex.test(username);
}

// Export validation functions. You can have more parameters for this if you like.
module.exports = {
  enableEditing,
  saveChanges,
  wordCount,
  validateDescription,
  isValidUsername //Export isValidUsername
};