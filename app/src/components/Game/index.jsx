import { useState } from 'react'
import useUser from '../../hooks/useUser'
import './index.css'
import Tooltip from '../Tooltip'
import { Link } from 'wouter'

export default function Game ({ id, name, backgroundImage, platforms, genres, score }) {
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
    if (name.startsWith('nintendo') ||
        name.startsWith('wii') ||
        name.startsWith('game boy') ||
        name === 'nes' ||
        name === 'snes' ||
        name === 'gamecube') return 'gamepad'
    if (name === 'ios' || name === 'macos') return 'apple'
    if (name === 'pc') return 'windows'
    if (name.startsWith('atari')) return 'ghost'
    if (name === 'linux') return 'linux'
    if (name === 'android') return 'android'

    return 'dice-d6'
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
              noRepeated.map(platform => {
                if (platform === 'gamepad') {
                  return (
                    <li className='Game-platform' key={platform}>
                      <i key={id} className={`fas fa-${platform}`} />
                    </li>
                  )
                }

                if (platform === 'dice-d6') {
                  return (
                    <li className='Game-platform' key={platform}>
                      <i key={id} className={`fas fa-${platform}`} />
                    </li>
                  )
                }

                return (
                  <li className='Game-platform' key={platform}>
                    <i key={id} className={`fab fa-${platform}`} />
                  </li>
                )
              })
            }
          </ul>

          <div className='Game-score'>{score || 0}</div>
        </div>

        <h3 className='Game-name'>
          <Link className='Game-name-link' to={`/games/${id}`}>{name}</Link>
        </h3>

        <div className='Game-genres-and-more-actions'>
          <ul className='Game-genres'>
            {
              genres.map((genre, index) => {
                if (index === 0 && index === genres.length - 1) {
                  return <li className='Game-genre' key={genre._id}>{genre.name}</li>
                }

                if (index === 0) {
                  return <li className='Game-genre' key={genre._id}>{genre.name},{'\xa0'}</li>
                }

                if (index === genres.length - 1) {
                  return <li className='Game-genre' key={genre._id}>{genre.name.toLowerCase()}</li>
                }

                return <li className='Game-genre' key={genre._id}>{genre.name.toLowerCase()},{'\xa0'}</li>
              })
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
