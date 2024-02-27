import './index.css'
import { useState } from 'react'
import { Link } from 'wouter'
import Fav from '../Fav'
import Tooltip from '../Tooltip'
import Platforms from '../Platforms'

export default function Game ({ id, name, backgroundImage, platforms, genres, score }) {
  const [tooltip, setTooltip] = useState(false)

  return (
    <li className='Game'>
      <header className='Game-header'>
        <img
          className='Game-backgroundImage'
          loading='lazy'
          src={backgroundImage}
          alt={name}
        />
        <div className='Game-fav'>
          <Fav id={id} />
        </div>
      </header>

      <div className='Game-body'>
        <div className='Game-platforms-and-score'>
          <Platforms platforms={platforms} />

          <div className='Game-score'>{score || 0}</div>
        </div>

        <h3 className='Game-name'>
          <Link className='Game-name-link' to={`/games/${id}`}>{name}</Link>
        </h3>

        <div className='Game-genres-and-more-actions'>
          <ul className='Game-genres'>
            {
              genres.map((genre, index) => {
                if (index === 0 && index === genres.length - 1) {
                  return <li className='Game-genre' key={genre._id}>{genre.name}</li>
                }

                if (index === 0) {
                  return <li className='Game-genre' key={genre._id}>{genre.name},{'\xa0'}</li>
                }

                if (index === genres.length - 1) {
                  return <li className='Game-genre' key={genre._id}>{genre.name.toLowerCase()}</li>
                }

                return <li className='Game-genre' key={genre._id}>{genre.name.toLowerCase()},{'\xa0'}</li>
              })
            }
          </ul>

          <Tooltip
            id={id}
            tooltip={tooltip}
            handleClickOpen={() => setTooltip(true)}
            handleClickClose={() => setTooltip(false)}
          />
        </div>
      </div>
    </li>
  )
}
