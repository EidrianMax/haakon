import './index.css'
import FormProfile from '../../components/FormProfile'
import FormPassword from '../../components/FormPassword'
import FormDeleteUser from '../../components/FormDeleteUser'
import { useState } from 'react'

const ProfileSettings = ({ resetTokenAndGoToLanding }) => {
  const [view, setView] = useState('form-profile')

  const goToProfile = () => setView('form-profile')
  const goToPassword = () => setView('form-password')
  const goToFormDeleteUser = () => setView('form-delete-user')

  return (
    <>
      <div className='userSettings'>
        <h1 className='userSettings__title'>Settings</h1>
        <div className='bar userSettings__bar'>
          <div className={`bar__item ${view === 'form-profile' && 'bar__item--active'}`} onClick={goToProfile}>Profile</div>
          <div className={`bar__item ${view === 'form-password' && 'bar__item--active'}`} onClick={goToPassword}>My Password</div>
        </div>
        {view === 'form-profile' && <FormProfile goToFormDeleteUser={goToFormDeleteUser} />}
        {view === 'form-password' && <FormPassword />}
        {view === 'form-delete-user' && <FormDeleteUser resetTokenAndGoToLanding={resetTokenAndGoToLanding} />}
      </div>
    </>
  )
}

export default ProfileSettings
