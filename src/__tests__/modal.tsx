import * as React from 'react';
import { render, fireEvent } from 'react-testing-library'
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
console.log('FIREEVENT', fireEvent);
import 'react-testing-library/cleanup-after-each';
import Modal from '../index';

const { mount } = Enzyme;

Enzyme.configure({adapter: new Adapter()});

it('renders without crashing', () => {
  const wrapper = render(<Modal isOpen={true} requestClose={() => ({})} />);
  const { getByText } = wrapper;
  expect(getByText('Hyper modal')).toBeTruthy();
});

it('should afterClose should be executed', () => {
  const afterClose = jest.fn();
  const wrapper = mount(
    <Modal isOpen={true} requestClose={() => ({})} afterClose={afterClose} />
  );
  const icon = wrapper.find('.hyper-close-icon-wrapper');
  expect(icon).toBeDefined();
  const handler = icon.first().prop('onClick');
  if (handler) {
    handler({} as any);
  }
  expect(afterClose).toBeCalled();
})

it('should beforeClose should be executed', () => {
  const beforeClose = jest.fn();
  const wrapper = mount(
    <Modal isOpen={true} requestClose={() => ({})} beforeClose={beforeClose} />
  );
  const icon = wrapper.find('.hyper-close-icon-wrapper');
  expect(icon).toBeDefined();
  const handler = icon.first().prop('onClick');
  if (handler) {
    handler({} as any);
  }
  expect(beforeClose).toBeCalled();
})

it('should be closed by timeout', async () => {
  const beforeClose = jest.fn();
  const afterClose = jest.fn();
  const wrapper = mount(
    <Modal
      isOpen={true}
      requestClose={() => ({})}
      afterClose={afterClose}
      beforeClose={beforeClose}
      closeDebounceTimeout={1000}
    />
  );
  const icon = wrapper.find('.hyper-close-icon-wrapper');
  expect(icon).toBeDefined();
  const handler = icon.first().prop('onClick');
  if (handler) {
    await handler({} as any);
    expect(beforeClose).toBeCalled();
    expect(afterClose).toBeCalled();
  }
})
