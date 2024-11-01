import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import { supabase } from './db';
import cors from 'cors';
// import { requestLogger } from './middleware/requestLogger';

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());

// Middleware
app.use(express.json());
// app.use(requestLogger); // dev tool
app.use(express.urlencoded({ extended: true }));

// DASHBOARD ROUTE
app.get('/', (req: Request, res: Response) => {
  res.render('index');
});

// ROUTES
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});

export { app, supabase };