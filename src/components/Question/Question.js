import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Question.scss';

class Question extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
    checkAnswers: PropTypes.object.isRequired
  };

  render() {
    let { question } = this.props;
    let { checkAnswers } = this.props;

    return (
      <React.Fragment>
        <div className="question-container">
          <div className="question">
            {question.question}
          </div>
          <div className="answer">
            {question.answers.map(a => {
              return(
              <div className={checkAnswers && a.correct ? "correct" : ""}>
                <input type="checkbox"/>
                <label>
                  {a.answer}
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
  checkAnswers: state.questions.checkAnswers
});

export default connect( mapStateToProps)(Question);
