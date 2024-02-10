import { useContext } from 'react'
import { togglePlayingGame, togglePlayedGame } from '../../services'
import AppContext from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'

const PlayedGame = ({ id, backgroundImage, name, isFav, setIsFav }) => {
  const { showSpinner, hideSpinner, showModal } = useContext(AppContext)

  const navigate = useNavigate()

  const handleClick = (id) => {
    navigate(`/games/${id}`)
  }

  const handleCheck = async (event, id) => {
    event.stopPropagation()

    try {
      showSpinner()
      await togglePlayedGame(sessionStorage.token, id)
      hideSpinner()
    } catch ({ message }) {
      showModal(message)
      hideSpinner()
    }

    setIsFav(!isFav)
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
          <i className='far fa-times-circle' />
        </button>
        <h3 className='libraryGameCard__title'>{name}</h3>
      </li>
    </>
  )
}

export default PlayedGame
