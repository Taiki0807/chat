import * as nextRouter from 'next/navigation';
// useRouterのモック化
nextRouter.useRouter = () => ({
  route: '',
  pathname: '',
  query: { query: '' },
  asPath: '',
  basePath: '',
});
export const parameters = {
  nextjs: {
    appDirectory: true,
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
