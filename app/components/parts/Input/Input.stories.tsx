import {
  type ComponentMeta,
  type ComponentStoryObj,
} from '@storybook/react';
import { Input } from './Input';

type T = typeof Input;
type Meta = ComponentMeta<T>;
type Story = ComponentStoryObj<T>;

export default {
  title: 'Input',
  component: Input,
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

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
