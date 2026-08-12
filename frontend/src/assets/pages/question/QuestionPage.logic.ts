import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { QuestionPageStates, QuestionPageStateSetters } from './QuestionPage.state';
import { useQuestionAPI } from '@/api/schemas/question/useQuestionAPI';
import { useEffect } from 'react';

export const useQuestionPageLogic = (questionId: string, states: QuestionPageStates, stateSetters: QuestionPageStateSetters) => {
    const navigate = useNavigate();
    const { t } = useTranslation("question");
    const question = useQuestionAPI(questionId, "default");
    const onClick_viewAnswer = () => {
        if (states.isOpenAnswer) return;

        // 確認メッセージ表示
        if (!confirm(t('view answer message'))) {
            return;
        }

        stateSetters.setOpenAnswer(true);
    }

    const onClick_back = () => {
        navigate('/')
    }

    const onClick_answer = (index: number) => {
        if (states.isOpenAnswer) return;

        stateSetters.setOpenAnswer(true);
        if (question.data && index === question.data.correct_answer_index) {
            stateSetters.setCorrect(true);
        }
        else {
            stateSetters.setCorrect(false);
        }
    }

    // (テスト用)LLM生成待ち時間作成
    useEffect(() => {
        const timer = setTimeout(() => {
            stateSetters.setGenerating(false);
            stateSetters.setGenerationCompleted(true);
        }, 2000);
        return () => {
            clearTimeout(timer);
        }
    })

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
