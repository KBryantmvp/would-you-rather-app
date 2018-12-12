import React, { Component, Fragment } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard';
import QuestionDetails from './QuestionDetails';
import NewQuestion from './NewQuestion';
import LeaderBoard from './LeaderBoard';
import Nav from './Nav'
import LoadingBar from 'react-redux-loading'
import Login from './Login';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
        <div className='container'>
          <LoadingBar />
          <Nav />
          <Switch>
            <Route path='/' exact render={props => (
              this.props.loggedIn ? <Dashboard/> : <Redirect to='/login'/>
            )}/>
            <Route path='/login' component={Login} />
            <Route path='/add' exact component={NewQuestion} />
            <Route path='/leaderboard' exact component={LeaderBoard} />
            <Route path='/question/:id' component={QuestionDetails}/>
          </Switch>
        </div>
    );
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loggedIn: authedUser !== null
  }
}

export default withRouter(connect(mapStateToProps)(App))