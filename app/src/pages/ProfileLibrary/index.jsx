import { useState } from 'react'
import './index.css'

import ListFavoritesGames from '../../components/ListFavoritesGames'
import ListPlayingGames from '../../components/ListPlayingGames'
import ListPlayedGames from '../../components/ListPlayedGames'

const ProfileLibrary = () => {
  const [view, setView] = useState('favorite-games')

  return (
    <>
      <div className='userDetail'>
        <div className='bar userDetail__bar'>
          <div className={`bar__item ${view === 'favorite-games' && 'bar__item--active'}`} onClick={() => setView('favorite-games')}>Favorites</div>
          <div className={`bar__item ${view === 'playing-games' && 'bar__item--active'}`} onClick={() => setView('playing-games')}>Playing</div>
          <div className={`bar__item ${view === 'played-games' && 'bar__item--active'}`} onClick={() => setView('played-games')}>Played</div>
        </div>
      </div>
      {view === 'favorite-games' && <ListFavoritesGames />}
      {view === 'playing-games' && <ListPlayingGames />}
      {view === 'played-games' && <ListPlayedGames />}
    </>
  )
}

export default ProfileLibrary
