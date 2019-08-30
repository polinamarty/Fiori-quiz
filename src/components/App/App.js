import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './App.scss';
import { fetchQuestions, checkAnswers, resetAnswers } from '../../services/questions/actions';

import Question from '../Question'

class App extends Component {

    constructor(props) {
     super(props);
     autoBind(this);
   }

  static propTypes = {
    fetchQuestions: PropTypes.func.isRequired,
    checkAnswers: PropTypes.func.isRequired,
    resetAnswers: PropTypes.func.isRequired,
    questions: PropTypes.array.isRequired,
    isAnswersChecked: PropTypes.bool.isRequired
  };

  componentDidMount() {
      this.props.fetchQuestions();
  };

  toggleCheckAnswers() {
    let {isAnswersChecked} = this.props;
    if (isAnswersChecked) {
        this.props.resetAnswers();
    } else this.props.checkAnswers();
  };

  shuffle(array) {
      return array.sort(() => Math.random() - 0.5);
  };

  render() {
    let { questions } = this.props;
    return (
      <React.Fragment>
        <button onClick={this.toggleCheckAnswers}>
          Check
        </button>
        <ol>
        { this.shuffle(questions).map(question => <Question question={question}/>)}
        </ol>
      </React.Fragment>
    );
  }

}

const mapStateToProps = state => ({
  questions: state.questions.questions,
  isAnswersChecked: state.questions.isAnswersChecked
});

export default connect( mapStateToProps, { fetchQuestions, checkAnswers, resetAnswers })(App);
