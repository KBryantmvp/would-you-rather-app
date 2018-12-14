import React, { Component, Fragment } from 'react'

class LeaderItem extends Component {
  render () {
    const { scoreUser } = this.props
    const answeredQuestions = scoreUser.answeredQuestions
    const questionsCreated = scoreUser.questionsCreated
    const totalScore = scoreUser.totalScore

    return (
      <Fragment >
        <div className='avatar'>
        <img src={scoreUser.avatarURL} alt='avatar-image'>
        </img>
        </div>
        <div className='user-info'>
          <h3>{scoreUser.name}</h3>
          <span>Answered questions: {answeredQuestions}</span> <br/>
          <span>Created questions: {questionsCreated}</span>
        </div>
        <div className='score'>
          <strong>Score:</strong> <br/>
          <span>{totalScore}</span>
        </div>
      </Fragment>
    )
  }
}

export default LeaderItem