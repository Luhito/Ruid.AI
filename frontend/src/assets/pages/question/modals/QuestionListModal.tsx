import { BaseModal } from '@/shared-components/modal/BaseModal';
import styles from './Modal.module.css';

export function QuestionListModal(props: {
  hidden: boolean;
  closeModal: () => void;
  questionList: {
    title: string;
    questionId: string;
  }[];
  navigateQuestion: (questionId: string) => void;
}) {
  return (
    <BaseModal
      hidden={props.hidden}
      onClose={props.closeModal}
      title="ルーム"
    >
        <div className={styles.questionListContainer}>
            {props.questionList.map((value) => {
                return (
                    <button
                      type="button"
                      className={styles.questionListItem}
                      key={value.questionId}
                      onClick={() => {props.navigateQuestion(value.questionId)}}
                    >
                        {value.title}
                    </button>
                )
            })}
        </div>
      
    </BaseModal>
  );
}
