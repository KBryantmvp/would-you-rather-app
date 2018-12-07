import { saveQuestionAnswer, saveQuestion } from "../utils/api";

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const VOTE_QUESTION = 'VOTE_QUESTION'
export const NEW_QUESTION = 'NEW_QUESTION'

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
        alert('There was an error voting the question. Try again')
      })
  }
}

function newQuestion (question) {
  return {
    type: NEW_QUESTION,
    question
  }
}

export function handleNewQuestion (question) {
  return (dispatch) => {

    return saveQuestion(question)
      .catch((e) => {
        console.warn('Error in handleNewQuestion: ', e)
        alert('There was an error submitting the question. Try again')
      })
        .then((question) => dispatch(newQuestion(question)))
  }
}