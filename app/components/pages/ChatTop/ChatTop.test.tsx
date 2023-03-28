import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import * as stories from './ChatTop.stories';
import '@testing-library/jest-dom';

const { Default } = composeStories(stories);

test('render ChatTop with default args', () => {
  render(<Default />);
});
