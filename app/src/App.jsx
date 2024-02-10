import Landing from './pages/Landing'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Modal from './components/Modal'
import Spinner from './components/Spinner'
import useApp from './hooks/useApp'

export default function App () {
  const { view, modal, loading, hideModal } = useApp()

  return (
    <>
      {view === 'Landing' && <Landing />}
      {view === 'Register' && <Register />}
      {view === 'Login' && <Login />}
      {view === 'Home' && <Home />}
      {modal && <Modal message={modal.message} variant={modal.variant} onAccept={hideModal} />}
      {loading && <Spinner />}
    </>
  )
}
