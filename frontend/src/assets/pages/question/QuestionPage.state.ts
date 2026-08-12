import { useState } from "react";

export const useQuestionPageStates = () => {
    const [ isOpenAnswer, setOpenAnswer ] = useState(false);
    const [ isCorrect, setCorrect ] = useState(false);
    const [ isGenerating, setGenerating ] = useState(true);
    const [ isGenerationCompleted, setGenerationCompleted ] = useState(false);

    return {
        states : {
            isOpenAnswer,
            isCorrect,
            isGenerating,
            isGenerationCompleted
        },
        stateSetters: {
            setOpenAnswer,
            setCorrect,
            setGenerating,
            setGenerationCompleted
        }
    }
}

export type QuestionPageStates = ReturnType<typeof useQuestionPageStates>["states"];
export type QuestionPageStateSetters = ReturnType<typeof useQuestionPageStates>["stateSetters"];