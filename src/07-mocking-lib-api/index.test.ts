import axios from 'axios';
import { throttledGetDataFromApi } from './index';
import { throttle } from 'lodash';

jest.mock('axios');

jest.mock('lodash', () => {
  const originalModule = jest.requireActual<typeof import('lodash')>('lodash');

  return {
    ...originalModule,
    throttle: jest
      .fn()
      .mockImplementation((func) => async (relativePath: string) => {
        return func(relativePath);
      }),
  };
});

describe('throttledGetDataFromApi', () => {
  xtest('should create instance with provided base url', async () => {
    throttledGetDataFromApi('relative/path');

    expect(throttle).toHaveBeenCalledWith('relative/path');
  });

  test('should perform request to correct provided url', async () => {
    const mockResponse = { data: [] };
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue(mockResponse),
    });

    await throttledGetDataFromApi('/relative/path');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
    expect(axios.create().get).toHaveBeenCalledWith('/relative/path');
  });

  test('should return response data', async () => {
    const mockResponse = { data: [] };
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await throttledGetDataFromApi('/relative/path');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
    expect(result).toEqual([]);
  });
});
