import './index.css'
import useUser from '../../hooks/useUser'
import { useLocation } from 'wouter'

export default function Fav ({ id }) {
  const { favGames, aggregateFavGame, removeFavGame, isLoading, user } = useUser()
  const [, navigate] = useLocation()

  const isFav = favGames.some(favGame => favGame._id === id)

  const handleClickFavGame = async () => {
    if (!user.username) {
      navigate('/login')

      return
    }

    if (!isLoading) {
      if (isFav) {
        removeFavGame(id)
      } else {
        aggregateFavGame(id)
      }
    }
  }

  return (
    <button className='Fav' onClick={handleClickFavGame}>
      {
        isLoading
          ? <i className='fas fa-spinner fa-spin' />
          : <i className={`${isFav ? 'fas' : 'far'} fa-heart`} />
      }
    </button>
  )
}
