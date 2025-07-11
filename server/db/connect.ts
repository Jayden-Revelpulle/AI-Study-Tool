import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/your_database_name';

// Connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions;

// Create a function to connect to the database
export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(MONGODB_URI, options);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB connection error: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    // Handle process termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
    process.exit(1);
  }
}; 