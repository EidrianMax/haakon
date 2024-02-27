import './index.css'
import Spinner from '../../components/Spinner'
import { Redirect } from 'wouter'
import Fav from '../../components/Fav'
import Carousel from '../../components/Carousel'
import Platforms from '../../components/Platforms'
import UseGameDetail from '../../hooks/useGameDetail'

export default function GameDetail ({ params: { gameId } }) {
  const { game, isLoading, hasError } = UseGameDetail({ gameId })

  const {
    name, released, description, screenshots,
    platforms, genres, score, website
  } = game

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
