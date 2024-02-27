import './index.css'

export default function Alert ({ variant = 'info', children }) {
  const className = `Alert Alert--${variant}`

  return (
    <div className={className}>
      {children}
    </div>
  )
}
