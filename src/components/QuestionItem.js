import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class QuestionItem extends Component {
  render() {
    return (
      <div className='question-item'>
        <div className='avatar'>
          {this.props.avatar}
        </div>
        <div className='question-text'>
          <span>Would you rather...</span>
          <div className='options'>
            <span>{this.props.questionItem.optionOne.text}</span>
            <br/>
            <span>{this.props.questionItem.optionTwo.text}</span>
          </div>
          <Link to={`/question/${this.props.id}`}>
            VIEW QUESTION
          </Link >
        </div>
      </div>
    )
  }
}

function mapStateToProps({ questions, users }, {id}) {
  const questionItem = questions[id]
  const avatar = users[questionItem.author].avatarURL

  return {
    id,
    questionItem,
    avatar
  }
}

export default connect(mapStateToProps)(QuestionItem)