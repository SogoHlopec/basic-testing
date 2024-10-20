// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Add })).toBe(3);
    expect(simpleCalculator({ a: 1, b: -1, action: Action.Add })).toBe(0);
    expect(
      simpleCalculator({ a: 1.1, b: 1.1, action: Action.Add }),
    ).toBeCloseTo(2.2);
  });

  test('should subtract two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a: 2, b: 1, action: Action.Subtract })).toBe(1);
    expect(simpleCalculator({ a: 2, b: -1, action: Action.Subtract })).toBe(3);
    expect(
      simpleCalculator({ a: 2.2, b: 1.1, action: Action.Subtract }),
    ).toBeCloseTo(1.1);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Multiply })).toBe(4);
    expect(simpleCalculator({ a: 2, b: -1, action: Action.Multiply })).toBe(-2);
    expect(
      simpleCalculator({ a: 2.2, b: 1.1, action: Action.Multiply }),
    ).toBeCloseTo(2.42);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 4, b: 2, action: Action.Divide })).toBe(2);
    expect(simpleCalculator({ a: 4, b: -2, action: Action.Divide })).toBe(-2);
    expect(
      simpleCalculator({ a: 2.42, b: 1.1, action: Action.Divide }),
    ).toBeCloseTo(2.2);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate })).toBe(
      8,
    );
    expect(simpleCalculator({ a: -2, b: 4, action: Action.Exponentiate })).toBe(
      16,
    );
    expect(simpleCalculator({ a: -2, b: 3, action: Action.Exponentiate })).toBe(
      -8,
    );
    expect(
      simpleCalculator({ a: 2, b: -4, action: Action.Exponentiate }),
    ).toBeCloseTo(0.0625);
    expect(
      simpleCalculator({ a: 2, b: -3, action: Action.Exponentiate }),
    ).toBeCloseTo(0.125);
    expect(
      simpleCalculator({ a: 1.1, b: 2, action: Action.Exponentiate }),
    ).toBeCloseTo(1.21);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: '' })).toBeNull();
    expect(simpleCalculator({ a: 1, b: 2, action: 'xxx' })).toBeNull();
    expect(simpleCalculator({ a: 1, b: 2, action: 2 })).toBeNull();
    expect(simpleCalculator({ a: 1, b: 2, action: Action })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    // Write your test here
    expect(simpleCalculator({ a: '1', b: 2, action: Action.Add })).toBeNull();
    expect(simpleCalculator({ a: '', b: 2, action: Action.Add })).toBeNull();
    expect(simpleCalculator({ a: true, b: 2, action: Action.Add })).toBeNull();
    expect(simpleCalculator({ a: 1, b: [1], action: Action.Add })).toBeNull();
  });
});
