// import './index.css'
import { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext'
import { retrieveFavGames } from '../../services'
import FavoriteGame from '../FavoriteGame'
import { UserContext } from '../../context/UserContext'
import useUser from '../../hooks/useUser'

const ListFavoritesGames = () => {
  const { showSpinner, hideSpinner, showModal } = useContext(AppContext)
  const { favGames } = useUser()

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
