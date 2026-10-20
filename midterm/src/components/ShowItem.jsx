import {useState} from 'react'
import ShowEdit from './ShowEdit'
import useShowsContext from '../hooks/use-shows-context'

const ShowItem = (props) => {
  // we still need the concept of an individual show as a prop
  const {show} = props
  // these are not onEdit etc... they are the functions from valuesToShare in ShowsContext Provider component
  const {deleteShowById, editShowById, toggleShowById} = useShowsContext()
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

  const handleSubmit = (id, newTitle, newEpisode) => {
    editShowById(id, newTitle, newEpisode)
    // close the form once the edit has gone up
    setShowEdit(false)
  }

  const handleToggle = () => {
    // send the OPPOSITE of what it is now
    toggleShowById(show.id, !show.done)
  }

  if (showEdit) {
    return <ShowEdit show={show} onSubmit={handleSubmit} />
  }

  return (
    <div className="flex items-center justify-between border-b border-gray-200 py-3">
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={show.done || false}
          onChange={handleToggle}
          className="h-4 w-4"
        />
        <span className={show.done ? 'line-through text-gray-400' : ''}>
          {show.title}
        </span>
        {/* update later */}
        <span className={show.done ? 'line-through text-gray-400' : ''}>
          {show.episode}
        </span>
      </label>

      <div className="flex gap-3 text-sm">
        <button onClick={handleEditClick} className="text-blue-700">
          edit
        </button>
        <button onClick={handleDelete} className="text-red-600">
          delete
        </button>
      </div>
    </div>
  )
}

export default ShowItem
