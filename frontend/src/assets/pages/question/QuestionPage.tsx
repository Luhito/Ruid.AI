import { useTranslation } from 'react-i18next';
import MD from 'react-markdown'
import { useQuestionPageLogic } from './QuestionPage.logic'
import { useQuestionPageState } from './QuestionPage.state'
import styles from './QuestionPage.module.css'
import { Line } from '@/shared-components/Line'

const QuestionPage = () => {
    const { t } = useTranslation("question");
    const { states } = useQuestionPageState();
    const { logics } = useQuestionPageLogic(states);
    const question = logics.getQuestion();

    return (
        <>
            {/** ヘッダー */}
            <header>
                <div className={styles["header-buttons"]}>
                    {/**「戻る」ボタン */}
                    <div>
                        <button className={styles["button-back"]} onClick={logics.onClick_back}>
                            {"<<"}
                            {t('back')}
                        </button>
                    </div>

                    {/**「解説を見る」ボタン  */}
                    {!states.isOpenAnswer && (
                        <span className={styles["header-buttons-right"]}>
                            <button className={styles["button-show-description"]} onClick={() => logics.onClick_viewAnswer()}>
                                {t('view answer')}
                            </button>
                        </span>
                    )}
                </div>
            </header>

            {/** メイン部分 */}
            <main>
                {/** 「問題」 */}
                <h2 className={styles["subject"]}>
                    {`${t("question")}`}
                </h2>

                {/** 問題文 */}
                <div className={styles["md-text"]}>
                    <MD>{question.question_test}</MD>
                </div>

                {/** 選択肢 */}
                <div className={styles["question-choices"]}>
                    <ul>
                        {question.choiceTags.map((value, index) => {
                            return (
                                <li key={"choice" + index}>
                                    <span className={styles["question-choice-tag"]}>
                                        {value}
                                    </span>
                                    <span className={styles["question-choice-content"]}>
                                        {question.choiceTexts[index]}
                                    </span>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                {/** 解説部分 */}
                {states.isOpenAnswer && (<>
                    {/** 線 */}
                    <Line />

                    {/** */}
                    <h2 className={styles["subject"]}>
                        {`${t("explanation")}`}
                    </h2>

                    {/** */}
                    <div className={styles['md-text']}>
                        <MD>{question.explanation_test}</MD>
                    </div>
                </>)}
            </main>

            {/** */}
            <footer>
                {/** 質問入力欄 */}
                <div className={styles["new-description-textbox-container"]}>
                    <input
                        type="text"
                        className={styles['new-description-textbox']}
                        placeholder={t("textbox placeholder")}
                    />
                </div>

                {/** 選択肢（未回答時のみ表示） */}
                {!states.isOpenAnswer && (
                    <div className={styles["choices"]}>
                        {question.choiceTags.map((value, index) => {
                            return (
                                <button className={styles["choice-tag"]} onClick={() => logics.onClick_answer(index)} key={`choice-${index}`}>
                                    {value}
                                </button>
                            )
                        })}
                    </div>
                )}

                {/** 「次へ」ボタン（回答後のみ表示） */}
                {states.isOpenAnswer && (
                    <div className={styles["button-next-container"]}>
                        <button className={styles["button-next"]}>
                            次へ
                        </button>
                    </div>
                )}

            </footer>
        </>
    )
}

export { QuestionPage };
