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

export interface User {
  name: string
  email: string
  password: string
  linkText: string
  lat: number
  long: number
}

export interface UpdateUserErrors {
  name: string
  email: string
  password: string
  lat: string
  long: string
}

export interface Login {
  email: string
  password: string
}

export interface LoginErrors {
  email: string
  password: string
}
