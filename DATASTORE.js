'use strict';

/*
* Title: Questions
* Description: This .js file contains objects that hold the questions. There are currently 5 questions.
* To Do:
*   - Test if this.correctAnswer refers to the proper property.
*
*/

/**
* @type {Array} An array that holds a number of objects, which in turn define the properties of each question.
* @constant
*/
const morbidQuestions = [
  /**
   * @property {String} question  The text of the question. 
   * @property {String} correctAnswer The text of the correct answer.
   * @property {Array} answers An array containing five options per question, including the correct answer as this.correctAnswer.
   * @property {String} postScript Text to be posted below answers after a question is guessed containing additional trivia.
   */
  {
    question: 'Maximilien Robespierre was a definitive figure in the French Revolution and the terror and misery that followed it. Like many of his peers, he met a grisly end by guillotine on July 28, 1794. He had recently sustained an injury that complicated his execution. His injury is listed here among other injuries that may have beset other revolutionary figures. What was the nature of this injury?',
    correctAnswer: 'A gunshot wound to his jaw.',
    answers: [
      this.correctAnswer,
      'Contusions to the head and pelvis from falling on bayonets.',
      'A lost left eye after falling from a building.',
      'A terrible breakout on most of his body from a painful, lifelong skin condition, exacerbated by a stab wound.',
      'An arrow injury to the knee, which prevented him from being an adventurer like you.'
    ],
    postScript: 'When the bandages were removed from his head, he was said to have screamed in agony until the guillotine blade fell.'
  },

  { 
    question: 'H.H. Holmes was an infamous American serial killer who was active on site during the 1893 Chicago World\'s Fair. Although rumored to have killed dozens, it is more likely his final tally was below 10 victims. Many legends surround his \'Murder Castle\', a building with shops and residential space that hid strange mechanisms, passages and traps that helped facilitate his crimes. Which of the following bizarre features was NOT included when the \'castle\' was built?',
    correctAnswer: 'A partially-completed underground tunnel to a neighboring building, where he was caught trying to hide.',
    answers: [
      this.correctAnswer,
      'A room filled with gas fixtures where he could easily execute victims.',
      'An alarm system hooked up to every resident\'s door so Holmes could track their movements.',
      'A hidden room under his apartment connected to a long chute that led to the basement.',
      'A cellar with a crematorium, where Holmes dismembered his victims and sold their body parts.'
    ],
    postScript: 'He started to build a hotel as an addition during the World\'s Fair, but jilted furniture suppliers helped publish an exposé after seeing the suspicious rooms. The whole thing was later destroyed by a fire.'
  },

  { 
    question: 'In July of 2018, Shoko Asahara, leader of the Aum Shinrikyo cult, was executed along with his conspirators for crimes including a 1995 Sarin attack on the Tokyo subway. In preparation for the end of the world, the cult had access to a terrifying array of weaponry and technology thanks to the vast connections of its worldwide membership and the delusional paranoia of its leader. Which of the following was in that arsenal?',
    correctAnswer: 'A Russian-made military helicopter.',
    answers: [
      this.correctAnswer,
      'Dozens of bullet-proof vests.',
      'Samples of weaponized bubonic plague.',
      'Five contraband AK47 assault rifles',
      'Blueprints for a anti-aircraft gun.'
    ],
    postScript: 'The cult was said to still have a substantial following in Russia, around 30,000 people in 2016.'
  },

  {
    question: 'Although it was forgotten for many years after opening in 1786, the Catacombs of Paris opened to public visitation 88 years later and eventually became a popular tourist site. It was originally constructed as a critical alternative to the overwhelming numbers of dead citizens buried in major parishes. The problem was enough to compromise the city\'s foundations, illustrated vividly by multiple mine cave-ins and the collapse of a basement wall near Les Innocents. About how many people\'s remains are the Catacombs estimated to hold?',
    correctAnswer: '6 million',
    answers: [
      this.correctAnswer,
      '4 million',
      '12 million',
      '10 million',
      '8 million'
    ],
    postScript: 'There is, naturally, a well-reviewed gift shop at the site, as well as a McDonald\'s five minutes away if you get hungry.'
  },

  {
    question: 'Gaius Julius Caesar, better known as Caligula, came to power as Rome\'s Emperor on March 17th, 37 CE. He was protected by the Praetorian Guard, an elite unit of soldiers that acted as the Emperor\'s personal bodyguards. Although at first Caligula was extremely popular amongst the commoners, his reportedly perverse behavior and harsh actions against the Senate and upper crust of Roman society led to his assassination a few years later by some of the very same guards who were supposed to protect him. He wasn\'t the last to meet his fate this way. How many Roman emperors in total were assassinated by the Praetorian Guard?',
    correctAnswer: '13',
    answers: [
      this.correctAnswer,
      '5',
      '16',
      '4',
      '10'
    ],
    postScript: 'The nickname \'Caligula\' was earned when he went campaigning in Germanania with his father. It stands for \'little soldier\'s boots\' and was perhaps used as both a loving pet name and a patronizing insult.'
  },

  {
    question: 'Eugene Francois Vidocq was the first known private detective, and his chaotic early life and eventual redemption helped inspired Victor Hugo to write Les Miserables. His many contributions to forensics and criminology include ballistic analysis, the entire concept of undercover work and plaster casts of shoe prints. However, in his early years he was something of a career criminal, which kept him from being fully accepted by many in turn-of-the-19th-century French society. He was imprisoned multiple times, but found numerous ways to escape justice. Which of these was NOT a way in which Vidocq escaped from the law?',
    correctAnswer: 'Forging release documents for himself.',
    answers: [
      this.correctAnswer,
      'Jumping out a window.',
      'Disguising himself as a nun.',
      'Hiding amongst mourners in a funeral procession on the suggestion of a nearby prostitute.',
      'Disguising himself as a sailor.'
    ],
    postScript: 'Vidocq didn\'t successfully forge release documents for himself, but he DID do it to help out a peasant who had been imprisoned for stealing grain, which earned him an eight-year sentence. He later got a provisional pardon for this.'
  }
];