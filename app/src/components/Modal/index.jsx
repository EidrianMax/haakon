import './index.css'

export default function Modal ({ variant = 'info', message, closeModal }) {
  const className = `Modal-text Modal-text--${variant}`

  return (
    <div className='Modal'>
      <div className='Modal-panel'>
        <p className={className}>{message}</p>
        <button className='Button Button--dark' onClick={closeModal}>Accept</button>
      </div>
    </div>
  )
}
