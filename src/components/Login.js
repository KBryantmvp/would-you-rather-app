import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DropdownButton, MenuItem } from 'react-bootstrap'
import { setAuthedUser } from '../actions/authedUser';
import { Redirect } from 'react-router-dom'

class Login extends Component {

  handleSetAuthedUser(userId) {
    // e.preventDefault()
    // console.log(e)
    console.log(userId)
    const { dispatch } = this.props
    dispatch(setAuthedUser(userId))
  }

  render () {
    const { authedUser, usersArr } = this.props
    console.log('AUTHED_USER', authedUser)
    if (authedUser !== null) {
      return <Redirect to='/' />
    }
    console.log(this.props)

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
  console.log('HE ENTRADO EN LOGIN')
  return {
    authedUser,
    usersArr: Object.keys(users).reduce((usersAcc, user) => (
      usersAcc.concat(users[user])
    ),[])
  }
}

export default connect(mapStateToProps)(Login)