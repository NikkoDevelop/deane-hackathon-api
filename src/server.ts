import express from 'express';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import { createServer } from 'http';
import { JWT_REFRESH_SECRET, PORT } from './config';
import prisma from './prisma-client';
import GQLServer from './graphql/server';
import { createToken, createRefreshToken } from './integrations/jwt';

(async () => {
  const app = express();
  const httpServer = createServer(app);

  const whitelist = [
    'http://localhost:5000',
    'http://localhost:4000',
    'http://localhost:3000',
  ];

  app.use(cors({
    origin: (origin, callback) => {
      if (!origin || whitelist.includes(origin) || process.env.ENV_NAME !== 'production') {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }));

  app.use(cookieParser());

  app.get('/', (req, res) => {
    res.send(`Response from process ${process.pid}`);
  });

  app.post('/refresh_token', async (req, res) => {
    const token = req.cookies.jid;

    if (!token) {
      return res.send({ ok: false, accessToken: '' });
    }

    let payload: any = null;

    try {
      payload = jwt.verify(token, JWT_REFRESH_SECRET!);
    } catch (error) {
      return res.send({ ok: false, accessToken: '' });
    }

    const user = await prisma.user.findFirst({ where: { id: payload.userId } });

    if (!user) {
      return res.send({ ok: false, accessToken: '' });
    }
    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: '' });
    }

    res.cookie('jid', createRefreshToken(user), { httpOnly: true, path: '/refresh_token', secure: process.env.ENV_NAME === 'PRODUCTION' });

    return res.send({ ok: true, accessToken: createToken(user) });
  });

  app.post('/logout', async (req, res) => {
    res.clearCookie('jid');
    res.send();
  });

  await GQLServer.start();

  GQLServer.applyMiddleware({
    app,
    cors: false,
  });

  httpServer.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server started on port ${PORT}`);
  });
})();

