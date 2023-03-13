import { setProjectAnnotations } from '@storybook/react';
import * as globalStorybookConfig from './.storybook/preview';
import 'whatwg-fetch';

setProjectAnnotations(globalStorybookConfig);
