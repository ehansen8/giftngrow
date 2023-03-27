import { render, screen, fireEvent } from '@testing-library/react'
import { NoCodeButton } from '../../../../src/components/tracking/stats/NoCodeButton'

describe('NoCodeButton', () => {
  it('renders with correct text', () => {
    render(<NoCodeButton setSearching={() => {}} />)
    const buttonText = screen.getByText('All Tracking Codes')

    expect(buttonText).toBeInTheDocument()
  })

  it('calls setSearching when clicked', () => {
    const setSearchingMock = jest.fn()
    render(<NoCodeButton setSearching={setSearchingMock} />)
    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(setSearchingMock).toHaveBeenCalledTimes(1)
  })
})
