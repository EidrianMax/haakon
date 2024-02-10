import { createContext, useEffect, useState } from 'react'
import useApp from '../hooks/useApp'
import { AppContext } from './AppContext'
import retrieveUser from '../services/retrieve-user'
import { useLocation } from 'wouter'

export const UserContext = createContext()

export function UserContextProvider ({ children }) {
  const [token, setToken] = useState(() => window.sessionStorage.token)
  const [user, setUser] = useState(null)
  const { goToHome, showModal, goToLanding, showLoading, hideLoading } = useApp(AppContext)
  const [, navigate] = useLocation()

  useEffect(() => {
    if (token) {
      showLoading()
      retrieveUser(token)
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
        }).finally(() => hideLoading())
    }

    if (!token) {
      navigate('/')
    }
  }, [])

  return (
    <UserContext.Provider value={{
      token,
      setToken,
      user
    }}
    >
      {children}
    </UserContext.Provider>
  )
}
