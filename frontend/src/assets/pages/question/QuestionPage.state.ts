import { useState } from "react";

export const useQuestionPageState = () => {
    const [ isOpenAnswer, setOpenAnswer ] = useState(false);

    return {
        states : {
            isOpenAnswer,
            setOpenAnswer
        }
    }
}

export type QuestionPageState = ReturnType<typeof useQuestionPageState>["states"];
