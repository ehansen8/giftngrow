export type SignUpParams = {
  email: string
  password: string
  given_name: string
  family_name: string
}
export type Coords = google.maps.LatLngLiteral | undefined

export type AddCodeForm = {
  code: string
  giverFN: string
  giverCity: string
  giverState: string
  giverCoords: Coords
  recipFN: string
  recipCity: string
  recipState: string
  recipCoords: Coords
  occasion: string
  gift: string
  comment: string
}

export type ApiRes<T> = {
  ok: boolean
  error: string
  data: T | ''
}
