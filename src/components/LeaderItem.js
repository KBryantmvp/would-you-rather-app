import React, { Component } from 'react'

class LeaderItem extends Component {
  render () {
    const { scoreUser } = this.props
    const answeredQuestions = scoreUser.answeredQuestions
    const questionsCreated = scoreUser.questionsCreated
    const totalScore = scoreUser.totalScore

    return (
      <li>
        <div className='leader-item'>
          <div className='avatar'>
            {scoreUser.avatarURL}
          </div>
          <div className='user-info'>
            <h3>{scoreUser.name}</h3>
            <span>Answered questions: {answeredQuestions}</span> <br/>
            <span>Created questions: {questionsCreated}</span>
          </div>
          <div className='score'>
            <h5>Score:</h5>
            <span>{totalScore}</span>
          </div>
        </div>
      </li>
    )
  }
}

export default LeaderItem