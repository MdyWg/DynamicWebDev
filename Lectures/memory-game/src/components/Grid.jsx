import {useState, useEffect} from 'react'
import Card from './Card'
import Bilbo from '../assets/bilbo-baggins.png'
import Cameron from '../assets/cameron-poe.png'
import Nikki from '../assets/nikki-cage.png'
import Pollux from '../assets/pollux-troy.png'

// Four images. A real game needs eight cards -- two of each -- in a random
// order, which is the first thing we do in class.
const cardImages = [{src: Bilbo}, {src: Cameron}, {src: Nikki}, {src: Pollux}]

const Grid = () => {
  const [cards, setCards] = useState([])
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  const shuffleCards = () => {
    // sort calls this for pairs of items, a negative number leaves them alone, positive number swaps them
    const shuffled = [...cardImages, ...cardImages].sort(() => Math.random() - 0.5)
    // every card needs its own card component with a unique id, there are two of each image now
    // src no longer tells the 2 copies apart
    .map((card) => ({...card, id: crypto.randomUUID()}))
    setCards(shuffled)
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)


  }

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
  }


  useEffect(() => {
    if (choiceOne && choiceTwo) {
      // if the 2 srcs match, we picked the same card
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          // never edit cards directly, make a copy and use setter
          prevCards.map((card)=> {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            }
            return card
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  return (
    <>
      <button onClick={shuffleCards} className="bg-blue-900 text-white uppercase px-8 py-4 rounded-lg mb-6">New Game</button>
      <div className="grid grid-cols-4 gap-4 max-w-3xl">
        {cards.map((card) => (
          <Card key={card.id} card={card} handleChoice={handleChoice} flipped={card === choiceOne || card === choiceTwo}/>
        ))}
      </div>
    </>

  )
}

export default Grid
