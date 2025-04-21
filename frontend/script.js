// script.js

// --- Global State Variables ---
let isEditing = false;
let savedInterests = ["Mathematics", "Computer Science"]; // Example starting interests

// --- DOM Element References (assigned in initializeProfile) ---
let editButton, saveButton, usernameInput, descriptionTextarea,
    profilePicture, profilePictureInput, profilePictureContainer,
    profilePictureOverlay, subjectOptions, subjectInterestContainer,
    // Modal Element References
    modalOverlay, pfpModal, modalCloseButton, modalChooseFileButton,
    modalDragDropButton, modalMessage;

// --- Core Functions ---

// Function to enable editing mode
function enableEditing() {
    isEditing = true;
    usernameInput.disabled = false;
    descriptionTextarea.disabled = false;
    subjectOptions.style.display = 'flex';

    usernameInput.style.borderColor = "#ccc"; // Reset potential error border
    descriptionTextarea.style.borderColor = "#ccc";

    // Use correct display type based on CSS rule (#homeButton, #editButton use inline-flex)
    editButton.style.display = 'none';
    saveButton.style.display = 'block'; // Show save button centrally below content

    profilePictureContainer.addEventListener('click', openPfpModal);
    profilePictureContainer.classList.add('editable');
    resetPfpOverlayState(); // Update overlay text/visibility for editing mode

    enableSubjectDragging();
}

// Function to save changes
function saveChanges() {
    // Remove modal listener first
    profilePictureContainer.removeEventListener('click', openPfpModal);

    const username = usernameInput.value;
    const description = descriptionTextarea.value;
    let isValid = true;
    let errorMessages = []; // Collect errors

    // === Validation Logic ===
    if (!isValidUsername(username)) {
        isValid = false;
        errorMessages.push("Username should not contain special characters or spaces.");
        usernameInput.style.borderColor = "red";
    } else {
        usernameInput.style.borderColor = "#ccc";
    }

    const currentWordCount = wordCount(description);
    if (currentWordCount > 75) {
        isValid = false;
        errorMessages.push(`Description has ${currentWordCount} words (max 75).`);
        descriptionTextarea.style.borderColor = "red";
    } else {
        descriptionTextarea.style.borderColor = "#ccc";
    }
    // === End Validation ===

    if (!isValid) {
        alert("Please fix the following errors:\n- " + errorMessages.join("\n- "));
        // Re-add listener if save failed and we are still editing
        profilePictureContainer.addEventListener('click', openPfpModal);
        return; // Prevent saving if validation fails
    }

    // --- If validation passes, proceed with saving ---
    isEditing = false; // Set editing flag *before* resetting UI elements

    // Disable inputs
    usernameInput.disabled = true;
    descriptionTextarea.disabled = true;
    subjectOptions.style.display = 'none'; // Hide subject options

    // Reset potential error styles
    usernameInput.style.borderColor = "#ccc";
    descriptionTextarea.style.borderColor = "#ccc";

    // Toggle button visibility
    editButton.style.display = 'inline-flex'; // Match CSS
    saveButton.style.display = 'none';

    // Reset PFP state
    resetPfpOverlayState(); // Update overlay for non-editing mode
    profilePictureContainer.classList.remove('editable');

    // Save subject interests
    savedInterests = Array.from(subjectInterestContainer.children).map(item => item.dataset.subject);

    // Disable subject dragging
    disableSubjectDragging();

    // --- Mock Saving ---
    console.log("Saving data:", {
        username: username,
        description: description,
        interests: savedInterests,
        // profilePicSrc: profilePicture.src
    });
    alert('Changes saved!'); // Confirmation
}


// --- Helper & Validation Functions ---

// Helper function to count words in a string
function wordCount(str) {
    if (!str || typeof str !== 'string' || str.trim() === "") {
        return 0;
    }
    // Match non-whitespace sequences
    const matches = str.match(/\S+/g);
    return matches ? matches.length : 0;
}

// Validate Username (returns boolean: true if valid) - Corrected logic
function isValidUsername(username) {
    if (!username || typeof username !== 'string') {
        return false; // Handle null, undefined, or non-string input
    }
    // Regex tests for the *presence* of invalid characters (special chars or space)
    const usernameInvalidRegex = /[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?\s]/;
    // Return TRUE if the regex test is FALSE (meaning no invalid characters found)
    return !usernameInvalidRegex.test(username);
}


// --- Profile Picture Modal Functions ---

function openPfpModal() {
    // Only open if editing
    if (!isEditing) return;
    // Reset modal state
    modalMessage.textContent = 'How would you like to add a picture?'; // Clear or set default message
    modalOverlay.style.display = 'block';
    pfpModal.style.display = 'block';
}

function closePfpModal() {
    modalOverlay.style.display = 'none';
    pfpModal.style.display = 'none';
}

function handleModalChooseFile() {
    triggerFileInput(); // Open file browser
    closePfpModal();    // Close modal immediately
}

