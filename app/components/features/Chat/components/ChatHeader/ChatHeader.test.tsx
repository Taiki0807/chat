import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import * as stories from './ChatHeader.stories';
import '@testing-library/jest-dom';

const { Default } = composeStories(stories);

test('render ChatHeader with default args', () => {
  render(<Default />);
});
