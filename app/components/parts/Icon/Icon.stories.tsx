import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';

const meta = {
  title: 'Icon',
  component: Icon,
} satisfies Meta<typeof Icon>;

export default meta;
type T = typeof Icon;
type Story = StoryObj<T>;

export const Default: Story = {
    args: {},
  };