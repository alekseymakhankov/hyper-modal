import { IPositionProps } from '../types';
import { defaultProps } from './defaultProps';

export const buildContentStyle = (position?: IPositionProps) => {
  const defaultStyles = {
    display: 'flex',
    ...defaultProps.position,
  };
  if (position) {
    const style = Object.assign(
      {},
      defaultStyles,
      { ...position },
    );
    return style;
  }
  return defaultStyles;
}
