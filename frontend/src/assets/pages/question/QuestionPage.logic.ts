import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { QuestionPageState } from './QuestionPage.state';

export const useQuestionPageLogic = (states: QuestionPageState) => {
    const navigate = useNavigate();
    const { t } = useTranslation("question");
    const correct_answer_index = 1;

    const getQuestion = () => {
        return {
            correct_answer_index: 1,
            choiceTags: ['A', 'B', 'C', 'D'],
            choiceTexts: ['choice1', 'choice2', 'choice3', 'choice4'],
            question_test: "テスト用問題文\n\n改行もあるよ\n\n**how's the bold letter?**",
            explanation_test: "ここに説明が表示されるはずです\n\n**それも、マークダウンで！**"
        }
    }

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
            getQuestion,
            onClick_viewAnswer,
            onClick_back,
            onClick_answer
        }
    }
}
