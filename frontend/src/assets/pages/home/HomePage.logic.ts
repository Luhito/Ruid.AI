export const useHomePageLogic = () => {
    const getNewQuestionId = async () => {
        // 問題作成APIをcall
        const dummy_question_id = "dummy-question_id";
        return dummy_question_id;
    }

    return {
        logics: {
            getNewQuestionId
        }
    }
}