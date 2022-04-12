import * as React from 'react'
import HyperModal, { ModalStack, ModalStackProps } from '../index'

export const Modal = () => {
    const [index, setIndex] = React.useState(0)
    return (
        <HyperModal
            stackable
            stackableIndex={index}
            unmountOnClose
            renderOpenButton={(requestOpen: any) => (
                <button type="button" onClick={requestOpen}>
                    Open uncontrolled modal
                </button>
            )}
            stackContentSettings={{
                topOffsetRatio: 10
            }}
        >
            {(props: ModalStackProps) => (
                <ModalStack {...props}>
                    <div style={{ color: 'red' }}>
                        <div>1</div>
                        <button onClick={() => setIndex(1)}>open nested</button>
                        <button onClick={() => props.handleClose()}>close</button>
                    </div>
                    <div>
                        <div>2</div>
                        <button onClick={() => setIndex(2)}>open nested</button>
                        <button onClick={() => setIndex(0)}>close nested</button>
                        <button>close</button>
                    </div>
                    <div>
                        <div>3</div>
                        <button onClick={() => setIndex(1)}>close nested</button>
                        <button onClick={() => props.handleClose()}>close</button>
                    </div>
                </ModalStack>
            )}
        </HyperModal>
    )
}
