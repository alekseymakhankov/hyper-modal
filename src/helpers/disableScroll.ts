export const disableScroll = (disable = false) => {
  if (disable) {
    document.documentElement.classList.add('body-noscroll')
    document.body.classList.add('body-noscroll')
  } else {
    document.documentElement.classList.remove('body-noscroll')
    document.body.classList.remove('body-noscroll')
  }
}
