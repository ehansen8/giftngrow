import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchCodeButton } from '../../../../src/components/tracking/stats/SearchCodeButton'
import fetchItem from '../../../../src/services/fetchItem'
import { useTrackingStore } from '../../../../src/stores/trackingStore'

jest.mock('../../../../src/stores/trackingStore')
jest.mock('../../../../src/services/fetchItem')

const getInputs = () => {
  return screen.getAllByRole('textbox')
}

describe('SearchCodeButton', () => {
  const setSearching = jest.fn()
  const setActiveCode = jest.fn()

  beforeEach(() => {
    jest
      .mocked(useTrackingStore)
      .mockReturnValue({ activeCode: '', setActiveCode })

    jest.mocked(fetchItem).mockReturnValue({ error: '', data: 'ABC123' } as any)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('renders without crashing', () => {
    render(<SearchCodeButton setSearching={setSearching} />)
    expect(screen.getByText('Tracking Code:')).toBeInTheDocument()
  })

  it('renders with activeCode displayed if activeCode is set', () => {
    const activeCode = 'ABCDEF'
    jest
      .mocked(useTrackingStore)
      .mockReturnValue({ activeCode: activeCode, setActiveCode })

    render(<SearchCodeButton setSearching={setSearching} />)
    expect(screen.getByText('Tracking Code:')).toBeInTheDocument()
    getInputs().forEach((input, idx) => {
      expect(input).toHaveValue(activeCode[idx])
    })
  })

  it('sets the active code and calls setSearching when a valid code is entered and search button is clicked', async () => {
    const code = 'ABC123'

    render(<SearchCodeButton setSearching={setSearching} />)

    const inputs = getInputs()
    await userEvent.type(inputs[0], code)
    inputs.forEach((input, idx) => {
      expect(input).toHaveValue(code[idx])
    })

    const searchButton = screen.getByTestId('SearchIcon')
    await userEvent.click(searchButton)

    expect(setActiveCode).toHaveBeenCalledWith(code)
    expect(setSearching).toHaveBeenCalled()
  })

  it('displays an error message when an invalid code is entered and search button is clicked', async () => {
    jest.mocked(fetchItem).mockReturnValue({ error: '', data: '' } as any)
    const code = 'AAAAAA'
    const errorMessage = 'Invalid Code'

    render(<SearchCodeButton setSearching={setSearching} />)

    const inputs = getInputs()
    await userEvent.type(inputs[0], code)
    inputs.forEach((input, idx) => {
      expect(input).toHaveValue(code[idx])
    })

    const searchButton = screen.getByTestId('SearchIcon')
    await userEvent.click(searchButton)

    expect(setActiveCode).not.toHaveBeenCalled()
    expect(setSearching).not.toHaveBeenCalled()
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

  it('displays an error message when no code is entered and search button is clicked', async () => {
    const errorMessage = 'Missing Code'

    render(<SearchCodeButton setSearching={setSearching} />)

    const searchButton = screen.getByTestId('SearchIcon')
    await userEvent.click(searchButton)

    expect(setActiveCode).not.toHaveBeenCalled()
    expect(setSearching).not.toHaveBeenCalled()
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

  it('displays an error message when code length is not 6 and search button is clicked', async () => {
    const code = 'ABC1'
    const errorMessage = 'Code Must Be 6 Characters'
    render(<SearchCodeButton setSearching={setSearching} />)

    const inputs = getInputs()
    await userEvent.type(inputs[0], code)
    inputs.forEach((input, idx) => {
      expect(input).toHaveValue(code[idx] ?? '')
    })

    const searchButton = screen.getByTestId('SearchIcon')
    await userEvent.click(searchButton)

    expect(setActiveCode).not.toHaveBeenCalled()
    expect(setSearching).not.toHaveBeenCalled()
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

  it('displays the correect error message when fetchItem errors', async () => {
    const code = 'ABC123'
    const errorMessage = '500 Internal Server Error'
    jest
      .mocked(fetchItem)
      .mockReturnValue({ error: errorMessage, data: '' } as any)
    render(<SearchCodeButton setSearching={setSearching} />)

    const inputs = getInputs()
    await userEvent.type(inputs[0], code)
    inputs.forEach((input, idx) => {
      expect(input).toHaveValue(code[idx] ?? '')
    })

    const searchButton = screen.getByTestId('SearchIcon')
    await userEvent.click(searchButton)

    expect(setActiveCode).not.toHaveBeenCalled()
    expect(setSearching).not.toHaveBeenCalled()
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })
})
