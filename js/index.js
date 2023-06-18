///select Elements
let countspan = document.querySelector(".count span");
let bullets = document.querySelector(".bullets");
let bulletsSpanContainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitBtn = document.querySelector(".submit-button");
let resultsContainer = document.querySelector (".results");
let countdownElement = document.querySelector('.countdown');


// set Options
let currentIndex = 0;
let rightAnswers = 0;
let countdownInterval;



function getQuestions(){
    
    let myRequest = new XMLHttpRequest();

myRequest.onreadystatechange= function(){
    if(this.readyState === 4 && this.status === 200){
        let questionObject = JSON.parse(this.responseText)
       let qCount = questionObject.length;
       //create Bullets + set Questions count
       createBullets(qCount);
       //add questsion data 
       addQuestsionData(questionObject[currentIndex],qCount);

       countDown(10,qCount);


submitBtn.onclick = () => {
           let Rightanswer = questionObject[currentIndex].right_answer;
           currentIndex++;
           checkAnswer(Rightanswer,qCount)
           quizArea.innerHTML = '';
           answersArea.innerHTML = '';
           addQuestsionData(questionObject[currentIndex],qCount);
       handleBulets();
       clearInterval(countdownInterval);
       countDown(10,qCount);
        showResults(qCount);
       }
    }
}
    myRequest.open("GET","questions.json", true);
    myRequest.send();
}
getQuestions();
function createBullets(num){
    countspan.innerHTML = num;
    //create spans
    for(let i = 0;i<num;i++){
        let theBulet = document.createElement("span");
        if(i === 0 ){
            theBulet.className = "on";
        }
        bulletsSpanContainer.appendChild(theBulet)
    }
}

function addQuestsionData(obj,count){
   if(currentIndex <count ){
    
    let questionTitle = document.createElement("h2");
    let questionText = document.createTextNode(obj["title"]);
    questionTitle.appendChild(questionText);
    quizArea.appendChild(questionTitle);
 
    for(let i = 1;i<=3;i++){
        let mainDiv = document.createElement("div")
        mainDiv.className = "answer";
        let radioInput = document.createElement("input");
        radioInput.name ="question";
        radioInput.type ="radio";
        radioInput.id =`answer_${i}`;
        radioInput.dataset.answer = obj[`answer_${i}`]|| obj['right_answer'];
        if(i === 1){
            radioInput.checked = true;
        }
        //create laabale
        let thelabel = document.createElement("label");

         // add for attribute
         thelabel.htmlFor = `answer_${i}`;
        let thelabelText = document.createTextNode(obj[`answer_${i}`] || obj['right_answer']);
        thelabel.appendChild(thelabelText);
        mainDiv.appendChild(radioInput);
        mainDiv.appendChild(thelabel);
    answersArea.appendChild(mainDiv);
    }
   }
}
function checkAnswer(rAnswer,count){
    let answers = document.getElementsByName("question");
    let theChoosenAnswer;
    for (let i =0;i<answers.length;i++){
        if(answers[i].checked){
            theChoosenAnswer= answers[i].dataset.answer;
        }
    }
    if(rAnswer === theChoosenAnswer){
        rightAnswers++;
       
    }
    
}
 function handleBulets(){
    let bulletsSpans = document.querySelectorAll(".bullets .spans span");
    let arrayofSpans = Array.from(bulletsSpans);
    arrayofSpans.forEach((span,index) =>{
        if(currentIndex === index){
            span.className = "on";
        }
    })
 }
 function showResults (count) {
    let theResults;
    if( currentIndex === count) {
       quizArea.remove();
       answersArea.remove();
       submitBtn.remove();
        bullets.remove();
        if(rightAnswers > (count /2) && rightAnswers < count){
            theResults = `<span class="good">perfect</span>,${rightAnswers}From${count} ,<i class="fas fa-smile-beam text-warning fa-bounce"></i> `;
        }else if( rightAnswers === count){
            theResults = `<span class="perfect">Perfect</span> ,All Answer Is Right WELL DONe`;    
        }else {
            theResults = `<span class="bad">not good try again</span> ,${rightAnswers}From${count}good luck try again`;    
        }
        resultsContainer.innerHTML =theResults;
    }
 }

 //countdownInterval
 function countDown (duration,count){
if(currentIndex<count){
let minutes,seconds;
countdownInterval = setInterval(function(){
minutes = parseInt(duration / 60);
seconds = parseInt(duration %60);

minutes = minutes < 10?`0${minutes}`:minutes;
seconds = seconds < 10?`0${seconds}`:seconds;


countdownElement.innerHTML = `${minutes}:${seconds}`;
if(--duration <0){
    clearInterval(countdownInterval);
   submitBtn.click();
}
},1000)
}
 }

 // digital watch

 function displayTime() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    var meridiem = "AM";
  
    // Convert from 24 hour to 12 hour format
    if (hours > 12) {
      hours = hours - 12;
      meridiem = "PM";
    }
  
    // Add leading zeros to minutes and seconds
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
  
    // Display the time
    var clockDiv = document.getElementById("clock");
    clockDiv.innerText = hours + ":" + minutes + ":" + seconds + " " + meridiem;
  }
  
  // Update the time every second
  setInterval(displayTime, 1000);

