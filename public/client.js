/*
Author: Shuang Lin
Email: shl224@lehigh.edu
*/

//Client Program //////////////////////////////////////////////////////////

//start of webpage, run below function
$(document).ready(function () {

    //initialize wordList from server
    $.ajax({
        url: '/load',
        type: 'GET',
        success: function(wordsHTML) {

            //empty then rebuild board
            $('#board').empty();
            $('#board').append(wordsHTML);
        }
    });
});

//Functions //////////////////////////////////////////////////////////

//Word Submission
$(function() {
    $('#addButton').click(function() {

        //check if type has target
        if($("#textInput").val()){
        }
        else{
            console.log("no text!"); //debug
        }
        //use ajax call to save to server
        $.ajax({
            type: 'GET',
            url: '/add',
            dataType: 'text',
            data: {
                text: $("#textInput").val()
            },
            success: function(wordsHTML) {
                $('#board').empty();
                $('#board').append(wordsHTML);
            }
        });
        //reset form for next use
        $("#wordForm")[0].reset(); 
    });
});

//Dragging words
$(function(){

    //variables
    let wordTarget;
    let pos1;
    let pos2;
    let pos3;
    let pos4;
    let finalX;
    let finalY;
    let dragging;

    //mouse pressed down on an element
    $('#board').mousedown(function(event){
        
        //event object, target = the element that fired event
        wordTarget = event.target; 

        if(wordTarget.className == "word"){ //check if object is a word

            pos3 = event.clientX; //initial mouse X
            pos4 = event.clientY; //initial mouse Y
            dragging = true;
        }
    });

    //mouse moving with word
    $(document).mousemove(function(event){
        if (dragging) {

            event.preventDefault();
            
            //new mouse position
            pos1 = pos3 - event.clientX;
            pos2 = pos4 - event.clientY;
            pos3 = event.clientX;
            pos4 = event.clientY;

            finalX = wordTarget.offsetTop - pos2;
            finalY = wordTarget.offsetLeft - pos1;

            //set new coordinates
            wordTarget.style.top = finalX + "px";
            wordTarget.style.left = finalY + "px";
        }
    });

    //mouse up
    $(document).mouseup(function(event){
        
        document.onmouseup = null;
        document.onmousemove = null;
        dragging = false;

        //use ajax call to save to server
        $.ajax({
            type: 'GET',
            url: '/save',
            dataType: 'text',
            data: {
                text: wordTarget.textContent,
                x: finalX,
                y: finalY
            },
            success: function() {
                console.log("autosaved"); //debug
            }
        });
        
        //check if button is overlapping trash can
        let rect1 = $("#"+wordTarget.id)[0].getBoundingClientRect();
        let rect2 = $('#trash')[0].getBoundingClientRect();
        if(isOverlapped(rect1, rect2)){
            //ajax call to trash word
            $.ajax({
                type: 'GET',
                url: '/trash',
                dataType: 'text',
                data: {
                    text: wordTarget.textContent,
                    x: finalX
                },
                success: function(wordsHTML) {
                    //empty then rebuild board
                    $('#board').empty();
                    $('#board').append(wordsHTML);
                }
            });
        }
        wordTarget = null;
    });
});

/*Overlap checking
l1 has the coordinates (top/left) of the upper left corner of the trash can image.
r1 has the coordinates (top/left) of the lower right corner of the trash can image.
l2 has the coordinates (top/left) of the upper left corner of the word button.
r2 has the coordinates (top/left) of the lower right corner of the word button. */
function isOverlapped(rect1, rect2) {  
    if(rect1.right < rect2.left){
        return false;
    }
    if(rect1.left > rect2.right){
        return false;
    }
    if(rect1.bottom < rect2.top){
        return false;
    }
    if(rect1.top > rect2.bottom){
        return false;
    }
    return true;  
}