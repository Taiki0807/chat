import { setProjectAnnotations } from '@storybook/testing-react';
import * as globalStorybookConfig from './.storybook/preview';
import 'whatwg-fetch';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
setProjectAnnotations(globalStorybookConfig);
