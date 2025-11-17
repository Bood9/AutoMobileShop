import { useState } from 'react';
import { useStore } from '../context/Store.jsx';
import Toast from '../shared/Toast.jsx';
import ProductCard from '../shared/ProductCard.jsx';

export default function Profile() {
  const { state, request2FA, confirm2FA, logout, clear2FA, clearFavorites } = useStore();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');
  const [code, setCode] = useState('');
  const [toast, setToast] = useState('');

  // залогинен — показываем профиль
  if (state.user) {
    const favs = state.favorites;

    return (
      <main className="screen">
        <h2 className="h2">Профиль</h2>

        {/* Шапка профиля (как было) */}
        <div className="profile-card">
          <div className="profile-head">
            <img className="profile-avatar" src="/img/drake.jpeg" alt="" />
            <div>
              <div className="profile-email">{state.user.email}</div>
              <div className="profile-status">✅ Аккаунт подтверждён</div>
            </div>
          </div>

          <div className="profile-tiles">
            <div className="tile">
              <div className="tile__icon">📦</div>
              <div className="tile__title">Заказы</div>
              <div className="tile__hint">0</div>
            </div>
            <div className="tile">
              <div className="tile__icon">🏠</div>
              <div className="tile__title">Адреса</div>
              <div className="tile__hint">добавить</div>
            </div>
            <div className="tile">
              <div className="tile__icon">💳</div>
              <div className="tile__title">Платежи</div>
              <div className="tile__hint">Visa/PayPal</div>
            </div>
          </div>
        </div>

        {/* ИЗБРАННОЕ */}
        <h3 className="h3" style={{ marginTop: 6 }}>Избранное ({favs.length})</h3>

        {favs.length === 0 ? (
          <div className="empty">Пусто. Поставьте ♥ на карточках товаров.</div>
        ) : (
          <div className="grid">
            {favs.map(p => (
              <div className="grid__item" key={p.id}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}

        {/* Безопасность + выход (как было) */}
        <div className="security-card">
          <div className="h3">Безопасность</div>

          <div className="security-row">
            <div>Пароль</div>
            <button className="btn btn--link">Изменить</button>
          </div>

          <div className="security-row">
            <div>Двухфакторная аутентификация</div>
            <span className="security-badge">Включено</span>
          </div>
        </div>

        <button className="btn btn--danger" onClick={logout}>Выйти из аккаунта</button>

        {favs.length > 0 && (
          <button className="btn" style={{ width: '100%', marginTop: 8 }} onClick={clearFavorites}>
            Очистить избранное
          </button>
        )}
      </main>
    );
  }

  /* ======= ФОРМА ВХОДА с 2FA (как было) ======= */
  const onLogin = (e) => {
    e.preventDefault();
    setErr('');
    try {
      const c = request2FA(email, pass);
      setToast(`Код подтверждения: ${c}`);
    } catch (ex) {
      setErr(ex.message);
    }
  };

  const onConfirm = (e) => {
    e.preventDefault();
    setErr('');
    try {
      confirm2FA(code.trim(), email.trim());
      setToast('Вход выполнен');
    } catch (ex) {
      setErr(ex.message);
    }
  };

  return (
    <main className="screen">
      <h2 className="h2">Вход</h2>

      {toast && <Toast text={toast} onClose={() => { setToast(''); clear2FA(); }} />}

      <form className="form form-login" onSubmit={onLogin}>
        <label className="label">E-mail</label>
        <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} required />

        <label className="label">Пароль</label>
        <div className="input input--withbtn">
          <input className="input__field" type="password" value={pass} onChange={e => setPass(e.target.value)} minLength={6} required />
          <button className="input__addon" type="button" onClick={() => setPass(p => (p ? '' : p))}>✖</button>
        </div>

        {err && <div className="form__error">{err}</div>}

        <button className="btn btn--primary" type="submit">Отправить код</button>
      </form>

      {Boolean(state.twofa) && (
        <form className="form" onSubmit={onConfirm}>
          <label className="label">Код из SMS/почты</label>
          <input className="input" type="text" value={code} onChange={e => setCode(e.target.value)} placeholder="123456" maxLength={6} />
          <button className="btn btn--primary" type="submit">Подтвердить</button>
        </form>
      )}
    </main>
  );
}