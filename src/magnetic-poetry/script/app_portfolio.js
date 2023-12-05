/*
Updated to fit GitHub Pages
No Node.js, no express, no ajax.
*/

/*
Imported & updated client.js
*/
// Client Program //////////////////////////////////////////////////////////

// Functions //////////////////////////////////////////////////////////

// Word Submission
$(function () {

    // enter key to add
    $("#textInput").keypress(function(e){
        if(e.which == 13){
            e.preventDefault();
            $("#addButton").click();  
        }
    });

    // button to add
    $('#addButton').click(function () {
        // Check if type has target
        if ($("#textInput").val()) {
            addWord($("#textInput").val());
        }
        $("#wordForm")[0].reset();
    });
});

// Dragging words
$(function () {

    // Variables
    let wordTarget;
    let pos1;
    let pos2;
    let pos3;
    let pos4;
    let finalX;
    let finalY;
    let dragging;

    // Mouse pressed down on an element
    $('#board').mousedown(function (event) {

        // Event object, target = the element that fired event
        wordTarget = event.target;

        if (wordTarget.className == "word") { // Check if object is a word

            pos3 = event.clientX; // Initial mouse X
            pos4 = event.clientY; // Initial mouse Y
            dragging = true;
        }
    });

    // Mouse moving with word
    $(document).mousemove(function (event) {
        if (dragging) {

            event.preventDefault();

            // New mouse position
            pos1 = pos3 - event.clientX;
            pos2 = pos4 - event.clientY;
            pos3 = event.clientX;
            pos4 = event.clientY;

            finalX = wordTarget.offsetTop - pos2;
            finalY = wordTarget.offsetLeft - pos1;

            // Set new coordinates
            wordTarget.style.top = finalX + "px";
            wordTarget.style.left = finalY + "px";
        }
    });

    
    // Mouse up
    $(document).mouseup(function (event) {

        // Store word position
        console.log(finalY);
        console.log(finalX);
        updateWord(wordTarget.id, finalY, finalX);

        document.onmouseup = null;
        document.onmousemove = null;
        dragging = false;

        // Check if button is overlapping trash can
        console.log(wordTarget.id);
        console.log("#" + wordTarget.id);
        let rect1 = $("#" + wordTarget.id)[0].getBoundingClientRect();
        let rect2 = $('#trash')[0].getBoundingClientRect();
        if (isOverlapped(rect1, rect2)) {

            // trash word
            trashWord(wordTarget.id)
        }
        console.log("letting go: ", wordTarget);

        // Reset variables
        wordTarget = null;
        pos1 = 0;
        pos2 = 0;
        pos3 = 0;
        pos4 = 0;
        finalX = 0;
        finalY = 0;
    });
});

/* Overlap checking
l1 has the coordinates (top/left) of the upper left corner of the trash can image.
r1 has the coordinates (top/left) of the lower right corner of the trash can image.
l2 has the coordinates (top/left) of the upper left corner of the word button.
r2 has the coordinates (top/left) of the lower right corner of the word button. */
function isOverlapped(rect1, rect2) {
    if (rect1.right < rect2.left) {
        return false;
    }
    if (rect1.left > rect2.right) {
        return false;
    }
    if (rect1.bottom < rect2.top) {
        return false;
    }
    if (rect1.top > rect2.bottom) {
        return false;
    }
    return true;
}


/*
Imported & updated app.js
*/
// Variables
class Word {
    constructor(id, text, x, y) {
        this.id = id;
        this.text = text;
        this.x = x;
        this.y = y;
    }
}

let wordList = [];
let wordsHTML = ""; // HTML string to return to client
let count = 0; // hold indices of wordList

// Functions //////////////////////////////////////////////////////////

function buildBoard() {
    // Empty then rebuild board
    wordsHTML = "";
    $('#board').empty();
    count = wordList.length;
    for (let i = 0; i < wordList.length; i++) {
        if (wordList[i].text) {
            // Ignores any empty words
            wordsHTML +=
                "<button class='word' " +
                "style='left:" + wordList[i].x + "px;" +
                "top:" + wordList[i].y + "px' " +
                "id=" + wordList[i].id +
                ">" +
                wordList[i].text +
                "</button>";
        }
    }
    $('#board').append(wordsHTML);
}

// Functions for GitHub Pages - replace server-side logic
function addWord(text) {
    if (text) {
        wordList[count] = new Word(
            "w" + count++,
            text,
            20, 160 // x, y default position
        );
    } else {
        console.log("Error, no client text to add");
    }
    buildBoard();
}

function updateWord(id, x, y) {
    console.log(wordList);
    // Find matching word and update its coordinates
    for (let i = 0; i < wordList.length; i++) {
        if (wordList[i].id == id) {
            wordList[i].x = x;
            wordList[i].y = y;
        }
    }
    buildBoard();
}

function trashWord(id) {
    // Find matching word and delete it
    for (let i = 0; i < wordList.length; i++) {
        if (wordList[i].id == id) {
            // Delete first item at index
            wordList.splice(i, 1); 
            count--;

            // resort ids
            for(let j = i; j < wordList.length; j++){
                wordList[j].id = "w"+j;
            }
        }
    }
    buildBoard();
}