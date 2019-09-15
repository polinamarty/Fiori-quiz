import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Question.scss';

class Question extends Component {

  static propTypes = {
    question: PropTypes.object.isRequired,
    questionNumber: PropTypes.string.isRequired,
    isAnswersChecked: PropTypes.bool.isRequired
  };

  state = {
      checkedItems: new Map()
  };

  handleCheckChange = (event) => {
    const item = event.target.id;
    const isChecked = event.target.checked;
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked)}));
  };

  componentDidUpdate(prevProps, prevState) {
      if (prevProps.isAnswersChecked !== this.props.isAnswersChecked) {
        
        let questionContainer = document.querySelectorAll('.question-container')[parseInt(this.props.questionNumber)];
        let answers = Array.from(questionContainer.getElementsByTagName("li"));

        if (this.props.isAnswersChecked === true) {
          this.setAnswersClassNames(questionContainer, answers);
        } else {
          this.resetAnswersClassNames(questionContainer, answers);
        }
      }
  };

  setAnswersClassNames = (questionContainer, answers) => {
    let isAllAnswersCorrect = true;
    answers.forEach((answer, idx) => {
       let answerClassName = this.getAnswerClassName(idx);
       answer.className = answerClassName;
       if (answerClassName === "missed" || answerClassName === "wrong") isAllAnswersCorrect = false;
    });
    if (!isAllAnswersCorrect) questionContainer.className += " error";
  };

  resetAnswersClassNames = (questionContainer, answers) => {
    questionContainer.className = "question-container";
    answers.forEach((answer) => {
      answer.className = "answer";
    });
  };

  getAnswerClassName = (idx) => {
    let bindedAnswer = this.props.question.answers[idx];
    let isAnswerCorrect = bindedAnswer.correct;
    let isAnswerSelected = this.state.checkedItems.get(idx + this.props.questionNumber);
    return isAnswerCorrect && isAnswerSelected
                ? "correct"
                : isAnswerCorrect && !isAnswerSelected
                  ? "missed"
                  : !isAnswerCorrect && isAnswerSelected
                    ? "wrong" : "";
  };

  render() {
    let { question } = this.props;
    let { isAnswersChecked } = this.props;
    let { questionNumber } = this.props;
    let isQuestionCorrect = this.props.isQuestionCorrect;

    return (
      <React.Fragment>
        <div id={questionNumber} className="question-container">
          <div className="question-wrapper">
            {parseInt(questionNumber) + 1}.{question.question}
          </div>
          <ul className="answers-wrapper">
            {question.answers.map((answer, idx) => {
              return(
              <li key={idx} className="answer">
                <input className="answer__checkbox" type="checkbox" id={idx.toString() + questionNumber} onClick={this.handleCheckChange} />
                <label className="answer__label" htmlFor={idx}>
                  {answer.answer}
                </label>
              </li>);
            })}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAnswersChecked: state.questions.isAnswersChecked
});

export default connect(mapStateToProps)(Question);
