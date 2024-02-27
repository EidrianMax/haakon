import { useState } from 'react'
import useUser from '../../hooks/useUser'
import GameCards from '../../components/GameCards'
import NavTabs from '../../components/NavTabs'
import Spinner from '../../components/Spinner'

export default function Library () {
  const {
    favGames,
    playingGames,
    playedGames,
    removeFavGame,
    removePlayingGame,
    removePlayedGame,
    isLoading
  } = useUser()
  const [view, setView] = useState('FavoriteGames')

  const goToFavoritesGames = () => setView('FavoriteGames')
  const goToPlayingGames = () => setView('PlayingGames')
  const goToPlayedGames = () => setView('PlayedGames')

  return (
    <>
      <NavTabs
        view={view}
        goToFavoriteGames={goToFavoritesGames}
        goToPlayingGames={goToPlayingGames}
        goToPlayedGames={goToPlayedGames}
      />

      {isLoading && <Spinner />}
      {view === 'FavoriteGames' && <GameCards games={favGames} deleteGame={removeFavGame} />}
      {view === 'PlayingGames' && <GameCards games={playingGames} deleteGame={removePlayingGame} />}
      {view === 'PlayedGames' && <GameCards games={playedGames} deleteGame={removePlayedGame} />}
    </>
  )
}
