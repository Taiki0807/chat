---
to: <%= path %>/<%= name %>.stories.tsx
unless_exists: true
---
import React from 'react';
import { Story, Meta } from '@storybook/react';
import { <%= name %> } from './<%= name %>';

export default {
  title: '<%= name %>',
  component: <%= name %>,
  <% if (have_props) { -%>
  args: {},
  <% } -%>
} as Meta;

export const Default: Story = () => <<%= name %>></<%= name %>>;