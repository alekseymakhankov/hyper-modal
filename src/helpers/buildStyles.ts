import { IPositionProps } from '../types';
import { defaultProps } from './defaultProps';

export const buildContentStyle = (position?: IPositionProps) => {
  if (position) {
    const style = Object.assign(
      {},
      { display: 'flex' },
      { ...defaultProps.position },
      { ...position },
    );
    return style;
  }
  return {};
}
