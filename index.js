'use strict';

//This should probably be in a function later.
let questionNum = 0;
let userScore = {
  correct: 0,
  incorrect: 0,
};
let quizStart = '';

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
    quizStart = $('.quizStart, .quizAbout').detach();
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
    <form class='historyForm'>
      <fieldset name='answerSet'>
      ${answerHtml}
      <button type='button' class='submitAnswer' disabled> Check Answer </button>
      </fieldset>
    </form>
  </section>
  `;
  return totalHtml;
}

function generateAnswerHtml(answerArr){
  //Write html string for each answer to feed into questionHtml.
  let answers = '';
  let i = 1;
  answerArr.map( (answer) => {
    answers += `
        <input type='radio' name='option' class='answer-selector' id='answer${i}' value='${answer}'><label for='answer${i}'>${answer}</label><br/>
    `;
    i++;
  }).join();
  return answers;
}

// restore submit button after disabling it for next questions
function submitReady() {
  $('input[name=option]').on('click', function(event) {
    $('input[name=option]:checked').addClass('selected');
    $('.submitAnswer').removeAttr('disabled');
    console.log('foo');
  });
}


//next question
function nextQuestion(){
  //Remove the current question.
  //If not last question, get next question; else render results.
  if (questionNum < morbidQuestions.length - 1) {
    //Generate new question html based on questionNum.
    let question = generateQuestionHtml(questionNum);
    //Append to main element.
    $('main').html(question);
    //Increment questionNum so it calls next question.
    ++questionNum;
    return question;
  } else {
    $('main').html('<h3>renderResults() content will go here</h3>');
  }
}

/* -- ANSWER EVALUATION -- */

// submit selected answer
function submitAnswer() {
  let userAnswer = $('input[name="option"]:checked').val();
  $('.submitAnswer').click(function(event) {
    event.preventDefault();
    evaluateUserAnswers();
    $('.nextQuestion').show();    
    $('.submitAnswer').remove();
  });
}

$('nextButton').click(event => {
  $(main).html(nextQuestion);
});

// //check if answer is correct/incorrect, display correct answer and updated score

function evaluateUserAnswers() {
  let correctAnswer = morbidQuestions[questionNum].correctAnswer;
  if (correctAnswer === userAnswer) {
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

// //update score
// function updateScore(){

// }

// //generate feedback
// function userFeedbackCorrectAnswer(){

// }

// function userFeedbackIncorrectAnswer(){

// }

// //render result
// function renderResults(){

// }

//restart quiz, user clicks back to the home page 
function restartQuiz() {
  $('.resetButton').click( () => {
    $('main').html(quizStart);
    userScore = {
      correct: 0,
      incorrect: 0,
    };
  });
}

$(startQuiz());
$(restartQuiz());
$(submitReady());

