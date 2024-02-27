import './index.css'
import { useState } from 'react'
import { Link } from 'wouter'
import Fav from '../Fav'
import Tooltip from '../Tooltip'

export default function Game ({ id, name, backgroundImage, platforms, genres, score }) {
  const [tooltip, setTooltip] = useState(false)

  const platformsMapped = platforms.map(platform => {
    const name = platform.name.toLowerCase()

    if (name.startsWith('playstation') || name.startsWith('ps')) return 'playstation'
    if (name.startsWith('xbox')) return 'xbox'
    if (name.startsWith('nintendo') ||
        name.startsWith('wii') ||
        name.startsWith('game boy') ||
        name === 'nes' ||
        name === 'snes' ||
        name === 'gamecube') return 'gamepad'
    if (name === 'ios' || name === 'macos') return 'apple'
    if (name === 'pc') return 'windows'
    if (name.startsWith('atari')) return 'ghost'
    if (name === 'linux') return 'linux'
    if (name === 'android') return 'android'

    return 'dice-d6'
  })

  const platformsNoRepeated = Array.from(new Set(platformsMapped))

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
          <ul className='Game-platforms'>
            {
              platformsNoRepeated.map(platform => {
                if (platform === 'gamepad') {
                  return (
                    <li className='Game-platform' key={platform}>
                      <i key={platform} className={`fas fa-${platform}`} />
                    </li>
                  )
                }

                if (platform === 'dice-d6') {
                  return (
                    <li className='Game-platform' key={platform}>
                      <i key={platform} className={`fas fa-${platform}`} />
                    </li>
                  )
                }

                return (
                  <li className='Game-platform' key={platform}>
                    <i key={platform} className={`fab fa-${platform}`} />
                  </li>
                )
              })
            }
          </ul>

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
