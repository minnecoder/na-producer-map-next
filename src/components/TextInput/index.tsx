import { InputHTMLAttributes } from 'react'
import styles from './TextInput.module.css'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  error: string
  placeholder?: string
}

function TextInput({
  label,
  name,
  error,
  placeholder,
  ...rest
}: TextInputProps) {
  return (
    <div className={styles.container}>
      <label htmlFor={name}>
        {label}

        <input
          type="text"
          className={error ? styles.error : styles.input}
          name={name}
          id={name}
          placeholder={placeholder}
          {...rest}
        />
        <div>
          <span className={styles.inputError}>{error}</span>
        </div>
      </label>
    </div>
  )
}

export default TextInput
