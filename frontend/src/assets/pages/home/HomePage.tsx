import { useNavigate } from 'react-router-dom'
import { NewQuestionModal } from './Modal/NewQuestionModal';
import { useState } from 'react';
import { useHomePageLogic } from './HomePage.logic'

const sampleQuestionId = '01a09db5-6b0f-7f0e-b16d-068a3918e430';

const HomePage = () => {
    const navigate = useNavigate();
    const [ open, setOpen ] = useState(false);
    const { logics } = useHomePageLogic();

    const menuModalProps = {
        hidden: !open,
        closeModal: () => setOpen(false),
        onClickCreateQuestion: async () => {

            const question_id = await logics.getNewQuestionId();
            navigate(`/questions/${question_id}`);
        }
    }

    return (
        <>
            <h1>
                This is a dummy page which navigates to QuestionPage.
            </h1>
            <button onClick={() => navigate(`/questions/${sampleQuestionId}`)}>Question Page</button>
            <button onClick={() => setOpen(true)}>New Question</button>
            <div className="modal-area">
                <NewQuestionModal {...menuModalProps}></NewQuestionModal>
            </div>
            
        </>
    )
}

export { HomePage }
