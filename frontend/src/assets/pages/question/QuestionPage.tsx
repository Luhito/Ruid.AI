import { useTranslation } from 'react-i18next';
import MD from 'react-markdown'
import { useQuestionPageLogic } from './QuestionPage.logic'
import styles from './QuestionPage.module.css'

const QuestionPage = () => {
    const { t } = useTranslation("question");
    const { logics } = useQuestionPageLogic();

    const testArr = ['A', 'B', 'C', 'D'];
    const testArr2 = ['choice1', 'choice2', 'choice3', 'choice4'];

    return (
        <>
            {/** */}
            <header>
                <div className={styles["header-buttons"]}>
                    {/** */}
                    <div>
                        <button onClick={logics.onClick_back}>
                            {"<<"}
                            {t('back')}
                        </button>
                    </div>

                    {/** */}
                    <span className={styles["header-buttons-right"]}>
                        <button onClick={() => logics.onClick_viewAnswer()}>
                            {t('view answer')}
                        </button>
                    </span>
                </div>
            </header>

            {/** */}
            <main>
                {/** */}
                <div className="subject-question">
                    <h2><b>{t("question")}</b></h2>
                </div>

                <div id="question-text">
                    <MD>{"テスト用問題文\n改行もあるよ\n**how's the bold letter?**"}</MD>
                </div>
                <div id="question-choices">
                    <ul>
                    {testArr.map((value, index) => {
                        return (
                            <li key={"choice"+index}>
                                <span id="question-choice-tag">
                                    {value}
                                </span>
                                <span id="question-choice-content">
                                    {testArr2[index]}
                                </span>
                            </li>
                        )
                    })}
                    </ul>
                </div>
            </main>
        </>
    )
}

export { QuestionPage };