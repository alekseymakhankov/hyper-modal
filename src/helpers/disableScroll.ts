import styles from '../style.scss'

export const disableScroll = (disable = false) => {
  if (disable) {
    document.documentElement.classList.add(styles.bodyNoscroll)
    document.body.classList.add(styles.bodyNoscroll)
  } else {
    document.documentElement.classList.remove(styles.bodyNoscroll)
    document.body.classList.remove(styles.bodyNoscroll)
  }
}
