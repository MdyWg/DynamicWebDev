import styles from './RecipeCard.module.css'

export default function Card(props) {
  const {children} = props
  return <div className={styles.card}>{children}</div>
}
