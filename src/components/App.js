import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, withRouter } from 'react-router-dom'
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

    console.log(this.props)
    return (
        <div className='container'>
          <LoadingBar />
          <Nav />
          {/* {this.props.loading === true
            ? <Route path='/login' component={Login} />
            : <div>
                <Route path='/' exact component={Dashboard} />
                <Route path='/add' exact component={NewQuestion} />
                <Route path='/leaderboard' exact component={LeaderBoard} />
                <Route path='/question/:id' component={QuestionDetails}/>
              </div>
          } */}
          <Route path='/login' component={Login} />
          <Route path='/' exact component={Dashboard} />
          <Route path='/add' exact component={NewQuestion} />
          <Route path='/leaderboard' exact component={LeaderBoard} />
          <Route path='/question/:id' component={QuestionDetails}/>
        </div>
    );
  }
}

// function mapStateToProps ({ authedUser }) {
//   return {
//     loading: authedUser === null
//   }
// }

// export default connect(mapStateToProps)(App)
export default withRouter(connect()(App))