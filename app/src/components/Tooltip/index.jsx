import './index.css'
import { useLocation } from 'wouter'
import useUser from '../../hooks/useUser'

export default function Tooltip ({
  id,
  tooltip,
  handleClickOpen,
  handleClickClose
}) {
  const {
    playingGames,
    playedGames,
    aggregatePlayingGame,
    removePlayingGame,
    aggregatePlayedGame,
    removePlayedGame,
    isLoading,
    isLoadingPlayingGame,
    isLoadingPlayedGame,
    token
  } = useUser()
  const [, navigate] = useLocation()

  const isPlayedGame = playedGames.some(playedGame => playedGame._id === id)
  const isPlayingGame = playingGames.some(playingGame => playingGame._id === id)

  const handleClickPlayedGame = () => {
    if (!token) return navigate('/login')

    if (!isLoading) {
      if (isPlayedGame) {
        removePlayedGame(id)
      } else {
        aggregatePlayedGame(id)
      }
    }
  }

  const handleClickPlayingGame = () => {
    if (!token) return navigate('/login')

    if (!isLoading) {
      if (isPlayingGame) {
        removePlayingGame(id)
      } else {
        aggregatePlayingGame(id)
      }
    }
  }

  return (
    <div className='Tooltip'>
      <button className='Tooltip-btn-open' onClick={handleClickOpen}>
        <i className='fas fa-angle-up' />
      </button>
      {
        tooltip && (
          <div className='Tooltip-wrapper'>
            <button className='Tooltip-btn-close'>
              <i className='fas fa-angle-right' onClick={handleClickClose} />
            </button>
            <div className='Tooltip-list'>
              <div className={`Tooltip-item ${isPlayingGame ? 'is-active' : ''}`} onClick={handleClickPlayingGame}>
                {
                  isLoadingPlayingGame
                    ? <i className='fas fa-spinner fa-spin' />
                    : <i className='fas fa-headset' />
                }
                Playing
              </div>
              <div className={`Tooltip-item ${isPlayedGame ? 'is-active' : ''}`} onClick={handleClickPlayedGame}>
                {
                  isLoadingPlayedGame
                    ? <i className='fas fa-spinner fa-spin' />
                    : <i className='fas fa-check' />
                }
                Played
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}
