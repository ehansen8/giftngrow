import { find } from 'lodash'
import { logger } from '../lib/logger'

export interface PlacePrediction {
  place_id: string
  terms: { value: string }[]
}

export interface ResolvedAddress {
  city: string
  adminArea: string
  country: string
}

const EMPTY: ResolvedAddress = { city: '', adminArea: '', country: '' }

/**
 * Resolves city, admin area, and country for an autocomplete prediction.
 * Prefers Places API (New) address components. Falls back to the prediction's
 * terms so a failed lookup never drops the user's location.
 */
export async function resolveAddress(
  prediction: PlacePrediction | null
): Promise<ResolvedAddress> {
  if (!prediction?.place_id) return EMPTY

  const placeId = prediction.place_id
  try {
    if (!globalThis.google?.maps?.places?.Place) {
      throw new Error('google.maps.places.Place is unavailable')
    }
    const { place } = await new google.maps.places.Place({
      id: placeId,
    }).fetchFields({ fields: ['addressComponents'] })
    return extractAddressComponents(place.addressComponents ?? [])
  } catch (error) {
    logger.warn(
      { error, placeId },
      'Place lookup failed, falling back to prediction terms'
    )
    return fromTerms(prediction.terms)
  }
}

function fromTerms(terms: { value: string }[]): ResolvedAddress {
  return {
    city: terms[0]?.value ?? '',
    adminArea: terms[1]?.value ?? '',
    country: terms[terms.length - 1]?.value ?? '',
  }
}

function extractAddressComponents(
  addressComponents: google.maps.places.AddressComponent[]
): ResolvedAddress {
  const byType = (type: string) =>
    find(addressComponents, ({ types }) => types.includes(type))

  return {
    city:
      byType('locality')?.longText ??
      byType('administrative_area_level_3')?.longText ??
      '',
    adminArea: byType('administrative_area_level_1')?.longText ?? '',
    country: byType('country')?.longText ?? '',
  }
}
