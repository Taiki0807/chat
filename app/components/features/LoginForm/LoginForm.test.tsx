import { composeStories } from '@storybook/react';
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
    //https://github.com/storybookjs/storybook/pull/21517
    //To access the remaining props, @ts-ignore needs to be placed.
    //@ts-ignore
    await Default.play({ canvasElement: container });
  });
});
