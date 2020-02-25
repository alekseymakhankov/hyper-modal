import * as React from 'react'
import styles from './style.scss'

export const Wrapper = ({ children }: any) => (
  <div className={styles.wrapper}>{children}</div>
)
