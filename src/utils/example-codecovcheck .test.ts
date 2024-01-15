import { soma } from './example-codecovcheck';

test('soma function should return the sum of two numbers', () => {
  const result = soma(2, 3);
  expect(result).toBe(5);
});
