import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { RemoveScroll } from 'react-remove-scroll'
import { DefaultModalContent } from './components'
import {
  buildContentStyle,
  classnames,
  createElement,
  defaultProps,
  defferCall,
} from './helpers'
import { renderButton, renderCloseIcon, renderDimmer } from './renderers'
import { IModalProps } from './types'
import styles from './style.scss'

const ESC_KEY = 27
const WRAPPER_COMPONENT_ID = 'hyper-modal-wrapper_component_id'

export const HyperModal: React.FC<IModalProps> = ({
  afterClose,
  ariaEnabled = defaultProps.ariaEnabled,
  ariaProps = defaultProps.ariaProps,
  beforeClose,
  children,
  childrenMode = defaultProps.childrenMode,
  classes,
  closeDebounceTimeout = defaultProps.closeDebounceTimeout,
  closeIconPosition = defaultProps.closeIconPosition,
  closeOnCloseIconClick = defaultProps.closeOnCloseIconClick,
  closeOnDimmerClick = defaultProps.closeOnDimmerClick,
  closeOnEscClick = defaultProps.closeOnEscClick,
  dimmerEnabled = defaultProps.dimmerEnabled,
  disableScroll = defaultProps.disableScroll,
  isFullscreen = defaultProps.isFullscreen,
  isOpen,
  modalContentRef,
  modalWrapperRef,
  portalMode = defaultProps.portalMode,
  portalNode,
  position = defaultProps.position,
  renderCloseIcon: renderCloseIconProp,
  renderContent,
  renderOpenButton,
  requestClose,
  stackable = defaultProps.stackable,
  stackableIndex = defaultProps.stackableIndex,
  stackContentSettings = defaultProps.stackContentSettings,
  unmountOnClose,
}) => {
  const [isInnerOpen, setInnerOpen] = React.useState<boolean>(isOpen || false)

  React.useEffect(() => {
    if (typeof isOpen !== 'undefined') {
      setInnerOpen(isOpen)
    }
  }, [isOpen])

  const openModal = React.useCallback(() => {
    setInnerOpen(true)
  }, [])

  const closeModal = React.useCallback(() => {
    setInnerOpen(false)
  }, [])

  const handleAfterClose = React.useCallback(() => {
    if (afterClose) {
      afterClose()
    }
  }, [afterClose])

  const handleClose = React.useCallback(() => {
    if (beforeClose) {
      beforeClose()
    }
    if (closeDebounceTimeout) {
      return defferCall(
        () => {
          closeModal()
          if (requestClose) {
            requestClose()
          }
          handleAfterClose()
        },
        closeDebounceTimeout,
      )
    }
    closeModal()
    if (requestClose) {
      requestClose()
    }
    handleAfterClose()
    return true
  }, [beforeClose, closeDebounceTimeout, closeModal, handleAfterClose, requestClose])

  const handleKeyDown = React.useCallback((event: KeyboardEvent) => {
    if (closeOnEscClick && event.keyCode === ESC_KEY && isInnerOpen) {
      event.stopPropagation()
      handleClose()
    }
  }, [closeOnEscClick, handleClose, isInnerOpen])

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])


  const renderModalContent = React.useCallback(() => {
    let content = null

    if (childrenMode) {
      content = children
    } else if (renderContent) {
      content = renderContent()
    }

    return (
      <div
        className={
          classnames({
            [styles.hyperModalContentWrapper]: true,
            fullscreen: isFullscreen || false,
            [(classes && classes.contentClassName) || '']: true,
          })
        }
        ref={modalContentRef}
      >
        {content || (
          <DefaultModalContent
            ariaProps={ariaProps}
            ariaEnabled={ariaEnabled}
            handleClose={handleClose}
          />
        )}
        {renderCloseIcon({
          classes,
          closeOnCloseIconClick,
          closeIconPosition,
          close: handleClose,
          renderCloseIconProp,
        })}
      </div>
    )
  }, [
    ariaEnabled,
    ariaProps,
    children,
    childrenMode,
    classes,
    closeIconPosition,
    closeOnCloseIconClick,
    handleClose,
    isFullscreen,
    modalContentRef,
    renderCloseIconProp,
    renderContent,
  ])

  const getProps = React.useCallback((index, props, length) => {
    const {
      widthRatio = defaultProps.stackContentSettings.widthRatio,
      topOffsetRatio = defaultProps.stackContentSettings.topOffsetRatio,
      transition = defaultProps.stackContentSettings.transition,
      opacityRatio = defaultProps.stackContentSettings.opacityRatio,
    } = stackContentSettings
    return {
      ...props,
      style: {
        transition,
        width: `${100 - (length - index - 1) * widthRatio}%`,
        top: `${0 - (length - index - 1) * topOffsetRatio}%`,
        opacity: 1 - (length - index - 1) * opacityRatio,
        zIndex: 1000 - (length - index - 1) * 10,
      },
    }
  }, [])

  const renderStackModalWrapper = React.useCallback(() => {
    if (children) {
      const closeIcon = renderCloseIcon({
        classes,
        closeOnCloseIconClick,
        closeIconPosition,
        close: handleClose,
        renderCloseIconProp,
      })
      return (children as any)({
        classes,
        closeIcon,
        getProps,
        handleClose,
        isFullscreen,
        modalContentRef,
        stackableIndex,
      })
    }

    return null
  }, [
    children,
    classes,
    closeIconPosition,
    closeOnCloseIconClick,
    getProps,
    handleClose,
    isFullscreen,
    modalContentRef,
    renderCloseIconProp,
    stackableIndex,
  ])

  const renderModalWrapper = React.useCallback(() => (
    <RemoveScroll forwardProps enabled={disableScroll && isInnerOpen}>
      <div
        id={WRAPPER_COMPONENT_ID}
        className={
          classnames({
            [styles.hyperModalWrapper]: true,
            [styles.visible]: isInnerOpen,
            [(classes && classes.wrapperClassName) || '']: true,
          })
        }
        ref={modalWrapperRef}
        style={buildContentStyle(position)}
      >
        {dimmerEnabled && renderDimmer({
          classes,
          closeOnDimmerClick,
          close: handleClose,
        })}
        {stackable ? renderStackModalWrapper() : renderModalContent()}
      </div>
    </RemoveScroll>
  ), [
    disableScroll,
    classes,
    closeOnDimmerClick,
    dimmerEnabled,
    handleClose,
    isInnerOpen,
    modalWrapperRef,
    position,
    renderModalContent,
    renderStackModalWrapper,
    stackable,
  ])

  const renderModal = React.useCallback(() => {
    if (!isInnerOpen && unmountOnClose) {
      return (null)
    }
    if (portalMode && ReactDOM.createPortal) {
      const node = portalNode || createElement(classes && classes.portalWrapperClassName)
      return ReactDOM.createPortal(
        renderModalWrapper(),
        node,
      )
    }
    return renderModalWrapper()
  }, [
    classes,
    isInnerOpen,
    portalMode,
    portalNode,
    renderModalWrapper,
    unmountOnClose,
  ])

  return (
    <>
      {renderButton({ renderOpenButton, open: openModal })}
      {renderModal()}
    </>
  )
}
