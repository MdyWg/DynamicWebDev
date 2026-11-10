import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {PRINTS} from '../data/prints'
import {itemAdded} from '../features/cartSlice'
import {
  favouriteToggled,
  selectFavouriteIds,
  selectIsFavourite,
} from '../features/favouritesSlice'

const SWATCH = {
  red: 'bg-flat-red',
  blue: 'bg-flat-blue',
  yellow: 'bg-flat-yellow',
}

const PrintCard = ({print}) => {
  // all ths is doing is giving us direct access to store's dispatch function
  // this is the SAME dispatch idea we met with useReducer, except this is one dispatch for the entire app
  const dispatch = useDispatch()
  const isFavourite = useSelector(selectIsFavourite(print.id))

  return (
    <li className="border-b-4 border-r-4 border-ink">
      <div className={`h-28 ${SWATCH[print.color]}`} />

      <div className="flex items-center justify-between gap-2 px-3 py-3">
        <div>
          <p className="text-sm font-black uppercase">{print.title}</p>
          <p className="text-xs">${print.price}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            className={`h-8 w-8 border-4 border-ink ${
              isFavourite ? 'bg-flat-red' : 'bg-paper'
            }`}
            aria-pressed={isFavourite}
            aria-label={
              isFavourite
                ? `Remove ${print.title} from favourites`
                : `Add ${print.title} to favourites`
            }
            onClick={() => dispatch(favouriteToggled(print.id))}
          />

          {/* itemAdded(print)  does NOT change anything! it builds an action object, and dispatch is what sends it*/}
          <button
            className="border-4 border-ink bg-flat-yellow px-3 py-1 text-xs font-black uppercase"
            onClick={() => dispatch(itemAdded(print))}
          >
            Add
          </button>
        </div>
      </div>
    </li>
  )
}

const Catalog = () => {
  const [onlyFavourites, setOnlyFavourites] = useState(false)
  const favouriteIds = useSelector(selectFavouriteIds)

  const visiblePrints = onlyFavourites
    ? PRINTS.filter((print) => favouriteIds.includes(print.id))
    : PRINTS

  return (
    <section>
      <div className="border-b-4 border-ink px-3 py-2">
        <button
          className={`border-4 border-ink px-3 py-1 text-xs font-black uppercase ${
            onlyFavourites ? 'bg-flat-red text-paper' : 'bg-paper'
          }`}
          aria-pressed={onlyFavourites}
          onClick={() => setOnlyFavourites(!onlyFavourites)}
        >
          {onlyFavourites ? 'Showing favourites' : 'Show only favourites'}
        </button>
      </div>

      <ul className="grid grid-cols-2">
        {visiblePrints.map((print) => (
          <PrintCard key={print.id} print={print} />
        ))}
      </ul>

      {onlyFavourites && visiblePrints.length === 0 && (
        <p className="px-3 py-4 text-sm font-black uppercase">No favourites yet</p>
      )}
    </section>
  )
}

export default Catalog
