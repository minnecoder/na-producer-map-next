export interface Register {
  name: string
  email: string
  password: string
  confirmPassword: string
  lat: number
  long: number
}

export interface RegisterErrors {
  name: string
  email: string
  password: string
  confirmPassword: string
  lat: string
  long: string
}
