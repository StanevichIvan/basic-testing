import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 10, b: 2, action: Action.Multiply, expected: 20 },
  { a: 10, b: 2, action: Action.Subtract, expected: 8 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 10, b: 2, action: Action.Exponentiate, expected: 100 },
  { a: 10, b: 2, action: '32', expected: null },
  { a: 10, b: '12', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  describe.each(testCases)(
    'should correctly calculate %a %acton %b',
    ({ a, b, action, expected }) => {
      test(`returns ${expected}`, () => {
        expect(simpleCalculator({ a, b, action })).toBe(expected);
      });
    },
  );
});
