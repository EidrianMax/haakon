import { useEffect, useState } from 'react'
import { searchGames } from '../../services'
import Games from '../../components/Games'
import Spinner from '../../components/Spinner'

export default function SearchResults ({ params: { query } }) {
  const [games, setGames] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    searchGames(query)
      .then(games => setGames(games))
      .catch(e => setHasError(true))
      .finally(() => setIsLoading(false))
  }, [query])

  return (
    <>
      {games.length ? <Games games={games} /> : <p>No game found</p>}
      {isLoading && <Spinner />}
      {hasError && <p>Somethig went wrong</p>}
    </>
  )
}
