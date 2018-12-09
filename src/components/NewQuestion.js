import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleNewQuestion } from '../actions/questions';
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false
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
      optionTwoText: '',
      toHome: true
    })
  }

  render () {
    const { optionOneText, optionTwoText, toHome } = this.state

    if (toHome === true) {
      return <Redirect to='/' />
    }

    return (
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
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    author: authedUser
  }
}

export default connect(mapStateToProps)(NewQuestion)