// script.js

// --- Global State Variables ---
let isEditing = false;
let savedInterests = ["Mathematics", "Computer Science"]; // Example starting interests

// --- DOM Element References (assigned in initializeProfile) ---
let editButton, // Only one button now
    usernameInput, descriptionTextarea,
    profilePicture, profilePictureInput, profilePictureContainer,
    profilePictureOverlay, subjectOptions, subjectInterestContainer,
    // Modal Element References
    modalOverlay, pfpModal, modalCloseButton, modalChooseFileButton,
    modalDragDropButton, modalMessage;

// --- Core Functions ---

// Function to enable editing mode
function enableEditing() {
    console.log("Entering Edit Mode");
    isEditing = true;
    usernameInput.disabled = false;
    descriptionTextarea.disabled = false;
    subjectOptions.style.display = 'flex';

    usernameInput.style.borderColor = "#ccc";
    descriptionTextarea.style.borderColor = "#ccc";

    editButton.textContent = 'Save Changes';
    editButton.removeEventListener('click', enableEditing);
    editButton.addEventListener('click', saveChanges);

    profilePictureContainer.addEventListener('click', openPfpModal);
    profilePictureContainer.classList.add('editable');
    resetPfpOverlayState();

    enableSubjectDragging();
}

// Function to save changes
function saveChanges() {
    console.log("Attempting Save...");
    profilePictureContainer.removeEventListener('click', openPfpModal); // Remove listener

    const username = usernameInput.value;
    const description = descriptionTextarea.value;
    let isValid = true;
    let errorMessages = [];

    // === Validation Logic ===
    if (!isValidUsername(username)) {
        console.log("Validation Failed: Username");
        isValid = false;
        errorMessages.push("Username should not contain special characters or spaces.");
        usernameInput.style.borderColor = "red";
    } else {
        usernameInput.style.borderColor = "#ccc";
    }
    const currentWordCount = wordCount(description);
    if (currentWordCount > 75) {
        console.log("Validation Failed: Description Word Count", currentWordCount);
        isValid = false;
        errorMessages.push(`Description has ${currentWordCount} words (max 75).`);
        descriptionTextarea.style.borderColor = "red";
    } else {
        descriptionTextarea.style.borderColor = "#ccc";
    }
    // === End Validation ===

    if (!isValid) {
        console.log("Validation Failed. Errors:", errorMessages);
        alert("Please fix the following errors:\n- " + errorMessages.join("\n- "));
        profilePictureContainer.addEventListener('click', openPfpModal); // Re-add listener
        return; // Stop the save process
    }

    // --- Validation Passed - Proceed with Saving ---
    console.log("Validation Passed. Saving...");
    isEditing = false;

    usernameInput.disabled = true;
    descriptionTextarea.disabled = true;
    subjectOptions.style.display = 'none';
    usernameInput.style.borderColor = "#ccc";
    descriptionTextarea.style.borderColor = "#ccc";

    editButton.textContent = 'Edit Profile';
    editButton.removeEventListener('click', saveChanges);
    editButton.addEventListener('click', enableEditing);

    profilePictureContainer.classList.remove('editable');
    resetPfpOverlayState();

    savedInterests = Array.from(subjectInterestContainer.children).map(item => item.dataset.subject);
    disableSubjectDragging();

    console.log("Saving data:", { username, description, interests: savedInterests });
    alert('Changes saved!');
    console.log("Save Complete. Exited Edit Mode.");
}


// --- Helper & Validation Functions ---
function wordCount(str) { if (!str || typeof str !== 'string' || str.trim() === "") return 0; const matches = str.match(/\S+/g); return matches ? matches.length : 0; }
function isValidUsername(username) { if (!username || typeof username !== 'string') return false; const invalid = /[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?\s]/; return !invalid.test(username); }


// --- Profile Picture Modal Functions ---
function openPfpModal() { if (!isEditing) return; console.log("Opening PFP Modal"); modalMessage.textContent = 'How would you like to add a picture?'; modalOverlay.style.display = 'block'; pfpModal.style.display = 'block'; }
function closePfpModal() { console.log("Closing PFP Modal"); modalOverlay.style.display = 'none'; pfpModal.style.display = 'none'; }
function handleModalChooseFile() { console.log("Modal: Choose File selected"); triggerFileInput(); closePfpModal(); }
function handleModalDragDrop() { console.log("Modal: Drag & Drop selected"); modalMessage.textContent = 'Close this window and drag your image onto the picture area.'; /* closePfpModal(); // Optional: close immediately */ }

