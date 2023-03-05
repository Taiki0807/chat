import {
  type ComponentMeta,
  type ComponentStoryObj,
} from '@storybook/react';
import {
  within,
  userEvent,
} from '@storybook/testing-library';
import { waitFor } from '@testing-library/react';
import { LoginForm } from './LoginForm';
import { handlers } from './handlers';
import { AuthProvider } from '@/app/components/features/LoginForm/AuthContext';

type T = typeof LoginForm;
type Meta = ComponentMeta<T>;
type Story = ComponentStoryObj<T>;

export default {
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
} as Meta;

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
