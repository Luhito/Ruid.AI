import { useState } from "react";

export const useQuestionPageStates = () => {
    const [ isOpenAnswer, setOpenAnswer ] = useState(false);
    const [ isCorrect, setCorrect ] = useState(false);

    return {
        states : {
            isOpenAnswer,
            isCorrect
        },
        stateSetters: {
            setOpenAnswer,
            setCorrect
        }
    }
}

export type QuestionPageStates = ReturnType<typeof useQuestionPageStates>["states"];
export type QuestionPageStateSetters = ReturnType<typeof useQuestionPageStates>["stateSetters"];