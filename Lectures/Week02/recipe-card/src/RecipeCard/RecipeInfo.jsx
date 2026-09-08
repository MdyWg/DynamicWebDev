const RecipeInfo = (props) => {
    const {title, description} = props
    return (
        <div className="recipe_info">
            <h1 className="recipe_title">{title}</h1>
            <p>{description}</p>
        </div>

    )
}

export default RecipeInfo
