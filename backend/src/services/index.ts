import { getQuestion } from './internal/question/getQuestion.js'
import { createQuestion } from './internal/room/createQuestion.js'
import { getRoom } from './internal/room/getRoom.js'
import { initRoom } from './internal/room/initRoom.js'
import { getQuestionsByRoomId } from './internal/room/getQuestionsByRoomId.js'
import { getNewQuestionId } from './internal/room/getNewQuestionId.js'
import { generateQuestion } from './internal/question/generateQuestion.js'
import { build } from './internal/question/questionBuilder.js'

export * as chatGPTClient from './internal/clients/openai/chatGPTClient.js'
export type * as chatGPTClientTypes from './internal/clients/openai/chatGPTClient.types.js'

export const questions = {
    getQuestion,
    generateQuestion,
    build,
}
export const rooms = {
    createQuestion,
    getRoom,
    initRoom,
    getQuestionsByRoomId,
    getNewQuestionId
}