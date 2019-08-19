'use strict';

//This should probably be in a function later.


//update score
function updateUserData(){
  $('#correctScore').html(`Correct: ${userScore.correct}`);
  $('#incorrectScore').html(`Incorrect: ${userScore.incorrect}</li>`);
  $('#question-number').html(`Question: ${questionNum + 1} of 6`);
};

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

//Start quiz, update layout for questions and scoring, retrieve first question.
function startQuiz(){
  $('.startButton').on('click', (event => {
    quizStart = $('.quizStart, .quizAbout').detach();
    $('footer').append(`
      <section id= "user-data">
        <span id="correctScore"></span>
        <span id="incorrectScore"></span>
      </section>
        <section id= "question-number">
      </section>
    `);
    nextQuestion(questionNum);
  }));
}

//Generate question, a callback function for nextQuestion().
function renderQuestion(number){
  //Declare variables.
  let questionData, answerHtml, totalHtml;
  //feed the question object into a variable
  questionData = morbidQuestions[number];
  //pushes correct answer onto answers array
  if (questionData.answers.length < 5){
    questionData.answers.push(questionData.correctAnswer);
  }
  //shuffles the array
  shuffle(questionData.answers);
  //creates html string from answers array.
  answerHtml = renderAnswers(questionData.answers);
  //generates html
  totalHtml = `
  <section class="question">
      <p class="questionText">${questionData.question}</p>
  </section>
  <section class="answers">
    <form class="historyForm" id="answerForm">
      <fieldset name="answerSet">
      ${answerHtml}
      <button type="submit" form="answerForm" class="submitAnswer" disabled> Check Answer </button>
      </fieldset>
    </form>
  </section>
  `;
  return totalHtml;
}

function renderAnswers(answerArr){
  //Write html string for each answer to feed into questionHtml.
  let answers = '';
  let i = 1;
  answerArr.map( (answer) => {
    answers += `
        <input type="radio" name="option" class="answer-selector" id="answer${i}" value="${answer}"><label for="answer${i}">${answer}</label><br/>
    `;
    i++;
  }).join();
  return answers;
}

// restore submit button after disabling it for next questions
function submitReady() {
  $('input[name="option"]').on('click', function() {
    //Removes 'selected' class if another label had it already.
    if ($('label').hasClass('selected')) {$('label').removeAttr('class')};
    //Retrieves the id for the checked attribute.
    let selectedID = $('input[name="option"]:checked').attr('id');
    //Retrieves the label given the checked input's id.
    let answerSelect = `label[for=${selectedID}]`;
    //Adds 'selected' class to label.
    $(answerSelect).addClass('selected');
    //Enables submit button.
    $('.submitAnswer').removeAttr('disabled');
  });
  //Listens for submission.
  submitAnswer(userScore);
}


//next question
function nextQuestion(number){
  //If not last question, get next question; else render results.
  if (number <= morbidQuestions.length - 1) {
    //Generate new question html based on questionNum.
    let question = renderQuestion(number);
    //Append to main element.
    $('main').html(question);
    //Update user score and question number.
    updateUserData();
    //Listen for submit.
    submitReady();
  }
}

/* -- ANSWER EVALUATION -- */

// submit selected answer
function submitAnswer() {
  $('.submitAnswer').click(function(event) {
    event.preventDefault();
    let userAnswer = $('input[name=option]:checked').val();
    evaluateUserAnswers(userAnswer);
    console.log(questionNum, morbidQuestions.length);
    let nextButton = '<button type="button" id="nextButton">Next Question</button>';
    if (questionNum === morbidQuestions.length - 1) {
      nextButton ='<button type="button" id="nextButton">Final Results</button>';
    };
    $('main').append(nextButton);    
    $('.submitAnswer').attr('disabled', true);
    $('input[name="option"]').attr('disabled', true);
    //Listen for next button click.
    nextButtonListen();
  });
}

function nextButtonListen() {
  $('#nextButton').on('click', function() {
    //Increment questionNum and calls next question.
    ++questionNum;
    if (questionNum === morbidQuestions.length) {
      $('main').html('');
      renderResults(userScore, assessment);
      $('main').append('<button id="nextButton"> Final Results </button>');
    }
    nextQuestion(questionNum);
    $('#nextButton').remove();
  });
}

// //check if answer is correct/incorrect, display correct answer and updated score

function evaluateUserAnswers(answer) {
  let questionData = morbidQuestions[questionNum];
  let correctAnswer = questionData.correctAnswer;
  let postScript = questionData.postScript;
  let correctValue = `label:contains(${correctAnswer})`;
  console.log(correctValue);
  if (correctAnswer === answer) {
    userScore.correct++;
    userFeedbackCorrectAnswer();
  } else {
    userScore.incorrect++;
    userFeedbackIncorrectAnswer(correctValue);
  }
  $('main').append(`
  <p class="postScript">${postScript}</p>
  `);
  updateUserData();
}  

//generate feedback
function userFeedbackCorrectAnswer(){
  $('main').append('<h2>THIS ANSWER WAS CORRECT</h2>');
  $('.selected').addClass('correct').removeClass('selected').prepend('CORRECT - ');
}

function userFeedbackIncorrectAnswer(value){
  $('main').append('<h2>THIS ANSWER WAS WRONG</h2>');
  $('.selected').addClass('incorrect').prepend('INCORRECT - ');
  $(value).addClass('correct').prepend('CORRECT - ');
}

/* ENDING THE QUIZ */

//prints results html
// function renderResults(score, assessment){
//   let resultGrade;
//   switch (score.correct) {
//   case (score.correct <= 2):
//     resultGrade = assessment[0];
//     break;
//   case (score.correct <= 4):
//     resultGrade = assessment[1];
//     break;
//   case (score.correct <= 6):
//     resultGrade = assessment[2];
//     break;
//   }
//   let resultHtml = `
//     Your Final Grade is ${resultGrade};
//   `;
//   return resultHtml;
// }

 function renderResults(score){
   if (score.correct <=2){
     $('main').html(`<section class="quizResults"><h3>You are minimally morbid.</h3></section>`)
   }
   else if (score.corrent > 2 && score.correct <=4){
     $('main').html(`<section class="quizResults"><h3>You are mostly morbid.</h3></section>`)
   }
   else {
     $('main').html(`<section class="quizResults"><h3>You are maximally morbid.</h3></section>`)
   }
}
  


//restart quiz, user clicks back to the home page 
function restartQuiz() {
  $('.resetButton').click( () => {
    if (quizStart !== '') {
      //Resets attached quizStart elements.
      $('main').html(quizStart);
      //Resets score & question number to default.
      questionNum = 0;
      userScore = {
        correct: 0,
        incorrect: 0,
      };
      $('#user-data, #question-number').remove();
    }
  });
}

//Listeners
$(startQuiz());
$(restartQuiz());