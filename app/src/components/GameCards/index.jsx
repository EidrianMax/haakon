import './index.css'
import GameCard from '../GameCard'

export default function GameCards ({ games, deleteGame }) {
  return (
    <ul className='GameCards'>
      {
        games.map(game => (
          <GameCard
            key={game._id}
            id={game._id}
            name={game.name}
            backgroundImage={game.backgroundImage}
            deleteGame={deleteGame}
          />
        ))
      }
    </ul>
  )
}
