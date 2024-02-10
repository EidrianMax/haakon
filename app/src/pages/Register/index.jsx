import './index.css'
import Button from '../../components/Button'
import useApp from '../../hooks/useApp'
import useUser from '../../hooks/useUser'

export default function Register () {
  const { goToLogin } = useApp()
  const { register } = useUser()

  const onSubmit = async (event) => {
    event.preventDefault()

    const fields = Object.fromEntries(new FormData(event.target))

    const { name, username, password } = fields

    register(name, username, password)
  }

  return (
    <>
      <div className='Register'>
        <div className='Register-wrapper'>
          <h1 className='Register-title'>Register</h1>

          <form className='RegisterForm' onSubmit={onSubmit}>
            <input className='input RegisterForm-input' type='text' name='name' placeholder='Name' />
            <input className='input RegisterForm-input' type='text' name='username' placeholder='Username' />
            <input className='input RegisterForm-input' type='password' name='password' placeholder='Password' />

            <Button className='RegisterForm-Button'>Register</Button>
            <Button className='RegisterForm-Button' onClick={goToLogin}>I have an account</Button>
          </form>

          <p>
            By signing up, you agree to HAAKON's <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>.
          </p>
        </div>
      </div>
    </>
  )
}
