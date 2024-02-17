import useApp from './useApp'
import useUser from './useUser'
import { useEffect, useState } from 'react'
import retrieveGameDetail from '../services/retrieve-game-detail'

export default function useGameDetail ({ gameId }) {
  const { loading, showLoading, hideLoading } = useApp()
  const { token } = useUser()
  const [gameDetail, setGameDetail] = useState({})
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    showLoading()
    retrieveGameDetail(gameId, token)
      .then(setGameDetail)
      .catch(() => setHasError(true))
      .finally(() => hideLoading())
  }, [gameId])

  return { gameDetail, loading, hasError }
}
