import {useState, useEffect} from 'react'
import Card from './Card'
import Scuffed from '../assets/scuffed.png'
import Sushi from '../assets/sushi.png'
import Physics from '../assets/Untitled.png'
import Zura from '../assets/zura.png'

// Four images. A real game needs eight cards -- two of each -- in a random
// order, which is the first thing we do in class.
const cardImages = [{src: Scuffed}, {src: Sushi}, {src: Physics}, {src: Zura}]

const Grid = () => {
  const [cards, setCards] = useState([])
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [turns, setTurns] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const [won, setWon] = useState(false)
  const [bestScore, setBestScore] = useState(null)

  const shuffleCards = () => {
    // sort calls this for pairs of items, a negative number leaves them alone, positive number swaps them
    const shuffled = [...cardImages, ...cardImages].sort(() => Math.random() - 0.5)
    // every card needs its own card component with a unique id, there are two of each image now
    // src no longer tells the 2 copies apart
    .map((card) => ({...card, id: crypto.randomUUID()}))
    setCards(shuffled)
    setTurns(0)
    setWon(false)
  }

  const handleChoice = (card) => {
    if (disabled || card === choiceOne || card.matched) {
      return
    }
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)


  }

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setDisabled(false)
    setTurns((prevTurns) => prevTurns + 1)
  }

  // a second effect, watching a different piece of state. `cards` changes
  // when a pair is matched, so that is when this needs to check.
  // cards.length > 0 keeps it from declaring a win on the empty board.
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setWon(true)
      if (turns < bestScore || bestScore === null) {
        setBestScore(turns)
      }
    }
  }, [cards])


  useEffect(() => {
    if (choiceOne && choiceTwo) {
      // if the 2 srcs match, we picked the same card
      if (choiceOne.src === choiceTwo.src) {
          // never edit cards directly, make a copy and use setter
          setCards((prevCards) => {
            return prevCards.map((card) => {
              if (card.src === choiceOne.src) {
                return {...card, matched: true}
              }
              return card
            })
          })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1200)
      }
    }
  }, [choiceOne, choiceTwo])

  return (
    <>
      <button onClick={shuffleCards} className="bg-blue-900 text-white uppercase px-8 py-4 rounded-lg mb-6">New Game</button>
      <p className="mb-6 text-lg">Turns used: {turns}</p>
      <p className="mb-6 text-lg">Best Score: {bestScore}</p>
      {won && (
        <p className="mb-6 text-2xl font-bold text-green-700">
          You cleared the board in {turns} turns.</p>)}
      <div className="grid grid-cols-4 gap-4 max-w-3xl">
        {cards.map((card) => (
          <Card key={card.id} card={card} handleChoice={handleChoice} flipped={card === choiceOne || card === choiceTwo || card.matched}/>
        ))}
      </div>
    </>

  )
}

export default Grid
