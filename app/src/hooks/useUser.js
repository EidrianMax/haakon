import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import useApp from './useApp'
import authenticateUser from '../services/authenticate-user'
import registerUser from '../services/register-user'
import { useLocation } from 'wouter'
import { addFavGame, deleteFavGame } from '../services'

export default function useUser () {
  const { token, setToken, user, favGames, setFavGames } = useContext(UserContext)
  const { showLoading, hideLoading, showModal, goToHome, goToLogin, goToLanding } = useApp()
  const [, navigate] = useLocation()

  const login = async (username, password) => {
    try {
      showLoading()
      const token = await authenticateUser(username, password)
      window.sessionStorage.token = token
      setToken(token)
      goToHome()
    } catch (error) {
      showModal({ variant: 'error', message: error.message })
    } finally {
      hideLoading()
    }
  }

  const register = async (name, username, password) => {
    try {
      showLoading()
      await registerUser(name, username, password)
      showModal({ message: 'Registered successfully', variant: 'success' })
      goToLogin()
    } catch (error) {
      showModal({ message: error.message, variant: 'error' })
    } finally {
      hideLoading()
    }
  }

  const logout = () => {
    delete window.sessionStorage.token
    goToLanding()
    navigate('/')
  }

  const aggregateFavGame = async (gameId) => {
    try {
      showLoading()
      const favGames = await addFavGame(token, gameId)
      setFavGames(favGames)
      hideLoading()
    } catch ({ message }) {
      showModal({ message, variant: 'error' })
    } finally {
      hideLoading()
    }
  }

  const removeFavGame = async (gameId) => {
    try {
      showLoading()
      const favGames = await deleteFavGame(token, gameId)
      setFavGames(favGames)
      hideLoading()
    } catch ({ message }) {
      showModal({ message, variant: 'error' })
    } finally {
      hideLoading()
    }
  }

  return { token, setToken, user, login, register, logout, aggregateFavGame, removeFavGame, favGames }
}
