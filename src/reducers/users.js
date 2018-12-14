import { RECEIVE_USERS } from '../actions/users'
import { VOTE_QUESTION } from '../actions/questions'
import { NEW_QUESTION } from '../actions/questions'

export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }
    // Update the 'answers' property of the User object wit the new
    // question ID and the answer selected
    case VOTE_QUESTION :
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.qid]: action.answer
          }
        }
      }
    // Update the 'questions' property in User object wit the new question created
    case NEW_QUESTION :
      return {
        ...state,
        [action.question.author]: {
          ...state[action.question.author],
          questions: state[action.question.author].questions.concat(action.question.id)
        }
      }
    default :
      return state
  }
}