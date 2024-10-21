// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 1, b: -1, action: Action.Add, expected: 0 },
  { a: 1.1, b: 1.1, action: Action.Add, expected: 2.2 },
  { a: 2, b: 1, action: Action.Subtract, expected: 1 },
  { a: 2, b: -1, action: Action.Subtract, expected: 3 },
  { a: 2.2, b: 1.1, action: Action.Subtract, expected: 1.1 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 2, b: -1, action: Action.Multiply, expected: -2 },
  { a: 2.2, b: 1.1, action: Action.Multiply, expected: 2.42 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 4, b: -2, action: Action.Divide, expected: -2 },
  { a: 2.42, b: 1.1, action: Action.Divide, expected: 2.2 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: -2, b: 4, action: Action.Exponentiate, expected: 16 },
  { a: -2, b: 3, action: Action.Exponentiate, expected: -8 },
  { a: 2, b: -4, action: Action.Exponentiate, expected: 0.0625 },
  { a: 2, b: -3, action: Action.Exponentiate, expected: 0.125 },
  { a: 1.1, b: 2, action: Action.Exponentiate, expected: 1.21 },
  { a: 1, b: 2, action: '', expected: null },
  { a: 1, b: 2, action: 'xxx', expected: null },
  { a: 1, b: 2, action: 2, expected: null },
  { a: 1, b: 2, action: Action, expected: null },
  { a: '1', b: 2, action: Action.Add, expected: null },
  { a: '', b: 2, action: Action.Add, expected: null },
  { a: true, b: 2, action: Action.Add, expected: null },
  { a: 1, b: [1], action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'simpleCalculator({$a, $b, $action})',
    ({ a, b, action, expected }) => {
      if (expected === null) {
        expect(simpleCalculator({ a, b, action })).toBeNull();
      } else if (Number.isInteger(expected)) {
        expect(simpleCalculator({ a, b, action })).toBe(expected);
      } else {
        expect(simpleCalculator({ a, b, action })).toBeCloseTo(expected);
      }
    },
  );
});
