import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const navigate = useNavigate();
    return (
        <>
            <h1>
                This is a dummy page which navigates to QuestionPage.
            </h1>
            <button onClick={() => navigate("/question?id=rnd")}>Question Page</button>
        </>
    )
}

export { HomePage }