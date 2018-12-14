import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Jumbotron, DropdownButton, MenuItem } from 'react-bootstrap'
import { setAuthedUser } from '../actions/authedUser';
import { Redirect } from 'react-router-dom'

class Login extends Component {

  handleSetAuthedUser(userId) {
    const { dispatch } = this.props
    dispatch(setAuthedUser(userId))
  }

  render () {
    const { authedUser, usersArr } = this.props

    // Store the value of the path that the user was trying to access before being
    // redirected to Login view.
    const { from } = this.props.location.state || { from: { pathname: '/' }}

    // Redirect the user to the previously attempted view after log in.
    // If no other view was attempted to access, user will be redirected to Home page '/'
    if (authedUser !== null) {
      return <Redirect to={from} />
    }

    return (
      <Jumbotron className='center'>
        <div className='login-box'>
          <h1>Would You Rather App</h1>
          <h4>Sign in</h4>
          <DropdownButton
            title='Select User'
            id='dropdown-basic'
          >
            {usersArr.map((user, id) => (
              <MenuItem key={id} onSelect={() => this.handleSetAuthedUser(user.id)}>{user.name}</MenuItem>
            ))}
          </DropdownButton>
        </div>
      </Jumbotron>
    )
  }
}

function mapStateToProps ({ authedUser, users }) {
  return {
    authedUser,
    usersArr: Object.keys(users).reduce((usersAcc, user) => (
      usersAcc.concat(users[user])
    ),[])
  }
}

export default connect(mapStateToProps)(Login)