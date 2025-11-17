import { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api.js';
import { useStore } from '../context/Store.jsx';
import Badge from '../shared/Badge.jsx';
import ProductCard from '../shared/ProductCard.jsx';

export default function ProductDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const { addToCart, toggleFav, isFav } = useStore();

  const [product, setProduct] = useState(null);
  const [all, setAll] = useState([]);
  const [idx, setIdx] = useState(0); // индекс активного фото

  useEffect(() => {
    let alive = true;
    (async () => {
      const list = await api.getProducts();
      if (!alive) return;
      setAll(list);
      const p = list.find(x => String(x.id) === String(id)) || null;
      setProduct(p);
      setIdx(0);
    })();
    return () => { alive = false; };
  }, [id]);

  const fav = isFav(id);

  const gallery = useMemo(() => {
    if (!product) return [];
    const imgs = product.images && product.images.length
      ? product.images
      : (product.imageUrl ? [product.imageUrl] : []);
    return imgs;
  }, [product]);

  const similar = useMemo(() => {
    if (!product) return [];
    return all
      .filter(p => p.id !== product.id && p.brand && product.brand && p.brand === product.brand)
      .slice(0, 6);
  }, [all, product]);

  if (!product) {
    return (
      <main className="screen">
        <div className="skeleton card">
          <div className="card__imgwrap skeleton__block" />
          <div className="card__body">
            <div className="skeleton__line" style={{ width: '80%' }} />
            <div className="skeleton__line" style={{ width: '50%' }} />
            <div className="skeleton__btn" />
          </div>
        </div>
      </main>
    );
  }

  const { title, price, oldPrice, discount, flags = {}, specs = {} } = product;

  return (
    <main className="screen">
      <button className="btn btn--link" onClick={() => nav(-1)}>← Назад</button>

      <section className="pd">
        {/* Галерея */}
        <div className="pd__gallery">
          <div className="pd__rail" style={{ transform: `translateX(${-idx * 100}%)` }}>
            {gallery.map((src, i) => (
              <div className="pd__slide" key={i}>
                <img className="pd__img" src={src} alt={`${title} ${i + 1}`} />
              </div>
            ))}
          </div>

          {gallery.length > 1 && (
            <div className="pd__dots">
              {gallery.map((_, i) => (
                <button
                  key={i}
                  className={`pd__dot ${i === idx ? 'is-active' : ''}`}
                  onClick={() => setIdx(i)}
                  aria-label={`К фото ${i + 1}`}
                />
              ))}
            </div>
          )}

          <button
            className={`pd__fav ${fav ? 'is-active' : ''}`}
            onClick={() => toggleFav(product)}
            aria-label="В избранное"
          >
            {fav ? '❤' : '♡'}
          </button>
        </div>

        {/* Заголовок + цена */}
        <header className="pd__header">
          <h1 className="pd__title">
            {title}
            <span className="pd__flags">
              {flags.hit && <Badge kind="hit">ХИТ</Badge>}
              {flags.sale && <Badge kind="sale">SALE</Badge>}
              {flags.new && <Badge kind="new">NEW</Badge>}
            </span>
          </h1>

          <div className="pd__price">
            <b className="pd__now">{price.toLocaleString('ru-RU')} ₽</b>
            {oldPrice && <span className="pd__old">{oldPrice.toLocaleString('ru-RU')} ₽</span>}
            {discount && <span className="pd__disc">-{discount}%</span>}
          </div>
        </header>

        {/* Характеристики */}
        <section className="pd__specs">
          <h2 className="h3">Характеристики</h2>
          <ul className="specs">
            <li><span>Год выпуска</span><b>{specs.year || '—'}</b></li>
            <li><span>Пробег</span><b>{specs.mileageKm ? specs.mileageKm.toLocaleString('ru-RU') + ' км' : '—'}</b></li>
            <li><span>Тип двигателя</span><b>{specs.engineType || '—'}</b></li>
            <li><span>Объём двигателя</span><b>{specs.engineVolumeL ? `${specs.engineVolumeL} л` : '—'}</b></li>
            <li><span>Мощность</span><b>{specs.powerHP ? `${specs.powerHP} л.с.` : '—'}</b></li>
          </ul>
        </section>

        {/* CTA */}
        <div className="pd__actions">
          <button className="btn btn--primary" onClick={() => addToCart(product)}>
            Добавить в корзину
          </button>
          <Link to="/cart" className="btn">Перейти в корзину</Link>
        </div>

        {/* Похожие */}
        {similar.length > 0 && (
          <section className="pd__similar">
            <h2 className="h3">Похожие</h2>
            <div className="grid">
              {similar.map(p => (
                <div className="grid__item" key={p.id}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}