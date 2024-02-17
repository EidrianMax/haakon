import { useLocation } from 'wouter'
import './index.css'

export default function GameCard ({ _id, name, backgroundImage }) {
  const [, navigate] = useLocation()

  const onGameCard = () => {
    navigate(`/games/${_id}`)
  }

  return (
    <li className='GameCard' onClick={onGameCard}>
      <img className='GameCard-img' loading='lazy' src={backgroundImage} alt={name} />
      <button className='GameCard-btnIcon'>
        <i className='far fa-times-circle' />
      </button>
      <h3 className='GameCard-title'>{name}</h3>
    </li>
  )
}
