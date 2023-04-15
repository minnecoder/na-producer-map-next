import { RegisterErrors } from '../../types'

export const checkRegister = (values: any) => {
  const errors: any = {}
  if (!values.name) {
    errors.name = 'Name is required'
  }
  if (!values.email) {
    errors.email = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email is invalid'
  }
  if (!values.password) {
    errors.password = 'Password is required'
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm password is required'
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords must match'
  }

  Object.keys(errors).forEach((key) => {
    if (errors[key as keyof RegisterErrors] === '') {
      delete errors[key as keyof RegisterErrors]
    }
  })

  return errors
}
