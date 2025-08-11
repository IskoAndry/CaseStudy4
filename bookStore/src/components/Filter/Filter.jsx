import React from 'react';
import styles from './Filter.module.scss';

const Filter = ({ categories, authors, years, onFilterChange }) => {
  return (
    <div className={styles.filter}>
      <select 
        onChange={(e) => onFilterChange('category', e.target.value)}
        className={styles.select}
      >
        <option value="">Все категории</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <select 
        onChange={(e) => onFilterChange('author', e.target.value)}
        className={styles.select}
      >
        <option value="">Все авторы</option>
        {authors.map((author) => (
          <option key={author} value={author}>{author}</option>
        ))}
      </select>

      <select 
        onChange={(e) => onFilterChange('year', e.target.value)}
        className={styles.select}
      >
        <option value="">Все года</option>
        {years.map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
    </div>
  );
};

export default Filter;