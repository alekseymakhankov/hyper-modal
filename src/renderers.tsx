import * as React from 'react'
import { DefaultButton, DefaultCloseIcon } from './components'
import { classnames } from './helpers'
import { IClassNamesProps, ICloseIconPosition } from './types'
import styles from './style.scss'

export type RenderButtonProps = {
  renderOpenButton?: boolean | ((requestOpen: () => void) => JSX.Element | string);
  open: () => void;
}

export type RenderCloseIcon = {
  classes?: IClassNamesProps;
  renderCloseIconProp?: () => JSX.Element | null | string;
  closeOnCloseIconClick?: boolean;
  closeIconPosition?: ICloseIconPosition;
  close: () => void;
}

export type RenderDimmer = {
  classes?: IClassNamesProps;
  closeOnDimmerClick?: boolean;
  close: () => void;
}

export const renderButton = ({ renderOpenButton, open }: RenderButtonProps) => {
  if (renderOpenButton) {
    if (typeof renderOpenButton === 'boolean') {
      return (
        <DefaultButton onClick={open} />
      )
    }
    return renderOpenButton(open)
  }
  return (null)
}

export const renderCloseIcon = ({
  classes,
  renderCloseIconProp,
  closeOnCloseIconClick,
  closeIconPosition,
  close,
}: RenderCloseIcon) => {
  const iconClassNames = closeIconPosition
    ? classnames(
      styles.hyperCloseIconWrapper,
      closeIconPosition.horizontal,
      closeIconPosition.vertical,
    )
    : styles.hyperCloseIconWrapper
  return (
    <div
      data-name="close-icon"
      className={classnames(iconClassNames, classes && classes.closeIconClassName)}
      onClick={closeOnCloseIconClick ? close : undefined}
    >
      {renderCloseIconProp ? renderCloseIconProp() : (<DefaultCloseIcon />)}
    </div>
  )
}

export const renderDimmer = ({
  classes,
  closeOnDimmerClick,
  close,
}: RenderDimmer) => (
  <div
    className={
      classnames(styles.hyperDimmerWrapper, classes && classes.dimmerClassName)
    }
    onClick={closeOnDimmerClick ? close : undefined}
  />
)
