import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import * as stories from './ChatLoading.stories';
import '@testing-library/jest-dom';

const { Default } = composeStories(stories);

test('render ChatLoading with default args', () => {
  render(<Default />);
});
