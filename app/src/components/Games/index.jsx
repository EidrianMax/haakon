import './index.css'
import Game from '../Game'

export default function Games ({ games }) {
  return (
    <ul className='Games'>
      {
        games.map(({ id, name, backgroundImage, platforms, genres, score }) => (
          <Game
            key={id}
            id={id}
            name={name}
            backgroundImage={backgroundImage}
            platforms={platforms}
            genres={genres}
            score={score}
          />
        ))
      }
    </ul>
  )
}
