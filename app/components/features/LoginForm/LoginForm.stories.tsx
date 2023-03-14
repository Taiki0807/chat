import type { Meta, StoryObj } from '@storybook/react';
import {
  within,
  userEvent,
 waitFor } from '@storybook/testing-library';
import { LoginForm } from './LoginForm';
import { handlers } from './handlers';
import { AuthProvider } from '@/app/components/features/LoginForm/AuthContext';

const meta = {
  title: 'LoginForm',
  component: LoginForm,
  decorators: [
    (Story) => {
      return (
        <AuthProvider>
          <Story />
        </AuthProvider>
      );
    },
  ],
} satisfies Meta<typeof LoginForm>;
export default meta;
type T = typeof LoginForm;
type Story = StoryObj<T>;

export const EmptyForm: Story = {};
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(async () => {
      await userEvent.type(
        canvas.getByTestId('username'),
        'username',
        { delay: 10 }
      );
    });
    await waitFor(async () => {
      await userEvent.type(
        canvas.getByTestId('password'),
        'a-random-password',
        { delay: 10 }
      );
    });
    await userEvent.click(canvas.getByRole('button'));
  },
  parameters: {
    msw: {
      handlers,
    },
  },
};
