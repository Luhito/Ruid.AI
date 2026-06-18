import { QuestionApi } from '@/api/generated/api';
import type { GetQuestionResponse } from '@/api/generated/api';
import { Configuration } from '@/api/generated/configuration';

export class API {
    private configuration: Configuration;
    private apiInstance: QuestionApi;

    constructor() {
        this.configuration = new Configuration();
        this.apiInstance = new QuestionApi(this.configuration);
    }

    async getQuestion(qid: string, userAgent: string, acceptLanguage: string): Promise<GetQuestionResponse> {
        const response = await this.apiInstance.getQuestion(
            qid,
            userAgent,
            acceptLanguage
        );
        return response.data;
    }
}