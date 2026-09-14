import type { Choice } from '@/types/choice.js'

export interface ChoiceGroup {
    choices: Choice[],
    correctAnswerIndex: number
}