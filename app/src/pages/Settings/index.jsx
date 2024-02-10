import { useState } from 'react'
import NavTabs from './NavTabs'
import FormModifyProfile from '../../components/FormModifyProfile'
import FormModifyPassword from '../../components/FormModifyPassword'
import FormDeleteUser from '../../components/DeleteAccount'

export default function Settings () {
  const [view, setView] = useState('Profile')

  const goToProfile = () => setView('Profile')
  const goToPassword = () => setView('MyPassword')
  const goToFormDeleteUser = () => setView('DeleteUser')

  return (
    <>
      <div className='userSettings'>
        <h1 className='userSettings__title'>Settings</h1>
        <NavTabs
          view={view}
          onClickProfile={goToProfile}
          onClickMyPassword={goToPassword}
        />
        {view === 'Profile' && <FormModifyProfile goToFormDeleteUser={goToFormDeleteUser} />}
        {view === 'MyPassword' && <FormModifyPassword />}
        {view === 'DeleteUser' && <FormDeleteUser />}
      </div>
    </>
  )
}
