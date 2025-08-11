
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Загрузка переменных окружения
dotenv.config();

const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookstore';

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Таймаут подключения
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Завершение процесса при ошибке
  }
};

// Обработка отключения
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Обработка ошибок после подключения
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

export default connectDB;