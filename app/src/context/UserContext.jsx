import { createContext, useEffect, useState } from 'react'
import { retrieveFavGames, retrievePlayedGames, retrievePlayingGames, retrieveUser } from '../services'
import { useLocation } from 'wouter'

export const UserContext = createContext()

export default function UserContextProvider ({ children }) {
  const [token, setToken] = useState(window.sessionStorage.getItem('token'))
  const [user, setUser] = useState({})
  const [favGames, setFavGames] = useState([])
  const [playingGames, setPlayingGames] = useState([])
  const [playedGames, setPlayedGames] = useState([])
  const [isExpiredSession, setIsExpiredSession] = useState(false)
  const [, navigate] = useLocation()

  useEffect(() => {
    if (token) {
      Promise.all([retrieveUser(token), retrieveFavGames(token), retrievePlayingGames(token), retrievePlayedGames(token)])
        .then(values => {
          const [user, favGames, playingGames, playedGames] = values

          setUser(user)
          setFavGames(favGames)
          setPlayingGames(playingGames)
          setPlayedGames(playedGames)
        })
        .catch(() => {
          setIsExpiredSession(true)
          setToken(null)
          setUser({})
          setFavGames([])
          setPlayingGames([])
          setPlayedGames([])
          window.sessionStorage.removeItem('token')
          navigate('/')
        })
    }
  }, [token])

  const resetTokenAndUser = () => {
    setToken(null)
    setUser({})
    setFavGames([])
    setPlayingGames([])
    setPlayedGames([])
    window.sessionStorage.removeItem('token')
  }

  return (
    <UserContext.Provider value={{
      token,
      setToken,
      user,
      favGames,
      setFavGames,
      playingGames,
      setPlayingGames,
      playedGames,
      setPlayedGames,
      isExpiredSession,
      resetTokenAndUser
    }}
    >
      {children}
    </UserContext.Provider>
  )
}
