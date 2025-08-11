import React from 'react';
import styles from './Cart.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../store/slices/cartSlice';

const Cart = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className={styles.cart}>
      <h2>Корзина</h2>
      {items.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <>
          <ul className={styles.list}>
            {items.map((book) => (
              <li key={book._id} className={styles.item}>
                <span>{book.title} - ${book.price}</span>
                <button 
                  onClick={() => dispatch(removeFromCart(book._id))}
                  className={styles.removeBtn}
                >
                  Удалить
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.total}>
            <strong>Итого: ${total.toFixed(2)}</strong>
          </div>
          <button className={styles.checkoutBtn}>Оформить заказ</button>
        </>
      )}
    </div>
  );
};

export default Cart;