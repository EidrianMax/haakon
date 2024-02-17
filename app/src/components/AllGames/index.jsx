import { useContext, useEffect, useState } from 'react'
import './index.css'
import Game from '../Game'
import { retrieveAllGames } from '../../services'
import AppContext from '../../context/AppContext'

const AllGames = ({ favGames, playingGames, playedGames }) => {
  const { showSpinner, hideSpinner, showModal } = useContext(AppContext)

  const [games, setGames] = useState([])

  useEffect(() => {
    (async () => {
      try {
        showSpinner()
        const _games = await retrieveAllGames()
        setGames(_games)
        hideSpinner()
      } catch ({ message }) {
        showModal(message)
        hideSpinner()
      }
    })()
  }, [])

  return games && games.length
    ? (
      <ul className='gameCards'>
        {
          games.map(({ id, backgroundImage, name, platforms, genres, score }) =>
            <Game
              key={id}
              id={id}
              backgroundImage={backgroundImage}
              name={name}
              platforms={platforms}
              genres={genres}
              score={score}
              favGames={favGames}
              playingGames={playingGames}
              playedGames={playedGames}
            />)
        }
      </ul>
      )
    : <p className='notGameFound'>No game found</p>
}

export default AllGames
