// import './index.css'
import { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext'
import { retrieveFavGames } from '../../services'
import FavoriteGame from '../FavoriteGame'
import { UserContext } from '../../context/UserContext'

const ListFavoritesGames = () => {
  const { showSpinner, hideSpinner, showModal } = useContext(AppContext)
  const { favGames } = useContext(UserContext)

  return (
    <>
      {
        favGames && favGames.length
          ? (
            <ul className='libraryGameCards'>
              {
                favGames.map(({ id, backgroundImage, name }) =>
                  <FavoriteGame
                    key={id}
                    id={id}
                    backgroundImage={backgroundImage}
                    name={name}
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
