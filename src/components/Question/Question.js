import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Question.scss';
import autoBind from 'react-autobind';

class Question extends Component {

  constructor(props) {
   super(props);
   autoBind(this);
 }

  static propTypes = {
    question: PropTypes.object.isRequired,
    isAnswersChecked: PropTypes.bool.isRequired
  };

  state = {
      checkedItems: new Map()
  };

  handleChange(e) {
    console.log(this.state.checkedItems.get("1"));
    const item = e.target.id;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
  };

  render() {
    let { question } = this.props;
    let { isAnswersChecked } = this.props;

    return (
      <React.Fragment>
        <div className="question-container">
          <div className="question">
            {question.question}
          </div>
          <div className="answer">
            {question.answers.map((a, idx) => {
              return(
              <div className={isAnswersChecked && a.correct ? "correct" : ""}>
                <input type="checkbox" id={idx} onClick={this.handleChange} />
                <label for={idx} className={isAnswersChecked && !a.correct && this.state.checkedItems.get(idx.toString()) ? "wrong" : ""}>
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
  isAnswersChecked: state.questions.isAnswersChecked
});

export default connect( mapStateToProps)(Question);
