'use strict'

const questionNum = 0;

//start quiz
function startQuiz(){
  $('.quizStart').on('click', (event => {
    console.log('I am working!');
    // $('.quizStart').remove();
    // nextQuestion();
  }));
}

//generate question
function generateQuestion(){
  const questionData = morbidQuestions[questionNum];
  let questionHtml = `
    <section class="section">
        <p>${questionData.question}</p>
    </section>
  `;
}


//next question
function nextQuestion(){
    const question = generateQuestion();
    ++questionNum;
    return question;
}

//check if answer is correct/incorrect
function userAnswerCorrect(){

}

function userAnswerIncorrect(){

}

//update score and question number
function updateScore(){

}

function updateQuestionNumber(){

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

