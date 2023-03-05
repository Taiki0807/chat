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
  test('submit LoginForm with user input', async () => {
    const { container } = render(<Default />);
    await Default.play({ canvasElement: container });
  });
});
