import './index.css'
import { useLocation } from 'wouter'
import useUser from '../../hooks/useUser'

export default function Sidebar ({ hideSidebar }) {
  const { token, user, setToken } = useUser()
  const [, navigate] = useLocation()

  const goToRegister = () => {
    navigate('/register')
    hideSidebar()
  }

  const goToLogin = () => {
    navigate('/login')
    hideSidebar()
  }

  const goToMyLibrary = () => {
    navigate(`/@${user.username}`)
    hideSidebar()
  }

  const goToSettings = () => {
    navigate('/settings')
    hideSidebar()
  }

  const goOut = () => {
    setToken('')
    window.sessionStorage.removeItem('token')
    navigate('/')
  }

  return (
    <aside className='Sidebar'>
      <nav className='Sidebar-nav'>
        <button className='Sidebar-closeIcon' onClick={hideSidebar}>
          <i className='fas fa-times' />
        </button>
        <ul className='Sidebar-list'>
          {
            !token
              ? (
                <>
                  <li className='Sidebar-list-item' onClick={goToLogin}>
                    <i className='fas fa-sign-in-alt' />{' '}
                    Login
                  </li>
                  <li className='Sidebar-list-item' onClick={goToRegister}>
                    <i className='fas fa-user-plus' />{' '}
                    Register
                  </li>
                </>
                )
              : (
                <>
                  <li className='Sidebar-list-item' onClick={goToMyLibrary}>
                    <i className='fas fa-book-reader' />{' '}
                    My Library
                  </li>
                  <li className='Sidebar-list-item' onClick={goToSettings}>
                    <i className='fas fa-cog' />{' '}
                    Settings
                  </li>
                  <li className='Sidebar-list-item' onClick={goOut}>
                    <i className='fas fa-sign-out-alt' />{' '}
                    Go out
                  </li>
                </>
                )
          }
        </ul>
      </nav>
    </aside>
  )
}
