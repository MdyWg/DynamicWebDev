import {useState, useEffect} from 'react'
import ShowCreate from './components/ShowCreate'
import ShowList from './components/ShowList'
// import our custom hook to consume context
import useShowsContext from './hooks/use-shows-context'

const App = () => {
  // calling our custom hook which not only imports the 2 items we always need to consumer a context
  // it replaces out useContext(ShowsContext) with our hook useShowsContext()
  const {shows, isLoading, error, fetchShows} = useShowsContext()
  const [filter, setFilter] = useState('All')

  // [] = run once, when the component first appears. NOT every render --
  // that would fetch, set state, re-render, fetch again, forever.
  // we put the fetchShows in the dependency array because that function was not created in this file
  useEffect(() => {
    fetchShows()
  }, [fetchShows])

  // derived from state, not stored -- always right, for free
  const remaining = shows.filter((show) => !show.done).length

  const filteredShows = shows.filter((show) => {
    if (filter === 'Watching') {
      return !show.done
    }
    if (filter === 'Completed') {
      return show.done
    }
    return true
  })

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Show Watchlist</h1>
      <ShowCreate />

      {isLoading && <p className="text-gray-500">Loading your shows...</p>}

      {error && <p className="rounded bg-red-50 p-3 text-red-700">{error}</p>}

      {!isLoading && !error && shows.length === 0 ? (
        <p className="text-gray-500">Nothing yet. Add something above.</p>
      ) : (
        <>
          <div className="flex mb-4">
            {['All', 'Watching', 'Completed'].map((status) => (
              <button
                key={status}
                className={`px-4 py-2 ${filter === status ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>
          <ShowList shows={filteredShows} />
        </>
      )}

      <p className="mt-6 text-sm text-gray-500">
        {remaining} {remaining === 1 ? 'show' : 'shows'} still watching
      </p>
    </div>
  )
}

export default App
