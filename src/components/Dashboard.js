import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionItem from './QuestionItem';
import { Jumbotron, ListGroup, ListGroupItem } from 'react-bootstrap'

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
      <Jumbotron className='center'>
        <div>
          <button type='button' onClick={this.displayUnansQs}>Unanswered Questions</button>
          <button type='button' onClick={this.displayAnsQs}>Answered Questions</button>
        </div>
        <ListGroup className='question-list'>
          {showAnsweredQs === false
            ? this.calculateUnanswered(this.props.questionIds).map((id) => (
              <ListGroupItem key={id} className='question-item'>
                <QuestionItem id={id} />
              </ListGroupItem>
              ))
            : this.props.sortedAnswerIds.map((id) => (
              <ListGroupItem key={id} className='question-item'>
                <QuestionItem id={id} />
              </ListGroupItem>
              ))
          }
        </ListGroup>
      </Jumbotron>
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