function handleModalDragDrop() {
    // Update message to guide the user
    modalMessage.textContent = 'Close this window and drag your image onto the picture area.';
    // Keep the modal open briefly so the user can read the message,
    // or close it immediately if preferred:
    // closePfpModal();
    // For this example, let's keep it open for a moment, user closes manually or via overlay click
}

// --- Profile Picture Core Logic ---

// Updates the text/visibility of the overlay behind the image
function resetPfpOverlayState() {
    profilePictureOverlay.innerHTML = ''; // Clear any previous text
    if (isEditing) {
        const textElement = document.createElement('span');
        textElement.textContent = 'Click to Change';
        profilePictureOverlay.appendChild(textElement);
        // Visibility is handled by CSS .profile-picture-container.editable
    } else {
        // Hidden by CSS when not .editable
        // Ensure placeholder image is shown if no real image exists
        const hasRealImage = profilePicture.src && !profilePicture.src.includes('placeholder-pfp.jpg') && profilePicture.naturalWidth > 0;
        if (!hasRealImage && (!profilePicture.src || profilePicture.src.includes('placeholder-pfp.jpg'))) {
             profilePicture.src = 'placeholder-pfp.jpg';
        }
    }
}

// Programmatically click the hidden file input
function triggerFileInput() {
    profilePictureInput.click();
}

// Handles file selection from input or drop
function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) {
        console.warn("Invalid file type selected.");
        alert("Please select a valid image file (e.g., JPG, PNG, GIF).");
        closePfpModal(); // Ensure modal is closed if it was open
        return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
        profilePicture.src = e.target.result;
        // No overlay reset needed here, as it just shows 'Click to Change'
        closePfpModal(); // Ensure modal is closed after successful load
    };
    reader.onerror = () => {
        console.error("Error reading file.");
        alert("Error reading file. Please try again.");
        closePfpModal(); // Ensure modal is closed on error
    };
    reader.readAsDataURL(file);
}

// Handles the 'change' event on the file input
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) { // If a file was selected
        handleFile(file);
    }
    // No specific action needed for cancellation regarding overlay/modal state
    event.target.value = null; // Clear input value
}

// --- Profile Picture Drag/Drop Handlers (Remain attached to container) ---
function handlePfpDragOver(e) {
    if (!isEditing) return;
    e.preventDefault(); // Necessary to allow drop
    profilePictureContainer.classList.add('dragover');
}

function handlePfpDragLeave(e) {
    if (!isEditing) return;
    // Avoid flickering if moving over child elements
    if (e.relatedTarget && profilePictureContainer.contains(e.relatedTarget)) {
        return;
    }
    profilePictureContainer.classList.remove('dragover');
}

function handlePfpDrop(e) {
    if (!isEditing) return;
    e.preventDefault();
    profilePictureContainer.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        handleFile(file); // This will update the image
        closePfpModal(); // Ensure modal is closed after a successful drop
    } else if (file) { // Dropped something, but not an image
        alert("Please drop an image file (e.g., JPG, PNG, GIF).");
        closePfpModal();
    } else { // Catch potential other drop issues
        closePfpModal();
    }
}


// --- Subject Interest Drag/Drop Variables and Functions ---
let draggedSubject = null;

function enableSubjectDragging() {
    const subjectBlocks = document.querySelectorAll('#subjectOptions .subject-block, #subjectInterestContainer .subject-block');
    subjectBlocks.forEach(block => {
        block.draggable = true;
        block.addEventListener('dragstart', dragStart);
        block.addEventListener('dragend', dragEnd);
    });
    [subjectInterestContainer, subjectOptions].forEach(container => {
        container.addEventListener('dragover', dragOver);
        container.addEventListener('dragenter', dragEnter);
        container.addEventListener('dragleave', dragLeave);
    });
    subjectInterestContainer.addEventListener('drop', dropOnInterestContainer);
    subjectOptions.addEventListener('drop', dropOnOptionsContainer);
}

function disableSubjectDragging() {
    const subjectBlocks = document.querySelectorAll('#subjectOptions .subject-block, #subjectInterestContainer .subject-block');
    subjectBlocks.forEach(block => {
        block.draggable = false;
        block.removeEventListener('dragstart', dragStart);
        block.removeEventListener('dragend', dragEnd);
    });
    [subjectInterestContainer, subjectOptions].forEach(container => {
        container.removeEventListener('dragover', dragOver);
        container.removeEventListener('dragenter', dragEnter);
        container.removeEventListener('dragleave', dragLeave);
        container.classList.remove('drag-over');
    });
    subjectInterestContainer.removeEventListener('drop', dropOnInterestContainer);
    subjectOptions.removeEventListener('drop', dropOnOptionsContainer);
}

function dragStart(event) {
    if (!event.target.classList.contains('subject-block')) return;
    draggedSubject = event.target;
    event.dataTransfer.setData('text/plain', event.target.dataset.subject);
    event.dataTransfer.effectAllowed = 'move';
    setTimeout(() => { if (draggedSubject) draggedSubject.classList.add('dragging'); }, 0);
}

