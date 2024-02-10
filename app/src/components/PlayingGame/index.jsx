import { useContext } from 'react'
import { togglePlayingGame, togglePlayedGame } from '../../services'
import AppContext from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'

const PlayingGame = ({ id, backgroundImage, name, isPlayed, setIsPlayed }) => {
  const { showSpinner, hideSpinner, showModal } = useContext(AppContext)

  const navigate = useNavigate()

  const handleClick = (id) => {
    navigate(`/games/${id}`)
  }

  const handleCheck = async (event, id) => {
    event.stopPropagation()

    try {
      showSpinner()
      await togglePlayingGame(sessionStorage.token, id)
      await togglePlayedGame(sessionStorage.token, id)
      hideSpinner()
    } catch ({ message }) {
      showModal(message)
      hideSpinner()
    }

    setIsPlayed(!isPlayed)
  }

  return (
    <>
      <li key={id} className='libraryGameCard' onClick={() => handleClick(id)}>
        <img className='libraryGameCard__img' loading='lazy' src={backgroundImage} alt={name} />
        <button
          className='btnIcon libraryGameCard__btnIcon' onClick={(event) => {
            handleCheck(event, id)
          }}
        >
          <i className='far fa-check-circle' />
        </button>
        <h3 className='libraryGameCard__title'>{name}</h3>
      </li>
    </>
  )
}

export default PlayingGame
