import { useEffect, useState } from 'react';

/**
 * Toast
 * - поддерживает props: message ИЛИ text
 * - авто-закрытие по duration
 * - onClose вызывается при скрытии
 */
export default function Toast({ message, text, duration = 6000, onClose }) {
  const content = message ?? text;                 // <-- ключ
  const [visible, setVisible] = useState(Boolean(content));

  useEffect(() => {
    if (!content) return;
    setVisible(true);
    const t = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);
    return () => clearTimeout(t);
  }, [content, duration, onClose]);

  if (!visible || !content) return null;

  return (
    <div className="toast" role="status" aria-live="polite">
      {content}
    </div>
  );
}