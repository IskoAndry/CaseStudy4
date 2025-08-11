import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBook, updateBook, deleteBook } from '../../store/slices/booksSlice';
import styles from './AdminPanel.module.scss';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const books = useSelector(state => state.books.items);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    year: '',
    price: '',
    rentPrice: '',
    cover: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateBook({ id: editingId, ...formData }));
    } else {
      dispatch(addBook(formData));
    }
    resetForm();
  };

  const handleEdit = (book) => {
    setEditingId(book._id);
    setFormData({
      title: book.title,
      author: book.author,
      category: book.category,
      year: book.year,
      price: book.price,
      rentPrice: book.rentPrice,
      cover: book.cover
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: '',
      author: '',
      category: '',
      year: '',
      price: '',
      rentPrice: '',
      cover: ''
    });
  };

  return (
    <div className={styles.adminPanel}>
      <h2>Панель администратора</h2>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Название"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Автор"
          value={formData.author}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Категория"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="year"
          placeholder="Год издания"
          value={formData.year}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Цена"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="rentPrice"
          placeholder="Цена аренды (2 недели)"
          value={formData.rentPrice}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cover"
          placeholder="URL обложки"
          value={formData.cover}
          onChange={handleChange}
        />
        
        <div className={styles.buttons}>
          <button type="submit">
            {editingId ? 'Обновить' : 'Добавить'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm}>
              Отмена
            </button>
          )}
        </div>
      </form>

      <div className={styles.booksList}>
        <h3>Список книг</h3>
        <ul>
          {books.map(book => (
            <li key={book._id}>
              <span>{book.title} - {book.author}</span>
              <div>
                <button onClick={() => handleEdit(book)}>Редактировать</button>
                <button onClick={() => dispatch(deleteBook(book._id))}>
                  Удалить
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;