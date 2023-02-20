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
