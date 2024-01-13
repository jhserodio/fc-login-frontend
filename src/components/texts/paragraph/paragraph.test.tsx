import { render } from '@testing-library/react';
import { Paragraph } from './Paragraph';

describe('Paragraph', () => {
  it('should render a single paragraph when children is a string', () => {
    const { getByText } = render(<Paragraph>Single paragraph</Paragraph>);
    const paragraphElement = getByText('Single paragraph');
    expect(paragraphElement).toBeDefined();
  });

  it('should render multiple paragraphs when children is an array of strings', () => {
    const { getByText } = render(
      <Paragraph>{['First paragraph', 'Second paragraph', 'Third paragraph']}</Paragraph>,
    );

    const firstParagraphElement = getByText('First paragraph');
    const secondParagraphElement = getByText('Second paragraph');
    const thirdParagraphElement = getByText('Third paragraph');

    expect(firstParagraphElement).toBeDefined();
    expect(secondParagraphElement).toBeDefined();
    expect(thirdParagraphElement).toBeDefined();
  });
});
