---
to: <%= path %>/<%= name %>.stories.tsx
unless_exists: true
---
import {
  type ComponentMeta,
  type ComponentStoryObj,
} from '@storybook/react';
import { <%= name %> } from './<%= name %>';

type T = typeof <%= name %>;
type Meta = ComponentMeta<T>;
type Story = ComponentStoryObj<T>;

export default {
  title: '<%= name %>',
  component: <%= name %>,
} as Meta;

export const Default: Story = {
  <% if (have_props) { -%>
  args: {},
  <% } -%>
};