import {useContext} from 'react'
import ShowsContext from '../context/shows'

const useShowsContext = () => {
  return useContext(ShowsContext)
}

export default useShowsContext
