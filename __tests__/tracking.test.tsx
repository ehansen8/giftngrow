import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Tracking from '../src/pages/tracking'

describe('Tracking', () => {
  it('renders a heading', () => {
    render(<Tracking />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
