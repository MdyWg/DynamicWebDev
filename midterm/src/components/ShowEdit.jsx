import {useState} from 'react'

const ShowEdit = (props) => {
  const {show, onSubmit} = props
  // start the input at the show's CURRENT title, so editing means changing
  // what is there rather than retyping it
  const [title, setTitle] = useState(show.title)
  const [episode, setEpisode] = useState(show.episode)
  const [totalEpisodes, setTotalEpisodes] = useState(show.totalEpisodes || '')

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
    onSubmit(
      show.id,
      title,
      episode === '' ? 0 : Number(episode),
      totalEpisodes === '' ? null : Number(totalEpisodes)
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 py-4 sm:flex-row">
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        className="min-w-0 flex-1 border border-neutral-700 bg-black px-3 py-2 text-white placeholder:text-neutral-500 focus:border-white focus:outline-none"
      />
      <input
        type="number"
        min="1"
        max={totalEpisodes || undefined}
        value={episode}
        onChange={handleEpisodeChange}
        placeholder="Episode"
        className="border border-neutral-700 bg-black px-3 py-2 text-white placeholder:text-neutral-500 focus:border-white focus:outline-none sm:w-28"
      />
      <input
        type="number"
        min="1"
        value={totalEpisodes}
        onChange={handleTotalEpisodesChange}
        placeholder="Total"
        className="border border-neutral-700 bg-black px-3 py-2 text-white placeholder:text-neutral-500 focus:border-white focus:outline-none sm:w-24"
      />
      <button className="bg-white px-4 py-2 text-sm font-medium text-black hover:bg-neutral-200">
        Save
      </button>
    </form>
  )
}

export default ShowEdit
