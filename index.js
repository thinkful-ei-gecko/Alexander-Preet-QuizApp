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
    //nextQuestion(); with this call, when start is clicked it moves onto q2.
  }));
}




//generate questions into HTML, changed from what was originally written
 function generateQuestionHtml(){
  const answer1 = `${morbidQuestions[questionNum].answers[0]}`;
  const answer2 = `${morbidQuestions[questionNum].answers[1]}`;
  const answer3 = `${morbidQuestions[questionNum].answers[2]}`;
  const answer4 = `${morbidQuestions[questionNum].answers[3]}`;
  const questionText = `<legend>${questionNum+1}/6: ${morbidQuestions[questionNum].question}<legend>`;
  const answersText = 
  `<input type='radio' name='option' class='radio-buttons' id='answer1' value='${answer1}'><label for='answer1'>${answer1}</label><br>
  <input type='radio' name='option' class='radio-buttons' id='answer2' value='${answer2}'><label for='answer2'>${answer2}</label><br>
  <input type='radio' name='option' class='radio-buttons' id='answer3' value='${answer3}'><label for='answer3'>${answer3}</label><br>
  <input type='radio' name='option' class='radio-buttons' id='answer4' value='${answer4}'><label for='answer4'>${answer4}</label><br>`;
  $('.historyQuestion').html(questionText);
  $('.historyAnswers').html(answersText);
  submitButton();
}




//Write html string for each answer - may need to change this portion of the code, to fit in with above. 
function generateAnswerHtml(answerArr){
  let answers;
  answerArr.map((answer)=> answers += `
  <li>${answer}</li>
  `).join();
  return answers;
}




// restore submit button after disabling it for next questions
function submitButton() {
  $('input[name=option]').on('click', function(event) {
    $('.submitAnswer').removeClass('disabled').removeAttr('disabled');
  });
}




// next question, kept original function, wrote a new one to see if it would work - needs some tweaking

// function nextQuestion(){
//   let question = generateQuestionHtml(questionNum);
//   $('main').append(question);
//   questionNum++;
//   return question;
//   generateQuestionHtml();
//   renderResults();
//   $('.nextQuestion').hide();
//   $('.submitAnswer').show();
// }

function nextQuestion(){
  $('.nextQuestion').on('click', function(event) {
  if (questionNum < morbidQuestions.length-1) {
    questionNum++;
    generateQuestionHtml();
  } else {
    renderResults();
    $('.nextQuestion').hide();
    $('.submitAnswer').show();
  } 
});
}


// submit selected answer
function submitAnswer() {
  $('.submitAnswer').click(function(event) {
    event.preventDefault();
    evaluateUserAnswers();
    $('.nextQuestion').show();
    //$('.submitAnswer').hide();
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
$(submitButton());

