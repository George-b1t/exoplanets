import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { LinearProgress } from '@mui/material'

interface LoadingProps {
  label?: string
}

export function Loading({ label }: LoadingProps) {
  const [dots, setDots] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((dots) => (dots + 1) % 4)
    }, 300)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>
          {label || 'Loading'}
          {Array(dots).fill('.')}
        </h1>
      </div>

      <LinearProgress />
    </div>
  )
}
