import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Question.scss';

class Question extends Component {

  static propTypes = {
    question: PropTypes.object.isRequired,
    questionNumber: PropTypes.number.isRequired,
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

  getAnswerClassName = (answer, answerId) => {
    if (this.props.isAnswersChecked) {
      let questionNumber = this.props.questionNumber.toString();
      let isAnswerCorrect = answer.correct;
      let isAnswerSelected = this.state.checkedItems.get(answerId.toString() + questionNumber);

      return isAnswerCorrect && isAnswerSelected
              ? "correct"
              : isAnswerCorrect && !isAnswerSelected
                ? "missed"
                : !isAnswerCorrect && isAnswerSelected
                  ? "wrong" : "";
    } else return "";
  };

  render() {
    let { question } = this.props;
    let { isAnswersChecked } = this.props;
    let questionNumber = this.props.questionNumber.toString();

    return (
      <React.Fragment>
        <div className="question-container">
          <div className="question">
            {parseInt(questionNumber) + 1}.{question.question}
          </div>
          <div className="answer">
            {question.answers.map((answer, idx) => {
              return(
              <div className={this.getAnswerClassName(answer, idx)}>
                <input type="checkbox" id={idx.toString() + questionNumber} onClick={this.handleCheckChange} />
                <label for={idx}>
                  {answer.answer}
                </label>
              </div>);
            })}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAnswersChecked: state.questions.isAnswersChecked
});

export default connect(mapStateToProps)(Question);
