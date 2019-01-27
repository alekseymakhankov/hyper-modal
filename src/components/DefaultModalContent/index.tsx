import * as React from 'react';
import { IARIAProps } from '../../types';

import './style.scss';

export interface IDefaultModalContentProps {
  ariaEnabled?: boolean;
  ariaProps?: IARIAProps;
  handleClose: () => void;
}

export const DefaultModalContent = (props: IDefaultModalContentProps) => {
  const { ariaEnabled, ariaProps, handleClose } = props;
  const labelId = ariaEnabled && ariaProps
    ? ariaProps['aria-labelledby']
    : undefined;
  const descriptionId = ariaEnabled && ariaProps
    ? ariaProps['aria-describedby']
    : undefined;

  return (
    <div className="hyper-modal-default-content">
      <div className="title" id={labelId}>Hyper modal</div>
      <div className="description" id={descriptionId}>
        Fully customizable and accessible modal
      </div>
      <button tabIndex={1} onClick={handleClose}>Close modal</button>
    </div>
  );
};
