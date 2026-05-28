import { useState } from "react";

export const useQuestionPageState = () => {
    const [ isOpenAnswer, setOpenAnswer ] = useState(false);

    return {
        states : {
            isOpenAnswer
        },
        actions: {
            setOpenAnswer
        }
    }
}

export type QuestionPageState = ReturnType<typeof useQuestionPageState>["states"];
export type QuestionPageActions = ReturnType<typeof useQuestionPageState>["actions"];
