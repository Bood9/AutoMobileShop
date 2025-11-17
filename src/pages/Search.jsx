import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../shared/ProductCard.jsx';
import { api } from '../services/api.js';

export default function Search() {
  const nav = useNavigate();
  const [q, setQ] = useState('');
  const [items, setItems] = useState([]);
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('history') || '[]'));

  useEffect(() => { api.getProducts().then(setItems); }, []);

  const filtered = useMemo(() => {
    const v = q.trim().toLowerCase();
    if (!v) return [];
    return items.filter(p => p.title?.toLowerCase().startsWith(v));
  }, [q, items]);

  const go = (value) => {
    setQ(value);
    if (value) {
      const next = [value, ...history.filter(h => h !== value)].slice(0, 10);
      setHistory(next);
      localStorage.setItem('history', JSON.stringify(next));
    }
  };

  return (
    <main className="screen">
      {/* шапка поиска */}
      <div className="searchbar searchbar--focused">
        <button className="searchbar__back" onClick={() => nav(-1)}>←</button>
        <input
          className="searchbar__input"
          autoFocus
          placeholder="Поиск"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        {q && <button className="searchbar__clear" onClick={() => setQ('')}>✕</button>}
        <button className="searchbar__go" onClick={() => go(q)}>Перейти</button>
      </div>

      {/* история запросов */}
      {!q && (
        <section className="search__history">
          <div className="search__title">Часто ищут</div>
          <ul className="history__list">
            {['BMW','Porshe','Niva','Stone Island','Pagani'].map((t) => (
              <li key={t}>
                <button className="history__item" onClick={() => go(t)}>{t}</button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* результаты списка — длинные карточки */}
      {!!q && (
        <section className="list">
          {filtered.map((p) => (
            <div key={p.id} className="list__item">
              <ProductCard product={p} compact />
            </div>
          ))}
        </section>
      )}
    </main>
  );
}