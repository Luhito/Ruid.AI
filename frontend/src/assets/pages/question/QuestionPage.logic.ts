import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { QuestionPageStates } from './QuestionPage.state';
import { useQuestionAPI } from '@/api/hooks/useQuestionAPI';
import { useEffect } from 'react';
import { useRoomAPI } from '@/api/hooks/useRoomAPI';
import { useQuestionListAPI } from '@/api/hooks/useQuestionListAPI'
import * as requests from '@/api/requests'

export const useQuestionPageLogic = (questionId: string, states: QuestionPageStates) => {
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

        states.setters.setOpenAnswer(true);
    }

    const onClick_back = () => {
        navigate('/home')
    }

    const onClick_answer = (index: number) => {
        if (states.isOpenAnswer) return;

        states.setters.setOpenAnswer(true);
        if (question.data && index === question.data.correct_answer_index) {
            states.setters.setCorrect(true);
        }
        else {
            states.setters.setCorrect(false);
        }
    }

    const onClick_questionList = () => {
        if(!states.isQuestionListModalOpen) {
            states.setters.setQuestionListModalOpen(true);
        }
    }

    const navigateQuestion = (questionId: string) => {
        states.initAll()
        navigate(`/questions/${questionId}`);
    }

    const navigateNextQuestion = async () => {
        const nextQuestionId = await requests.getNextQuestion(question.data?.room_id);
        if (nextQuestionId) {
            console.log(`navigating: ${nextQuestionId}`);
            states.initAll();
            navigate(`/questions/${nextQuestionId}`);
        }
        else {
            console.error(`failed to get next question. id: ${nextQuestionId}`)
        }
    }

    // (テスト用)LLM生成待ち時間作成
    useEffect(() => {
        const timer = setTimeout(() => {
            states.setters.setGenerating(false);
            states.setters.setGenerationCompleted(true);
        }, 2000);
        return () => {
            clearTimeout(timer);
        }
    })

    // 未回答の問題のページなら、問題リストに自分の問題を加えて表示させる
    if (question.data?.answered_flg === false) {
        if (!(questionList.data?.some((item) => item.question_id === questionId))) {
            questionList.data?.push({question_id: questionId, summary: question.data?.summary})
        }
    }

    return {
        logics: {
            status: question.status,
            question: question.data,
            room: room.data,
            questionList: questionList.data,
            answered_flg: question.data?.answered_flg,
            onClick_viewAnswer,
            onClick_back,
            onClick_answer,
            onClick_questionList,
            navigateQuestion,
            navigateNextQuestion
        }
    }
}
