import './index.css'
import { useState } from 'react'
import GameCards from '../../components/GameCards'
import useUser from '../../hooks/useUser'
import NavTabs from '../../components/NavTabs'

export default function MyLibrary () {
  const [view, setView] = useState('FavoritesGames')
  const {
    favGames,
    playedGames,
    playingGames,
    removeFavGame,
    removePlayedGame,
    removePlayingGame
  } = useUser()

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
        {view === 'FavoritesGames' && <GameCards games={favGames} deleteGame={removeFavGame} />}
        {view === 'PlayingGames' && <GameCards games={playingGames} deleteGame={removePlayingGame} />}
        {view === 'PlayedGames' && <GameCards games={playedGames} deleteGame={removePlayedGame} />}
      </div>
    </div>
  )
}
