import {
  type ComponentMeta,
  type ComponentStoryObj,
} from '@storybook/react';
import { Button } from './Button';

type T = typeof Button;
type Meta = ComponentMeta<T>;
type Story = ComponentStoryObj<T>;

export default {
  title: 'Button',
  component: Button,
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
    color: 'danger',
    children: 'Button',
  },
};
export const Primary: Story = {
  args: {
    color: 'primary',
    children: 'Primary',
  },
};
export const Blue: Story = {
  args: {
    color: 'blue',
    children: 'Blue',
  },
};
