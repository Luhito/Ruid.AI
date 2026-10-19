import { useState } from "react";

export const useQuestionPageStates = () => {
    const [ isOpenAnswer, setOpenAnswer ] = useState(false);
    const [ isCorrect, setCorrect ] = useState(false);
    const [ isGenerating, setGenerating ] = useState(true);
    const [ isGenerationCompleted, setGenerationCompleted ] = useState(false);
    const [ isQuestionListModalOpen, setQuestionListModalOpen ] = useState(false);
    const [ isLoadingAnswer, setLoadingAnswer ] = useState(false);
    const [ explanation, setExplanation ] = useState("");

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
            isLoadingAnswer,
            explanation,
            setters: {
                setOpenAnswer,
                setCorrect,
                setGenerating,
                setGenerationCompleted,
                setQuestionListModalOpen,
                setLoadingAnswer,
                setExplanation
            },
            initAll
        },
    }
}

export type QuestionPageStates = ReturnType<typeof useQuestionPageStates>["states"];