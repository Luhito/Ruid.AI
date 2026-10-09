import { getQuestionSet } from './internal/question/getQuestionSet.js'
import { createQuestion } from './internal/room/createQuestion.js'
import { getRoom } from './internal/room/getRoom.js'
import { initRoom } from './internal/room/initRoom.js'
import { getQuestionsByRoomId } from './internal/room/getQuestionsByRoomId.js'
import { getNewQuestionId } from './internal/room/getNewQuestionId.js'
import { generateQuestion } from './internal/question/generateQuestion.js';

export const question = {
    getQuestionSet,
    generateQuestion
}
export const room = {
    createQuestion,
    getRoom,
    initRoom,
    getQuestionsByRoomId,
    getNewQuestionId
}