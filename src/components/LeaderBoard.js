import React, { Component } from 'react'
import { connect } from 'react-redux'
import LeaderItem from './LeaderItem'

class LeaderBoard extends Component {
  render () {
    const { scoreUsers } = this.props

    return (
      <div>
        <div>
          NAV
        </div>
        <div className='center'>
          <ul className='leader-list'>
            {scoreUsers.sort((a,b) => b.totalScore - a.totalScore)
              .map((user, index) => (
                <LeaderItem key={index} scoreUser={user} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ users }) {
  const usersArr = Object.keys(users).reduce((usersAcc, user) => {
    return usersAcc.concat(users[user])
  },[])

  const scoreUsers = usersArr.map(user => ({
    id: user.id,
    name: user.name,
    avatarURL: user.avatarURL,
    answeredQuestions: Object.keys(user.answers).length,
    questionsCreated: user.questions.length,
    totalScore: Object.keys(user.answers).length + user.questions.length
  }))

  return {
    scoreUsers,
    usersArr,
  }
}

export default connect(mapStateToProps)(LeaderBoard)