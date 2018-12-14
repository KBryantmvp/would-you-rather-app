import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleVoteQuestion } from '../actions/questions';
import { Redirect } from 'react-router-dom'
import { Jumbotron } from 'react-bootstrap'

class QuestionDetails extends Component {
  state = {
    value: ''
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { authedUser, qid, dispatch } = this.props
    const answer = this.state.value

    dispatch(handleVoteQuestion({ authedUser, qid, answer }))
  }

  render() {
    const { avatarURL, question, hasAnswered, answerVoted } = this.props
    if (!question) {
      return <Redirect to='/404-page-not-found'/>
    }
    const optionOne = question.optionOne.text
    const optionTwo = question.optionTwo.text
    const votesOptionOne = question.optionOne.votes.length
    const votesOptionTwo = question.optionTwo.votes.length
    const totalVotes = votesOptionOne + votesOptionTwo

    return (
      <Jumbotron className='center'>
        <h2>WOULD YOU RATHER...</h2>
        <div className='question-item'>
          <div className='avatar'>
            <img src={avatarURL} alt='avatar-image'>
            </img>
          </div>
          {hasAnswered === false
            ? <div className='options'>
                <form onSubmit={this.handleSubmit}>
                  <label>
                    {optionOne}
                    <input type='radio' checked={this.state.value === 'optionOne'} value='optionOne' onChange={this.handleChange}/>
                  </label>
                  <label>
                    {optionTwo}
                    <input type='radio' checked={this.state.value === 'optionTwo'} value='optionTwo' onChange={this.handleChange}/>
                  </label>
                  <input type='submit' value='Submit' />
                </form>
              </div>
            : <div className='results'>
                <h3>RESULTS:</h3>
                <div className='results-answer'>
                  <div className={'optionOne ' + (answerVoted === 'optionOne' ? 'answer' : '')}>
                    <h4>{optionOne}</h4>
                    <span>{votesOptionOne} out of {totalVotes} votes ({(votesOptionOne/totalVotes*100).toFixed(1)}%)</span>
                  </div>
                  <div className={'optionTwo ' + (answerVoted === 'optionTwo' ? 'answer' : '')}>
                    <h4>{optionTwo}</h4>
                    <span>{votesOptionTwo} out of {totalVotes} votes ({(votesOptionTwo/totalVotes*100).toFixed(1)}%)</span>
                  </div>
                </div>
              </div>
          }
        </div>
      </Jumbotron>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }, props) {
  const qid = props.match.params.id
  const question = questions[qid]
  const avatarURL = question ? users[question.author].avatarURL : null
  let answerVoted = ''
  
  if (question && question.optionOne.votes.indexOf(authedUser) >= 0)
    answerVoted = 'optionOne'

  if (question && question.optionTwo.votes.indexOf(authedUser) >= 0)
    answerVoted = 'optionTwo'

  return {
    qid,
    authedUser,
    question,
    avatarURL,
    answerVoted,
    hasAnswered: users[authedUser].answers[qid]
      ? true
      : false
  }
}

export default connect(mapStateToProps)(QuestionDetails)