import {useState} from 'react'
import useShowsContext from '../hooks/use-shows-context'

const ShowCreate = () => {
  const {createShow} = useShowsContext()
  // the input's text lives here -- this component owns it, because nobody
  // else needs to know what you are halfway through typing
  const [title, setTitle] = useState('')
  const [episode, setEpisode] = useState('')
  const [totalEpisodes, setTotalEpisodes] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleEpisodeChange = (event) => {
    setEpisode(event.target.value)
  }

  const handleTotalEpisodesChange = (event) => {
    setTotalEpisodes(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    createShow(
      title,
      episode === '' ? 0 : Number(episode),
      totalEpisodes === '' ? null : Number(totalEpisodes)
    )
    // clear the box. This is only possible BECAUSE the input is controlled.
    setTitle('')
    setEpisode('')
    setTotalEpisodes('')
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 flex flex-col gap-2 border border-neutral-800 bg-neutral-950 p-4 sm:flex-row">
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Show title"
        className="min-w-0 flex-1 border border-neutral-700 bg-black px-3 py-2 text-white placeholder:text-neutral-500"
      />
      <input
        type="number"
        min="1"
        max={totalEpisodes || undefined}
        value={episode}
        onChange={handleEpisodeChange}
        placeholder="Episode"
        className="border border-neutral-700 bg-black px-3 py-2 text-white placeholder:text-neutral-500 sm:w-28"
      />
      <input
        type="number"
        min="1"
        value={totalEpisodes}
        onChange={handleTotalEpisodesChange}
        placeholder="Total"
        className="border border-neutral-700 bg-black px-3 py-2 text-white placeholder:text-neutral-500 sm:w-24"
      />
      <button className="bg-white px-5 py-2 font-medium text-black hover:bg-neutral-200">Add</button>
    </form>
  )
}

export default ShowCreate
