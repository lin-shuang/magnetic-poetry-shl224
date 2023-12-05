/*
Author: Shuang Lin
Email: shl224@lehigh.edu
*/

//Server Program //////////////////////////////////////////////////////////

//initialize express
const express = require("express");
const path = require("path");
const app = express();
app.set("views", path.resolve(__dirname, "public"));
app.set("view engine", "ejs");
app.use(express.static(__dirname));

//variables
class Word{
    constructor(id, text, x, y){
        this.id = id;
        this.text = text;
        this.x = x;
        this.y = y;
    }
}
let wordList = [];
let wordsHTML = ""; //HTML string to return to client
let count = 0;      //hold indices of wordList

//Router default
app.get('/', function (req, res) {
  
    //render ejs viewer and respond a new url
    res.render('index.ejs', {url: '/load'});
});

//Router load
app.get('/load', function (req, res) {

    buildBoard();

    //send to browser's ajax success call
    res.end(wordsHTML);
});

//Router add
app.get('/add', function (req, res) {

    if(req.query.text){
        wordList[count] = new Word(
            'w'+count++,
            req.query.text, //text
            20, 160, //x, y default position
        );
    }
    else{
        console.log("Error, no client text to /add");
    }
    buildBoard();
    res.end(wordsHTML);
});

//Router close
app.get('/save', function (req, res) {

    //find matching word and update its coordinates
    for(let i = 0; i < wordList.length; i++){
        if(wordList[i].text == req.query.text){
            wordList[i].x = req.query.x;
            wordList[i].y = req.query.y;
        }
    }

    buildBoard();
    res.end(wordsHTML);
});

//Router trash
app.get('/trash', function (req, res) {

    //find matching word and delete it
    for(let i = 0; i < wordList.length; i++){
        
        if(wordList[i].text == req.query.text && wordList[i].x == req.query.x){
            wordList.splice(i, 1); //delete first item at index
            count--;
        }
    }
    buildBoard();
    res.end(wordsHTML);
});

//listen on port 3000
app.listen(3000, () => console.log("Starting up Magnetic Poetry"));

//Functions //////////////////////////////////////////////////////////

function buildBoard(){
    //empty then rebuild board
    wordsHTML = "";
    count = wordList.length;
    for(let i = 0; i < wordList.length; i++){
        if(wordList[i].text){ //ignores any empty words
            wordsHTML += "<button class='word' "+
            "style='left:"+ wordList[i].x +"px;"+
                    "top:"+ wordList[i].y +"px' "+
            "id='w" + i +
            "'>"+
            wordList[i].text+
            "</button>";
        }
    }
}