function dragEnd(event) {
    setTimeout(() => {
        const currentDragged = document.querySelector('.subject-block.dragging');
        if (currentDragged) currentDragged.classList.remove('dragging');
        subjectInterestContainer.classList.remove('drag-over');
        subjectOptions.classList.remove('drag-over');
        draggedSubject = null;
    }, 0);
}

function dragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
}

function dragEnter(event) {
    event.preventDefault();
    const targetContainer = event.target.closest('.subject-interest-container, .subject-options');
    if (targetContainer && draggedSubject && !targetContainer.contains(draggedSubject)) {
        targetContainer.classList.add('drag-over');
    }
}

function dragLeave(event) {
    const targetContainer = event.target.closest('.subject-interest-container, .subject-options');
    if (targetContainer && !targetContainer.contains(event.relatedTarget)) {
       targetContainer.classList.remove('drag-over');
    }
    if (event.target === subjectInterestContainer || event.target === subjectOptions) {
         event.target.classList.remove('drag-over');
    }
}

function dropOnInterestContainer(event) {
    event.preventDefault();
    const targetContainer = event.target.closest('.subject-interest-container');
    if (targetContainer && draggedSubject && !targetContainer.contains(draggedSubject)) {
        targetContainer.appendChild(draggedSubject);
    }
    targetContainer?.classList.remove('drag-over');
}

function dropOnOptionsContainer(event) {
    event.preventDefault();
    const targetContainer = event.target.closest('.subject-options');
    if (targetContainer && draggedSubject && !targetContainer.contains(draggedSubject)) {
        targetContainer.appendChild(draggedSubject);
        sortSubjectOptions();
    }
    targetContainer?.classList.remove('drag-over');
}

function sortSubjectOptions() {
    if (!subjectOptions) return;
    const options = Array.from(subjectOptions.children);
    options.sort((a, b) => a.dataset.subject.localeCompare(b.dataset.subject));
    options.forEach(option => subjectOptions.appendChild(option));
}


// --- Initialization ---
function initializeProfile() {
    // Assign Standard DOM Element References
    editButton = document.getElementById('editButton');
    saveButton = document.getElementById('saveButton');
    usernameInput = document.getElementById('username');
    descriptionTextarea = document.getElementById('description');
    profilePicture = document.getElementById('profilePicture');
    profilePictureInput = document.getElementById('profilePictureInput');
    profilePictureContainer = document.querySelector('.profile-picture-container');
    profilePictureOverlay = document.querySelector('.profile-picture-overlay');
    subjectOptions = document.getElementById('subjectOptions');
    subjectInterestContainer = document.getElementById('subjectInterestContainer');

    // Assign Modal DOM Element References
    modalOverlay = document.getElementById('modalOverlay');
    pfpModal = document.getElementById('pfpModal');
    modalCloseButton = document.getElementById('modalCloseButton');
    modalChooseFileButton = document.getElementById('modalChooseFileButton');
    modalDragDropButton = document.getElementById('modalDragDropButton');
    modalMessage = document.getElementById('modalMessage');

    // Basic check for essential elements
    if (!editButton || !saveButton || !profilePictureContainer || !pfpModal || !modalOverlay || !subjectOptions || !subjectInterestContainer) {
        console.error("Initialization failed: Essential DOM elements missing.");
        return;
    }

    // Move pre-selected interests
    savedInterests.forEach(interest => {
        const block = subjectOptions.querySelector(`.subject-block[data-subject="${interest}"]`);
        if (block) {
            subjectInterestContainer.appendChild(block);
        }
    });

    resetPfpOverlayState(); // Set initial overlay state
    disableSubjectDragging(); // Ensure dragging is off initially
    sortSubjectOptions(); // Sort remaining options

    editButton.style.display = 'inline-flex'; // Match CSS
    saveButton.style.display = 'none';

    // --- Attach Event Listeners ---
    editButton.addEventListener('click', enableEditing);
    saveButton.addEventListener('click', saveChanges);
    profilePictureInput.addEventListener('change', handleImageUpload);

    // PFP Drag/Drop Listeners (on the container)
    profilePictureContainer.addEventListener('dragover', handlePfpDragOver);
    profilePictureContainer.addEventListener('dragleave', handlePfpDragLeave);
    profilePictureContainer.addEventListener('drop', handlePfpDrop);

    // Modal Listeners
    modalCloseButton.addEventListener('click', closePfpModal);
    modalOverlay.addEventListener('click', closePfpModal); // Close on overlay click
    modalChooseFileButton.addEventListener('click', handleModalChooseFile);
    modalDragDropButton.addEventListener('click', handleModalDragDrop);

    console.log("Profile Editor Initialized with Modal");
}

// --- Run Initialization ---
document.addEventListener('DOMContentLoaded', initializeProfile);