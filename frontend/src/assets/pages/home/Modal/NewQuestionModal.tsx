import { BaseModal } from '@/shared-components/modal/BaseModal';
import type { SubmitEvent } from 'react';
import styles from './Modal.module.css';

export function NewQuestionModal(props: {
  hidden: boolean;
  closeModal: () => void;
  onClickCreateQuestion: () => void | Promise<void>;
}) {
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    void props.onClickCreateQuestion();
  };

  return (
    <BaseModal
      hidden={props.hidden}
      onClose={props.closeModal}
      title="新しい問題を作成"
    >
      <form onSubmit={handleSubmit}>
        <h2>↓プロンプトを入力↓</h2>
        <textarea className={styles["textarea-prompt"]} required/>
        <br />

        <div className={styles["radio-answer-type"]}>
          <label>
            <input type="radio" name="answer-type" value="N" required/>
            N者択一
          </label>
          <br />
          <label>
            <input type="radio" name="answer-type" value="W" required/>
            記述
          </label>
        </div>

        <button type="submit" className={styles.submitButton}>問題作成</button>
      </form>
      
    </BaseModal>
  );
}
