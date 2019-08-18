'use strict' //singh changes

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
  let questionData, answerHtml, totalHtml;
  questionData = morbidQuestions[number];
  questionData.answers.push(questionData.correctAnswer);
  shuffle(questionData.answers);
  answerHtml = generateAnswerHtml(questionData.answers);
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

//Write html string for each answer
function generateAnswerHtml(answerArr){
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
  questionNum++;
  return question;
}
  $('nextButton').on('click', function(event){
  nextQuestion();
  renderResults();
  resetQuestion();
  $('.nextQuestion').hide();
  $('.submitAnswer').show();
})
 

// submit selected answer
function submitAnswer() {
  $('.submitAnswer').click(function(event) {
    event.preventDefault();
    evaluateUserAnswers();
    $('.nextQuestion').show();
    $('.submitAnswer').hide();
  });
}
//check if answer is correct/incorrect, display correct answer and updated score
let userScore = {
  correct: 0,
  incorrect: 0,
};

function evaluateUserAnswers() {
  if (morbidQuestions[questionNum].correctAnswer) {
    userScore.correct++;
    $('.feedbackCorrect').hide(); 
  } else {
    userScore.incorrect++;
    getCorrectAnswer();
    $('.feedbackIncorrect').hide();
    $('.historyNonfan').hide(); 
  }
  $('.resultsCounter').html(`<p>Correct: ${userScore.correct} | Incorrect: ${userScore.incorrect}</p>`);
}  


//final page with the final score 
function renderResults(){
  $('.submitAnswer').show(); 
  $('.finalPage').hide(); 
  $('.questionPage').show(); 
  let finalScoreText = `<h3>You answered ${userScore.correct} out of 6 questions correctly!</h3>`;
  $('.finalCorrect').append(finalScoreText);

}

//restart quiz, user clicks back to the home page 
function restartQuiz() {
  $('.restart').click(function() {
    location.reload();
  });
}

$(startQuiz());
$(generateQuestionHtml());
$(submitAnswer());
$(nextQuestion());
$(restartQuiz());

