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

  render() {
    let { question } = this.props;
    let { isAnswersChecked } = this.props;
    let questionNumber = this.props.questionNumber.toString();

    return (
      <React.Fragment>
        <div className="question-container">
          <div className="question">
            {question.question}
          </div>
          <div className="answer">
            {question.answers.map((answer, idx) => {
              return(
              <div className={isAnswersChecked && answer.correct && this.state.checkedItems.get(idx.toString() + questionNumber)
                  ? "correct"
                  : isAnswersChecked && answer.correct
                    ? "missed" :""}>
                <input type="checkbox" id={idx.toString() + questionNumber} onClick={this.handleCheckChange} />
                <label for={idx} className={isAnswersChecked && !answer.correct && this.state.checkedItems.get(idx.toString() + questionNumber) ? "wrong" : ""}>
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
