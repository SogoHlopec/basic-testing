// Uncomment the code below and write your tests
import lodash from 'lodash';
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(1000);
    expect(account.getBalance()).toBe(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(1000);
    expect(() => account.withdraw(2000)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account1 = getBankAccount(1000);
    const account2 = getBankAccount(1000);
    expect(() => account1.transfer(2000, account2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(1000);
    expect(() => account.transfer(500, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(1000);
    account.deposit(1000);
    expect(account.getBalance()).toBe(2000);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(1000);
    account.withdraw(500);
    expect(account.getBalance()).toBe(500);
  });

  test('should transfer money', () => {
    const account1 = getBankAccount(1000);
    const account2 = getBankAccount(1000);
    account1.transfer(500, account2);
    expect(account1.getBalance()).toBe(500);
    expect(account2.getBalance()).toBe(1500);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(1000);
    lodash.random = jest.fn(() => 1).mockImplementationOnce(() => 50);
    const balance = await account.fetchBalance();
    expect(balance).toBe(50);
    expect(balance).not.toBeNull();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(1000);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(50);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(50);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(1000);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
