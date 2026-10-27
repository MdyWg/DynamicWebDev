import {useState} from 'react'
import ShowEdit from './ShowEdit'
import useShowsContext from '../hooks/use-shows-context'
import isCompleted from '../util/is-completed'

const ShowItem = (props) => {
  // we still need the concept of an individual show as a prop
  const {show} = props
  // these are not onEdit etc... they are the functions from valuesToShare in ShowsContext Provider component
  const {deleteShowById, editShowById} = useShowsContext()
  // THIS one belongs here. Whether this row is showing its edit form is
  // nobody else's business -- App does not care, the other rows do not care.
  const [showEdit, setShowEdit] = useState(false)

  const handleDelete = () => {
    deleteShowById(show.id)
  }

  const handleEditClick = () => {
    // this stays the same, it updates this components local state,
    // no other component care about this, it does not move up to context
    setShowEdit(!showEdit)
  }

  const handleSubmit = (id, newTitle, newEpisode, newTotalEpisodes) => {
    editShowById(id, newTitle, newEpisode, newTotalEpisodes)
    // close the form once the edit has gone up
    setShowEdit(false)
  }

  if (showEdit) {
    return <ShowEdit show={show} onSubmit={handleSubmit} />
  }

  const completed = isCompleted(show)

  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <span className={`min-w-0 font-medium ${completed ? 'text-neutral-500' : 'text-white'}`}>
        {show.title}
      </span>

      <div className="flex items-center gap-3 text-sm">
        <span
          className={`border px-2.5 py-0.5 font-medium ${completed ? 'border-white bg-white text-black' : 'border-neutral-600 text-white'}`}
        >
          Ep {show.episode || 0} / {show.totalEpisodes || '?'}
        </span>
        <button onClick={handleEditClick} className="text-neutral-300 hover:text-white hover:underline">
          edit
        </button>
        <button onClick={handleDelete} className="text-neutral-300 hover:text-white hover:underline">
          delete
        </button>
      </div>
    </div>
  )
}

export default ShowItem
