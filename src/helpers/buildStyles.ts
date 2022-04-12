import { IPositionProps } from '../types'
import { defaultProps } from './defaultProps'

export const buildContentStyle = (position?: IPositionProps) => {
    const defaultStyles = {
        display: 'flex',
        ...defaultProps.position
    }
    if (position) {
        return {
            ...defaultStyles,
            ...position
        }
    }
    return defaultStyles
}
