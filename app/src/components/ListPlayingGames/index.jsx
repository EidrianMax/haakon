import { useContext, useEffect, useState } from 'react'
// import './index.css'
import AppContext from '../../context/AppContext'
import { retrievePlayingGames } from '../../services'
import PlayingGame from '../PlayingGame'

const ListPlayingGames = () => {
  const { showSpinner, hideSpinner, showModal } = useContext(AppContext)

  const [games, setGames] = useState([])
  const [isPlayed, setIsPlayed] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        showSpinner()
        const games = await retrievePlayingGames(sessionStorage.token)

        setGames(games)

        hideSpinner()
      } catch ({ message }) {
        showModal(message)
        hideSpinner()
      }
    })()
  }, [isPlayed])

  return (
    <>
      {
            games && games.length
              ? <ul className='libraryGameCards'>
                {
                        games.map(({ id, backgroundImage, name }) =>
                          <PlayingGame
                            key={id}
                            id={id}
                            backgroundImage={backgroundImage}
                            name={name}
                            isPlayed={isPlayed}
                            setIsPlayed={setIsPlayed}
                          />)
                    }
              </ul>
              : <p className='notGameFound'>There are no playing games</p>
        }
    </>
  )
}

export default ListPlayingGames
