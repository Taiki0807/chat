import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
  title: 'Input',
  component: Input,
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type T = typeof Input;
type Story = StoryObj<T>;

export const Default: Story = {
  args: {
    type: 'text',
    children: 'Name',
    name: 'name',
  },
};
export const Password: Story = {
  args: {
    type: 'password',
    children: 'Password',
    name: 'password',
  },
};
