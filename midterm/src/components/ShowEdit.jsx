import {useState} from 'react'

const ShowEdit = (props) => {
  const {show, onSubmit} = props
  // start the input at the show's CURRENT title, so editing means changing
  // what is there rather than retyping it
  const [title, setTitle] = useState(show.title)
  const [episode, setEpisode] = useState(show.episode)

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleEpisodeChange = (event) => {
    setEpisode(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(show.id, title, episode)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 py-3">
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
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
      <button className="bg-blue-900 text-white px-4 py-2 rounded text-sm">
        Save
      </button>
    </form>
  )
}

export default ShowEdit
