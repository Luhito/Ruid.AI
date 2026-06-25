import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { QuestionPageState } from './QuestionPage.state';
import { useQuestion } from '@/api/schemas/question/useQuestion';

export const useQuestionPageLogic = (questionId: string, states: QuestionPageState) => {
    const navigate = useNavigate();
    const { t } = useTranslation("question");
    const question = useQuestion(questionId, "default");
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
        if (question.data && index === question.data.correct_answer_index) {
            alert("correct");
        }
        else {
            alert("incorrect");
        }
    }

    return {
        logics: {
            status: question.status,
            question: question.data,
            onClick_viewAnswer,
            onClick_back,
            onClick_answer
        }
    }
}
