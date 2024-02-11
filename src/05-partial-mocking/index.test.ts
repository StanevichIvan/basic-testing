// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';
import spyOn = jest.spyOn;

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const consoleSpy = spyOn(console, 'log');
    mockOne();
    mockTwo();
    mockThree();

    expect(consoleSpy).not.toBeCalled();
  });

  test('unmockedFunction should log into console', () => {
    const consoleSpy = spyOn(console, 'log').mockImplementationOnce(jest.fn());
    unmockedFunction();

    expect(consoleSpy).toBeCalled();
  });
});
