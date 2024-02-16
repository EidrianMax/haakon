import './NavTabs.css'

export default function NavTabs ({ onClickProfile, onClickMyPassword, view }) {
  const classNameProfile = `NavTabs-item ${view === 'Profile' ? 'is-active' : ''}`
  const classNameMyPassword = `NavTabs-item ${view === 'MyPassword' ? 'is-active' : ''}`

  return (
    <nav className='NavTabs'>
      <button className={classNameProfile} onClick={onClickProfile}>
        Profile
      </button>
      <button className={classNameMyPassword} onClick={onClickMyPassword}>
        My Password
      </button>
    </nav>
  )
}
