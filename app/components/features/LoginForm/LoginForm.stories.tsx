import {
  type ComponentMeta,
  type ComponentStoryObj,
} from '@storybook/react';
import {
  within,
  userEvent,
} from '@storybook/testing-library';
import { LoginForm } from './LoginForm';
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

    await userEvent.type(
      canvas.getByTestId('username'),
      'username'
    );

    await userEvent.type(
      canvas.getByTestId('password'),
      'a-random-password'
    );
    await userEvent.click(canvas.getByRole('button'));
  },
};
