import { apiInstance } from '@/api/apiClient/apiClient';
import type { SubmitAnswerRequest, SubmitAnswer200Response } from '@gen/api';

export const submitAnswer = async (questionId: string | null, answer: string | null): Promise<SubmitAnswer200Response | null> => {
    // 引数チェック
    if (!questionId || !answer) {
        return null;
    }
    // リクエストボディ作成
    const body: SubmitAnswerRequest = {
        answer
    }

    // API Call
    const response = await apiInstance.question.submitAnswer(questionId, body);

    // レスポンスデータがfalsyならnullを返す
    if (!response.data) return null;

    // 値を返す
    return response.data;
}