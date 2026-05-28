import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { QuestionPageActions } from './QuestionPage.state';

export const useQuestionPageLogic = (actions: QuestionPageActions) => {
    const navigate = useNavigate();
    const { t } = useTranslation("question");
    const correct_answer_index = 1;

    const onClick_viewAnswer = () => {
        // 確認メッセージ表示
        if (!confirm(t('view answer message'))) {
            return;
        }

        actions.setOpenAnswer(true);
    }

    const onClick_back = () => {
        navigate('/')
    }

    const onClick_answer = (index: number) => {
        actions.setOpenAnswer(true);
        if (index === correct_answer_index) {
            alert("correct");
        }
        else {
            alert("incorrect");
        }
    }

    return {
        logics: {
            onClick_viewAnswer,
            onClick_back,
            onClick_answer
        }
    }
}
