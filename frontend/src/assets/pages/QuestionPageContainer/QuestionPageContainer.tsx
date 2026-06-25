import { useSearchParams } from 'react-router-dom';
import { ErrorQuestionPage } from '../errorQuestionPage/ErrorQuestionPage';
import { QuestionPage } from '../question/QuestionPage';

export const QuestionPageContainer = () => {
    const [searchParams] = useSearchParams();
    const questionId = searchParams.get("id");

    if (!questionId) {
        return <ErrorQuestionPage />;
    }

    return <QuestionPage questionId={questionId} />;
}