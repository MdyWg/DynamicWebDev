import {useState} from 'react'
import { FaHeart } from 'react-icons/fa'
import styles from './RecipeCard.module.css'

const UserRating = () => {
    // useState is a React Hook that allows us to add state to a functional component.
    // useState returns an array with two values: the current state value, and a function to update it.
    const  [count, setCount] = useState(0)

    // whenever there's event handlers, you shoulld define a handleFunction
    const handlePlusClick = () => {
        setCount((prev) => Math.min(prev + 1, 5))
    }

    const handleMinusClick = () => {
        setCount((prev) => Math.max(prev - 1, 0))
    }

    return (
        <div className={styles.rating}>
            <span className={styles.rating_btn_slot}>
                {count > 0 && (
                    <button onClick={handleMinusClick} className={styles.rating_btn}>[-]</button>
                )}
            </span>
            <span className={styles.hearts}>
                {[...Array(count)].map((_, index) => (
                    <FaHeart key={index} />
                ))}
            </span>
            <span className={styles.rating_btn_slot}>
                {count < 5 && (
                    <button onClick={handlePlusClick} className={styles.rating_btn}>[+]</button>
                )}
            </span>
        </div>
    )
}

export default UserRating
