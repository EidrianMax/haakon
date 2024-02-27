import { useState } from 'react'
import NavTabs from './NavTabs'
import ModifyUserForm from '../../components/ModifyUserForm'
import ModifyPasswordForm from '../../components/ModifyPasswordForm'
import DeleteUserForm from '../../components/DeleteUserForm'
import { Helmet } from 'react-helmet'

export default function Settings () {
  const [view, setView] = useState('Profile')

  const goToProfile = () => setView('Profile')
  const goToPassword = () => setView('MyPassword')
  const goToFormDeleteUser = () => setView('DeleteUser')

  return (
    <>
      <Helmet>
        <title>Settings | Haakon</title>
      </Helmet>

      <div className='userSettings'>
        <h1 style={{ textAlign: 'center' }} className='userSettings__title'>Settings</h1>

        <NavTabs
          view={view}
          onClickProfile={goToProfile}
          onClickMyPassword={goToPassword}
        />

        {view === 'Profile' && <ModifyUserForm goToFormDeleteUser={goToFormDeleteUser} />}
        {view === 'MyPassword' && <ModifyPasswordForm />}
        {view === 'DeleteUser' && <DeleteUserForm />}
      </div>
    </>
  )
}
