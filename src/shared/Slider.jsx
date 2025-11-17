import { useEffect, useMemo, useRef } from 'react';

export default function Slider({ children, interval = 3500, autoplay = true }) {
  const base = useMemo(() => (Array.isArray(children) ? children : [children]), [children]);
  const groups = 3;
  const slides = useMemo(() => Array.from({ length: groups }, () => base).flat(), [base]);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || base.length === 0) return;

    const slideW = () => el.clientWidth;
    const groupW = () => base.length * slideW();
    const totalW = () => slides.length * slideW();

    const gotoMiddle = () => {
      el.style.scrollSnapType = 'none';
      el.scrollTo({ left: groupW(), behavior: 'auto' });
      requestAnimationFrame(() => (el.style.scrollSnapType = 'x mandatory'));
    };
    gotoMiddle();

    const onScroll = () => {
      const left = el.scrollLeft;
      const pad = slideW() * 0.75;
      if (left <= pad) {
        el.style.scrollSnapType = 'none';
        el.scrollTo({ left: left + groupW(), behavior: 'auto' });
        requestAnimationFrame(() => (el.style.scrollSnapType = 'x mandatory'));
      } else if (left >= totalW() - pad) {
        el.style.scrollSnapType = 'none';
        el.scrollTo({ left: left - groupW(), behavior: 'auto' });
        requestAnimationFrame(() => (el.style.scrollSnapType = 'x mandatory'));
      }
    };

    let timer = null;
    const start = () => {
      if (!autoplay) return;
      stop();
      timer = setInterval(() => {
        el.scrollTo({ left: el.scrollLeft + slideW(), behavior: 'smooth' });
      }, interval);
    };
    const stop = () => { if (timer) clearInterval(timer); timer = null; };

    el.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('pointerdown', stop, { passive: true });
    window.addEventListener('pointerup', start, { passive: true });
    window.addEventListener('resize', gotoMiddle);

    start();
    return () => {
      stop();
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('pointerdown', stop);
      window.removeEventListener('pointerup', start);
      window.removeEventListener('resize', gotoMiddle);
    };
  }, [base.length, slides.length, autoplay, interval]);

  return (
    <div className="slider" ref={ref} aria-roledescription="carousel">
      {slides.map((node, i) => (
        <div className="slider__slide" key={i}>{node}</div>
      ))}
    </div>
  );
}