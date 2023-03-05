import { composeStories } from '@storybook/testing-react';
import { render } from '@testing-library/react';
import * as stories from './LoginForm.stories';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
  })),
  usePathname: jest.fn(),
}));
const { Default } = composeStories(stories);

describe('LoginForm Test', () => {
  test('render LoginForm with default args', async () => {
    const { container } = render(<Default />);
    await Default.play({ canvasElement: container });
  });
});
