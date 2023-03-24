import React, { useRef, useEffect } from 'react'

export function Map() {
  const mapRef = useRef(null)

  useEffect(() => {
    // Create a new map instance
    const map = new window.google.maps.Map(mapRef.current!, {
      center: { lat: 39.8097343, lng: -98.5556199 },
      zoom: 4,
    })
    const marker = new google.maps.Marker({
      position: { lat: 35.1982836, lng: -111.651302 },
      map: map,
    })
  }, [])

  return (
    <div
      className='rounded-xl mt-3'
      ref={mapRef}
      style={{ height: '400px' }}
    ></div>
  )
}

export default Map
