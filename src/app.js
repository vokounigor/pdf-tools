import express from 'express';
import cors from 'cors';
import router from './router/index.js';
import { getViewsDirectory, getStaticDirectory } from './utils/helpers.js';

export function createServer() {
  const app = express();

  app.disable('etag');
  app.disable('x-powered-by');
  app.use(express.json());
  app.use(cors());
  app.set('view engine', 'ejs');
  app.set('views', getViewsDirectory());
  app.use('/static', express.static(getStaticDirectory()));

  app.use(router);

  app.use('*', (req, res) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(
        'ROUTE NOT FOUND',
        req.protocol + '://' + req.get('host') + req.originalUrl
      );
    }
    res.sendStatus(404);
  });

  return app;
}
