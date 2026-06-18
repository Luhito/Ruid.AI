import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { QuestionPageState } from './QuestionPage.state';
import type { GetQuestionResponse } from '@/api/generated/api';
import { useQuery } from '@tanstack/react-query';
import { API } from '@/api/wrappers/api';

export const useQuestionPageLogic = (states: QuestionPageState) => {
    const navigate = useNavigate();
    const { t } = useTranslation("question");
    const api = new API();
    const correct_answer_index = 1;

    const qid = "sample";
    const userAgent = "default";
    const acceptLanguage = "default";

    const {status, data} = useQuery<GetQuestionResponse>({
        queryKey: [ "question", qid, acceptLanguage ],
        queryFn: () => api.getQuestion(qid, userAgent, acceptLanguage)
    })

    const onClick_viewAnswer = () => {
        if (states.isOpenAnswer) return;

        // 確認メッセージ表示
        if (!confirm(t('view answer message'))) {
            return;
        }

        states.setOpenAnswer(true);
    }

    const onClick_back = () => {
        navigate('/')
    }

    const onClick_answer = (index: number) => {
        if (states.isOpenAnswer) return;

        states.setOpenAnswer(true);
        if (index === correct_answer_index) {
            alert("correct");
        }
        else {
            alert("incorrect");
        }
    }

    return {
        logics: {
            status: status,
            question: data,
            onClick_viewAnswer,
            onClick_back,
            onClick_answer
        }
    }
}
