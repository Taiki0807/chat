import {
  type ComponentMeta,
  type ComponentStoryObj,
} from '@storybook/react';
import { LoginForm } from './LoginForm';

type T = typeof LoginForm;
type Meta = ComponentMeta<T>;
type Story = ComponentStoryObj<T>;

export default {
  title: 'LoginForm',
  component: LoginForm,
} as Meta;

export const Default: Story = {};
