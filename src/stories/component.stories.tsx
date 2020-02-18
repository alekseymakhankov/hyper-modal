import * as React from 'react'
import { storiesOf } from '@storybook/react'
import HyperModal from '../index'

const Component = () => (
  <HyperModal
    renderOpenButton={(requestOpen: any) => {
      return (
        <button onClick={requestOpen}>Open uncontrolled modal</button>
      );
    }}
  />
)

storiesOf('Modal', module)
  .add('Base', () => {
    return (
      <Component />
    )
  })
