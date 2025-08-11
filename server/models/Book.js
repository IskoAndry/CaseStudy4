
import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  rentPrice: { type: Number, default: 0 },
  cover: { type: String, default: '' },
  year: { type: Number, required: true },
});

export default mongoose.model('Book', BookSchema);