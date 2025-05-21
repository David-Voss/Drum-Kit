const drumButtons = document.querySelectorAll("button.drum");

// Event listener for all buttons
drumButtons.forEach(function (btn) {
    addButtonListener(btn, "click", setUpSound);

    addButtonListener(btn, "mousedown", setButtonpressedStyle);
    addButtonListener(btn, "mouseup", setButtonReleasedStyle);

    addButtonListener(btn, "touchstart", setButtonpressedStyle);
    addButtonListener(btn, "touchend", setButtonReleasedStyle);    
});

// Event listener for keyboard
addDocumentListener(document, "keydown", setButtonpressedStyle);
addDocumentListener(document, "keyup", setButtonReleasedStyle, addSoundToButtons);

// Falls Maus außerhalb eines Buttons losgelassen wird
registerReleaseCleanup("mouseup");
registerReleaseCleanup("touchend");

// Adds sounds to the corresponding buttons
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

// Creates a new audio object and plays it
function initSound(soundSource) {
    let drumSound = new Audio(soundSource);
    drumSound.play();
}

// Auxiliary functions
function setUpSound(btn) {
    const key = btn.dataset.key;
    addSoundToButtons(key);  
}

function setButtonpressedStyle(btn) {
    btn.classList.add("pressed");
}

function setButtonReleasedStyle(btn) {
    btn.classList.remove("pressed");
}

function addButtonListener(element, event, execution) {
    element.addEventListener(event, () => execution(element));
}

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

function registerReleaseCleanup(event) {
    document.addEventListener(event, () => {
        drumButtons.forEach(setButtonReleasedStyle);
    });
}