import { useLocation } from 'wouter'
import './index.css'
import useUser from '../../hooks/useUser'

export default function Aside ({ hideAside }) {
  const [, navigate] = useLocation()
  const { logout } = useUser()
  const { user } = useUser()
  console.log(user)

  const goToMyLibrary = () => {
    navigate(`/@${user?.username}`)
    hideAside()
  }

  const goToSettings = () => {
    navigate('/settings')
    hideAside()
  }

  return (
    <>
      <aside className='Aside'>
        <nav className='Aside-nav'>
          <button className='Aside-closeIcon' onClick={hideAside}>
            <i className='fas fa-times' />
          </button>
          <ul className='Aside-list'>
            <li className='Aside-list-item' onClick={goToMyLibrary}>
              <i className='fas fa-book-reader' />{' '}
              My Library
            </li>
            <li className='Aside-list-item' onClick={goToSettings}>
              <i className='fas fa-cog' />{' '}
              Settings
            </li>
            <li className='Aside-list-item' onClick={logout}>
              <i className='fas fa-sign-out-alt' />{' '}
              Go out
            </li>
          </ul>
        </nav>
      </aside>
    </>
  )
}
