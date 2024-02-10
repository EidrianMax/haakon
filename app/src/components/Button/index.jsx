import './index.css'

export default function Button ({ children, className, ...props }) {
  return (
    <button className={`Button ${className}`} {...props}>
      {children}
    </button>
  )
}
