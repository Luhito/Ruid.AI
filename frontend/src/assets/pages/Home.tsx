const Home = () => {
    return (
        <>
            Home
            <QuestionComponent questionName="What is the capital of France?" score={85} />
        </>
    )
}

export { Home };

type QuestionComponentType = {
    questionName: string,
    score: number
}
const QuestionComponent = (props: QuestionComponentType) => {
    return (
        <div>
            <h2>{props.questionName}</h2>
            <p>Score: {props.score}</p>
        </div>
    )
}