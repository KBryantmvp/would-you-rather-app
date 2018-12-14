import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard';
import QuestionDetails from './QuestionDetails';
import NewQuestion from './NewQuestion';
import LeaderBoard from './LeaderBoard';
import MyNav from './MyNav'
import LoadingBar from 'react-redux-loading'
import Login from './Login';
import NoMatch from './NoMatch';
import PrivateRoute from './PrivateRoute'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    console.log(this.props)
    return (
        <div className='container'>
          <LoadingBar />
          <MyNav />
          <Switch>
            <Route path='/' exact render={props => (
              this.props.loggedIn ? <Dashboard/> : <Redirect to='/login'/>
            )}/>
            <Route path='/login' component={Login} />
            <PrivateRoute path='/add' exact component={NewQuestion} />
            <PrivateRoute path='/leaderboard' exact component={LeaderBoard} />
            <PrivateRoute path='/question/:id' component={QuestionDetails}/>
            <Route component={NoMatch} />
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