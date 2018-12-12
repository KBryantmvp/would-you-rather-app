import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionItem from './QuestionItem';
import { Redirect } from 'react-router-dom'

class Dashboard extends Component {
  state = {
    showAnsweredQs: false
  }

  displayUnansQs = () => {
    this.setState({
      showAnsweredQs: false
    })
  }

  displayAnsQs = () => {
    this.setState({
      showAnsweredQs: true
    })
  }

  calculateUnanswered = (array) => {
    var unansweredQ = array.filter((e) => (
      this.props.sortedAnswerIds.indexOf(e) < 0
    ))
    return unansweredQ
  }

  render() {
    const { showAnsweredQs } = this.state

    return (
      <div>
        <div className='center'>
          <div>
            <button type='button' onClick={this.displayUnansQs}>Unanswered Questions</button>
            <button type='button' onClick={this.displayAnsQs}>Answered Questions</button>
          </div>
          <div>
            <ul className='question-list'>
              {showAnsweredQs === false
                ? this.calculateUnanswered(this.props.questionIds).map((id) => (
                  <li key={id}>
                    <QuestionItem id={id}/>
                  </li>
                  ))
                : this.props.sortedAnswerIds.map((id) => (
                  <li key={id}>
                    <QuestionItem id={id} />
                  </li>
                  ))
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }) {
  let answeredIds = Object.keys(users[authedUser].answers)
  let sortedAnswerIds = answeredIds.sort((a,b) => questions[b].timestamp - questions[a].timestamp)

  return {
    authedUser,
    sortedAnswerIds,
    questionIds: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  }
}

export default connect(mapStateToProps)(Dashboard)