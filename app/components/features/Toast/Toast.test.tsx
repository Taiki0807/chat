import { composeStories } from '@storybook/testing-react';
import { render, act } from '@testing-library/react';
import * as stories from './Toast.stories';

const { Default } = composeStories(stories);
describe('Toast', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
  test('render Toast with default args', () => {
    render(<Default />);
    act(() => {
      jest.advanceTimersByTime(3000);
    });
  });
});
