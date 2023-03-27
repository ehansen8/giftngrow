import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ActiveCodeButton } from '../../../../src/components/tracking/stats/ActiveCodeButton'
import { useUserAPI } from '../../../../src/hooks/useUserAPI'
import { useGetCodesQuery } from '../../../../src/queries/getCodesQuery'
import { useTrackingStore } from '../../../../src/stores/trackingStore'

jest.mock('../../../../src/stores/trackingStore')
jest.mock('../../../../src/queries/getCodesQuery')
jest.mock('../../../../src/hooks/useUserAPI')

const mockUseTrackingCode = jest.mocked(useTrackingStore)

const getSaveButton = () => {
  return (
    screen.queryByTestId('StarIcon') || screen.getByTestId('StarOutlineIcon')
  )
}

const getCloseButton = () => {
  return screen.getByTestId('CloseIcon')
}

describe('ActiveCodeButton', () => {
  const setActiveCode = jest.fn()
  const userAPI = {
    addTrackingCode: jest.fn().mockResolvedValue(''),
    deleteTrackingCode: jest.fn().mockResolvedValue(''),
  }
  const codesQuery = {
    data: [{ code: 'AAAAAA' }],
    refetch: jest.fn(),
  }

  beforeEach(() => {
    jest.mocked(useGetCodesQuery).mockReturnValue(codesQuery as any)
    jest.mocked(useUserAPI).mockReturnValue(userAPI as any)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders activeCode without errors', () => {
    mockUseTrackingCode.mockReturnValue({
      activeCode: 'AAAAAA',
      setActiveCode: setActiveCode,
    })
    render(<ActiveCodeButton setSearching={() => {}} />)
    expect(screen.getByText(useTrackingStore().activeCode)).toBeInTheDocument()
  })

  it('calls deleteTrackingCode then addTrackingCode when IconButton is clicked twice', async () => {
    mockUseTrackingCode.mockReturnValue({
      activeCode: 'AAAAAA',
      setActiveCode: setActiveCode,
    })

    const { rerender } = render(<ActiveCodeButton setSearching={() => {}} />)
    await userEvent.click(getSaveButton())

    expect(userAPI.deleteTrackingCode).toHaveBeenCalledWith('AAAAAA')
    expect(codesQuery.refetch).toHaveBeenCalledTimes(1)

    jest.mocked(useGetCodesQuery).mockReturnValue({
      ...codesQuery,
      data: [],
    } as any)

    // Second render with new codeData
    rerender(<ActiveCodeButton setSearching={() => {}} />)
    await userEvent.click(getSaveButton())

    expect(userAPI.addTrackingCode).toHaveBeenCalledWith('AAAAAA')
    expect(codesQuery.refetch).toHaveBeenCalledTimes(2)
  })

  it('renders StarOutlineIcon if code is not saved, and StarIcon if code is saved', () => {
    mockUseTrackingCode.mockReturnValue({
      activeCode: 'AAAAAA',
      setActiveCode: setActiveCode,
    })
    render(<ActiveCodeButton setSearching={() => {}} />)

    expect(screen.getByTestId('StarIcon')).toBeInTheDocument()

    //Re-render with activeCode not is list
    mockUseTrackingCode.mockReturnValue({
      activeCode: 'CCCCCC',
      setActiveCode: setActiveCode,
    })
    render(<ActiveCodeButton setSearching={() => {}} />)
    expect(screen.getByTestId('StarOutlineIcon')).toBeInTheDocument()
  })

  it('calls setActiveCode with empty code when CloseIcon is clicked', () => {
    mockUseTrackingCode.mockReturnValue({
      activeCode: 'AAAAAA',
      setActiveCode: setActiveCode,
    })
    render(<ActiveCodeButton setSearching={() => {}} />)
    const closeButton = getCloseButton()
    fireEvent.click(closeButton)
    expect(setActiveCode).toHaveBeenCalledWith('')
  })

  it('calls setSearching when Button is clicked', () => {
    mockUseTrackingCode.mockReturnValue({
      activeCode: 'AAAAAA',
      setActiveCode: setActiveCode,
    })
    const setSearching = jest.fn()
    render(<ActiveCodeButton setSearching={setSearching} />)
    const searchButton = screen.getByText('AAAAAA')
    fireEvent.click(searchButton)
    expect(setSearching).toHaveBeenCalled()
  })
})
