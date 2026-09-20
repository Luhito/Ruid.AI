import { useParams } from 'react-router-dom';
import { ErrorQuestionPage } from '../errorQuestionPage/ErrorQuestionPage';
import { QuestionPage } from '../question/QuestionPage';

export const QuestionPageContainer = () => {
    const { question_id } = useParams<{ question_id: string }>();

    if (!question_id) {
        return <ErrorQuestionPage />;
    }

    return <QuestionPage questionId={question_id} />;
}