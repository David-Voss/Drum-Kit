// === DOM REFERENCES & CONSTANTS ===

// Select all drum buttons on the page
const drumButtons = document.querySelectorAll("button.drum");


// === INITIALISATION ===

init();

function init() {
    registerEventListeners();

    // Ensure buttons are visually reset even when mouse/touch leaves the button before release
    registerReleaseCleanup("mouseup");
    registerReleaseCleanup("touchend");
}


// === EVENT LISTENER SETUP ===

// Register all relevant event listeners for each button
function registerEventListeners() {
    drumButtons.forEach(function (btn) {
    // Play sound on click
    addButtonListener(btn, "click", setUpSound);

    // Visual feedback on press (mouse or touch)
    addButtonListener(btn, "mousedown", setButtonpressedStyle);
    addButtonListener(btn, "mouseup", setButtonReleasedStyle);
    addButtonListener(btn, "touchstart", setButtonpressedStyle);
    addButtonListener(btn, "touchend", setButtonReleasedStyle);    
    });

    // Register keyboard-based sound and visual effects
    addDocumentListener(document, "keydown", setButtonpressedStyle);
    addDocumentListener(document, "keyup", setButtonReleasedStyle, addSoundToButtons);
}

// Ensures that all buttons are reset visually even if mouse or touch is released outside the button
function registerReleaseCleanup(event) {
    document.addEventListener(event, () => {
        drumButtons.forEach(setButtonReleasedStyle);
    });
}


// === LOGIC FUNCTIONS ===

// Plays a sound corresponding to the specified key (e.g. 'w' → Tom-1)
function addSoundToButtons(switchKey) {
    switch (switchKey) {
        case "w":
            initSound("./sounds/tom-1.mp3");
            break;
        case "a":
            initSound("./sounds/tom-2.mp3");
            break;
        case "s":
            initSound("./sounds/tom-3.mp3");
            break;
        case "d":
            initSound("./sounds/tom-4.mp3");
            break;
        case "j":
            initSound("./sounds/snare.mp3");
            break;
        case "k":
            initSound("./sounds/crash.mp3");
            break;
        case "l":
            initSound("./sounds/kick-bass.mp3");
            break;            
        default:
            break;
    }
}

// Instantiates a new audio object and plays it
function initSound(soundSource) {
    const drumSound = new Audio(soundSource);
    drumSound.play();
}


// === EVENT HANDLERS ===

// Retrieves the assigned key from the clicked button and triggers the associated sound
function setUpSound(btn) {
    const key = btn.dataset.key;
    addSoundToButtons(key);  
}

// Adds the CSS class '.pressed' when a button is active
function setButtonpressedStyle(btn) {
    btn.classList.add("pressed");
}

// Removes the CSS class'.pressed' when a button is released
function setButtonReleasedStyle(btn) {
    btn.classList.remove("pressed");
}


// === UTILITY FUNCTIONS ===

// Adds an event listener to a button and applies a callback when triggered
function addButtonListener(element, event, execution) {
    element.addEventListener(event, () => execution(element));
}

// Creates a global keyboard listener that identifies the pressed button by key and calls callback functions
function addDocumentListener(element, event, execution, ...additionalExecution) {
    element.addEventListener(event, function (e) {
        const key = e.key.toLowerCase();
        const btn = element.querySelector(`button.drum[data-key="${key}"]`);
        if (btn) {
            execution(btn);
            additionalExecution.forEach(fn => fn(key));
        }
    });
}