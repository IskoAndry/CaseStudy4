import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks } from '../../store/slices/booksSlice';
import BookCard from '../../components/BookCard/BookCard';
import Filter from '../../components/Filter/Filter';
import Cart from '../../components/Cart/Cart';
import styles from './Home.module.scss';

const Home = () => {
  const dispatch = useDispatch();
  const { items: books, loading } = useSelector((state) => state.books);

  const categories = [...new Set(books.map((book) => book.category))];
  const authors = [...new Set(books.map((book) => book.author))];
  const years = [...new Set(books.map((book) => book.year))];

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const handleFilterChange = (filterType, value) => {
    dispatch(getBooks({ [filterType]: value }));
  };

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className={styles.home}>
      <div className={styles.content}>
        <Filter 
          categories={categories}
          authors={authors}
          years={years}
          onFilterChange={handleFilterChange}
        />
        <div className={styles.booksGrid}>
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      </div>
      <div className={styles.sidebar}>
        <Cart />
      </div>
    </div>
  );
};

export default Home;