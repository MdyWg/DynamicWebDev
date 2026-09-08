const InstructionList = (props) => {
    const {instructions} = props
    return (
        <>
            <h2>Instructions</h2>
            <ol>
                {instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                ))}
            </ol>
        </>
    )
}       

export default InstructionList