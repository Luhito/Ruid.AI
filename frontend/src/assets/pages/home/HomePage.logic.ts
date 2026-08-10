export const useHomePageLogic = () => {
    const getNewQuestionId = async () => {
        // 問題作成APIをcall
        const dummy_qid = "dummy-qid";
        return dummy_qid;
    }

    return {
        logics: {
            getNewQuestionId
        }
    }
}