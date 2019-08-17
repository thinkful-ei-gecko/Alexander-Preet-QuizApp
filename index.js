'use strict'

//This should probably be in a function later.
let questionNum = 0;

/* Shuffles an array based on Fisher-Yates algorithm:
* https://gomakethings.com/how-to-shuffle-an-array-with-vanilla-js/
* It iterates from the last to first item in the array,
* storing the value from the current index (currentIndex), swapping that value with
* that of a random remaining index (randomIndex), and then replacing that index's
* value with the stored one.
*/
function shuffle(arr){
  
  let currentIndex = arr.length;
  let temporaryValue, randomIndex;
  
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }
  return arr;
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
  //Declare variables.
  let questionData, answerHtml, totalHtml;
  //feed the question object into a variable
  questionData = morbidQuestions[number];
  //pushes correct answer onto answers array
  questionData.answers.push(questionData.correctAnswer);
  //shuffles the array
  shuffle(questionData.answers);
  //creates html string from answers array.
  answerHtml = generateAnswerHtml(questionData.answers);
  //generates html
  totalHtml = `
  <section class="question">
      <p class="questionText">${questionData.question}</p>
  </section>
  <section class="answers">
    <ul>${answerHtml}</ul>
  </section>
  `;
  return totalHtml;
}

function generateAnswerHtml(answerArr){
  //Write html string for each answer.
  let answers;
  answerArr.map((answer )=> answers += `
  <li>${answer}</li>
  `).join();
  return answers;
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

