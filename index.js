'use strict'

//This should probably be in a function later.
let questionNum = 0;

//Shuffles an array
function shuffle(array){
  
}

//Start quiz, set questionNum, retrieve first question.
function startQuiz(){
  $('.startButton').on('click', (event => {
    $('.quizStart, .quizAbout').remove();
    nextQuestion(questionNum);
  }));
}

//Generate question, a callback function for nextQuestion().
function generateQuestionHtml(number){
  let questionData = '';
  questionData = morbidQuestions[number];
  generateAnswerHtml(questionData.answers);
  return `
    <section class="question">
        <p class="questionText">${questionData.question}</p>
    </section>
  `;
}

function generateAnswerHtml(answerArr){
  shuffle(answerArr);
  answerArr.forEach((answer )=> console.log(answer));
}

//next question
function nextQuestion(){
  let question = generateQuestionHtml(questionNum);
  $('main').append(question);
  ++questionNum;
  return question;
  console.log(questionNum);
}

$('nextButton').click(event => {
  nextQuestion();
});

//check if answer is correct/incorrect
function userAnswerCorrect(){

}

function userAnswerIncorrect(){

}

//update score
function updateScore(){
  let score = 0;

}

//generate feedback
function userFeedbackCorrectAnswer(){

}

function userFeedbackIncorrectAnswer(){

}

//render result
function renderResults(){

}

//restart quiz
function restartQuiz(){

}

$(startQuiz());

