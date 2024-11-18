const questions=[
    {
    question:"Who invented the computer?",
    answer:[
        {text:"Edison", correct:false},
        {text:"Charles Babbage", correct:true},
        {text:"Newton", correct:false},
        {text:"Ada Lovelace", correct:false},

    ]
    },
    {
    question:"What is the first programming language in the world?",
    answer:[
        {text:"C", correct:false},
        {text:"Java", correct:false},
        {text:"Plankakul", correct:true},
        {text:"fortran", correct:false},
    ]
    },
    {
    question:"Who is called as Father of Programming?",
    answer:[
        {text:"Dennis Ritchie", correct:true},
        {text:"Anders Hejlsberg", correct:false},
        {text:"Guido van Rossum", correct:false},
        {text:"James Gosling", correct:false},
    ]
    },
    {
        question:"What is the fastest programming language?",
        answer:[{text:"Java", correct:false},
        {text:"Python", correct:false},
        {text:"Javascript", correct:false},
        {text:"c++", correct:true},
        ]
    },
]
const questionElement=document.getElementById("question");
const choiceButton=document.getElementById("choiceBtn");
const nextButton=document.getElementById("next");

let currentQuestionIndex=0;
let score=0;
function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestions();
}
function showQuestions(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let currentQuestionNumber=currentQuestionIndex+1;
    questionElement.innerHTML=currentQuestionNumber+". "+currentQuestion.question;

    currentQuestion.answer.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        choiceButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    })

}
function resetState(){
    nextButton.style.display="none";
    while(choiceButton.firstChild){
        choiceButton.removeChild(choiceButton.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(choiceButton.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";

}
function handlenext(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestions();
    }else{
        showScore();
    }
}
startQuiz();
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handlenext();
    }else{
        startQuiz();
    }
})
function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}