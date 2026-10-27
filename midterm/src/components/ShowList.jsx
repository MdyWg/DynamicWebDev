import ShowItem from './ShowItem'

const ShowList = (props) => {
  const {shows} = props

  const renderedShows = shows.map((show) => {
    return <ShowItem key={show.id} show={show} />
  })

  return (
    <div className="divide-y divide-neutral-800 border border-neutral-800 bg-neutral-950 px-4 sm:px-6">
      {renderedShows}
    </div>
  )
}

export default ShowList
