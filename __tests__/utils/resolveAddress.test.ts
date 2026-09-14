import { resolveAddress } from '../../src/utils/resolveAddress'

jest.mock('../../src/lib/logger', () => ({
  logger: { warn: jest.fn() },
}))
import { logger } from '../../src/lib/logger'

const prediction = {
  place_id: 'abc123',
  description: 'Murray, UT, USA',
  terms: [{ value: 'Murray' }, { value: 'UT' }, { value: 'USA' }],
  structured_formatting: { main_text: 'Murray', secondary_text: 'UT, USA' },
}

function mockPlace(fetchFields: jest.Mock) {
  ;(globalThis as any).google = {
    maps: { places: { Place: jest.fn(() => ({ fetchFields })) } },
  }
}

describe('resolveAddress', () => {
  afterEach(() => {
    delete (globalThis as any).google
    jest.clearAllMocks()
  })

  it('uses address components when the Places lookup succeeds', async () => {
    mockPlace(
      jest.fn().mockResolvedValue({
        place: {
          addressComponents: [
            { types: ['locality'], longText: 'Murray' },
            { types: ['administrative_area_level_1'], longText: 'Utah' },
            { types: ['country'], longText: 'United States' },
          ],
        },
      })
    )
    await expect(resolveAddress(prediction)).resolves.toEqual({
      city: 'Murray',
      adminArea: 'Utah',
      country: 'United States',
    })
  })

  it('falls back to prediction terms when the Places lookup rejects', async () => {
    const error = new Error('PLACES_GET_PLACE: PERMISSION_DENIED')
    mockPlace(jest.fn().mockRejectedValue(error))
    await expect(resolveAddress(prediction)).resolves.toEqual({
      city: 'Murray',
      adminArea: 'UT',
      country: 'USA',
    })
    expect(logger.warn).toHaveBeenCalledWith(
      expect.objectContaining({ error, placeId: 'abc123' }),
      expect.any(String)
    )
  })

  it('falls back to prediction terms when the Places SDK is missing', async () => {
    await expect(resolveAddress(prediction)).resolves.toEqual({
      city: 'Murray',
      adminArea: 'UT',
      country: 'USA',
    })
  })

  it('returns empty strings for a null prediction', async () => {
    await expect(resolveAddress(null)).resolves.toEqual({
      city: '',
      adminArea: '',
      country: '',
    })
  })
})
