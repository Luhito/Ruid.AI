import { BaseModal } from '@/shared-components/modal/BaseModal';
import styles from './Modal.module.css';

export function QuestionListModal(props: {
  hidden: boolean;
  closeModal: () => void;
  questionList: {
    title: string;
    questionId: string;
  }[];
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
                    <div className={styles.questionListItem} key={value.questionId}>
                        {value.title}
                    </div>
                )
            })}
        </div>
      
    </BaseModal>
  );
}
