import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookById } from '../../api/booksApi';
import { addToCart } from '../../store/slices/cartSlice';
import styles from './BookDetails.module.scss';

const BookDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [book, setBook] = React.useState(null);
  const [rentPeriod, setRentPeriod] = React.useState('2 weeks');
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const loadBook = async () => {
      try {
        const data = await fetchBookById(id);
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadBook();
  }, [id]);

  const handleAddToCart = (isRent = false) => {
    if (!book) return;
    
    const itemToAdd = {
      ...book,
      isRent,
      rentPeriod: isRent ? rentPeriod : null,
      finalPrice: isRent ? calculateRentPrice() : book.price
    };
    
    dispatch(addToCart(itemToAdd));
  };

  const calculateRentPrice = () => {
    if (!book) return 0;
    
    const rentPrices = {
      '2 weeks': book.rentPrice * 1,
      '1 month': book.rentPrice * 2,
      '3 months': book.rentPrice * 4
    };
    
    return rentPrices[rentPeriod] || 0;
  };

  if (loading) return <div className={styles.loading}>Загрузка...</div>;
  if (error) return <div className={styles.error}>Ошибка: {error}</div>;
  if (!book) return <div className={styles.notFound}>Книга не найдена</div>;

  return (
    <div className={styles.container}>
      <div className={styles.bookCover}>
        <img 
          src={book.cover || '/default-book-cover.jpg'} 
          alt={book.title}
        />
      </div>
      
      <div className={styles.bookInfo}>
        <h1>{book.title}</h1>
        <p className={styles.author}>Автор: {book.author}</p>
        <p className={styles.category}>Категория: {book.category}</p>
        <p className={styles.year}>Год издания: {book.year}</p>
        <p className={styles.price}>Цена: ${book.price}</p>
        
        <div className={styles.description}>
          <h3>Описание</h3>
          <p>{book.description || 'Описание отсутствует.'}</p>
        </div>
        
        <div className={styles.actions}>
          <button 
            onClick={() => handleAddToCart(false)}
            className={styles.buyButton}
          >
            Купить за ${book.price}
          </button>
          
          <div className={styles.rentSection}>
            <select
              value={rentPeriod}
              onChange={(e) => setRentPeriod(e.target.value)}
              className={styles.rentSelect}
            >
              <option value="2 weeks">2 недели</option>
              <option value="1 month">1 месяц</option>
              <option value="3 months">3 месяца</option>
            </select>
            
            <button
              onClick={() => handleAddToCart(true)}
              className={styles.rentButton}
            >
              Арендовать за ${calculateRentPrice()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;