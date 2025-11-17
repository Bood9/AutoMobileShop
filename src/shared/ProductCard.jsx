import { Link } from 'react-router-dom';
import Badge from './Badge.jsx';
import { useStore } from '../context/Store.jsx';

export default function ProductCard({ product, compact = false }) {
  const { toggleFavorite, isFav, addToCart } = useStore(); // ← правильные имена из Store
  const { id, title, price, oldPrice, discount, imageUrl, flags = {} } = product;
  const fav = isFav(id);

  const onLike = (e) => {
    e.preventDefault();
    e.stopPropagation();        // лайк не «пробивает» к <Link>
    toggleFavorite(product);
  };

  const onAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <Link to={`/product/${id}`} className={`card ${compact ? 'card--compact' : ''}`} aria-label={title}>
      <div className="card__imgwrap">
        <img
          className="card__img"
          src={imageUrl || 'https://via.placeholder.com/320x320?text=Фото'}
          alt={title}
          loading="lazy"
        />

        <div className="card__badges">
          {flags.hit  && <Badge kind="hit">ХИТ</Badge>}
          {flags.sale && <Badge kind="sale">SALE</Badge>}
          {flags.new  && <Badge kind="new">NEW</Badge>}
        </div>

        <button
          type="button"
          className={`card__like ${fav ? 'is-active' : ''}`}
          aria-label={fav ? 'Убрать из избранного' : 'В избранное'}
          aria-pressed={fav}
          onClick={onLike}
        >
          <span className="heart">{fav ? '❤' : '♡'}</span>
        </button>
      </div>

      <div className="card__body">
        <h3 className="card__title" title={title}>{title}</h3>

        <div className="card__price">
          <span className="price__now">{price.toLocaleString('ru-RU')} ₽</span>
          {oldPrice && <span className="price__old">{oldPrice.toLocaleString('ru-RU')} ₽</span>}
          {discount && <span className="price__discount">-{discount}%</span>}
        </div>

        <button type="button" className="card__cta" onClick={onAdd}>
          Выбрать
        </button>
      </div>
    </Link>
  );
}

export function ProductSkeleton() {
  return (
    <article className="card skeleton">
      <div className="card__imgwrap skeleton__block" />
      <div className="card__body">
        <div className="skeleton__line" style={{ width: '80%' }} />
        <div className="skeleton__line" style={{ width: '50%' }} />
        <div className="skeleton__btn" />
      </div>
    </article>
  );
}