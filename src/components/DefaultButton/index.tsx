import * as React from 'react'
import styles from './style.scss'

export interface IDefaultButton {
  onClick?: () => void;
}

export const DefaultButton = ({ onClick }: IDefaultButton) => (
  <button type="button" className={styles.customButton} onClick={onClick}>open modal</button>
)

export default DefaultButton
