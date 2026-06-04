import express from 'express';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __FILENAME = fileURLToPath(import.meta.url);
const __DIRNAME = dirname(__FILENAME);

const { PORT = 8000 } = process.env;

const app = express();

app.get('/', async (_, res) => {
  res.setHeader('content-security-policy', `frame-ancestors 'none'`);

  res.write(await readFile(resolve(__DIRNAME, '../public/index.html')));
  res.end();
});

app.get('/iframe.html', async (_, res) => {
  res.setHeader('content-security-policy', `frame-ancestors 'none'`);
  res.setHeader('location', '/new-iframe.html');
  res.status(301);
  res.end();
});

app.get('/new-iframe.html', async (_, res) => {
  res.write(await readFile(resolve(__DIRNAME, '../public/iframe.html')));
  res.end();
});

app.listen(PORT, () => {
  console.log(`Server listening to port ${PORT}`);
});
