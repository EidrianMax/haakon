import './index.css'
import Spinner from '../../components/Spinner'
import useGifDetail from '../../hooks/useGameDetail'
import { Redirect } from 'wouter'

export default function GameDetail ({ params: { gameId } }) {
  const { gameDetail, loading, onFav, isFav, hasError } = useGifDetail({ gameId })

  const {
    name, released, description, screenshots,
    platforms, genres, score, website
  } = gameDetail

  const formatDate = date => {
    const newDate = new Date(date)

    return newDate.toLocaleDateString()
  }

  return (
    <>
      <div className='gameDetail'>
        <div className='gameDetail__row'>
          <div className='releasedDate gameDetail__releasedDate'><time>{formatDate(released)}</time></div>
          <div className='score'>{score}</div>
          <button className='btnIcon' onClick={onFav}>
            <i className={`${isFav ? 'fa' : 'far'} fa-heart`} />
          </button>
        </div>
        <h1 className='gameDetail__title'>{name}</h1>
        <ul className='gallery'>
          {
            screenshots?.length
              ? screenshots.map((item, index) => <li key={index} className='gallery__item'><img className='gallery__img' src={item} /></li>)
              : null
          }
        </ul>
        <p className='genres-title'>Description</p>
        <p>{description}</p>
        <p className='platforms-title'>Platforms</p>
        <ul className='platforms-list'>
          {
            platforms
              ? platforms.map(({ _id, name }) => <li className='platforms-list__item' key={_id}>{name}</li>)
              : null
          }
        </ul>
        <p className='genres-title'>Genres</p>
        <ul className='genres-list'>
          {
            genres?.length
              ? genres.map(({ _id, name }) => <li className='genres-list__item' key={_id}>{name}</li>)
              : null
          }
        </ul>
        <a href={website}>Website</a>
      </div>

      {loading && <Spinner />}

      {hasError && <Redirect to='/404' />}
    </>
  )
}
