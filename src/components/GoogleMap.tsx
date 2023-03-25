import { MarkerClusterer } from '@googlemaps/markerclusterer'
import React, { useRef, useEffect, useState } from 'react'
import { useGetEntriesQuery } from '../queries/getEntriesQuery'
import { geocode } from '../utils/geocode'

const mapDefaults: google.maps.MapOptions = {
  center: { lat: 39.8097343, lng: -98.5556199 },
  zoom: 4,
  streetViewControl: false,
  mapTypeControl: false,
}

export function Map() {
  const mapRef = useRef(null)
  const [map, setMap] = useState<google.maps.Map>()
  const [cluster, setCluster] = useState<MarkerClusterer>()

  //const [markers, setMarkers] = useState<google.maps.Marker[]>([])
  const { data: entries } = useGetEntriesQuery()

  async function createMarker(city?: string, state?: string) {
    if (!city || !state) {
      return
    }
    const address = `${city}, ${state}`
    const position = await geocode({ address })
    if (!position) {
      return
    }
    return new google.maps.Marker({
      position: position,
    })
  }
  //Create Map
  useEffect(() => {
    // Create a new map instance
    const newMap = new window.google.maps.Map(mapRef.current!, mapDefaults)

    setMap(newMap)
  }, [])

  //Create Cluster
  useEffect(() => {
    if (map) {
      const newCluster = new MarkerClusterer({ map })
      newCluster.onAdd()
      setCluster(newCluster)
    }
  }, [map])

  //Render markers to map when map or entries change
  useEffect(() => {
    const bounds = new window.google.maps.LatLngBounds()

    if (cluster) {
      entries?.forEach(async (entry, idx) => {
        setTimeout(async function () {
          let giverMarker: google.maps.Marker | undefined = undefined
          if (entry.giverCoords) {
            giverMarker = new google.maps.Marker({
              position: entry.giverCoords,
            })
          } else {
            giverMarker = await createMarker(entry.giverCity, entry.giverState)
          }
          // giver is parsed
          if (giverMarker) {
            bounds.extend(giverMarker.getPosition()!)
            cluster.addMarker(giverMarker, false)
          }

          let recipMarker: google.maps.Marker | undefined = undefined
          if (entry.recipCoords) {
            recipMarker = new google.maps.Marker({
              position: entry.recipCoords,
            })
          } else {
            recipMarker = await createMarker(entry.recipCity, entry.recipState)
          }
          if (recipMarker) {
            bounds.extend(recipMarker.getPosition()!)
            cluster.addMarker(recipMarker)
          }
          if (map && bounds) {
            map.fitBounds(bounds)
          }
        }, 300 * idx)
      })
    }
    return () => {
      if (cluster) cluster.clearMarkers()
    }
  }, [entries, cluster, map])

  return (
    <div
      className='rounded-xl mt-3'
      ref={mapRef}
      style={{ height: '400px' }}
    ></div>
  )
}

export default Map
