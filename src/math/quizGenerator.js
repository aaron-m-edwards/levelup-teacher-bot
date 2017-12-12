const signs = [
  { label: '+', func: (a,b) => a + b },
  { label: '-', func: (a,b) => a - b }
]

function createQuestion(random) {
  let number1 = Math.floor(random() * 10) + 1
  let number2 = Math.floor(random() * 10) + 1

  const sign = signs[Math.floor(random() * 2)] 

  if(sign.label === '-' && number1 < number2) {
    const temp = number1;
    number1 = number2;
    number2 = temp;
  }

  const answer = sign.func(number1, number2);

  return {
    number1, number2, answer, sign: sign.label,
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
