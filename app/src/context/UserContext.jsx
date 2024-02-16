import { createContext, useEffect, useState } from 'react'
import useApp from '../hooks/useApp'
import { AppContext } from './AppContext'
import { retrieveUser, retrieveFavGames } from '../services'
import { useLocation } from 'wouter'

export const UserContext = createContext()

export function UserContextProvider ({ children }) {
  const [token, setToken] = useState(() => window.sessionStorage.token)
  const [user, setUser] = useState(null)
  const { goToHome, showModal, goToLanding, showLoading, hideLoading } = useApp(AppContext)
  const [, navigate] = useLocation()
  const [favGames, setFavGames] = useState([])

  useEffect(() => {
    if (!token) {
      navigate('/')

      return setFavGames([])
    }

    showLoading()

    retrieveFavGames(token)
      .then((favGames) => {
        setFavGames(favGames)

        return retrieveUser(token)
      })
      .then(user => {
        setUser(user)
        goToHome()
      })
      .catch(({ message }) => {
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
      })
      .finally(() => hideLoading())
  }, [])

  return (
    <UserContext.Provider value={{
      token,
      setToken,
      user,
      favGames,
      setFavGames
    }}
    >
      {children}
    </UserContext.Provider>
  )
}
