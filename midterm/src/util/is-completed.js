const isCompleted = (show) => {
  return show.totalEpisodes > 0 && show.episode >= show.totalEpisodes
}

export default isCompleted
