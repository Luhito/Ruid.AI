import { useNavigate } from 'react-router-dom'
import { NewQuestionModal } from './Modal/NewQuestionModal';
import { useState } from 'react';
import { useHomePageLogic } from './HomePage.logic'

const sampleQuestionId = '00000000-0000-0000-0001-000000000001';

const HomePage = () => {
    const navigate = useNavigate();
    const [ open, setOpen ] = useState(false);
    const { logics } = useHomePageLogic();

    const menuModalProps = {
        hidden: !open,
        closeModal: () => setOpen(false),
        onClickCreateQuestion: async () => {

            const qid = await logics.getNewQuestionId();
            navigate(`/question?id=${qid}`);
        }
    }

    return (
        <>
            <h1>
                This is a dummy page which navigates to QuestionPage.
            </h1>
            <button onClick={() => navigate(`/question?id=${sampleQuestionId}`)}>Question Page</button>
            <button onClick={() => setOpen(true)}>New Question</button>
            <div className="modal-area">
                <NewQuestionModal {...menuModalProps}></NewQuestionModal>
            </div>
            
        </>
    )
}

export { HomePage }
