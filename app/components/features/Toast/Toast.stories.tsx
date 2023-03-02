import {
  type ComponentMeta,
  type ComponentStoryObj,
} from '@storybook/react';
import { Toast } from './Toast';

type T = typeof Toast;
type Meta = ComponentMeta<T>;
type Story = ComponentStoryObj<T>;

export default {
  title: 'Toast',
  component: Toast,
} as Meta;

export const Default: Story = {
  args: {
    outHideDuration: 3000,
    message: 'Success Message',
  },
};
