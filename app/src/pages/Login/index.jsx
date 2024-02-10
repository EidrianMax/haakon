import './index.css'
import Button from '../../components/Button'
import useUser from '../../hooks/useUser'
import useApp from '../../hooks/useApp'

export default function Login () {
  const { login } = useUser()
  const { goToRegister } = useApp()

  const onSubmit = async (event) => {
    event.preventDefault()

    const fields = Object.fromEntries(new FormData(event.target))
    const { username, password } = fields

    login(username, password)
  }

  return (
    <>
      <div className='Login'>
        <div className='Login-wrapper'>

          <h1 className='Login-title'>Login</h1>

          <form className='LoginForm' onSubmit={onSubmit}>
            <input
              className='input LoginForm-input'
              type='text'
              placeholder='Username'
              name='username'
            />
            <input
              className='input LoginForm-input'
              type='password'
              placeholder='Password'
              name='password'
            />

            <Button type='submit' className='LoginForm-Button'>
              Login
            </Button>
            <Button type='button' onClick={goToRegister}>
              Don't have account? Register
            </Button>
          </form>

        </div>
      </div>
    </>
  )
}
