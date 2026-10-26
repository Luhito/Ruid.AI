import { getQuestion } from './internal/question/getQuestion.js'
import { createQuestion } from './internal/room/createQuestion.js'
import { getRoom } from './internal/room/getRoom.js'
import { initRoom } from './internal/room/initRoom.js'
import { getQuestionsByRoomId } from './internal/room/getQuestionsByRoomId.js'
import { getNewQuestionId } from './internal/room/getNewQuestionId.js'
import { generateQuestion } from './internal/question/generateQuestion.js'
import { buildFromCandidate as buildFromQuestionCandidate } from './internal/question/build.js'
import { judgeAnswer } from './internal/question/judgeAnswer.js';
import { buildFromCandidate as buildFromChoiceCandidate } from './internal/choices/build.js'

export * as chatGPTClient from './internal/clients/openai/chatGPTClient.js'
export type * as chatGPTClientTypes from './internal/clients/openai/chatGPTClient.types.js'

export const questions = {
    getQuestion,
    generateQuestion,
    buildFromCandidate: buildFromQuestionCandidate,
    judgeAnswer
}
export const rooms = {
    createQuestion,
    getRoom,
    initRoom,
    getQuestionsByRoomId,
    getNewQuestionId
}
export const choices = {
    buildFromCandidate: buildFromChoiceCandidate
}