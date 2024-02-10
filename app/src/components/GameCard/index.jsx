import './index.css'

export default function GameCard ({ id, name, backgroundImage }) {
  return (
    <li className='GameCard'>
      <img className='GameCard-img' loading='lazy' src={backgroundImage} alt={name} />
      <button className='GameCard-btnIcon'>
        <i className='far fa-times-circle' />
      </button>
      <h3 className='GameCard-title'>{name}</h3>
    </li>
  )
}
