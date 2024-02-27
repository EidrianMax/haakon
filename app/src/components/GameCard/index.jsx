import './index.css'
import { Link } from 'wouter'

export default function GameCard ({ id, name, backgroundImage, deleteGame }) {
  const handleClickDeleteGame = (e) => {
    e.preventDefault()
    e.stopPropagation()

    deleteGame(id)
  }

  return (
    <li className='GameCard'>
      <Link to={`/games/${id}`} className='GameCard-link'>
        <img className='GameCard-img' loading='lazy' src={backgroundImage} alt={name} />
        <button className='GameCard-btnIcon' onClick={handleClickDeleteGame}>
          <i className='far fa-times-circle' />
        </button>
        <h3 className='GameCard-title'>{name}</h3>
      </Link>
    </li>
  )
}
