import { useTranslation } from 'react-i18next';
import MD from 'react-markdown'
import { useQuestionPageLogic } from './QuestionPage.logic'
import { useQuestionPageStates } from './QuestionPage.state'
import styles from './QuestionPage.module.css'
import { Line } from '@/shared-components/Line'
import { ErrorQuestionPage } from '../errorQuestionPage/ErrorQuestionPage';
import { List } from "react-feather";
import { QuestionListModal } from './modals/QuestionListModal';

const QuestionPage = (arg: { questionId: string }) => {

    const { t } = useTranslation("question");
    const { states, stateSetters } = useQuestionPageStates();
    const { logics } = useQuestionPageLogic(arg.questionId, states, stateSetters);
    const question = logics.question;
    const room = logics.room;
    const questionList = logics.questionList;

    if (!arg.questionId) {
        console.error("questionId is not specified. check your request URL.");
        return (<ErrorQuestionPage />)
    }

    return (
        <>
            {/** ヘッダー */}
            <header>
                <div className={styles.headerButtonItems}>
                    <div className={styles.headerButtonItemsLeft}>
                        {/**「戻る」ボタン */}
                        <button className={styles["button-back"]} onClick={logics.onClick_back}>
                            {"≪"}
                            {t('back')}
                        </button>

                        {/**「解説を見る」ボタン  */}
                        {!states.isOpenAnswer && (
                            <button className={styles["button-show-explanation"]} onClick={() => logics.onClick_viewAnswer()}>
                                {t('view answer')}
                            </button>
                        )}
                    </div>
                    <div className={styles.headerButtonItemsRight}>
                        {/**「問題リスト」ボタン */}
                        <button type="button" aria-label="questionList" className={styles.questionListButton} onClick={logics.onClick_questionList}>
                            <List size={30}/>
                        </button>
                    </div>
                </div>
                <div className={styles.headerTextItems}>
                    {/** 「生成中」 or 「生成完了」 */}
                    {states.isGenerating && (
                        <span className={`${styles.generationStatText} ${styles.generating}`}>
                            {t('generating...')}
                        </span>
                    )}
                    {states.isGenerationCompleted && (
                        <span className={`${styles.generationStatText} ${styles.generated}`}>
                            {t('generated')}
                        </span>
                    )}
                    {states.isGenerationCompleted && room && (
                        <span className={`${styles.roomNameText}`}>
                            {room.title}
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
                    {question && <MD>{question.question_text}</MD>}
                </div>

                {/** 選択肢 */}
                <div className={styles['question-choices']}>
                    <ul>
                        {question?.choices?.map((choice, index) => {
                            return (
                                <li key={"choice" + index}>
                                    <span className={styles["question-choice-tag"]}>
                                        {choice.tag || ''}
                                    </span>
                                    <span className={styles["question-choice-content"]}>
                                        {choice.text || ''}
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

                    {/** 「正解」or「不正解」 */}
                    {states.isCorrect ? (<>
                        <div className={`${styles.labelCorrectIncorrect} ${styles.correct}`}>
                            {`${t("correct")}`}
                        </div>
                    </>) : (<>
                        <div className={`${styles.labelCorrectIncorrect} ${styles.incorrect}`}>
                            {`${t("incorrect")}`}
                        </div>
                    </>)}


                    {/** 「解説」 */}
                    <h2 className={styles["subject"]}>
                        {`${t("explanation")}`}
                    </h2>

                    {/** 解説文 */}
                    <div className={styles['md-text']}>
                        <MD>{question?.explanation_text || ''}</MD>
                    </div>
                </>)}
            </main>

            {/** */}
            <footer>
                {/** 質問入力欄 */}
                <div className={styles["new-question-textbox-container"]}>
                    <input
                        type="text"
                        className={styles['new-question-textbox']}
                        placeholder={t("textbox placeholder")}
                    />
                </div>

                {/** 選択肢（未回答時のみ表示） */}
                {!states.isOpenAnswer && (
                    <div className={styles["choices"]}>
                        {question?.choices?.map((choice, index) => {
                            return (
                                <button className={styles["choice-tag"]} onClick={() => logics.onClick_answer(index)} key={`choice-${index}`}>
                                    {choice.tag || ''}
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

            <QuestionListModal {
                ...{
                    hidden: !states.isQuestionListModalOpen,
                    closeModal: () => stateSetters.setQuestionListModalOpen,
                    questionList: (questionList ?? []).map((value) => {
                        return {
                            title: value.summary,
                            questionId: value.question_id
                        }
                    })
                }
            } />
        </>
    )
}

export { QuestionPage };
