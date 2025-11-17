import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const StoreCtx = createContext(null);

const LS_KEYS = {
  CART: 'shop_cart',
  FAVS: 'shop_favorites',
  USER: 'shop_user',
};

export function StoreProvider({ children }) {
  const [cart, setCart]         = useState(() => JSON.parse(localStorage.getItem(LS_KEYS.CART) || '[]'));
  const [favorites, setFavs]    = useState(() => JSON.parse(localStorage.getItem(LS_KEYS.FAVS) || '[]'));
  const [user, setUser]         = useState(() => JSON.parse(localStorage.getItem(LS_KEYS.USER) || 'null'));
  const [twofa, setTwofa]       = useState(null); // {email, code}

  // persist
  useEffect(() => localStorage.setItem(LS_KEYS.CART, JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem(LS_KEYS.FAVS, JSON.stringify(favorites)), [favorites]);
  useEffect(() => localStorage.setItem(LS_KEYS.USER, JSON.stringify(user)), [user]);

  /* =========================
     CART
     ========================= */
  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const idx = prev.findIndex(x => x.id === product.id);
      if (idx >= 0) {
        const clone = [...prev];
        clone[idx] = { ...clone[idx], qty: clone[idx].qty + qty };
        return clone;
      }
      return [...prev, { ...product, qty }];
    });
  };
  const removeFromCart = id => setCart(prev => prev.filter(p => p.id !== id));
  const changeQty = (id, qty) => setCart(prev => prev.map(p => (p.id === id ? { ...p, qty: Math.max(1, qty) } : p)));
  const clearCart = () => setCart([]);

  /* =========================
     FAVORITES
     ========================= */
  const isFav = id => favorites.some(f => f.id === id);
  const toggleFavorite = product => {
    setFavs(prev => {
      if (prev.some(p => p.id === product.id)) return prev.filter(p => p.id !== product.id);
      return [{ ...product }, ...prev];
    });
  };
  const clearFavorites = () => setFavs([]);

  /* =========================
     AUTH (фейковая 2FA)
     ========================= */
  const request2FA = (email, pass) => {
    if (!email || !pass || pass.length < 6) throw new Error('Неверные e-mail или пароль.');
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setTwofa({ email, code });
    return code;
  };

  const confirm2FA = (code, email) => {
    if (!twofa) throw new Error('Сначала запросите код.');
    if (twofa.email !== email) throw new Error('E-mail не совпадает.');
    if (twofa.code !== code) throw new Error('Неверный код.');
    setUser({ email });
    setTwofa(null);
  };

  const logout = () => setUser(null);
  const clear2FA = () => setTwofa(null);

  const value = useMemo(
    () => ({
      // state
      state: {
        cart,
        favorites,
        user,
        twofa,
      },

      // cart
      addToCart,
      removeFromCart,
      changeQty,
      clearCart,

      // favorites
      isFav,
      toggleFavorite,
      clearFavorites,

      // auth
      request2FA,
      confirm2FA,
      logout,
      clear2FA,
    }),
    [cart, favorites, user, twofa]
  );

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export const useStore = () => useContext(StoreCtx);