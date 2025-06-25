import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { itemRoutes } from './routes/courses.routes.';
import { connectDB } from './db/connect';

// Load environment variables
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB().then(() => {
  console.log('Database connected successfully');
}).catch((err) => {
  console.log('Error connecting to the database');
  console.error(err);
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/items', itemRoutes);

// Basic error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 