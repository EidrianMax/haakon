import './index.css'
import Game from '../Game'
import { searchGames } from '../../services'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AppContext from '../../context/AppContext'

const ListOfGames = ({ favGames, playingGames, playedGames }) => {
  const { showSpinner, hideSpinner } = useContext(AppContext)

  const { query } = useParams()
  const [games, setGames] = useState([])

  useEffect(() => {
    (async () => {
      try {
        showSpinner()
        const _games = await searchGames(query)
        setGames(_games)
        hideSpinner()
      } catch ({ message }) {
        hideSpinner()
      }
    })()
  }, [query])

  return games && games.length
    ? <ul className='gameCards'>
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
    : <p className='notGameFound'>No game found</p>
}

export default ListOfGames
