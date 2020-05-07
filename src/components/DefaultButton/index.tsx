import * as React from 'react'
import styles from './style.scss'

export interface DefaultButtonProps {
  onClick?: () => void;
}

export const DefaultButton: React.FC<DefaultButtonProps> = ({ onClick }) => (
  <button type="button" className={styles.customButton} onClick={onClick}>open modal</button>
)

export default DefaultButton
