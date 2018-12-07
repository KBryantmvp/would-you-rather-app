import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleNewQuestion } from '../actions/questions';

class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { author, dispatch } = this.props
    const { optionOneText, optionTwoText } = this.state

    dispatch(handleNewQuestion({ optionOneText, optionTwoText, author }))

    this.setState({
      optionOneText: '',
      optionTwoText: ''
    })
    // TODO: REDIRECT TO /HOME PAGE
  }

  render () {
    const { optionOneText, optionTwoText } = this.state

    return (
      <div>
        <div>
          NAV BAR
        </div>
        <div className='center'>
          <h2>CREATE NEW QUESTION</h2>
          <div className='new-question'>
            <h4>Would you rather...</h4>
            <form onSubmit={this.handleSubmit}>
              <input type='text' name='optionOneText' onChange={this.handleChange} value={this.state.optionOneText}></input> <br/>
              <input type='text' name='optionTwoText' onChange={this.handleChange} value={this.state.optionTwoText}></input> <br/>
              <input type='submit' value='Submit' disabled={!(optionOneText && optionTwoText)}></input>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    author: authedUser
  }
}

export default connect(mapStateToProps)(NewQuestion)