import './index.css'

export default function Carousel ({ images = [] }) {
  return (
    <ul className='Carousel'>
      {
        images.map(image =>
          <li
            key={image}
            className='Carousel-item'
          >
            <img className='Carousel-item-img' src={image} />
          </li>)
      }
    </ul>
  )
}
