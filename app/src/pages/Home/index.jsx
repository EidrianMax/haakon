import { useEffect, useState } from 'react'
import Games from '../../components/Games'
import { retrieveAllGames } from '../../services'
import Spinner from '../../components/Spinner'

export default function Home () {
  const [games, setGames] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    retrieveAllGames()
      .then(games => setGames(games))
      .catch(e => setHasError(true))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <>
      <Games games={games} />
      {isLoading && <Spinner />}
      {hasError && <p>Somethig went wrong</p>}
    </>
  )
}
