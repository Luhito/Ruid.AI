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

    const testArr = ['A', 'B', 'C', 'D'];
    const testArr2 = ['choice1', 'choice2', 'choice3', 'choice4'];

    const question_test = "テスト用問題文\n\n改行もあるよ\n\n**how's the bold letter?**";

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
                    <span className={styles["header-buttons-right"]}>
                        <button className={styles["button-show-description"]} onClick={() => logics.onClick_viewAnswer()}>
                            {t('view answer')}
                        </button>
                    </span>
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
                    <MD>{question_test}</MD>
                </div>

                {/** 選択肢 */}
                <div className={styles["question-choices"]}>
                    <ul>
                        {testArr.map((value, index) => {
                            return (
                                <li key={"choice" + index}>
                                    <span className={styles["question-choice-tag"]}>
                                        {value}
                                    </span>
                                    <span className={styles["question-choice-content"]}>
                                        {testArr2[index]}
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
                        <MD>explanation</MD>
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
                        placeholder="単語に関する質問を入力..."
                    />
                </div>
                <div className={styles["choices"]}>
                    {testArr.map((value, index) => {
                        return (
                            <button className={styles["choice-tag"]} onClick={() => logics.onClick_answer(index)} key={`choice-${index}`}>
                                {value}
                            </button>
                        )
                    })}
                </div>
            </footer>
        </>
    )
}

export { QuestionPage };
