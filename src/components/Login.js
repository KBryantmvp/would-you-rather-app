import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DropdownButton, MenuItem } from 'react-bootstrap'
import { setAuthedUser } from '../actions/authedUser';
import { Redirect } from 'react-router-dom'

class Login extends Component {

  handleSetAuthedUser(userId) {
    const { dispatch } = this.props
    dispatch(setAuthedUser(userId))
  }

  render () {
    const { authedUser, usersArr } = this.props
    const { from } = this.props.location.state || { from: { pathname: '/' }}

    if (authedUser !== null) {
      return <Redirect to={from} />
    }

    return (
      <div className='center'>
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
      </div>
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