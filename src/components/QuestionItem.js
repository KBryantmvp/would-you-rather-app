import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class QuestionItem extends Component {
  render() {
    return (
      <Fragment >
        <div className='avatar' alt='avatar-image'>
          <img src={this.props.avatarURL}>
          </img>
        </div>
        <div className='question-text'>
          <strong>Would you rather...</strong>
          <div className='options'>
            <span>{this.props.questionItem.optionOne.text}</span>
            <br/>
            <span>{this.props.questionItem.optionTwo.text}</span>
          </div>
          <Link to={`/question/${this.props.id}`}>
            VIEW QUESTION
          </Link >
        </div>
      </Fragment>
    )
  }
}

function mapStateToProps({ questions, users }, {id}) {
  const questionItem = questions[id]
  const avatarURL = users[questionItem.author].avatarURL

  return {
    id,
    questionItem,
    avatarURL
  }
}

export default connect(mapStateToProps)(QuestionItem)