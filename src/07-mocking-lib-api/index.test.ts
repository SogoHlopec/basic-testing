// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: (fn: void) => fn,
}));

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const mock = axios.create as jest.Mock;

    mock.mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: {} }),
    });
    await throttledGetDataFromApi('/posts/1');
    expect(mock).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mock = axios.create as jest.Mock;
    const mockCreateClient = {
      get: jest.fn().mockResolvedValue({ data: {} }),
    };

    mock.mockReturnValue(mockCreateClient);
    await throttledGetDataFromApi('/posts/1');
    expect(mockCreateClient.get).toHaveBeenCalledWith('/posts/1');
  });

  test('should return response data', async () => {
    const mock = axios.create as jest.Mock;
    const mockCreateClient = {
      get: jest.fn().mockResolvedValue({ data: {} }),
    };

    mock.mockReturnValue(mockCreateClient);
    const responseData = await throttledGetDataFromApi('/posts/1');
    expect(responseData).toStrictEqual({});
  });
});
