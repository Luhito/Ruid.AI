import type { Choice } from "@/types/repository/choice.js";

export type GenerateQuestionCandidateQuery = {
    query: string;
    pastQuestionSummaries: string[];
}
export type GenerateQuestionChoiceCondidate = {
    tag: string;
    text: string;
    isCorrect: boolean;
}
export type GenerateQuestionCandidateResponse = {
    choices: GenerateQuestionChoiceCondidate[];
    correctAnswerIndex: number;
    questionText: string;
    explanationText: string;
    summary: string;
}