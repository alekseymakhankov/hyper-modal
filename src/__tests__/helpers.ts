import {
  buildContentStyle,
  createElement,
  defferCall,
  defaultProps,
} from '../helpers';
import { IPositionProps } from '../types';

it('should generate correct styles', () => {
  const { position: defaultPosition } = defaultProps;
  const position: IPositionProps = {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  };

  expect(buildContentStyle).toBeInstanceOf(Function);

  expect(buildContentStyle()).toMatchObject(defaultPosition);

  expect(buildContentStyle({})).toMatchObject(defaultPosition);

  const styles = buildContentStyle(position);
  expect(styles).toMatchObject({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  });
})

it('should create correct node', () => {
  const node = createElement();
  expect(node).toBeInstanceOf(HTMLDivElement);
  expect(node.id).toEqual('hyper-modal-portal-id');
  let isHasNode = document.body.contains(node);
  expect(isHasNode).toBeTruthy();
  const nodeWithClassName = createElement('class-name');
  expect(nodeWithClassName).toBeInstanceOf(HTMLDivElement);
  expect(nodeWithClassName.id).toEqual('hyper-modal-portal-id');
  expect(nodeWithClassName.classList.contains('class-name')).toBeTruthy();
  isHasNode = document.body.contains(nodeWithClassName);
  expect(isHasNode).toBeTruthy();
})

it('should correct call deffer function', async () => {
  const func = jest.fn();
   await defferCall(func);
   expect(func).toBeCalled();
})
