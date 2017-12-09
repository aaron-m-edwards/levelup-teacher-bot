module.exports = function(quizGenerator) {
  return function(controller, bot, convo) {
    const quiz = quizGenerator.generate(5);

    convo.say('Let\'s start a math quiz');
    convo.next();

    askQuestion(convo, 0, quiz);
  }
}

function askQuestion(convo, number, quiz) {
  const question = quiz[number]
  convo.addQuestion(`Question ${number+1}: What is ${question.number1} + ${question.number2}?`, (response, convo) => {
    if (response.text === `${question.answer}`) {
      convo.say('That is correct, good job!');
      question.correctAnswer = true;
    } else {
      convo.say(`That is incorrect, the correct answer is ${question.answer}`);
      question.correctAnswer = false;
    }
    if(quiz[number+1]) {
      askQuestion(convo, number+1, quiz)
    } else {
      convo.say(`You got ${quiz.filter(q => q.correctAnswer).length}/${quiz.length} correct`)
    }
    convo.next();
  })
}

