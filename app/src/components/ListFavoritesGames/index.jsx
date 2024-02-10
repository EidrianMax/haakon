// import './index.css'
import { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext'
import { retrieveFavGames } from '../../services'
import FavoriteGame from '../FavoriteGame'

const ListFavoritesGames = () => {
  const { showSpinner, hideSpinner, showModal } = useContext(AppContext)

  const [games, setGames] = useState([])
  const [isFav, setIsFav] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        showSpinner()
        const games = await retrieveFavGames(sessionStorage.token)

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
          ? (
            <ul className='libraryGameCards'>
              {
                games.map(({ id, backgroundImage, name }) =>
                  <FavoriteGame
                    key={id}
                    id={id}
                    backgroundImage={backgroundImage}
                    name={name}
                    isFav={isFav}
                    setIsFav={setIsFav}
                  />)
                }
            </ul>
            )
          : <p className='notGameFound'>There are no favorite games</p>
        }
    </>
  )
}

export default ListFavoritesGames
