import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './App.scss';
import { fetchQuestions, checkAnswers, resetAnswers } from '../../services/questions/actions';

import Question from '../Question'

class App extends Component {

   state = {
       checkedItems: new Map(),
       questions: []
   };

  propTypes = {
    fetchQuestions: PropTypes.func.isRequired,
    checkAnswers: PropTypes.func.isRequired,
    resetAnswers: PropTypes.func.isRequired,
    questions: PropTypes.array.isRequired,
    isAnswersChecked: PropTypes.bool.isRequired
  };

  componentDidMount() {
    this.props.fetchQuestions().then(()=>{
       this.setState({ questions: this.shuffle(this.props.questions) });
    })
  };

  toggleCheckAnswers = () => {
    if (this.props.isAnswersChecked) {
        this.props.resetAnswers();
    } else this.props.checkAnswers();
  };

  shuffle = array => {
      return array.sort(() => Math.random() - 0.5);
  };

  render() {
    return (
      <div className="app-container">
        <button onClick={this.toggleCheckAnswers}>
          Check
        </button>
        <div>
          {this.state.questions.map((question, index) => <Question question={question} questionNumber={index}/>)}
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  questions: state.questions.questions,
  isAnswersChecked: state.questions.isAnswersChecked
});

export default connect( mapStateToProps, { fetchQuestions, checkAnswers, resetAnswers })(App);
