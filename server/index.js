import express from 'express';
import cors from 'cors';
import githubRouter from './routes/github.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'GitHub Repo Explorer API is running' });
});

app.use('/api/user', githubRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});