import Games from '../../components/Games'
import Spinner from '../../components/Spinner'
import useGames from '../../hooks/useGames'

export default function Home () {
  const { games, isLoading, hasError } = useGames()

  return (
    <>
      <Games games={games} />
      {isLoading && <Spinner />}
      {hasError && <p>Somethig went wrong</p>}
    </>
  )
}
