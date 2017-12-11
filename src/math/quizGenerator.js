
function createQuestion(random) {
  const number1 = Math.floor(random() * 10) + 1
  const number2 = Math.floor(random() * 10) + 1

  const answer = number1 + number2;
  return {
    number1, number2, answer, sign: '+',
  }
}

function createGenerator(random) {
  return function(number) {
    const quiz = [];
    for(let i = 0; i < number; i++) {
      quiz.push(createQuestion(random))
    }
    return quiz;
  }
}

module.exports = {
  createGenerator
}
