import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class Nav extends Component {
  signOut (e) {
    e.preventDefault()
    // TODO: SIGN OUT
  }
  render () {
    const { authedUser } = this.props

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
            {authedUser !== null
              ? <div>
                  <span>Welcome, {authedUser}</span>
                  <NavLink to='/login' activeClassName='active' onClick={this.signOut}>
                    Sign Out
                  </NavLink>
                </div>
              : <span>Please sign in</span>
            }
          </li>
        </ul>
      </nav>
    )
  }
}

function mapStateToProps ({ authedUser, users }) {
  return {
    authedUser: authedUser
      ? users[authedUser].name.split(' ')[0]
      : null
  }
}

export default connect(mapStateToProps)(Nav)