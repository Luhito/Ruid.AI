import { apiInstance } from '@/api/apiClient/apiClient';

export const getNextQuestion = async (room_id: string | undefined): Promise<string | null> => {
    if (!room_id) {
        return null;
    }
    return (await apiInstance.room.getNewQuestionId(room_id)).data.question_id;
}