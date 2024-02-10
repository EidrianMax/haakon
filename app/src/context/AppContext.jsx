import { createContext, useState } from 'react'

export const AppContext = createContext()

export function AppContextprovider ({ children }) {
  const [view, setView] = useState('Landing')
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState(null)

  const goToLanding = () => setView('Landing')
  const goToRegister = () => setView('Register')
  const goToLogin = () => setView('Login')
  const goToHome = () => setView('Home')

  const showLoading = () => setLoading(true)
  const hideLoading = () => setLoading(false)

  const showModal = ({ message, variant }) => setModal({ message, variant })

  const hideModal = () => setModal(null)

  return (
    <AppContext.Provider value={{
      view,
      loading,
      modal,
      goToLanding,
      goToHome,
      goToRegister,
      goToLogin,
      showLoading,
      hideLoading,
      showModal,
      hideModal
    }}
    >
      {children}
    </AppContext.Provider>
  )
}
