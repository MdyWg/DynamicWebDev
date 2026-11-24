import {useDispatch, useSelector} from 'react-redux'
import {PRINTS} from '../data/prints'
import {itemAdded} from '../features/cartSlice'
import {
  filterChanged,
  favouritesFilterToggled,
  selectColorFilter,
  selectShowOnlyFavourites,
} from '../features/uiSlice'
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

const FILTERS = ['all', 'red', 'blue', 'yellow']

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
  const dispatch = useDispatch()
  const colorFilter = useSelector(selectColorFilter)
  const showOnlyFavourites = useSelector(selectShowOnlyFavourites)
  const favouriteIds = useSelector(selectFavouriteIds)

  const visible = PRINTS.filter((print) => {
    if (colorFilter !== 'all' && print.color !== colorFilter) {
      return false
    }

    if (showOnlyFavourites && !favouriteIds.includes(print.id)) {
      return false
    }

    return true
  })

  return (
    <section>
      <div className="flex border-b-4 border-ink">
        {FILTERS.map((filter) => {
          const isActive = filter === colorFilter

          return (
            <button
              key={filter}
              onClick={() => dispatch(filterChanged(filter))}
              className={`flex-1 border-r-4 border-ink px-2 py-2 text-xs font-black uppercase ${
                isActive ? 'bg-ink text-paper' : 'bg-paper'
              }`}
            >
              {filter}
            </button>
          )
        })}

        <button
          onClick={() => dispatch(favouritesFilterToggled())}
          aria-pressed={showOnlyFavourites}
          className={`flex-1 px-2 py-2 text-xs font-black uppercase ${
            showOnlyFavourites ? 'bg-flat-red text-paper' : 'bg-paper'
          }`}
        >
          Favs
        </button>
      </div>

      <ul className="grid grid-cols-2">
        {visible.map((print) => (
          <PrintCard key={print.id} print={print} />
        ))}
      </ul>

      {visible.length === 0 && (
        <p className="px-3 py-4 text-sm font-black uppercase">
          Nothing matches these filters
        </p>
      )}
    </section>
  )
}

export default Catalog
