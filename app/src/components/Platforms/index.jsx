import './index.css'

export default function Platforms ({ platforms = [] }) {
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
    <ul className='Platforms'>
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
  )
}
