import { useEffect, useState } from 'react'
import { retrieveAllGames } from '../services'

export default function useGames () {
  const [games, setGames] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    retrieveAllGames()
      .then(games => setGames(games))
      .catch(e => setHasError(true))
      .finally(() => setIsLoading(false))
  }, [])

  return {
    games,
    isLoading,
    hasError
  }
}
