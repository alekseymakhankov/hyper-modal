import * as React from 'react'
import { storiesOf } from '@storybook/react'
import HyperModal from '../index'
import { Wrapper } from './wrapper'
import styles from './style.scss'

const Component = () => (
  <Wrapper>
    <HyperModal
      renderOpenButton={(requestOpen: any) => (
        <button type="button" className={styles.button} onClick={requestOpen}>Open uncontrolled modal</button>
      )}
    />
  </Wrapper>
)

storiesOf('Modal', module)
  .add('Base', () => (
    <Component />
  ))
