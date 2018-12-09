import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard';
import QuestionDetails from './QuestionDetails';
import NewQuestion from './NewQuestion';
import LeaderBoard from './LeaderBoard';
import Nav from './Nav'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <BrowserRouter>
        <div className='container'>
          {this.props.loading === true
            ? null
            : <div>
                <Nav />
                <Route path='/' exact component={Dashboard} />
                <Route path='/add' exact component={NewQuestion} />
                <Route path='/leaderboard' exact component={LeaderBoard} />
                <Route path='/question/:id' component={QuestionDetails}/>
              </div>
          }
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
