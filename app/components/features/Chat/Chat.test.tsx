import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import * as stories from './Chat.stories';
import '@testing-library/jest-dom';

const { Default } = composeStories(stories);

test('render Chat with default args', () => {
  render(<Default />);
});
