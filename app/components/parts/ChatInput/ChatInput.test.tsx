import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import * as stories from './ChatInput.stories';
import '@testing-library/jest-dom';

const { Default } = composeStories(stories);

test('render ChatInput with default args', () => {
  render(<Default />);
});
