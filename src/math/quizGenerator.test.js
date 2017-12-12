const mathQuizGenerator = require('./quizGenerator');
const sinon = require('sinon');

describe('math quiz Generator', () => {
  it('should generate a math problem', () => {
    const random = sinon.stub();
    random.onCall(0).returns(0);
    random.onCall(1).returns(1.0 / 10);
    random.onCall(2).returns(0);

    const quiz = mathQuizGenerator.createGenerator(random)(1);

    expect(quiz[0]).to.eql({
      number1: 1,
      number2: 2,
      answer: 3,
      sign: '+'
    })
  })
  it('should generate a subtraction problem', () => {
    const random = sinon.stub();
    random.onCall(0).returns(0);
    random.onCall(1).returns(1.0 / 10);
    random.onCall(2).returns(1.0/2);

    const quiz = mathQuizGenerator.createGenerator(random)(1);

    expect(quiz[0]).to.eql({
      number1: 2,
      number2: 1,
      answer: 1,
      sign: '-'
    })
  })
})
