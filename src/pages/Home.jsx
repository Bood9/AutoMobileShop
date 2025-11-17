import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Slider from '../shared/Slider.jsx';
import ProductCard, { ProductSkeleton } from '../shared/ProductCard.jsx';
import { api } from '../services/api.js';

export default function Home() {
  const nav = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 👉 бренды для чипсов
  const brands = ['Все', 'BMW', 'Porsche', 'Audi', 'Alfa-Romeo','Ferrari','Lamborghini' ]; // пример набора
  const [active, setActive] = useState('Все');

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await api.getProducts();
        if (alive) setItems(data);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  // 👉 фильтрация
  const filtered = (() => {
    if (active === 'Все') return items;
    return items.filter(p =>
      (p.brand && p.brand === active) ||
      (Array.isArray(p.tags) && p.tags.includes(active))
    );
  })()

  return (
    <main className="screen">
      <div className="searchbar" onClick={() => nav('/search')}>
        <span className="searchbar__icon">🔍</span>
        <input className="searchbar__input" placeholder="Найти товары" readOnly />
      </div>

      {/* Бесконечный слайдер */}
      {/* Бесконечный слайдер */}
<Slider>
  <div className="banner">
    <img
      src="https://i.pinimg.com/1200x/81/92/d6/8192d6ccd76cc9256c1b19002c55d088.jpg"
      alt="Ferrari"
      className="banner__img"
    />
  </div>

  <div className="banner">
    <img
      src="https://i.pinimg.com/1200x/23/d2/2b/23d22baf11f184fdf6473732f4924df0.jpg"
      alt="BMW"
      className="banner__img"
    />
  </div>

  <div className="banner">
    <img
      src="https://i.pinimg.com/736x/aa/d9/24/aad9247999ba454845d98e132c35c2de.jpg"
      alt="Rollc Royce"
      className="banner__img"
    />
  </div>
</Slider>

      {/* Чипсы фильтров */}
      <div className="chips" role="tablist" aria-label="Фильтр по марке">
        {brands.map((b) => (
          <button
            key={b}
            role="tab"
            aria-selected={active === b}
            className="chip"
            onClick={() => setActive(b)}
            style={active === b
              ? { outline: '2px solid #2563eb', outlineOffset: '2px' }
              : undefined}
          >
            {b}
          </button>
        ))}
      </div>

      {/* Сетка карточек */}
      <section className="grid">
        {loading &&
          Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}

        {!loading &&
          filtered.map((p) => (
            <Link key={p.id} className="grid__item" to={`/product/${p.id}`} onClick={(e) => e.preventDefault()}>
              <ProductCard product={p} />
            </Link>
          ))}
      </section>
    </main>
  );
}