import { useEffect, useState } from 'react'
import { searchGames } from '../services'

export default function useSearchGames ({ query }) {
  const [games, setGames] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    searchGames(query)
      .then(games => setGames(games))
      .catch(e => setHasError(true))
      .finally(() => setIsLoading(false))
  }, [query])

  return {
    games,
    isLoading,
    hasError
  }
}
