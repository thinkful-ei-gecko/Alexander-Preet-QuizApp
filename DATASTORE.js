'use strict';

/*
* Title: Questions
* Description: This .js file contains objects that hold the questions. There are currently 5 questions.
* To Do:
*   - Test if  refers to the proper property.
*
*/

let questionNum = 0;
let userScore = {
  correct: 0,
  incorrect: 0,
};
let quizStart = '';

/**
* @type {Array} An array that holds a number of objects, which in turn define the properties of each question.
* @constant
*/
const morbidQuestions = [
  /*
   * @property {String} question  The text of the question. 
   * @property {String} correctAnswer The text of the correct answer.
   * @property {Array} answers An array containing five options per question, including the correct answer as .
   * @property {String} postScript Text to be posted below answers after a question is guessed containing additional trivia.
   */
  {
    question: `Maximilien Robespierre was a definitive figure in the French Revolution and the terror and misery that followed it. Like many of his peers, he met a grisly end by guillotine on July 28, 1794.
    </p><p class="questionText">
    He had recently sustained an injury that complicated his execution. His injury is listed here among other injuries that may have beset other revolutionary figures.
    </p><p class="questionText">
    What was the nature of this injury?`,
    correctAnswer: 'A gunshot wound to his jaw.',
    answers: [
      'Contusions to the head and pelvis from falling on bayonets.',
      'A lost left eye after falling from a building.',
      'A terrible breakout on most of his body from a skin condition.',
      'An arrow injury to the knee, which prevented him from being an adventurer like you.'
    ],
    postScript: 'When the bandages were removed from his jaw to help his head fit in the guillotine, he was said to have screamed in agony until the blade fell.'
  },

  { 
    question: `H.H. Holmes was an infamous American serial killer who was active on site during the 1893 Chicago World\'s Fair. Although rumored to have killed dozens, it is more likely his final tally was below 10 victims.
    </p><p class="questionText">
    Many legends surround his \'Murder Castle\', a building with shops and residential space that hid strange mechanisms, passages and traps that helped facilitate his crimes.
    </p><p class="questionText">
    Which of the following bizarre features was <strong>NOT</strong> included when the \'castle\' was built?`,
    correctAnswer: 'A partially-completed underground tunnel to a neighboring building, where he was caught trying to hide.',
    answers: [
      'A room filled with gas fixtures where he could easily execute victims.',
      'An alarm system hooked up to every resident\'s door so Holmes could track their movements.',
      'A hidden room under his apartment connected to a long chute that led to the basement.',
      'A cellar with a crematorium, where Holmes dismembered his victims and sold their body parts.'
    ],
    postScript: 'Although he never built a tunnel, he started to build a hotel on the top floor. The whole thing was later destroyed by a fire.'
  },

  { 
    question: `In July of 2018, Shoko Asahara, leader of the Aum Shinrikyo cult, was executed along with his conspirators for crimes including a 1995 Sarin attack on the Tokyo subway.
    </p><p class="questionText">
    In preparation for the end of the world, the cult had access to a terrifying array of weaponry and technology thanks to the vast connections of its worldwide membership.
    </p><p class="questionText">
    Which of the following was in that arsenal?`,
    correctAnswer: 'A Russian-made military helicopter.',
    answers: [
      'Dozens of bullet-proof vests.',
      'Samples of weaponized bubonic plague.',
      'Five contraband AK47 assault rifles',
      'Blueprints for a anti-aircraft gun.'
    ],
    postScript: 'The cult was said to still have a substantial following in Russia, around 30,000 people in 2016.'
  },

  {
    question: `Although it was forgotten for many years after opening in 1786, the Catacombs of Paris opened to public visitation 88 years later and eventually became a popular tourist site.
    </p><p class="questionText">
    It was originally constructed as a burial alternative for the overwhelming numbers of dead citizens. There were enough to cause multiple mine cave-ins and the collapse of a basement wall near Les Innocents.
    </p><p class="questionText">
    About how many people\'s remains are the Catacombs estimated to hold?`,
    correctAnswer: '6 million',
    answers: [
      '4 million',
      '12 million',
      '10 million',
      '8 million'
    ],
    postScript: 'There is, naturally, a well-reviewed gift shop at the site, as well as a McDonald\'s five minutes away if you get hungry.'
  },

  {
    question: `Gaius Julius Caesar, better known as Caligula, came to power as Rome\'s Emperor on March 17th, 37 CE. He was protected by the Praetorian Guard, an elite unit of soldiers that acted as the Emperor\'s personal bodyguards.
    </p><p class="questionText">
    Caligula's reportedly perverse behavior and harsh actions against the Senate and upper crust of Roman society led to his speedy assassination by some of the guards who were supposed to protect him. He wasn\'t the last to meet his fate this way.
    </p><p class="questionText">
    How many Roman emperors in total were assassinated by the Praetorian Guard?`,
    correctAnswer: '13',
    answers: [
      '5',
      '16',
      '4',
      '10'
    ],
    postScript: 'The nickname \'Caligula\' was earned when he went campaigning in Germanania with his father. It stands for \'little soldier\'s boots\' and was perhaps used as both a loving pet name and a patronizing insult.'
  },

  {
    question: `Eugene Francois Vidocq was the first known private detective. His many contributions to forensics and criminology include ballistic analysis, undercover work and plaster casts of shoe prints.
    </p><p class="questionText">
    However, in his early years he was something of a career criminal, which kept him from being fully accepted by many in turn-of-the-19th-century French society. He was imprisoned multiple times, but found numerous ways to escape justice.
    </p><p class="questionText">
    Which of these was <strong>NOT</strong> a way in which Vidocq escaped from the law?`,
    correctAnswer: 'Forging release documents for himself.',
    answers: [
      'Jumping out a window.',
      'Disguising himself as a nun.',
      'Hiding amongst mourners in a funeral procession on the suggestion of a nearby prostitute.',
      'Disguising himself as a sailor.'
    ],
    postScript: 'Vidocq didn\'t successfully forge release documents for himself, but he DID do it to help out a peasant who had been imprisoned for stealing grain. His action inspired a certain character in Victor Hugo\'s Les Miserables.'
  }
];

// let assessment = [
//   {
//     grade: 2,
//     assessmentText: 'You are minimally morbid.',
//     imgSrc: '',
//     imgAlt: 'A skull bored by how minimally morbid you are.'
//   },
//   {
//     grade: "b",
//     assessmentText: 'You are moderately morbid.',
//     imgSrc: '/images/moderately.png',
//     imgAlt: 'A skull looking concerned by how moderately morbid you are.'
//   },
//   {
//     grade: "a",
//     assessmentText: 'You are maximally morbid.',
//     imgSrc: '/images/maximally.png',
//     imgAlt: 'A skull absolutely horrified at your extreme morbidity.'
//   },
// ];