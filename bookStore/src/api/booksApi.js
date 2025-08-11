import axios from 'axios';

const API_URL = 'http://localhost:5000/api/books';

export const fetchBooks = async (filters = {}) => {
  const { category, author, year } = filters;
  const params = {};

  if (category) params.category = category;
  if (author) params.author = author;
  if (year) params.year = year;

  const response = await axios.get(API_URL, { params });
  return response.data;
};

export const fetchBookById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};