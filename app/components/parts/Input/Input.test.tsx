import { composeStories } from '@storybook/testing-react';
import { render, screen } from '@testing-library/react';
import * as stories from './Input.stories';
import '@testing-library/jest-dom';

const { Default } = composeStories(stories);

test('render Input with default args', () => {
  render(<Default>Input</Default>);
  const InputElement = screen.getByText(/Input/i);
  expect(InputElement).toBeInTheDocument();
});
