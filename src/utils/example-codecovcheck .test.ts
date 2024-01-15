import { add, sub } from './example-codecovcheck';

test('add function should return the sum of two numbers', () => {
  const result = add(2, 3);
  expect(result).toBe(5);
});

test('sub function should return the substraction of two numbers', () => {
  const result = sub(8, 3);
  expect(result).toBe(5);
});
