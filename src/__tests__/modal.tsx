import * as React from 'react'
import { act } from 'react-dom/test-utils'
import * as Enzyme from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import Modal from '../index'

const { mount } = Enzyme

Enzyme.configure({ adapter: new Adapter() })

it('render without crashing', () => {
  const wrapper = mount(<Modal isOpen requestClose={() => ({})} />)
  expect(wrapper.instance()).toBeDefined()
})

it('should be unmounted', () => {
  const wrapper = mount(
    <Modal
      renderOpenButton={(requestOpen) => (
        <button type="button" id="open-button" onClick={requestOpen}>open</button>
      )}
      unmountOnClose
    />,
  )
  const button = document.getElementById('open-button')
  if (button) {
    act(() => {
      button.click()
    })
  }
  expect(wrapper.instance()).toBeDefined()
  wrapper.unmount()
  expect(wrapper).toMatchObject({})
})

it('should afterClose should be executed', () => {
  const afterClose = jest.fn()
  const wrapper = mount(
    <Modal isOpen requestClose={() => ({})} afterClose={afterClose} />,
  )
  const icon = wrapper.find('div[data-name="close-icon"]')
  expect(icon).toBeDefined()
  const handler = icon.first().prop('onClick')
  if (handler) {
    act(() => {
      handler({} as any)
    })
  }
  expect(afterClose).toBeCalled()
})

it('should beforeClose should be executed', () => {
  const beforeClose = jest.fn()
  const wrapper = mount(
    <Modal isOpen requestClose={() => ({})} beforeClose={beforeClose} />,
  )
  const icon = wrapper.find('div[data-name="close-icon"]')
  expect(icon).toBeDefined()
  const handler = icon.first().prop('onClick')
  if (handler) {
    act(() => {
      handler({} as any)
    })
  }
  expect(beforeClose).toBeCalled()
})

it('should be closed by timeout', async () => {
  const beforeClose = jest.fn()
  const afterClose = jest.fn()
  const wrapper = mount(
    <Modal
      isOpen
      requestClose={() => ({})}
      afterClose={afterClose}
      beforeClose={beforeClose}
      closeDebounceTimeout={1000}
      portalMode
    />,
  )
  const icon = wrapper.find('div[data-name="close-icon"]')
  expect(icon).toBeDefined()
  const handler = icon.first().prop('onClick')
  if (handler) {
    await act(async () => {
      await handler({} as any)
    })
    expect(beforeClose).toBeCalled()
    expect(afterClose).toBeCalled()
  }
})
