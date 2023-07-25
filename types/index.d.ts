export interface Register {
  name: string
  email: string
  password: string
  confirmPassword: string
  lat: number
  long: number
  peerage?: string
  phone?: string
  facebook?: string
  twitter?: string
  instagram?: string
  linkedin?: string
  youtube?: string
  nasocial?: string
  website?: string
}

export interface RegisterErrors {
  name: string
  email: string
  password: string
  confirmPassword: string
  lat: string
  long: string
  peerage: string
  phone: string
  facebook: string
  twitter: string
  instagram: string
  linkedin: string
  youtube: string
  nasocial: string
  website: string
}

export interface Update {
  name: string
  email: string
  password: string
  newPassword: string
  confirmNewPassword: string
  linkText: string
  lat: number
  long: number
  peerage?: string
  phone?: string
  facebook?: string
  twitter?: string
  instagram?: string
  linkedin?: string
  youtube?: string
  nasocial?: string
  website?: string
}

export interface User {
  name: string
  email: string
  password: string
  linkText: string
  lat: number
  long: number
  peerage?: string
  phone?: string
  facebook?: string
  twitter?: string
  instagram?: string
  linkedin?: string
  youtube?: string
  nasocial?: string
  website?: string
}

export interface UpdateUserErrors {
  name: string
  email: string
  password: string
  linkText: string
  lat: string
  long: string
  peerage: string
  phone: string
  facebook: string
  twitter: string
  instagram: string
  linkedin: string
  youtube: string
  nasocial: string
  website: string
}

export interface Login {
  email: string
  password: string
}

export interface LoginErrors {
  email: string
  password: string
}
