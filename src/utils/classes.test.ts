import { cls } from './classes';
import { Optional } from '../types/utils';

describe('cls', () => {
  it('deve retornar uma string concatenada de elementos do tipo string', () => {
    const input: Array<Optional<string>> = ['.a', '.b', null, 'c', undefined, '.d'];
    const output: string = cls(input);
    expect(output).toBe('.a .b .d');
  });

  it('deve retornar uma string vazia se a entrada for um array vazio', () => {
    const input: Array<Optional<string>> = [];
    const output: string = cls(input);
    expect(output).toBe('');
  });

  it('deve retornar uma string vazia se todos os elementos do array forem null ou undefined', () => {
    const input: Array<Optional<string>> = [null, undefined, null, undefined];
    const output: string = cls(input);
    expect(output).toBe('');
  });
});
