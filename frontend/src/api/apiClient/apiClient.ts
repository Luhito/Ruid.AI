import { Configuration } from '@gen/configuration.js';
import { QuestionApi } from '@gen/api';

const configuration = new Configuration({
    basePath: import.meta.env.VITE_API_BASE_URL,
});
const apiInstance = new QuestionApi(configuration);

export {
    apiInstance
}