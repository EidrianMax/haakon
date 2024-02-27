import './index.css'
import Game from '../Game'

export default function Games ({ games }) {
  return (
    <ul className='Games'>
      {
        games.slice(0, 10).map(({ id, name, backgroundImage, platforms, genres, score }) => (
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
