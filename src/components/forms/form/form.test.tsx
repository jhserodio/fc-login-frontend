import { render, fireEvent } from '@testing-library/react';
import { Form } from './Form'; // Ajuste o caminho de importação conforme necessário

test('should call submit event', () => {
  const handleSubmit = jest.fn();
  const { getByRole } = render(
    <Form submit={handleSubmit}>
      <button type="submit">Submit</button>
    </Form>,
  );

  fireEvent.submit(getByRole('button'));

  expect(handleSubmit).toHaveBeenCalled();
});
