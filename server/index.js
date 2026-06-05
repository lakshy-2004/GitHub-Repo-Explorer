import express from 'express';
import cors from 'cors';
import githubRouter from './routes/github.js';

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:5173',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'GitHub Repo Explorer API is running' });
});

app.use('/api/user', githubRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});