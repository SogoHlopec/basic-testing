// Uncomment the code below and write your tests
import { generateLinkedList, LinkedListNode } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const values = [1, 2, 3, 4, 5];
    const linkedList: LinkedListNode<number> = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: 4,
            next: {
              value: 5,
              next: {
                value: null,
                next: null,
              },
            },
          },
        },
      },
    };
    expect(generateLinkedList(values)).toStrictEqual(linkedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const values = [1, 2, 3, 4, 5];
    const linkedList = generateLinkedList(values);
    expect(linkedList).toMatchSnapshot();
  });
});
