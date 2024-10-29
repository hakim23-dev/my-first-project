// generate letters
const lett='abcdefghijklmnopqrstuvwxyz';

// get array from letters 
let letters=Array.from(lett);

// select letters container
let letterscontainer = document.querySelector(".letters");

// generate letters 
letters.forEach((ele) => {
 let span = document.createElement("span");
 let theletter = document.createTextNode(ele);
 span.appendChild(theletter);
 span.className = "letter-box";
 letterscontainer.appendChild(span);
});

// object of words + categories 
const words={
 programming:['php','javascript','go','scala','fortran','r','mysql','python'],
 movies:['prestige','inception','parasite','intersteller','momento',"coco",'up'],
 people:['albert einstein','hitchcock','alexnader','cleopatra','mahatma ghandi'],
 countries:['syria','palestine','yemen','egypt','bahrain','qatar'],
}

// random proprety
let allkeys=Object.keys(words);

let randompropnum=Math.floor(Math.random()*allkeys.length);
let randompropname = allkeys[randompropnum];
let randompropvalue = words[randompropname];

let randomvaluenum=Math.floor(Math.random()*randompropvalue.length);
// chosen word
let randomvalueval = randompropvalue[randomvaluenum];

// set category info
document.querySelector(".game-info .category span").innerHTML =randompropname;

// select letters guess element
let lettersguess = document.querySelector(".letters-guess");

// convert word to array
let lettersandspace = Array.from(randomvalueval);

// create spans depened on word 
lettersandspace.forEach(ele=>{
  let span = document.createElement("span");
  // if letter is space
  if (ele === " ") {
    // add class
    span.className = "with-space";
  }
  // append to lettersandspace
  lettersguess.appendChild(span);
});
// select guess spans
let guessspans = document.querySelectorAll(".letters-guess span");
// set wrong attempts
let wrongattempt=0;
let correcattempt=0;
// select the draw element
let thedraw = document.querySelector(".hangman-draw");

// handle clicking on letter
document.addEventListener('click',(e)=>{
  // set the chose status
  let thestatus = false;
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");
    // get letter clicked
    let theletterclicked = e.target.innerHTML.toLowerCase();
    // the chosen word
    let chosenword = Array.from(randomvalueval.toLowerCase());

    chosenword.forEach((ele, index) => {
      // the cklicked letter == chosen word
      if (theletterclicked == ele) {
        // set status to correct
        thestatus = true;
        // loop on all guess
        guessspans.forEach((span, spanindex) => {
          if (index === spanindex) {
            span.innerHTML = ele;
          }
        });
        correcattempt++;
      }
    });
    // outside loop;
    // if letter is wrong
    if(thestatus!==true){
     wrongattempt++
     thedraw.classList.add(`wrong-${wrongattempt}`);
     // play fail sound
     document.getElementById('fail').play();
     if(wrongattempt==8){
      endgame();
      letterscontainer.classList.add('finished');
     }
    }else{
     document.getElementById('success').play();
     // check if all letters are found
     if (correcattempt === chosenword.length) {
       successgame(wrongattempt);
       letterscontainer.classList.add("finished");
     }
    }
  }
});

// engame function
function endgame(){
 let div=document.createElement('div');
 let divtext = document.createTextNode(`game over, the word is ${randomvalueval}`);
 div.appendChild(divtext);
 div.className='popup';
 document.body.appendChild(div);
}

function successgame(wrongattempt) {
  let div = document.createElement("div");
  let divtext = document.createTextNode(
    `congratulation, number of mistake is ${wrongattempt}`
  );
  div.appendChild(divtext);
  div.className = "popupsuc";
  document.body.appendChild(div);
}