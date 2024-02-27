import Games from '../../components/Games'
import Spinner from '../../components/Spinner'
import useSearchGames from '../../hooks/useSearchGames'

export default function SearchResults ({ params: { query } }) {
  const { games, isLoading, hasError } = useSearchGames({ query })

  return (
    <>
      {games.length ? <Games games={games} /> : <p>No game found</p>}
      {isLoading && <Spinner />}
      {hasError && <p>Somethig went wrong</p>}
    </>
  )
}
