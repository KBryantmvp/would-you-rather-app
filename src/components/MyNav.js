import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { unsetAuthedUser } from '../actions/authedUser';
import { Nav, Navbar, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class MyNav extends Component {
  signOut (e) {
    const { dispatch } = this.props
    // e.preventDefault()

    dispatch(unsetAuthedUser)
    // this.props.history.push('/')
  }
  render () {
    const { authedUser } = this.props
    console.log(this.props)

    return (
      // <nav className='nav'>
      <Navbar >
        <Nav bsStyle='tabs' >
          <LinkContainer to='/' exact activeClassName='active'>
            <NavItem>
              Home
            </NavItem>
          </LinkContainer>
          <LinkContainer to='/add' activeClassName='active'>
            <NavItem>
              New Question
            </NavItem>
          </LinkContainer>
          <LinkContainer to='/leaderboard' activeClassName='active'>
            <NavItem>
              Leader Board
            </NavItem>
          </LinkContainer>
        </Nav>
        <Nav bsStyle='tabs' pullRight>
          {authedUser !== null
            ? <LinkContainer to='/login' onClick={this.signOut}>
                <NavItem>
                  Welcome, {authedUser}! Sign Out
                </NavItem>
              </LinkContainer>
            : <NavItem>Please sign in</NavItem>
          }
        </Nav>
      </Navbar>

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

export default connect(mapStateToProps)(MyNav)