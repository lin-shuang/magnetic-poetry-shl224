# Homework Assignment 6 - Magnetic Poetry

- Author: Shuang Lin
- Email: shuanglin3359@gmail.com

### CSE 264 – Fall 2022

- Due Thursday, October 27th, 11:59pm

### Description
The assignment is to create a web page that will simulate the "magnetic poetry" that is sold in many bookstores. The background color of the page must be something other than white (be creative). A series of bold faced, black lettered words should appear in white (or some other contrasting color) rectangular boxes. The user of the page must be able to drag and drop the words around the page to create sentences (or other artistic arrangements). The page should contain a single text box and a button with the label “Add Word” in the upper left corner of the page. When the user types some text in the box and clicks the button, a new “magnetic” word should appear on the page. The page will also contain an icon for a trash can near the top of the page. When the user drags and drops a word on the trash can icon, the word is removed from the board. When the page is closed all words must be written to permanent storage including their positions on the screen and restored when the page is reloaded. All the dom manipulation and event handling must be done using jQuery.
Instructions
Setup

1. In the repo working folder:
   1. Run npm init. Use the defaults except for:
      1. package name: poetry
      2. description:: Magnetic Poetry App
      3. entry point: app.js
      4. author: enter your name and email, eg. James Femister <jaf207@lehigh.edu>

         Edit package.json with VSC and in the scripts section replace
         "test": "echo \"Error: no test specified\" && exit 1"
         with
         "start": "node app.js"
   2. Install express using the --save option.
2. Create files to hold the css and js and put them in the public folder along with the index.html file. Put all your css and js in these files.
   2a. Make sure you have a comment in each file with your name, etc.
   2b. The app.js script provided with the initial repo is set up to load these files from the public folder when requested.
3. Commit with a comment of "Initial commit" and push to github.
   Create and Move Words
4. Trap the onclick event of the Add Word button so that when you type some text in the text box and click Add Word:
5. a new button element is created using createElement (or the jQuery equivalent) containing the text entered in the box in bold
6. the button is placed near the upper left corner of the screen
7. the text box is blanked.
8. set the css position style to "absolute".
9. You will need to trap the mousedown, mousemove and mouseup events on each button.
   1. mousedown:
      1. Get a reference to the button
      2. Save the reference to the button in a global variable
      3. Calculate and save the x and y offsets within the button of the mouse cursor
         Hint: you'll need to use the clientX and clientY properties of the event and the offsetTop and offsetLeft properties of the button objects.
   2. mousemove:
      1. If the button reference (set in 5.1.2) isn't null
         1. move the button to its new position by changing its top and left styles
   3. mouseup
      1. Set the button reference to null
10. Once you have buttons being created and dragged around: Commit with a comment of "Buttons created and moving" and push to github.
    Trash Can
11. Place a trash can icon (provided) near the top of the screen, next to the Add Word button. Trap the drop event onto the icon and remove the dropped button from the dom (and the page). You can't just make it invisible; it has to be removed from the dom.
12. Once you can "trash" your buttons: Commit with a comment of "Trash buttons" and push to github.
    Save and Restore
13. Trap the page unload event. In the handler:
14. Select all the words on the page and write them to permanent storage, including the text on the button and the coordinates of the button on the page.
15. When the page is reloaded, read the list of words from storage and recreate the buttons in the positions they were last found.
16. You may use the localStorage feature discussed in class on Wed. This is a change from what I discussed in class on Monday.
17. Once your save and restore is working: Commit with a comment of "Save and Restore" and push to github.

Want some extra credit to make up for lost points on prior homeworks? You have to all the base features shown above before doing the extra credit. If you do one or more extra credit, commit each one with a comment indicating which extra credit it is and commit to github. Each is worth 25 points. In otherwords you can make up for an entire homework if you do all four.

1. Allow the users to create different color buttons. If you do this you will need to save and restore this information along with the text and position of each button.
2. Allow the users to resize the buttons. If you do this you will need to save and restore this information along with the text and position of each button.
3. Provide two buttons (Bounce and Stop) that cause the words to bounce around the screen and to stop bouncing just like in the bouncing balls demo. You may copy whatever code you like from the demo. The save and restore must restore the buttons to their positions after they stop bouncing.
4. Instead of saving the button into to localStorage, use an Ajax call to save it to the server (node script) and reload it from there.

### Grading Rubric

1. (5 pts) All files have indicated comments.
2. (5 pts) package.json is present and has indicated values.
3. (5 pts) Css and js are in the designated files.
4. (5 pts) All the indicated commits (with the given comments) and pushes have been done.
5. (20 pts) The Add Word button works as described above and demoed in class.
6. (30 pts) The buttons can be dragged around as described above and demoed in class.
7. (15 pts) The Trash Can works as described above and demoed in class.
8. (15 pts) Save and restore must work as described above.
