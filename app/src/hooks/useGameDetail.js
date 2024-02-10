import useApp from './useApp'
import useUser from './useUser'
import { useEffect, useState } from 'react'
import retrieveGameDetail from '../services/retrieve-game-detail'
import toggleFavGame from '../services/toggle-fav-game'

export default function useGameDetail ({ gameId }) {
  const { loading, showLoading, hideLoading } = useApp()
  const { token } = useUser()
  const [gameDetail, setGameDetail] = useState({})
  const [isFav, setIsFav] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    showLoading()
    retrieveGameDetail(gameId, token)
      .then(gameDetail => {
        setGameDetail(gameDetail)
        setIsFav(gameDetail.isFav)
      })
      .catch(() => setHasError(true))
      .finally(() => hideLoading())
  }, [gameId])

  const onFav = async () => {
    showLoading()
    await toggleFavGame(token, gameId)
    setIsFav(!isFav)
    hideLoading()
  }

  return { gameDetail, loading, onFav, isFav, hasError }
}
