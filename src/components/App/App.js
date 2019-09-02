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
    this.setControlButtonEventListener();
    this.props.fetchQuestions("course").then(()=>{
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

  fetchQuizQuestions = event => {
    this.props.fetchQuestions(event.currentTarget.id).then(()=>{
       this.setState({ questions: this.shuffle(this.props.questions) });
    })
  };

  setControlButtonEventListener = () => {
    let buttons = Array.from(document.getElementsByClassName("target-button"));
    buttons.forEach(function(button) {
      button.addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        if (current.length > 0) {
          current[0].className = current[0].className.replace(" active", "");
        }
        this.className += " active";
      });
    });
  };

  render() {
    return (
      <div className="app-container">
        <div className="control-container">
         <div className="button-container">
            <button className="target-button" id="course" onClick={this.fetchQuizQuestions}>Evolved Web Apps with SAPUI5</button>
            <button className="target-button" id="402" onClick={this.fetchQuizQuestions}>402</button>
            <button className="target-button" id="403" onClick={this.fetchQuizQuestions}>403</button>
            <button className="check-button" onClick={this.toggleCheckAnswers}>Check</button>
          </div>
        </div>
        <div className="content-container">
          <div>
            {this.state.questions.map((question, index) => <Question question={question} questionNumber={index}/>)}
          </div>
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
