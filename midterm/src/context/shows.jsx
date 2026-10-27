import {createContext, useState, useCallback} from 'react'
import {
  fetchShows as fetchShowsRequest,
  createShow as createShowRequest,
  deleteShow as deleteShowRequest,
  updateShow as updateShowRequest,
} from '../api'

// createContext makes a channel, Nothing is in it yet
const ShowsContext = createContext()

// Provider is an ordinary component. Everything used to live in App,
// lives here now -- the state, and the four functions that actually change it
const Provider = (props) => {
  const {children} = props
  const [shows, setShows] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // this will need useCallback once we see the jslint warning

  // useCallback: give me back the SAME function object between renders
  // fetchShows goes in a useEffect dependency array in App, and a function
  // rebuilt every render is a new value every render - - which would make
  // that effect run forever. [] here in useCallback means "never rebuilt this"
  const fetchShows = useCallback(async () => {
    try {
      const shows = await fetchShowsRequest()
      setShows(shows)
    } catch (err) {
      // the usual cause: you forgot to start the server in the second tab
      console.error(err)
      setError('Could not reach the server. Is `npm run server` running?')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const createShow = async (title, episode, totalEpisodes) => {
    // the server makes the id now, so we no longer invent one
    const newShow = await createShowRequest(title, episode, totalEpisodes)
    const updatedShows = [...shows, newShow]
    setShows(updatedShows)
  }

  const deleteShowById = async (id) => {
    // ask the server first. If it refuses, we never touch our state, and the
    // screen keeps telling the truth.
    await deleteShowRequest(id)

    const updatedShows = shows.filter((show) => {
      return show.id !== id
    })
    setShows(updatedShows)
  }

  const editShowById = async (id, newTitle, newEpisode, newTotalEpisodes) => {
    // find the whole show and send all of it, because PUT replaces
    const show = shows.find((show) => show.id === id)
    const updated = await updateShowRequest({
      ...show,
      title: newTitle,
      episode: newEpisode,
      totalEpisodes: newTotalEpisodes,
    })

    // map returns a new array the SAME length. Every show comes back; the one
    // we edited comes back as the object the SERVER sent us.
    const updatedShows = shows.map((show) => {
      if (show.id === id) {
        return updated
      }
      return show
    })
    setShows(updatedShows)
  }

  // this is still an object! if the key and value have the exact same name, you can shorthand it
  // so below...
  // fetchShows: fetchShows,
  const valuesToShare = {
    shows,
    isLoading,
    error,
    fetchShows,
    createShow,
    deleteShowById,
    editShowById,
  }

  return (
    <ShowsContext.Provider value={valuesToShare}>
      {children}
    </ShowsContext.Provider>
  )
}

export {Provider}
export default ShowsContext
