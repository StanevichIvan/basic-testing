import {
  throwError,
  resolveValue,
  throwCustomError,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const result = await resolveValue('test');

    expect(result).toBe('test');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError('test')).toThrowError(new Error('test'));
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow(new Error('Oops!'));
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrowError(new MyAwesomeError());
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect(async () => await rejectCustomError()).rejects.toThrow();
  });
});
