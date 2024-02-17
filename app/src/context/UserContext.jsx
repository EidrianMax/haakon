import { createContext, useEffect, useState } from 'react'
import useApp from '../hooks/useApp'
import { AppContext } from './AppContext'
import { retrieveUser, retrieveFavGames, retrievePlayedGames, retrievePlayingGames } from '../services'
import { useLocation } from 'wouter'

export const UserContext = createContext()

export function UserContextProvider ({ children }) {
  const [token, setToken] = useState(() => window.sessionStorage.token)
  const [user, setUser] = useState(null)
  const { goToHome, showModal, goToLanding, showLoading, hideLoading } = useApp(AppContext)
  const [, navigate] = useLocation()
  const [favGames, setFavGames] = useState([])
  const [playedGames, setPlayedGames] = useState([])
  const [playingGames, setPlayingGames] = useState([])

  useEffect(() => {
    if (!token) {
      navigate('/')

      setFavGames([])
      setPlayedGames([])

      return
    }

    (async () => {
      try {
        showLoading()
        const favGames = await retrieveFavGames(token)
        setFavGames(favGames)
        const playedGames = await retrievePlayedGames(token)
        setPlayedGames(playedGames)
        const playingGames = await retrievePlayingGames(token)
        setPlayingGames(playingGames)
        const user = retrieveUser(token)
        setUser(user)
        goToHome()
      } catch ({ message }) {
        if (message === 'jwt expired') {
          showModal({ message: 'sesion expired', variant: 'error' })
          delete window.sessionStorage.token
          goToLanding()
          navigate('/')
          return
        }

        showModal({ message, variant: 'error' })
        delete window.sessionStorage.token
        goToLanding()
        navigate('/')
      } finally {
        hideLoading()
      }
    })()
  }, [])

  return (
    <UserContext.Provider value={{
      token,
      setToken,
      user,
      favGames,
      setFavGames,
      playedGames,
      setPlayedGames,
      playingGames,
      setPlayingGames
    }}
    >
      {children}
    </UserContext.Provider>
  )
}
