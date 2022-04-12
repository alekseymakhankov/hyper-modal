import * as React from 'react'
import { classnames } from '../../helpers'
import { ModalStackProps } from '../../types'
import styles from './style.scss'

export const ModalStack: React.FC<ModalStackProps> = ({
    children,
    classes,
    closeIcon,
    getProps,
    handleClose,
    isFullscreen,
    modalContentRef,
    stackableIndex = 0,
    ...props
}) => (
    <div {...props} className={styles.stackWrapper}>
        {React.Children.toArray(children)
            .slice(0, stackableIndex + 1)
            .map((child: React.ReactElement, index, array) => (
                <div
                    key={`content-${index}`}
                    data-type="hyper-modal-content"
                    {...getProps(index, child.props, array.length)}
                    className={classnames({
                        [styles.hyperModalContentWrapper]: true,
                        fullscreen: isFullscreen || false,
                        [(classes && classes.contentClassName) || '']: true
                    })}
                    ref={modalContentRef}
                >
                    {child}
                    {closeIcon}
                </div>
            ))}
    </div>
)
