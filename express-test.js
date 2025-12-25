// Minimal Express app for Hostinger detection.
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.send('Hello World from Express test');
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Express test server listening on ${port}`);
});
