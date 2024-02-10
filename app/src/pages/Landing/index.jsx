import Button from '../../components/Button'
import useApp from '../../hooks/useApp'
import './index.css'

export default function Landing () {
  const { goToRegister, goToLogin } = useApp()

  return (
    <>
      <div className='Landing'>
        <div className='Landing-container'>
          <h1 className='Landing-title'>Haakon</h1>
          <p className='Landing-description'>Haakon es la aplicación definitiva para los entusiastas de los videojuegos que buscan organizar, descubrir y disfrutar de su extensa colección de juegos. Con una interfaz intuitiva y funciones avanzadas, GameHub ofrece una experiencia centralizada para gestionar tu biblioteca de videojuegos de manera eficiente.</p>
          <Button className='Landing-Button' onClick={goToRegister}>Register</Button>
          <Button onClick={goToLogin}>Login</Button>
        </div>
      </div>
    </>
  )
}
