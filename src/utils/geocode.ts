import { Coords } from '../../types/general'
import { logger } from '../lib/logger'

let geocoder: google.maps.Geocoder | null = null

function initGeocoder() {
  if (!geocoder && window.google) {
    geocoder = new window.google.maps.Geocoder()
  }
}

function parseResult(results: google.maps.GeocoderResult[]) {
  return results[0].geometry.location.toJSON()
}

type Request = { placeId: string } | { address: string }

/** Takes in a request object and returns coordinates or undefined */
export async function geocode(request: Request): Promise<Coords | undefined> {
  initGeocoder()

  if (request && geocoder) {
    try {
      const { results } = await geocoder.geocode(request)
      if (results && results.length > 0) {
        return parseResult(results)
      }
    } catch (error: any) {
      if (error.code && error.code !== 'ZERO_RESULTS')
        logger.warn({ error, request }, 'Geocoding Error')
    }
  }
  return undefined
}
