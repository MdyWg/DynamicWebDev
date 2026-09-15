import {RECIPE} from './recipe-data'
import Card from './Card'
import RecipeImg from './RecipeImg'
import RecipeInfo from './RecipeInfo'
import IngredientsList from './IngredientsList'
import InstructionsList from './InstructionsList'
import UserRating from './UserRating'
import styles from './RecipeCard.module.css'

export default function RecipeCard() {
  return (
    <Card>
      <div className={styles.image_col}>
        <RecipeImg imgSrc={RECIPE.imgSrc} />
        <UserRating />
      </div>
      <div className="card_text">
        <RecipeInfo title={RECIPE.title} description={RECIPE.description} />
        <div className={styles.card_lists}>
          <IngredientsList ingredients={RECIPE.ingredients} />
          <InstructionsList instructions={RECIPE.instructions} />
        </div>
      </div>
    </Card>
  )
}
