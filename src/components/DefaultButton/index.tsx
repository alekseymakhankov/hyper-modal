import * as React from 'react';
import './style.scss';

export interface IDefaultButton {
  onClick?: () => void;
}

export const DefaultButton = (props: IDefaultButton) => {
  return (
    <button className="custom-button" onClick={props.onClick}>open modal</button>
  );
}

export default DefaultButton;