// --- Profile Picture Core Logic ---
function resetPfpOverlayState() {
    profilePictureOverlay.innerHTML = '';
    if (isEditing) {
        console.log("Resetting PFP Overlay for Edit Mode");
        const textElement = document.createElement('span');
        textElement.textContent = 'Click to Change';
        profilePictureOverlay.appendChild(textElement);
    } else {
        console.log("Resetting PFP Overlay for View Mode");
        const hasRealImage = profilePicture.src && !profilePicture.src.includes('placeholder-pfp.jpg') && profilePicture.naturalWidth > 0;
        if (!hasRealImage && (!profilePicture.src || profilePicture.src.includes('placeholder-pfp.jpg'))) {
             profilePicture.src = 'placeholder-pfp.jpg';
        }
    }
}
function triggerFileInput() { console.log("Triggering file input click"); profilePictureInput.click(); }
function handleFile(file) {
    // Basic check at the start
    if (!file || !file.type.startsWith('image/')) {
        console.warn("handleFile: Invalid file type or no file.", file);
        alert("Please select/drop a valid image file (e.g., JPG, PNG, GIF).");
        closePfpModal();
        return;
    }
    console.log("Handling valid file:", file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
        console.log("File read successfully");
        profilePicture.src = e.target.result;
        closePfpModal();
    };
    reader.onerror = () => {
        console.error("Error reading file.");
        alert("Error reading file. Please try again.");
        closePfpModal();
    };
    reader.readAsDataURL(file);
}
function handleImageUpload(event) {
    const file = event.target.files[0];
    console.log("File input changed. File selected:", file ? file.name : 'None (Cancelled)');
    if (file) { handleFile(file); }
    event.target.value = null;
}

// --- Profile Picture Drag/Drop Handlers (CORRECTED) ---
function handlePfpDragOver(e) {
    // MUST prevent default to allow drop
    e.preventDefault();
    if (!isEditing) return; // Check editing status AFTER preventDefault
    console.log("Drag Over PFP container"); // Log activity
    e.dataTransfer.dropEffect = 'copy'; // Visual feedback
    profilePictureContainer.classList.add('dragover');
}

function handlePfpDragLeave(e) {
    // No preventDefault needed here
    if (!isEditing) return;
    // Check if leaving to outside the container vs. a child element
    if (e.relatedTarget && profilePictureContainer.contains(e.relatedTarget)) {
        return;
    }
    console.log("Drag Leave PFP container"); // Log activity
    profilePictureContainer.classList.remove('dragover');
}

function handlePfpDrop(e) {
    // MUST prevent default to stop browser opening file
    e.preventDefault();
    if (!isEditing) return; // Check editing status AFTER preventDefault
    console.log("File dropped on PFP container"); // Log activity
    profilePictureContainer.classList.remove('dragover'); // Clean up style

    const file = e.dataTransfer.files[0]; // Get the first dropped file

    // Process the file using the existing handleFile function
    handleFile(file); // handleFile now includes validation

    closePfpModal(); // Ensure modal is closed after drop attempt
}


