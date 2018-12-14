import { saveQuestionAnswer, saveQuestion } from "../utils/api";
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const VOTE_QUESTION = 'VOTE_QUESTION'
export const NEW_QUESTION = 'NEW_QUESTION'

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

// Function to update the store with the question's vote
function voteQuestion ({ authedUser, qid, answer }) {
  return {
    type: VOTE_QUESTION,
    authedUser,
    qid,
    answer
  }
}

// Async function to vote question and save the answer in the database
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

// Function to update the store with the new question submitted
function newQuestion (question) {
  return {
    type: NEW_QUESTION,
    question
  }
}

// Async function to update the database with the new question submitted
export function handleNewQuestion (question) {
  return (dispatch) => {
    dispatch(showLoading())
    return saveQuestion(question)
      .catch((e) => {
        console.warn('Error in handleNewQuestion: ', e)
        alert('There was an error submitting the question. Try again')
      })
        .then((question) => dispatch(newQuestion(question)))
        .then(() => dispatch(hideLoading()))
  }
}