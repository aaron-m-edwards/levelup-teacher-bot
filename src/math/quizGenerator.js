
function createQuestion() {
  const number1 = Math.floor(Math.random() * 10) + 1
  const number2 = Math.floor(Math.random() * 10) + 1

  const answer = number1 + number2;
  return {
    number1, number2, answer, sign: '+',
  }
}

function generate(number) {
}

function createGenerator(random) {
  return function(number) {
    const quiz = [];
    for(let i = 0; i < number; i++) {
      quiz.push(createQuestion())
    }
    return quiz;
  }
}

module.exports = {
  createGenerator
}
