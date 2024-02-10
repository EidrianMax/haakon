import { useEffect, useState } from 'react'
import useApp from './useApp'
import { useLocation, useRoute } from 'wouter'
import searchGames from '../services/search-games'
import retrieveAllGames from '../services/retrieve-all-games'

export default function useGames () {
  const { showLoading, hideLoading, showModal } = useApp()
  const [games, setGames] = useState([])
  const [location] = useLocation()
  const [, params] = useRoute('/games/search/:query')
  const query = params?.query

  const getGames = (query) => {
    showLoading()
    searchGames(query)
      .then(setGames)
      .catch(({ message }) => showModal({ message, variant: 'error' }))
      .finally(() => hideLoading())
  }

  useEffect(() => {
    if (location === '/') {
      retrieveAllGames()
        .then(setGames)
        .catch(({ message }) => showModal({ message, variant: 'error' }))
        .finally(() => hideLoading())
    }
  }, [location])

  useEffect(() => {
    if (location.startsWith('/games/search/')) {
      getGames(query)
    }
  }, [query])

  return { games }
}
