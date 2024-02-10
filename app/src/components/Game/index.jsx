import { useEffect, useState } from 'react'
import useApp from '../../hooks/useApp'
import useUser from '../../hooks/useUser'
import './index.css'
import toggleFavGame from '../../services/toggle-fav-game'
import togglePlayingGame from '../../services/toggle-playing-game'
import togglePlayedGame from '../../services/toggle-played-game'
import Tooltip from '../Tooltip'
import { Link } from 'wouter'

export default function Game ({ id, name, backgroundImage, platforms, genres, ...props }) {
  const { token, user } = useUser()
  const { showLoading, hideLoading, showModal } = useApp()
  const [tooltip, setTooltip] = useState(false)
  const [isFavGame, setIsFavGame] = useState(false)
  const [isPlayingGame, setIsPlayingGame] = useState(false)
  const [isPlayedGame, setIsPlayedGame] = useState(false)

  useEffect(() => {
    const isFavGame = user?.favGames?.some(favId => favId === id)
    setIsFavGame(isFavGame)

    const isPlayingGame = user?.playingGames?.some(playingId => playingId === id)
    setIsPlayingGame(isPlayingGame)

    const isPlayedGame = user?.playedGames?.some(playedId => playedId === id)
    setIsPlayedGame(isPlayedGame)
  }, [])

  const onFavGame = async () => {
    try {
      showLoading()
      await toggleFavGame(token, id)
      setIsFavGame(!isFavGame)
      hideLoading()
    } catch ({ message }) {
      showModal({ message, variant: 'error' })
    } finally {
      hideLoading()
    }
  }

  const onPlayingGame = async () => {
    try {
      showLoading()
      await togglePlayingGame(token, id)
      setIsPlayingGame(!isPlayingGame)
      if (isPlayedGame) {
        togglePlayedGame(token, id)
        setIsPlayedGame(!isPlayedGame)
      }
      hideLoading()
    } catch ({ message }) {
      showModal({ message, variant: 'error' })
    } finally {
      hideLoading()
    }
  }

  const onPlayedGame = async () => {
    try {
      showLoading()
      await togglePlayedGame(token, id)
      setIsPlayedGame(!isPlayedGame)
      if (isPlayingGame) {
        togglePlayingGame(token, id)
        setIsPlayingGame(!isPlayingGame)
      }
      hideLoading()
    } catch ({ message }) {
      showModal({ message, variant: 'error' })
    } finally {
      hideLoading()
    }
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

  console.log(noRepeated)

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
          <i className={`${isFavGame ? 'fa' : 'far'} fa-heart`} />
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