// --- Subject Interest Drag/Drop Functions (Keep Existing) ---
let draggedSubject = null;
function enableSubjectDragging() { const blocks = document.querySelectorAll('#subjectOptions .subject-block, #subjectInterestContainer .subject-block'); blocks.forEach(b => { b.draggable = true; b.addEventListener('dragstart', dragStart); b.addEventListener('dragend', dragEnd); }); [subjectInterestContainer, subjectOptions].forEach(c => { c.addEventListener('dragover', dragOver); c.addEventListener('dragenter', dragEnter); c.addEventListener('dragleave', dragLeave); }); subjectInterestContainer.addEventListener('drop', dropOnInterestContainer); subjectOptions.addEventListener('drop', dropOnOptionsContainer); }
function disableSubjectDragging() { const blocks = document.querySelectorAll('#subjectOptions .subject-block, #subjectInterestContainer .subject-block'); blocks.forEach(b => { b.draggable = false; b.removeEventListener('dragstart', dragStart); b.removeEventListener('dragend', dragEnd); }); [subjectInterestContainer, subjectOptions].forEach(c => { c.removeEventListener('dragover', dragOver); c.removeEventListener('dragenter', dragEnter); c.removeEventListener('dragleave', dragLeave); c.classList.remove('drag-over'); }); subjectInterestContainer.removeEventListener('drop', dropOnInterestContainer); subjectOptions.removeEventListener('drop', dropOnOptionsContainer); }
function dragStart(event) { if (!event.target.classList.contains('subject-block')) return; draggedSubject = event.target; event.dataTransfer.setData('text/plain', event.target.dataset.subject); event.dataTransfer.effectAllowed = 'move'; setTimeout(() => { if (draggedSubject) draggedSubject.classList.add('dragging'); }, 0); }
function dragEnd(event) { setTimeout(() => { const currentDragged = document.querySelector('.subject-block.dragging'); if (currentDragged) currentDragged.classList.remove('dragging'); subjectInterestContainer.classList.remove('drag-over'); subjectOptions.classList.remove('drag-over'); draggedSubject = null; }, 0); }
function dragOver(event) { event.preventDefault(); event.dataTransfer.dropEffect = 'move'; }
function dragEnter(event) { event.preventDefault(); const targetContainer = event.target.closest('.subject-interest-container, .subject-options'); if (targetContainer && draggedSubject && !targetContainer.contains(draggedSubject)) targetContainer.classList.add('drag-over'); }
function dragLeave(event) { const targetContainer = event.target.closest('.subject-interest-container, .subject-options'); if (targetContainer && !targetContainer.contains(event.relatedTarget)) targetContainer.classList.remove('drag-over'); if (event.target === subjectInterestContainer || event.target === subjectOptions) event.target.classList.remove('drag-over'); }
function dropOnInterestContainer(event) { event.preventDefault(); const targetContainer = event.target.closest('.subject-interest-container'); if (targetContainer && draggedSubject && !targetContainer.contains(draggedSubject)) targetContainer.appendChild(draggedSubject); targetContainer?.classList.remove('drag-over'); }
function dropOnOptionsContainer(event) { event.preventDefault(); const targetContainer = event.target.closest('.subject-options'); if (targetContainer && draggedSubject && !targetContainer.contains(draggedSubject)) { targetContainer.appendChild(draggedSubject); sortSubjectOptions(); } targetContainer?.classList.remove('drag-over'); }
function sortSubjectOptions() { if (!subjectOptions) return; const options = Array.from(subjectOptions.children); options.sort((a, b) => a.dataset.subject.localeCompare(b.dataset.subject)); options.forEach(option => subjectOptions.appendChild(option)); }
// ------------------------------------------------------


// --- Initialization ---
function initializeProfile() {
    // Assign Standard DOM Element References
    editButton = document.getElementById('editButton');
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
    if (!editButton || !profilePictureContainer || !pfpModal || !modalOverlay || !subjectOptions || !subjectInterestContainer ||!usernameInput || !descriptionTextarea || !profilePicture || !profilePictureInput || !modalCloseButton || !modalChooseFileButton || !modalDragDropButton || !modalMessage ) {
         console.error("Initialization failed: Essential DOM elements missing. Check IDs.");
         return; // Stop initialization
    }

    // Move pre-selected interests
    savedInterests.forEach(interest => {
        const block = subjectOptions.querySelector(`.subject-block[data-subject="${interest}"]`);
        if (block) subjectInterestContainer.appendChild(block);
    });

    resetPfpOverlayState();
    disableSubjectDragging();
    sortSubjectOptions();

    // --- Setup Initial Event Listeners ---
    editButton.textContent = 'Edit Profile'; // Set initial text
    editButton.removeEventListener('click', saveChanges); // Clear potential stale listener
    editButton.addEventListener('click', enableEditing); // Add edit listener

    profilePictureInput.addEventListener('change', handleImageUpload);

    // === Add PFP Drag/Drop Listeners PERMANENTLY ===
    // These need to be active so preventDefault works even before editing starts sometimes
    // The isEditing check inside the handlers will prevent actions when not appropriate
    profilePictureContainer.addEventListener('dragover', handlePfpDragOver);
    profilePictureContainer.addEventListener('dragleave', handlePfpDragLeave);
    profilePictureContainer.addEventListener('drop', handlePfpDrop);

    // Modal Listeners
    modalCloseButton.addEventListener('click', closePfpModal);
    modalOverlay.addEventListener('click', closePfpModal);
    modalChooseFileButton.addEventListener('click', handleModalChooseFile);
    modalDragDropButton.addEventListener('click', handleModalDragDrop);

    console.log("Profile Editor Initialized (Single Button - D&D Corrected)");
}

// --- Run Initialization ---
document.addEventListener('DOMContentLoaded', initializeProfile);