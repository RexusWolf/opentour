import { UserId } from './user-id';

describe('UserId', () => {
  it('should not be empty', () => {
    expect(() => {
      UserId.fromString('');
    }).toThrow();
  });
});
