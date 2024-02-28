import './index.css'

export default function ErrorMessage ({ children }) {
  return (
    <p className='ErrorMessage'>
      {children}
    </p>
  )
}
