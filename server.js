import {assetsMiddleware, kitMiddleware, prerenderedMiddleware} from './build/middlewares.js';
import express from 'express';

const app = express();

app.get('/no-svelte', (req, res) => {
    res.end('This is not Svelte!');
});

app.use(assetsMiddleware, prerenderedMiddleware, kitMiddleware);

app.listen(3000);