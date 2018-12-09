import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class Nav extends Component {
  signOut (e) {
    e.preventDefault()
    // TODO: SIGN OUT
  }
  render () {
    console.log(this.props)
    return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/add' activeClassName='active'>
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' activeClassName='active'>
              Leader Board
            </NavLink>
          </li>
          <li>
            <span>Welcome, {this.props.authedUser}</span>
            <NavLink to='/login' activeClassName='active' onClick={this.signOut}>
              Sign Out
            </NavLink>
          </li>
        </ul>
      </nav>
    )
  }
}

function mapStateToProps ({ authedUser, users }) {
  return {
    authedUser: users[authedUser].name
  }
}

export default connect(mapStateToProps)(Nav)