import { Configuration } from '@gen/configuration.js';
import { QuestionApi, RoomApi } from '@gen/api';

const configuration = new Configuration({
    basePath: import.meta.env.VITE_API_BASE_URL,
});
export const apiInstance = {
    question: new QuestionApi(configuration),
    room: new RoomApi(configuration)
}