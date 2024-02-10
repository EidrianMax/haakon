import { useContext, useEffect, useState } from 'react'

import AppContext from '../../context/AppContext'

import './index.css'
import { retrieveGameDetail, toggleFavGame } from '../../services'
import { useParams } from 'react-router-dom'

const GameDetail = () => {
  const { showSpinner, hideSpinner, showModal } = useContext(AppContext)

  const { gameId } = useParams()

  const [gameDetail, setGameDetail] = useState({})
  const [isFav, setIsFav] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        showSpinner()
        const _gameDetail = await retrieveGameDetail(gameId, sessionStorage.token)
        setGameDetail(_gameDetail)
        setIsFav(_gameDetail.isFav)
        hideSpinner()
      } catch ({ message }) {
        showModal({ message })
        hideSpinner()
      }
    })()
  }, [gameId])

  const { name, released, description, screenshots, platforms, genres, score, id, website } = gameDetail

  const handleFav = () => {
    showSpinner()
    toggleFavGame(sessionStorage.token, id)
    setIsFav(!isFav)
    hideSpinner()
  }

  return (
    <>
      {
            gameDetail
              ? <div className='gameDetail'>
                <div className='gameDetail__row'>
                  <div className='releasedDate gameDetail__releasedDate'><time>{released}</time></div>
                  <div className='score'>{score}</div>
                  <button className='btnIcon' onClick={handleFav}>
                    <i className={`${isFav ? 'fa' : 'far'} fa-heart`} />
                  </button>
                </div>
                <h1 className='gameDetail__title'>{name}</h1>
                <ul className='gallery'>
                  {
                            screenshots
                              ? screenshots.map((item, index) => <li key={index} className='gallery__item'><img className='gallery__img' src={item} /></li>)
                              : null
                        }
                </ul>
                <p className='genres-title'>Description</p>
                <p>{description}</p>
                <p className='platforms-title'>Platforms</p>
                <ul className='platforms-list'>{
                        platforms
                          ? platforms.map(({ _id, name }) => <li className='platforms-list__item' key={_id}>{name}</li>)
                          : null
                    }
                </ul>
                <p className='genres-title'>Genres</p>
                <ul className='genres-list'>{
                        genres
                          ? genres.map(({ _id, name }) => <li className='genres-list__item' key={_id}>{name}</li>)
                          : null
                    }
                </ul>
                <a href={website}>Website</a>
              </div>
              : <p>Game with {`${gameId}`} doesn't found</p>
        }
    </>
  )
}

export default GameDetail
