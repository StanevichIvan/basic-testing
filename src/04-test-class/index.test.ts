import lodash from 'lodash';
import {
  InsufficientFundsError,
  getBankAccount,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const balance = getBankAccount(100);

    expect(balance).toBeDefined();
    expect(balance.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = getBankAccount(100);

    expect(() => balance.withdraw(101)).toThrowError(
      new InsufficientFundsError(100),
    );
  });

  test('should throw error when transferring more than balance', () => {
    const balance = getBankAccount(100);
    const recepientAccouint = getBankAccount(10);

    expect(() => balance.transfer(101, recepientAccouint)).toThrowError(
      new InsufficientFundsError(100),
    );
  });

  test('should throw error when transferring to the same account', () => {
    const balance = getBankAccount(100);

    expect(() => balance.transfer(100, balance)).toThrowError(
      new TransferFailedError(),
    );
  });

  test('should deposit money', () => {
    const balance = getBankAccount(100);
    balance.deposit(100);

    expect(balance.getBalance()).toBe(200);
  });

  test('should withdraw money', () => {
    const balance = getBankAccount(100);
    balance.withdraw(55);

    expect(balance.getBalance()).toBe(45);
  });

  test('should transfer money', () => {
    const account1 = getBankAccount(100);
    const account2 = getBankAccount(99);

    account1.transfer(30, account2);

    expect(account1.getBalance()).toBe(70);
    expect(account2.getBalance()).toBe(129);
  });

  describe('balance', () => {
    let spy: jest.SpyInstance;
    beforeEach(() => {
      spy = jest.spyOn(lodash, 'random');
    });

    afterEach(() => {
      spy.mockReset();
    });

    test('should set new balance if fetchBalance returned number', async () => {
      spy.mockImplementationOnce(() => 10);
      spy.mockImplementationOnce(() => 0);

      const account = getBankAccount(100);
      const balance = await account.fetchBalance();

      expect(balance).toBeNull();
    });

    test('fetchBalance should return number in case if request did not failed', async () => {
      spy.mockImplementationOnce(() => 50);
      spy.mockImplementationOnce(() => 1);

      const account = getBankAccount(100);
      const balance = await account.fetchBalance();

      expect(typeof balance).toBe('number');
    });

    test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
      spy.mockImplementationOnce(() => 50);
      spy.mockImplementationOnce(() => 0);
      const account = getBankAccount(100);

      expect(
        async () => await account.synchronizeBalance(),
      ).rejects.toThrowError(new SynchronizationFailedError());
    });
  });
});
