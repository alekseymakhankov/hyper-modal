import * as React from 'react'
import { act } from 'react-dom/test-utils'
import * as Enzyme from 'enzyme'
import * as Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import Modal, { ModalStack } from '../index'

const { mount } = Enzyme

Enzyme.configure({ adapter: new Adapter() })

it('render without crashing', () => {
    const wrapper = mount(<Modal isOpen requestClose={() => ({})} />)
    expect(wrapper.instance()).toBeDefined()
})

it('should be unmounted', () => {
    const wrapper = mount(
        <Modal
            closeOnEscClick
            renderOpenButton={requestOpen => (
                <button type="button" id="open-button" onClick={requestOpen}>
                    open
                </button>
            )}
            unmountOnClose
        />
    )
    const button = document.getElementById('open-button')
    if (button) {
        act(() => {
            button.click()
        })
    }
    wrapper.simulate('keyDown', { key: 'Escape' })
    expect(wrapper.instance()).toBeDefined()
    wrapper.unmount()
    expect(wrapper).toMatchObject({})
})

it('should afterClose should be executed', () => {
    const afterClose = jest.fn()
    const wrapper = mount(
        <Modal
            renderOpenButton
            isOpen
            requestClose={() => ({})}
            closeIconPosition={{ vertical: 'bottom', horizontal: 'center' }}
            afterClose={afterClose}
        />
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
    const wrapper = mount(<Modal isOpen requestClose={() => ({})} beforeClose={beforeClose} />)
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
        />
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

it('render stack without crashing', () => {
    const wrapper = mount(
        <Modal
            isOpen
            stackable
            classes={{ contentClassName: 'className' }}
            unmountOnClose
            renderOpenButton={requestOpen => (
                <button type="button" onClick={requestOpen}>
                    Open stack modal
                </button>
            )}
        >
            {props => (
                <ModalStack {...props}>
                    <div>
                        <div>1</div>
                    </div>
                    <div>
                        <div>2</div>
                        <button>close</button>
                    </div>
                    <div>
                        <div>3</div>
                    </div>
                </ModalStack>
            )}
        </Modal>
    )

    expect(wrapper.instance()).toBeDefined()
})
