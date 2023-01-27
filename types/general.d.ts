export type SignUpParams = {
  email: string
  password: string
  given_name: string
  family_name: string
}

export type AddCodeForm = {
  bagId: string
  giverFN: string
  giverCity: string
  giverState: string
  recipFN: string
  recipCity: string
  recipState: string
  occasion: string
  gift: string
  comment: string
}
