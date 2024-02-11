import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 2, action: Action.Add })).toBe(12);
    // expect(simpleCalculator({ a: 0.2, b: 0.1, action: Action.Add })).toBe(0.3);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 2, action: Action.Subtract })).toBe(8);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 2, action: Action.Multiply })).toBe(20);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 2, action: Action.Divide })).toBe(5);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 2, action: Action.Exponentiate })).toBe(
      100,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 10, b: 2, action: '32' })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: 10, b: '12', action: Action.Add })).toBe(null);
  });
});
