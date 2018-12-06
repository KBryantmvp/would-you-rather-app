import { RECEIVE_QUESTIONS } from '../actions/questions'
import { VOTE_QUESTION } from '../actions/questions'

export default function questions (state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
    case VOTE_QUESTION :
    // console.log(state[action.qid].optionOne.text)
    // console.log(state[action.qid].optionOne.votes)
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.concat([action.authedUser])
          }
        }
      }
    default :
      return state
  }
}