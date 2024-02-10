import { useContext, useEffect, useState } from 'react'
// import './index.css'
import AppContext from '../../context/AppContext'
import { retrievePlayedGames } from '../../services'
import PlayedGame from '../PlayedGame'

const ListPlayedGames = () => {
  const { showSpinner, hideSpinner, showModal } = useContext(AppContext)

  const [games, setGames] = useState([])
  const [isFav, setIsFav] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        showSpinner()
        const games = await retrievePlayedGames(sessionStorage.token)

        setGames(games)

        hideSpinner()
      } catch ({ message }) {
        showModal(message)
        hideSpinner()
      }
    })()
  }, [isFav])

  return (
    <>
      {
            games && games.length
              ? <ul className='libraryGameCards'>
                {
                        games.map(({ id, backgroundImage, name }) =>
                          <PlayedGame
                            key={id}
                            id={id}
                            backgroundImage={backgroundImage}
                            name={name}
                            isFav={isFav}
                            setIsFav={setIsFav}
                          />)
                    }
              </ul>
              : <p className='notGameFound'>There are no played games</p>
        }
    </>
  )
}

export default ListPlayedGames
