import { useState } from "react";

export const useQuestionPageStates = () => {
    const [ isOpenAnswer, setOpenAnswer ] = useState(false);
    const [ isCorrect, setCorrect ] = useState(false);
    const [ isGenerating, setGenerating ] = useState(true);
    const [ isGenerationCompleted, setGenerationCompleted ] = useState(false);
    const [ isQuestionListModalOpen, setQuestionListModalOpen ] = useState(false);

    const initAll = () => {
        setOpenAnswer(false);
        setCorrect(false);
        setGenerating(false);
        setGenerationCompleted(true);
        setQuestionListModalOpen(false);
    }

    return {
        states : {
            isOpenAnswer,
            isCorrect,
            isGenerating,
            isGenerationCompleted,
            isQuestionListModalOpen,
            setters: {
                setOpenAnswer,
                setCorrect,
                setGenerating,
                setGenerationCompleted,
                setQuestionListModalOpen
            },
            initAll
        },
    }
}

export type QuestionPageStates = ReturnType<typeof useQuestionPageStates>["states"];