import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { addFavGame, addPlayedGame, addPlayingGame, deleteFavGame, deletePlayedGame, deletePlayingGame } from '../services'

export default function useUser () {
  const {
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
  } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isLoadingPlayingGame, setIsLoadingPlayingGame] = useState(false)
  const [isLoadingPlayedGame, setIsLoadingPlayedGame] = useState(false)

  const aggregateFavGame = async (gameId) => {
    try {
      setIsLoading(true)
      const favGames = await addFavGame(token, gameId)
      setFavGames(favGames)
      setIsLoading(false)
    } catch ({ message }) {
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const removeFavGame = async (gameId) => {
    try {
      setIsLoading(true)
      const favGames = await deleteFavGame(token, gameId)
      setFavGames(favGames)
      setIsLoading(false)
    } catch ({ message }) {
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const aggregatePlayingGame = async (gameId) => {
    try {
      setIsLoadingPlayingGame(true)
      const favGames = await addPlayingGame(token, gameId)
      setPlayingGames(favGames)
    } catch ({ message }) {
      setHasError(true)
    } finally {
      setIsLoadingPlayingGame(false)
    }
  }

  const removePlayingGame = async (gameId) => {
    try {
      setIsLoadingPlayingGame(true)
      const favGames = await deletePlayingGame(token, gameId)
      setPlayingGames(favGames)
    } catch ({ message }) {
      setHasError(true)
    } finally {
      setIsLoadingPlayingGame(false)
    }
  }

  const aggregatePlayedGame = async (gameId) => {
    try {
      setIsLoadingPlayedGame(true)
      const favGames = await addPlayedGame(token, gameId)
      setPlayedGames(favGames)
    } catch ({ message }) {
      setHasError(true)
    } finally {
      setIsLoadingPlayedGame(false)
    }
  }

  const removePlayedGame = async (gameId) => {
    try {
      setIsLoadingPlayedGame(true)
      const favGames = await deletePlayedGame(token, gameId)
      setPlayedGames(favGames)
    } catch ({ message }) {
      setHasError(true)
    } finally {
      setIsLoadingPlayedGame(false)
    }
  }

  return {
    token,
    setToken,
    user,
    favGames,
    setFavGames,
    playingGames,
    setPlayingGames,
    playedGames,
    setPlayedGames,
    aggregateFavGame,
    removeFavGame,
    isLoading,
    isExpiredSession,
    aggregatePlayedGame,
    removePlayedGame,
    aggregatePlayingGame,
    removePlayingGame,
    hasError,
    resetTokenAndUser,
    isLoadingPlayingGame,
    isLoadingPlayedGame
  }
}
