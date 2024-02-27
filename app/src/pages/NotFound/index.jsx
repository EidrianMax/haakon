import { Helmet } from 'react-helmet'
import './index.css'
import { Link } from 'wouter'

export default function NotFound () {
  return (
    <>
      <Helmet>
        <title>Page 404 | Not Found</title>
      </Helmet>

      <div className='NotFoundPage'>
        <h1>Not Found</h1>
        <img
          src='https://media1.giphy.com/media/14uQ3cOFteDaU/giphy.gif?cid=ed2b8a12nbzsetsr459b587fotcyoqh8033kjr8pyiogmo87&ep=v1_gifs_search&rid=giphy.gif&ct=g'
          alt='Not Found Funny Image'
        />
        <p>Sometimes gettings lost isn't that bad</p>
        <Link href='/'>Go Back</Link>
      </div>
    </>
  )
}
