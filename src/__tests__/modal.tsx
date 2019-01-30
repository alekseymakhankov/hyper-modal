import * as React from 'react';
import { render } from 'react-testing-library'
import 'react-testing-library/cleanup-after-each';
import Modal from '../index';


it('renders without crashing', () => {
  const wrapper = render(<Modal isOpen={true} requestClose={() => ({})} />);
  const { getByText } = wrapper;
  expect(getByText('Hyper modal')).toBeTruthy();
});
