import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

export default function useApp () {
  const {
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
  } = useContext(AppContext)

  return {
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
  }
}
