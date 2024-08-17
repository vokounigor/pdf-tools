import { createServer } from './app.js';

const PORT = process.env.PORT || 3000;
const app = createServer();

process.on('uncaughtException', (err) => {
  console.log(err);
  process.exit(1);
});

app.listen(PORT, () => {
  console.log(`PDF tools running on port ${PORT}`);
});
