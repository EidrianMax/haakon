import { useEffect, useState } from 'react'
import { Route, Switch } from 'wouter'
import Header from '../../components/Header'
import GameDetail from '../GameDetail'
import Aside from '../../components/Aside'
import SearchGames from '../SearchGames'
import AllGames from '../AllGames'
import MyLibary from '../MyLibrary'
import NotFound from '../NotFound'
import useGames from '../../hooks/useGames'
import useUser from '../../hooks/useUser'
import Settings from '../Settings'
import retrieveFavGames from '../../services/retrieve-fav-games'

export default function Home () {
  const { games } = useGames(null)
  const { user } = useUser()
  const [aside, setAside] = useState(false)

  const showAside = () => setAside(true)
  const hideAside = () => setAside(false)

  return (
    <>
      <Header showAside={showAside} user={user} />
      {aside && <Aside hideAside={hideAside} />}

      <Switch>
        <Route path='/'><AllGames games={games} /></Route>
        <Route path='/games/search/:query'><SearchGames games={games} /></Route>
        <Route path='/games/:gameId' component={GameDetail} />
        <Route path={`/@${user?.username}`} component={MyLibary} />
        <Route path='/settings' component={Settings} />
        <Route component={NotFound} />
      </Switch>
    </>
  )
}
