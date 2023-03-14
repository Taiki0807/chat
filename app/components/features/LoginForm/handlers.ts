import { rest } from 'msw';

export const handlers = [
  rest.get('*/api/auth/status/', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 1,
      })
    );
  }),
  rest.post('*/api/auth/login/', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ success: 1 }));
  }),

  rest.get('*/api/auth/get/', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        username: 'test',
      })
    );
  }),
];
