import './index.css'
import Button from '../Button'

export default function Modal ({ variant, message, onAccept }) {
  const className = `Modal-text ${variant ? `Modal-text--${variant}` : ''}`

  return (
    <div className='Modal'>
      <div className='Modal-panel'>
        <p className={className}>{message}</p>
        <Button className='Button--dark' onClick={onAccept}>Aceptar</Button>
      </div>
    </div>
  )
}
