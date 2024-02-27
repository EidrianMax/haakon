import './index.css'

export default function NavTabs ({ view, goToFavoriteGames, goToPlayingGames, goToPlayedGames }) {
  const classNameFavoritesGames = `NavTabs-item ${view === 'FavoriteGames' ? 'is-active' : ''}`
  const classNamePlayingdGames = `NavTabs-item ${view === 'PlayingGames' ? 'is-active' : ''}`
  const classNamePlayedGames = `NavTabs-item ${view === 'PlayedGames' ? 'is-active' : ''}`

  return (
    <nav className='NavTabs'>
      <button className={classNameFavoritesGames} onClick={goToFavoriteGames}>
        Favorites
      </button>
      <button className={classNamePlayingdGames} onClick={goToPlayingGames}>
        Playing
      </button>
      <button className={classNamePlayedGames} onClick={goToPlayedGames}>
        Played
      </button>
    </nav>
  )
}
