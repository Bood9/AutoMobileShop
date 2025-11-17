import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/Store.jsx';
import ProductCard from '../shared/ProductCard.jsx';

export default function Cart() {
  const nav = useNavigate();
  const { state, removeFromCart, changeQty, clearCart } = useStore();

  const total = state.cart.reduce((s, i) => s + (i.price || 0) * i.qty, 0);

  return (
    <main className="screen">
      <h2 className="h2">Корзина</h2>

      {!state.cart.length && (
        <div className="empty">Пусто. Вернуться на <Link to="/">главную</Link>.</div>
      )}

      <div className="list">
        {state.cart.map((item) => (
          <div key={item.id} className="card card--compact">
            <div className="card__imgwrap"><img className="card__img" src={item.imageUrl || 'https://via.placeholder.com/96'} alt={item.title} /></div>
            <div className="card__body">
              <div className="card__title">{item.title}</div>
              <div className="card__price">
                <span className="price__now">{(item.price || 0).toLocaleString('ru-RU')} ₽</span>
              </div>

              <div className="qty">
                <button className="qty__btn" onClick={() => changeQty(item.id, item.qty - 1)}>-</button>
                <input className="qty__input" value={item.qty} onChange={e => changeQty(item.id, Number(e.target.value || 1))} />
                <button className="qty__btn" onClick={() => changeQty(item.id, item.qty + 1)}>+</button>
                <button className="btn btn--link" onClick={() => removeFromCart(item.id)} style={{ marginLeft: 8 }}>Удалить</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {state.cart.length > 0 && (
        <div className="cart__footer">
          <div className="cart__total">Итого: <b>{total.toLocaleString('ru-RU')} ₽</b></div>
          <div className="cart__actions">
            <button className="btn" onClick={clearCart}>Очистить</button>
            <button className="btn btn--primary" onClick={() => nav('/checkout')}>Оплатить</button>
          </div>
        </div>
      )}
    </main>
  );
}