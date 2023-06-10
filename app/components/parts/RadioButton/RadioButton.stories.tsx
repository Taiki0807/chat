import type { Meta, StoryObj } from '@storybook/react';
import { RadioButton } from './RadioButton';

const meta = {
  title: 'RadioButton',
  component: RadioButton,
} satisfies Meta<typeof RadioButton>;

export default meta;
type T = typeof RadioButton;
type Story = StoryObj<T>;

export const Default: Story = {
  args: {},
};
