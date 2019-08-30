import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './App.css';
import { fetchQuestions } from '../../services/questions/actions';
import { checkAnswers } from '../../services/questions/actions';

import Question from '../Question'

class App extends Component {

    constructor(props) {
     super(props);
     autoBind(this);
   }

  static propTypes = {
    fetchQuestions: PropTypes.func.isRequired,
    checkAnswers: PropTypes.func.isRequired,
    questions: PropTypes.array.isRequired
  };

  componentDidMount() {
      this.props.fetchQuestions();
  };

  toggleCheckAnswers() {
    this.props.checkAnswers();
  }

  render() {
    let { questions } = this.props;
    return (
      <React.Fragment>
        <button onClick={this.toggleCheckAnswers}/>
        <ol>
        { questions.map(question => <Question question={question}/>)}
        </ol>
      </React.Fragment>
    );
  }

}

const mapStateToProps = state => ({
  questions: state.questions.questions
});

export default connect( mapStateToProps, { fetchQuestions, checkAnswers })(App);
