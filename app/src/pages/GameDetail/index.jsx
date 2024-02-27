import './index.css'
import { useEffect, useState } from 'react'
import { retrieveGameDetail } from '../../services'
import Spinner from '../../components/Spinner'
import { Redirect } from 'wouter'
import Fav from '../../components/Fav'
import Carousel from '../../components/Carousel'
import Platforms from '../../components/Platforms'

export default function GameDetail ({ params: { gameId } }) {
  const [game, setGame] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  const {
    name, released, description, screenshots,
    platforms, genres, score, website
  } = game

  useEffect(() => {
    setIsLoading(true)
    retrieveGameDetail(gameId)
      .then(game => setGame(game))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false))
  }, [gameId])

  const formatDate = date => {
    const newDate = new Date(date)

    return newDate.toLocaleDateString()
  }

  if (isLoading) {
    return <Spinner />
  }

  if (hasError) {
    return <Redirect to='/404' />
  }

  return (
    <>
      <div className='gameDetail__row'>
        <div className='releasedDate gameDetail__releasedDate'>
          <time>{formatDate(released)}</time>
        </div>
        <div className='score'>{score}</div>
        <Fav id={gameId} />
      </div>
      <h1 className='gameDetail__title'>{name}</h1>
      <Carousel images={screenshots} />
      <p className='genres-title'>Description</p>
      <p>{description}</p>
      <p className='platforms-title'>Platforms</p>
      <Platforms platforms={platforms} />
      <p className='genres-title'>Genres</p>
      <ul className='genres-list'>
        {
            genres?.length
              ? genres.map(({ _id, name }) => <li className='genres-list__item' key={_id}>{name}</li>)
              : null
          }
      </ul>
      <a href={website}>Website</a>
    </>
  )
}
