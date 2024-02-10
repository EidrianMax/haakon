import './index.css'
import { useEffect, useState } from 'react'
import GameCards from '../../components/GameCards'
import useApp from '../../hooks/useApp'
import retrieveFavGames from '../../services/retrieve-fav-games'
import useUser from '../../hooks/useUser'
import retrievePlayingGames from '../../services/retrieve-playing-games'
import retrievePlayedGames from '../../services/retrieve-played-games'
import NavTabs from '../../components/NavTabs'

export default function MyLibrary () {
  const { showLoading, hideLoading, showModal } = useApp()
  const { token } = useUser()
  const [view, setView] = useState('FavoritesGames')
  const [favoritesGames, setFavoritesGames] = useState([])
  const [playingGames, setPlayingGames] = useState([])
  const [playedGames, setPlayedGames] = useState([])

  useEffect(() => {
    (async () => {
      try {
        showLoading()
        const favoritesGames = await retrieveFavGames(token)
        const playingGames = await retrievePlayingGames(token)
        const playedGames = await retrievePlayedGames(token)

        setFavoritesGames(favoritesGames)
        setPlayingGames(playingGames)
        setPlayedGames(playedGames)

        hideLoading()
      } catch ({ message }) {
        showModal({ message, variant: 'error' })
      } finally {
        hideLoading()
      }
    })()
  }, [])

  const goToFavoritesGames = () => setView('FavoritesGames')
  const goToPlayingGames = () => setView('PlayingGames')
  const goToPlayedGames = () => setView('PlayedGames')

  return (
    <div className='Profile'>
      <NavTabs
        view={view}
        onClickFavorites={goToFavoritesGames}
        onClickPlaying={goToPlayingGames}
        onClickPlayed={goToPlayedGames}
      />

      <br />

      <div>
        {view === 'FavoritesGames' && <GameCards games={favoritesGames} />}
        {view === 'PlayingGames' && <GameCards games={playingGames} />}
        {view === 'PlayedGames' && <GameCards games={playedGames} />}
      </div>
    </div>
  )
}
