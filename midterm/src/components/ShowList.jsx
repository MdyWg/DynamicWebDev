import ShowItem from './ShowItem'

const ShowList = (props) => {
  const {shows} = props

  const renderedShows = shows.map((show) => {
    return <ShowItem key={show.id} show={show} />
  })

  return <div>{renderedShows}</div>
}

export default ShowList
