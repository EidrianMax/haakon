import { Link, useLocation } from 'wouter'
import './index.css'

export default function Header ({ showAside, user }) {
  const [, setLocation] = useLocation()

  const onSubmit = async (event) => {
    event.preventDefault()

    const { query } = Object.fromEntries(new FormData(event.target))

    setLocation(`/games/search/${query}`)

    event.target.reset()
  }

  return (
    <header className='Header'>
      <Link href='/' className='Logo'>Haakon</Link>

      <form className='FormSearch' onSubmit={onSubmit}>
        <input
          className='FormSearch-input-elevated'
          placeholder='Zelda, Mario, Portal, Limbo, Counter Strike...'
          type='text'
          name='query'
        />
      </form>

      <span className='Header-name'>{user?.username}</span>

      <button className='Header-perfil' onClick={showAside}>
        <i className='fas fa-user-cog fa-lg' />
      </button>
    </header>
  )
}
