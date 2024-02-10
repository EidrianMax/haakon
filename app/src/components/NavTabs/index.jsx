import './index.css'

export default function NavTabs ({ onClickFavorites, onClickPlaying, onClickPlayed, view }) {
  const classNameFavoritesGames = `NavTabs-item ${view === 'FavoritesGames' ? 'is-active' : ''}`
  const classNamePlayingdGames = `NavTabs-item ${view === 'PlayingGames' ? 'is-active' : ''}`
  const classNamePlayedGames = `NavTabs-item ${view === 'PlayedGames' ? 'is-active' : ''}`

  return (
    <nav className='NavTabs'>
      <button className={classNameFavoritesGames} onClick={onClickFavorites}>
        Favorites
      </button>
      <button className={classNamePlayingdGames} onClick={onClickPlaying}>
        Playing
      </button>
      <button className={classNamePlayedGames} onClick={onClickPlayed}>
        Played
      </button>
    </nav>
  )
}
