import {useState} from 'react'
import useShowsContext from '../hooks/use-shows-context'

const ShowCreate = () => {
  const {createShow} = useShowsContext()
  // the input's text lives here -- this component owns it, because nobody
  // else needs to know what you are halfway through typing
  const [title, setTitle] = useState('')
  const [episode, setEpisode] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleEpisodeChange = (event) => {
    setEpisode(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    createShow(title, episode)
    // clear the box. This is only possible BECAUSE the input is controlled.
    setTitle('')
    setEpisode('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Show title"
        className="flex-1 border border-gray-300 rounded px-3 py-2"
      />
      <input
        type="number"
        min="1"
        value={episode}
        onChange={handleEpisodeChange}
        placeholder="Episode"
        className="w-28 border border-gray-300 rounded px-3 py-2"
      />
      <button className="bg-blue-900 text-white px-5 py-2 rounded">Add</button>
    </form>
  )
}

export default ShowCreate
