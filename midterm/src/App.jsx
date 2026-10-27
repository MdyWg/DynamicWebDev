import {useState, useEffect} from 'react'
import ShowCreate from './components/ShowCreate'
import ShowList from './components/ShowList'
// import our custom hook to consume context
import useShowsContext from './hooks/use-shows-context'
import isCompleted from './util/is-completed'

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
  const remaining = shows.filter((show) => !isCompleted(show)).length

  const filteredShows = shows.filter((show) => {
    if (filter === 'Watching') {
      return !isCompleted(show)
    }
    if (filter === 'Completed') {
      return isCompleted(show)
    }
    return true
  })

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-xl mx-auto px-4 py-8 sm:px-8 sm:py-12">
        <header className="mb-8">
          <h1 className="font-display text-4xl text-white sm:text-5xl">Show Watchlist</h1>
        </header>

        <ShowCreate />

        {isLoading && <p className="text-center text-neutral-400 py-10">Loading your shows...</p>}

        {error && (
          <p className="border border-white p-4 text-white">{error}</p>
        )}

        {!isLoading && !error && shows.length === 0 && (
          <div className="border-2 border-dashed border-neutral-700 px-6 py-10 text-center">
            <p className="font-serif text-xl text-white">Your watchlist is empty</p>
            <p className="mt-1 text-neutral-400">Add a show you're watching above to start keeping track.</p>
          </div>
        )}

        {!isLoading && !error && shows.length > 0 && (
          <>
            <div className="flex flex-wrap gap-2 mb-4">
              {['All', 'Watching', 'Completed'].map((status) => (
                <button
                  key={status}
                  className={`px-4 py-1.5 text-sm font-medium ${filter === status ? 'bg-white text-black' : 'border border-neutral-700 text-neutral-300 hover:border-white hover:text-white'}`}
                  onClick={() => setFilter(status)}
                >
                  {status}
                </button>
              ))}
            </div>

            {filteredShows.length === 0 ? (
              <p className="border border-neutral-800 bg-neutral-950 px-6 py-8 text-center text-neutral-400">
                No {filter.toLowerCase()} shows right now.
              </p>
            ) : (
              <ShowList shows={filteredShows} />
            )}

            <p className="mt-6 text-sm text-neutral-500">
              {remaining} {remaining === 1 ? 'show' : 'shows'} still watching
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default App
