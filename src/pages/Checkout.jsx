import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/Store.jsx';

export default function Checkout() {
  const nav = useNavigate();
  const { state, clearCart } = useStore();
  const [method, setMethod] = useState('visa');
  const total = state.cart.reduce((s, i) => s + (i.price || 0) * i.qty, 0);

  const pay = (e) => {
    e.preventDefault();
    // тут обычный редирект/SDK — пока имитируем успех
    clearCart();
    alert(`Оплата ${method.toUpperCase()} на сумму ${total.toLocaleString('ru-RU')} ₽ прошла успешно`);
    nav('/');
  };

  return (
    <main className="screen">
      <h2 className="h2">Оплата</h2>
      <form className="form" onSubmit={pay}>
        <div className="pm">
          <label className={`pm__item ${method==='paypal'?'pm__item--active':''}`}>
            <input type="radio" name="pm" checked={method==='paypal'} onChange={() => setMethod('paypal')} />
            <span className="pm__logo">🅿️ PayPal</span>
          </label>

          <label className={`pm__item ${method==='visa'?'pm__item--active':''}`}>
            <input type="radio" name="pm" checked={method==='visa'} onChange={() => setMethod('visa')} />
            <span className="pm__logo">💳 Visa</span>
          </label>
        </div>

        <div className="summary">
          Итого к оплате: <b>{total.toLocaleString('ru-RU')} ₽</b>
        </div>

        <button className="btn btn--primary" type="submit">Оплатить</button>
      </form>
    </main>
  );
}