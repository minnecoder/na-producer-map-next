import React, { FC, InputHTMLAttributes } from 'react'
import styles from './TextInput.module.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  placeholder?: string
  error: string
}

const TextInput: FC<InputProps> = ({
  label,
  name,
  placeholder,
  error,
  ...rest
}) => {
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
