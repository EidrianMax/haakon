import { useEffect, useState } from 'react'
import { retrieveGameDetail } from '../services'

export default function UseGameDetail ({ gameId }) {
  const [game, setGame] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    retrieveGameDetail(gameId)
      .then(game => setGame(game))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false))
  }, [gameId])

  return {
    game,
    isLoading,
    hasError
  }
}
