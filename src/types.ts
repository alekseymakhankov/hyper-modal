import * as React from 'react'

export type TModalPosition = 'flex-start' | 'center' | 'flex-end';
export type THorizontalPosition = 'left' | 'center' | 'right';
export type TVerticalPosition = 'top' | 'middle' | 'bottom';
export type StackContentSettings = {
  widthRatio?: number;
  topOffsetRatio?: number;
  opacityRatio?: number;
  transition?: string;
}

export interface IClassNamesProps {
  closeIconClassName?: string;
  contentClassName?: string;
  dimmerClassName?: string;
  portalWrapperClassName?: string;
  wrapperClassName?: string;
}

export interface IARIAProps {
  'aria-describedby'?: string;
  'aria-labelledby'?: string;
  role?: string;
}

export interface IPositionProps {
  alignItems?: TModalPosition;
  justifyContent?: TModalPosition;
}

export interface ICloseIconPosition {
  horizontal?: THorizontalPosition;
  vertical?: TVerticalPosition;
}

export interface IModalProps {
  afterClose?: () => void;
  ariaEnabled?: boolean;
  ariaProps?: IARIAProps;
  beforeClose?: () => void;
  children?: React.ReactNode | ((props: ModalStackProps) => any);
  childrenMode?: boolean;
  classes?: IClassNamesProps;
  closeDebounceTimeout?: number;
  closeIconPosition?: ICloseIconPosition;
  closeOnCloseIconClick?: boolean;
  closeOnDimmerClick?: boolean;
  closeOnEscClick?: boolean;
  dimmerEnabled?: boolean;
  disableScroll?: boolean;
  isFullscreen?: boolean;
  isOpen?: boolean;
  modalContentRef?: React.RefObject<HTMLDivElement>;
  modalWrapperRef?: React.RefObject<HTMLDivElement>;
  portalMode?: boolean;
  portalNode?: HTMLElement;
  position?: IPositionProps;
  renderCloseIcon?: () => JSX.Element | null | string;
  renderContent?: () => JSX.Element | JSX.Element[] | null | string;
  renderOpenButton?: boolean | ((requestOpen: () => void) => JSX.Element | string);
  requestClose?: () => void;
  stackable?: boolean;
  stackableIndex?: number;
  stackContentSettings?: StackContentSettings;
  unmountOnClose?: boolean;
}

export interface ModalStackProps {
  children: React.ReactElement[],
  classes?: any;
  closeIcon?: any;
  getProps: (index: number, childProps: any, childrenLength: number) => any
  handleClose: () => void
  isFullscreen?: boolean;
  modalContentRef?: any;
  stackableIndex: number,
}

export interface IModalState {
  isInnerOpen: boolean;
}
