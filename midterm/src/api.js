import axios from 'axios'

const BASE = 'http://localhost:3001'

export const fetchShows = async () => {
  const response = await axios.get(`${BASE}/shows`)
  return response.data
}

export const createShow = async (title, episode, totalEpisodes) => {
  const response = await axios.post(`${BASE}/shows`, {title, episode, totalEpisodes})
  return response.data
}

export const deleteShow = async (id) => {
  await axios.delete(`${BASE}/shows/${id}`)
}

export const updateShow = async (show) => {
  // PUT REPLACES the record. Send the whole show, not just the bit that
  // changed, or everything else on it is gone.
  const response = await axios.put(`${BASE}/shows/${show.id}`, show)
  return response.data
}
