import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t } = useTranslation();

    return (
        <>
            {t('home-title')}
            <QuestionComponent questionName={t('home-question-capital-france')} score={85} />
        </>
    )
}

export { Home };

type QuestionComponentType = {
    questionName: string,
    score: number
}
const QuestionComponent = (props: QuestionComponentType) => {
    const { t } = useTranslation();

    return (
        <div>
            <h2>{props.questionName}</h2>
            <p>{t('home-question-score', { score: props.score })}</p>
        </div>
    )
}
