import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import { join } from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

jest.mock('path', () => ({
  join: jest.fn(),
}));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers({ legacyFakeTimers: true });
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const cb = jest.fn();
    doStuffByTimeout(cb, 100);

    expect(global.setTimeout).toHaveBeenCalledWith(cb, 100);
  });

  xtest('should call callback only after timeout', () => {
    const cb = jest.fn();
    doStuffByTimeout(cb, 100);

    expect(cb).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);

    expect(cb).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  let intervalMock: jest.SpyInstance;
  beforeAll(() => {
    jest.useFakeTimers();
    intervalMock = jest.spyOn(global, 'setInterval');
  });

  afterAll(() => {
    jest.useRealTimers();
    intervalMock.mockClear();
  });

  xtest('should set interval with provided callback and timeout', () => {
    const cb = jest.fn();
    doStuffByInterval(cb, 100);

    expect(intervalMock).toHaveBeenCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();
    doStuffByInterval(cb, 100);

    expect(cb).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);
    expect(cb).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(100);
    expect(cb).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const filePath = 'test.txt';
    (join as jest.Mock).mockReturnValue('/path/test.txt');

    await readFileAsynchronously(filePath);

    expect(join).toHaveBeenCalledWith(__dirname, filePath);
  });

  test('should return null if file does not exist', async () => {
    const filePath = 'nonexistent.txt';
    (join as jest.Mock).mockReturnValue('/path/test.txt');
    (existsSync as jest.Mock).mockReturnValue(false);

    const result = await readFileAsynchronously(filePath);

    expect(result).toBeNull();
    expect(existsSync).toHaveBeenCalledWith(expect.any(String));
  });

  test('should return file content if file exists', async () => {
    const mockPath = 'test.txt';
    (join as jest.Mock).mockReturnValue('/path/test.txt');
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockReturnValue(
      Promise.resolve('Mocked File Content'),
    );

    const result = await readFileAsynchronously(mockPath);

    expect(result).toBe('Mocked File Content');
    expect(existsSync).toHaveBeenCalled();
    expect(readFile).toHaveBeenCalled();
  });
});
