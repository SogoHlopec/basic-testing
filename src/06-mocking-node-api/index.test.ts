// Uncomment the code below and write your tests
import * as path from 'path';
import * as fs from 'fs';
import * as fsPromises from 'fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

jest.mock('path');
jest.mock('fs');
jest.mock('fs/promises');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    const mock = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);
    expect(mock).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const interval = 1000;
    const mock = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, interval);
    expect(mock).toHaveBeenCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000;
    jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, interval);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(interval * 3);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'test.txt';
    const mock = path.join as jest.Mock;

    mock.mockReturnValue('fullPath');
    await readFileAsynchronously(pathToFile);
    expect(mock).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'test.txt';
    const mock = fs.existsSync as jest.Mock;

    mock.mockReturnValue(false);
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'test.txt';
    const content = '12345';
    const mockExist = fs.existsSync as jest.Mock;
    const mockRead = fsPromises.readFile as jest.Mock;

    mockExist.mockReturnValue(true);
    mockRead.mockResolvedValue(content);
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBe(content);
  });
});
