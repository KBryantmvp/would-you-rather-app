import { saveQuestionAnswer } from "../utils/api";

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const VOTE_QUESTION = 'VOTE_QUESTION'

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

function voteQuestion ({ authedUser, qid, answer }) {
  return {
    type: VOTE_QUESTION,
    authedUser,
    qid,
    answer
  }
}

export function handleVoteQuestion (info) {
  return (dispatch) => {
    dispatch(voteQuestion(info))

    return saveQuestionAnswer(info)
      .catch((e) => {
        console.warn('Error in handleVoteQuestion: ', e)
        dispatch(voteQuestion(info))
        alert('There was an error voting the question. Try again')
      })
  }
}