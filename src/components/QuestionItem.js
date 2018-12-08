import React, { Component } from 'react'
import { connect } from 'react-redux'

class QuestionItem extends Component {
  handleViewQ = () => {
    // TODO: Link to view a question
  }

  render() {
    console.log(this.props)
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
          <button onClick={this.handleViewQ}>
            VIEW QUESTION
          </button>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ questions, users }, {id}) {
  const questionItem = questions[id]
  const avatar = users[questionItem.author].avatarURL

  return {
    questionItem,
    avatar
  }
}

export default connect(mapStateToProps)(QuestionItem)