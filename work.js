const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.score');
const alert =document.querySelector('.alert')
const startBtn =document.querySelector('.startBtn')
const timer =document.querySelector('.timer')

//make an array of objects that stores question, choices of question and asnwer
const quiz = [
    {
        question: "Q. What is JavaScript?",
        choices: ["a) JavaScript is a scripting language used to make the website interactive",
            "b) JavaScript is an assembly language used to make the website interactive",
            "c) JavaScript is a compiled language used to make the website interactive",
            "d) None of the mentioned"],
        answer: "a) JavaScript is a scripting language used to make the website interactive"
    },
    {
        question:"Q. Which of the following is correct about JavaScript?",
        choices:["a) JavaScript is Assembly-language",
            "b) JavaScript is an Object-Based language",
            "c) JavaScript is an Object-Oriented language",
            "d) JavaScript is a High-level language"],
        answer:"b) JavaScript is an Object-Based language"
    },

    {
        question:"Q. Among the given statements, which statement defines closures in JavaScript?",
        choices:["a) JavaScript is a function that is enclosed with references to its inner function scope",
            "b) JavaScript is a function that is enclosed with references to its lexical environment",
            "c) JavaScript is a function that is enclosed with the object to its inner function scope",
            "d) None of the mentioned"],
        answer:"b) JavaScript is a function that is enclosed with references to its lexical environment"
    },

    {
        question:"Q. Arrays in JavaScript are defined by which of the following statements?",
        choices:["a) It is an ordered list of string",
            "b) It is an ordered list of objects",
            "c) It is an ordered list of values",
            "d) It is an ordered list of functions"],
        answer:"c) It is an ordered list of values"

    },

    {
        question:" Which of the following is not javascript data types?",
        choices:["a) Null type",
            "b) Undefined type",
            "c) Number type",
            "d) All of the mentioned"],
        answer:"d) All of the mentioned",
    },
];

// Making variables
let currrentQuestionIndex =0;
let score = 0;
let quizOver = false; 
let timeLeft = 15;
let timerID = null;

//show question
const showQuestions = () =>{
    const questionDetails = quiz[currrentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent ="";
    for (let i=0;i<questionDetails.choices.length;i++){

        const currentChoice = questionDetails.choices[i];
        const choiceDiv =document.createElement('div')
        choiceDiv.textContent =currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);
        choiceDiv.addEventListener('click',()=>{
            if(choiceDiv.classList.contains('selected')){
                choiceDiv.classList.remove('selected')
            }
            else{
                choiceDiv.classList.add('selected')
            }
        });
    }
    if(currrentQuestionIndex < quiz.length){
        startTimer();
    }
}

// function to check answers
const checkAnswer = ()=>{
    const selectedChoice =document.querySelector('.choice.selected');
    // console.log(selectedChoice);
    if (selectedChoice.textContent === quiz[currrentQuestionIndex].answer){
        displayAlert("Correct Answer!");
        score++;
    }
    else{
        displayAlert(`Wrong Answer!  ${quiz[currrentQuestionIndex].answer}.answer is correct`)
    }
    timeLeft=15;
    currrentQuestionIndex++;
    if (currrentQuestionIndex < quiz.length){
        showQuestions();
    }
    else{
        showScore();
        stopTimer();
    }
}

//  function to show score
const showScore = () =>{
    questionBox.textContent="";
    choicesBox.textContent="";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz")
    nextBtn.textContent="Play Again";
    quizOver = true;
    timer.style.display = "none";
}

// function to show alert

const displayAlert=(msg)=>{
    alert.style.display ="block";
    alert.textContent = msg;
    setTimeout(()=>{
        alert.style.display ="none";
        
}, 2000);
}

// function for timer
const startTimer = ()=>{
    clearInterval(timerID);   // check for any exist timers
    timer.textContent = timeLeft;

    const countDown =()=>{
        timer.textContent = timeLeft;
        timeLeft--;
        if(timeLeft === 0){
            const confirmUser = confirm("Time Up!! Do you want play again quiz ");
            if(confirmUser){
                timeLeft = 15;
                startQuiz();
    }
    else{
        startBtn.style.display ="block";
        container.style.display ="none";
        return;
        }
        }
    }
    timerID = setInterval(countDown,1000);
}
 
// function to stop Timer
const stopTimer= ()=>
{
    clearInterval(timerID);
}


// function to shuffle question
const shuffleQuestions = ()=>{
    for(let i=quiz.length-1; i>0; i--){
        const j= Math.floor(Math.random() * i+1);
        [quiz[i],quiz[j]] = [quiz[j],quiz[i]];
    }
    currrentQuestionIndex = 0;
    showQuestions();
}

// start quiz
const startQuiz =()=>{
    timeLeft= 15;
    timer.style.display= "flex";
    shuffleQuestions();
}


// adding eventlisteer to start button
startBtn.addEventListener('click',()=>
{
    startBtn.style.display="none";
    container.style.display="block";
    startQuiz();
});

// show question
nextBtn.addEventListener('click', ()=>{
    const selectedChoice =document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent ==="Next"){
        displayAlert("select Your answer");
        return;
    }
    if(quizOver){
            nextBtn.textContent="Next";
            scoreCard.textContent="";
            currrentQuestionIndex =0;
            quizOver = false;;
            score = 0;
            startQuiz();
    }
    else{
    checkAnswer();
    }
});




















