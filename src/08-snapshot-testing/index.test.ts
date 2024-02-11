import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const initialArray = Array.from({ length: 2 }, () => 1);

    expect(generateLinkedList(initialArray)).toStrictEqual({
      next: { next: { next: null, value: null }, value: 1 },
      value: 1,
    });
  });

  test('should generate linked list from values 2', () => {
    const initialArray = Array.from({ length: 2 }, () => 2);

    expect(generateLinkedList(initialArray)).toMatchSnapshot();
  });
});
