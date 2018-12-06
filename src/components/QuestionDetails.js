import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleVoteQuestion } from '../actions/questions';

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
    // console.log(this.state.value)
    const { authedUser, qid, dispatch } = this.props
    const answer = this.state.value

    dispatch(handleVoteQuestion({ authedUser, qid, answer }))
  }

  render() {
    const { avatar, question, hasAnswered } = this.props
    const optionOne = question.optionOne.text
    const optionTwo = question.optionTwo.text
    // console.log(this.props)

    return (
      <div>
        <div>
          NAV BAR
        </div>
        <div className='center'>
          <h2>WOULD YOU RATHER...</h2>
          <div className='question-item'>
            <div className='avatar'>
              {avatar}
            </div>
            {hasAnswered === false
              ? <div className='options'>
                  <form onSubmit={this.handleSubmit}>
                    <input type='radio' checked={this.state.value === 'optionOne'} value='optionOne' onChange={this.handleChange}/>{optionOne} <br/>
                    <input type='radio' checked={this.state.value === 'optionTwo'} value='optionTwo' onChange={this.handleChange}/>{optionTwo}<br/>
                    <input type='submit' value='Submit' />
                  </form>
                </div>
              : <div className='results'>
                  RESULTS
                </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }) {
  const qid = 'xj352vofupe1dqz9emx13r'
  const question = questions[qid]
  const avatar = users[question.author].avatarURL
  // const hasAnswered = users[authedUser].answers[id]

  return {
    qid,
    authedUser,
    question,
    avatar,
    hasAnswered: users[authedUser].answers[qid]
      ? true
      : false
  }
}

export default connect(mapStateToProps)(QuestionDetails)