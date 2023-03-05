import { composeStories } from '@storybook/testing-react';
import { render , waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import * as stories from './LoginForm.stories';
import { handlers } from './handlers';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
  })),
  usePathname: jest.fn(),
}));
const { Default } = composeStories(stories);

describe('通信をモックするテスト', () => {
  const server = setupServer(...handlers);

  beforeAll(() => server.listen());

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => server.close());
  test('render LoginForm with default args', async () => {
    const { container } = render(<Default />);
    await waitFor(async () => {
      await Default.play({ canvasElement: container });
    });
  });
});
