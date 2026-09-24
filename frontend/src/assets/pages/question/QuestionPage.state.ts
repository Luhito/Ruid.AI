import { useState } from "react";

export const useQuestionPageStates = () => {
    const [ isOpenAnswer, setOpenAnswer ] = useState(false);
    const [ isCorrect, setCorrect ] = useState(false);
    const [ isGenerating, setGenerating ] = useState(true);
    const [ isGenerationCompleted, setGenerationCompleted ] = useState(false);
    const [ isQuestionListModalOpen, setQuestionListModalOpen ] = useState(false);

    return {
        states : {
            isOpenAnswer,
            isCorrect,
            isGenerating,
            isGenerationCompleted,
            isQuestionListModalOpen
        },
        stateSetters: {
            setOpenAnswer,
            setCorrect,
            setGenerating,
            setGenerationCompleted,
            setQuestionListModalOpen
        }
    }
}

export type QuestionPageStates = ReturnType<typeof useQuestionPageStates>["states"];
export type QuestionPageStateSetters = ReturnType<typeof useQuestionPageStates>["stateSetters"];