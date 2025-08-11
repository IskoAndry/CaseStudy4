import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BookCard.module.scss';

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(`/book/${book._id}`, {
      state: { from: location.pathname } // Сохраняем текущий путь для возврата
    });
  }, [book._id, navigate]);

  return (
    <div 
      className={styles.card} 
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`Подробнее о книге ${book.title}`}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <img 
        src={book.cover || '/default-book-cover.jpg'} 
        alt={`Обложка книги "${book.title}"`} 
        className={styles.cover}
        loading="lazy"
      />
      <div className={styles.info}>
        <h3>{book.title}</h3>
        <p>Автор: {book.author}</p>
        <p>Категория: {book.category}</p>
        <p>Год: {book.year}</p>
        <p>Цена: ${book.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default React.memo(BookCard);