const IngredientList = (props) => {
    const {ingredients} = props
    return (
        <div className="ingredients_list">
            <h2 className="list_title">Ingredients</h2>
            <ul>
                {ingredients.map((ingred, index) => (
                    <li key={index} className="list_item">
                        <span className="measure">{ingred.measure}</span>
                        <span>{ingred.item}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}       

export default IngredientList