import { render, screen } from '@testing-library/react'
import Spinner from './index'

test('should render spinner', () => {
  const { container, debug } = render(<Spinner />)
  const spinner = container.getElementsByClassName('.spinner')
  console.log(spinner)
})
