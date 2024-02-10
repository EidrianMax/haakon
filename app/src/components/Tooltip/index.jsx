import './index.css'

export default function Tooltip ({ tooltip, onOpen, onClose, isPlayingGame, isPlayedGame, onPlayingGame, onPlayedGame }) {
  return (
    <div className='Tooltip'>
      <button className='Tooltip-btn-open' onClick={onOpen}>
        <i className='fas fa-angle-up' />
      </button>
      {
        tooltip && (
          <div className='Tooltip-wrapper'>
            <button className='Tooltip-btn-close'>
              <i className='fas fa-angle-right' onClick={onClose} />
            </button>
            <div className='Tooltip-list'>
              <div className={`Tooltip-item ${isPlayingGame ? 'is-active' : ''}`} onClick={onPlayingGame}>
                <i className='fas fa-headset' />Playing
              </div>
              <div className={`Tooltip-item ${isPlayedGame ? 'is-active' : ''}`} onClick={onPlayedGame}>
                <i className='fas fa-check' />Played
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}
