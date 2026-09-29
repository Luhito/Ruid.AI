import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { QuestionPageStates, QuestionPageStateSetters } from './QuestionPage.state';
import { useQuestionAPI } from '@/api/hooks/useQuestionAPI';
import { useEffect } from 'react';
import { useRoomAPI } from '@/api/hooks/useRoomAPI';
import { useQuestionListAPI } from '@/api/hooks/useQuestionListAPI'
import * as requests from '@/api/requests'

export const useQuestionPageLogic = (questionId: string, states: QuestionPageStates, stateSetters: QuestionPageStateSetters) => {
    const navigate = useNavigate();
    const { t } = useTranslation("question");
    const question = useQuestionAPI(questionId, "default");
    const room = useRoomAPI(question.data?.room_id, "default");
    const questionList = useQuestionListAPI(question.data?.room_id, "default");

    const onClick_viewAnswer = () => {
        if (states.isOpenAnswer) return;

        // 確認メッセージ表示
        if (!confirm(t('view answer message'))) {
            return;
        }

        stateSetters.setOpenAnswer(true);
    }

    const onClick_back = () => {
        navigate('/home')
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

    const onClick_questionList = () => {
        if(!states.isQuestionListModalOpen) {
            stateSetters.setQuestionListModalOpen(true);
        }
    }

    const navigateQuestion = (questionId: string) => {
        navigate(`/questions/${questionId}`);
    }

    const navigateNextQuestion = async () => {
        const nextQuestionId = await requests.getNextQuestion(question.data?.room_id);
        if (nextQuestionId) {
            console.log(`navigating: ${nextQuestionId}`);
            navigate(`/questions/${nextQuestionId}`);
        }
        else {
            console.error(`failed to get next question. id: ${nextQuestionId}`)
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
            room: room.data,
            questionList: questionList.data,
            onClick_viewAnswer,
            onClick_back,
            onClick_answer,
            onClick_questionList,
            navigateQuestion,
            navigateNextQuestion
        }
    }
}
