import { useState } from 'react'
import useUser from '../../hooks/useUser'
import './index.css'
import Tooltip from '../Tooltip'
import { Link } from 'wouter'

export default function Game ({ id, name, backgroundImage, platforms, genres }) {
  const {
    favGames,
    aggregateFavGame,
    removeFavGame,
    playedGames,
    aggregatePlayedGame,
    removePlayedGame,
    playingGames,
    aggregatePlayingGame,
    removePlayingGame
  } = useUser()
  const [tooltip, setTooltip] = useState(false)

  const isFav = favGames.some(favGame => favGame._id === id)
  const isPlayedGame = playedGames.some(playedGame => playedGame._id === id)
  const isPlayingGame = playingGames.some(playingGame => playingGame._id === id)

  const onFavGame = () => {
    if (!isFav) {
      return aggregateFavGame(id)
    }

    removeFavGame(id)
  }

  const onPlayedGame = () => {
    if (!isPlayedGame) {
      return aggregatePlayedGame(id)
    }

    removePlayedGame(id)
  }

  const onPlayingGame = () => {
    if (!isPlayingGame) {
      return aggregatePlayingGame(id)
    }

    removePlayingGame(id)
  }

  const platformsMapped = platforms.map(platform => {
    const name = platform.name.toLowerCase()

    if (name.startsWith('playstation') || name.startsWith('ps')) return 'playstation'
    if (name.startsWith('xbox')) return 'xbox'
    if (name.startsWith('nintendo')) return 'nintendo'
    if (name === 'ios' || name === 'macOS') return 'apple'

    return name
  })

  const noRepeated = Array.from(new Set(platformsMapped))

  return (
    <li className='Game'>
      <header className='Game-header'>
        <img
          className='Game-backgroundImage'
          loading='lazy'
          src={backgroundImage}
          alt={name}
        />
        <button className='Game-fav' onClick={onFavGame}>
          <i className={`${isFav ? 'fa' : 'far'} fa-heart`} />
        </button>
      </header>

      <div className='Game-body'>
        <div className='Game-platforms-and-score'>
          <ul className='Game-platforms'>
            {
              noRepeated.map(platform => (
                <li className='Game-platform' key={platform}>
                  <i key={id} className={`fab fa-${platform}`} />
                </li>
              ))
            }
          </ul>

          <div className='Game-score'>50</div>
        </div>

        <h3 className='Game-name'>
          <Link className='Game-name-link' to={`/games/${id}`}>{name}</Link>
        </h3>

        <div className='Game-genres-and-more-actions'>
          <ul className='Game-genres'>
            {
              genres.map(genre => (
                <li className='Game-genre' key={genre._id}>{genre.name}</li>
              ))
            }
          </ul>

          <Tooltip
            tooltip={tooltip}
            onOpen={() => setTooltip(true)}
            onClose={() => setTooltip(false)}
            isPlayingGame={isPlayingGame}
            isPlayedGame={isPlayedGame}
            onPlayingGame={onPlayingGame}
            onPlayedGame={onPlayedGame}
          />
        </div>
      </div>
    </li>
  )
}
