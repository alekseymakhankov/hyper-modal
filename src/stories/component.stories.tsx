import * as React from 'react'
import { storiesOf } from '@storybook/react'
import HyperModal, { ModalStack, ModalStackProps } from '../index'
import { Wrapper } from './wrapper'
import styles from './style.scss'

const Component = () => {
  const [index, setIndex] = React.useState(0)
  return (
    <Wrapper>
      <HyperModal
        stackable
        stackableIndex={index}
        unmountOnClose
        renderOpenButton={(requestOpen: any) => (
          <button type="button" className={styles.button} onClick={requestOpen}>Open uncontrolled modal</button>
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
    </Wrapper>
  )
}

storiesOf('Modal', module)
  .add('Base', () => (
    <Component />
  ))
