import { Helmet } from 'react-helmet'
import Games from '../../components/Games'
import Spinner from '../../components/Spinner'
import useSearchGames from '../../hooks/useSearchGames'

export default function SearchResults ({ params: { query } }) {
  const decodeQuery = decodeURI(query)
  const { games, isLoading, hasError } = useSearchGames({ query: decodeQuery })

  return (
    <>
      <Helmet>
        <title>
          {isLoading ? 'Loading...' : `${games.length} results of ${decodeQuery} | Giffy`}
        </title>
      </Helmet>
      {games.length ? <Games games={games} /> : <p>No game found</p>}
      {isLoading && <Spinner />}
      {hasError && <p>Somethig went wrong</p>}
    </>
  )
}
