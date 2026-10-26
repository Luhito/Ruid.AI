import type { Choice } from "@/types/repository/choice.js";

export type GenerateQuestionCandidateQuery = {
    query: string;
    pastQuestionSummaries: string[];
}
export type GenerateQuestionChoiceCandidate = {
    tag: string;
    text: string;
    isCorrect: boolean;
}
export type GenerateQuestionCandidateResponse = {
    choices: GenerateQuestionChoiceCandidate[];
    correctAnswerIndex: number;
    questionText: string;
    explanationText: string;
    summary: string;
}