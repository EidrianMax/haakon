import './App.css'
import { useEffect, useState } from 'react'
import { Route, Switch } from 'wouter'

import Header from './components/Header'
import Modal from './components/Modal'

import Home from './pages/Home'
import SearchResults from './pages/SearchResults'
import GameDetail from './pages/GameDetail'
import NotFound from './pages/NotFound'
import Sidebar from './components/Sidebar'
import Library from './pages/Library'
import Register from './pages/Register'
import Login from './pages/Login'
import useUser from './hooks/useUser'
import Settings from './pages/Settings'

import { Helmet } from 'react-helmet'

export default function App () {
  const [sidebar, setSidebar] = useState(false)
  const [modal, setModal] = useState(false)
  const { user, isExpiredSession } = useUser()

  useEffect(() => {
    if (isExpiredSession) {
      setModal(true)
    }
  }, [isExpiredSession])

  const closeModal = () => {
    setModal(false)
  }

  const showSidebar = () => setSidebar(true)
  const hideSidebar = () => setSidebar(false)

  return (
    <>
      <Helmet>
        <link rel='canonical' href={`${import.meta.env.VITE_APP_URL}`} />
        <meta
          name='description'
          content='Search, discover & share your favorite games'
        />
      </Helmet>
      <div className='Container'>
        <Header showSidebar={showSidebar} />
        {sidebar && <Sidebar hideSidebar={hideSidebar} />}
        {modal && <Modal message='Session expired, log in again' closeModal={closeModal} />}
        <Switch>
          <Route path='/' component={Home} />
          <Route path='/search/:query' component={SearchResults} />
          <Route path='/games/:gameId' component={GameDetail} />
          <Route path={`/@${user.username}`} component={Library} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/settings' component={Settings} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </>
  )
}
