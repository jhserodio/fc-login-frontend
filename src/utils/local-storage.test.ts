import { getJwtToken, putJwtToken, clearJwtToken } from './local-storage';

describe('Local Storage functions', () => {
  beforeEach(() => {
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.removeItem = jest.fn();
  });

  it('should get JWT token from local storage', () => {
    getJwtToken();
    expect(localStorage.getItem).toHaveBeenCalledWith('jwt');
  });

  it('should put JWT token to local storage', () => {
    putJwtToken('test-token');
    expect(localStorage.setItem).toHaveBeenCalledWith('jwt', 'test-token');
  });

  it('should remove JWT token from local storage', () => {
    clearJwtToken();
    expect(localStorage.removeItem).toHaveBeenCalledWith('jwt');
  });
});
