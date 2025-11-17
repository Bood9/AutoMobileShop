import { Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Search from './pages/Search.jsx';
import Cart from './pages/Cart.jsx';
import Profile from './pages/Profile.jsx';
import Checkout from './pages/Checkout.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import { StoreProvider } from './context/Store.jsx';
import { useState, useEffect } from 'react';
// ...импорты как у тебя

export default function App() {
  const nav = useNavigate();
  const loc = useLocation();

  const [frameOn, setFrameOn] = useState(
    () => localStorage.getItem('ui_phone_frame') !== 'off'
  );
  const toggleFrame = () => {
    setFrameOn(v => !v);
    localStorage.setItem('ui_phone_frame', !frameOn ? 'on' : 'off');
    document.body.classList.toggle('no-frame', !frameOn);
  };
  useEffect(() => {
    if (!frameOn) document.body.classList.add('no-frame');
    else document.body.classList.remove('no-frame');
  }, [frameOn]);

  return (
    <div className={`phone ${frameOn ? '' : 'phone--off'}`}>
      <div className={`app ${frameOn ? '' : 'app--flat'}`}>
        <header className="ios-header">
          {/* 🔻 статус-бар виден только когда рамка включена */}
          {frameOn && (
            <div className="ios-status">
              <span className="ios-time">9:41</span>
              <div className="ios-right">
                <span className="ios-signal" />
                <span className="ios-wifi" />
                <span className="ios-battery"><span className="ios-battery-level">99</span></span>
              </div>
            </div>
          )}

          <div className="ios-top">
            <button className="ios-pill ios-close" onClick={() => nav(-1)}>
              <span className="ios-close__icon">✕</span>
              <span className="ios-close__label"></span>
            </button>

            <span className="ios-title-pill">
              <span className="ios-tg"></span> Rich Cars.ru
            </span>

            <div className="ios-actions">
              {/* тумблер “рамка вкл/выкл” */}
              <button
                className={`ios-pill phone-toggle ${frameOn ? '' : 'is-off'}`}
                onClick={toggleFrame}
                title={frameOn ? 'Выключить рамку' : 'Включить рамку'}
              >
                📱
              </button>
              <button className="ios-pill">⌄</button>
              <button className="ios-pill">⋯</button>
            </div>
          </div>
        </header>

        {/* остальной код без изменений */}
        <StoreProvider>
          <div className="app__content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </div>

          <nav className="app__tabbar" aria-label="Нижняя навигация">
            <Link className="tabbar__btn" to="/">🏠</Link>
            <Link className="tabbar__btn" to="/search">🔍</Link>
            <Link className="tabbar__btn" to="/cart">🛒</Link>
            <Link className="tabbar__btn" to="/profile">👤</Link>
          </nav>
        </StoreProvider>
      </div>
    </div>
  );
} 