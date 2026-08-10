import { useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import styles from './BaseModal.module.css';

type Props = {
  hidden: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
  className?: string;
};

export function BaseModal(props: Props) {
  const state = props.hidden ? 'closed' : 'open';
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const touchStateRef = useRef({ active: false, startY: 0, startTime: 0 });
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const getHeights = () => {
    const modalHeight = overlayRef.current?.offsetHeight ?? 200;
    const headerHeight = headerRef.current?.offsetHeight ?? 50;
    return { modalHeight, headerHeight };
  };

  const closeAndReset = () => {
    setDragOffset(0);
    setIsDragging(false);
    touchStateRef.current = { active: false, startY: 0, startTime: 0 };
    props.onClose();
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (props.hidden) return;
    touchStateRef.current.active = true;
    touchStateRef.current.startY = e.touches[0].pageY;
    touchStateRef.current.startTime = Date.now();
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStateRef.current.active) return;
    const diff = e.touches[0].pageY - touchStateRef.current.startY;
    if (diff <= 0) return;
    e.preventDefault();
    setDragOffset(diff);
    const { modalHeight, headerHeight } = getHeights();
    if (diff > modalHeight - headerHeight) {
      closeAndReset();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStateRef.current.active) return;
    const { modalHeight } = getHeights();
    const timeDiff = Date.now() - touchStateRef.current.startTime;
    const distanceDiff = e.changedTouches[0].pageY - touchStateRef.current.startY;
    const fastSwipe =
      timeDiff * distanceDiff < 40000 &&
      timeDiff < 500 &&
      distanceDiff > 30;
    const longSwipe = distanceDiff > modalHeight / 2 - modalHeight / 10;

    if (fastSwipe || longSwipe) {
      closeAndReset();
      return;
    }

    setDragOffset(0);
    setIsDragging(false);
    touchStateRef.current.active = false;
  };

  const overlayStyle = useMemo<React.CSSProperties | undefined>(() => {
    if (props.hidden || !isDragging) return undefined;
    return {
      transform: `translateY(${dragOffset}px)`,
    };
  }, [dragOffset, isDragging, props.hidden]);

  return (
    <div
      className={[styles.modal, props.className].filter(Boolean).join(' ')}
      data-state={state}
      data-dragging={isDragging ? 'true' : 'false'}
      aria-hidden={props.hidden}
      ref={overlayRef}
      style={overlayStyle}
    >
      <div
        className={styles.header}
        ref={headerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles.headerLeft}>{props.headerLeft}</div>
        <h1 className={styles.headerTitle}>{props.title}</h1>
        <div className={styles.headerRight}>
          {props.headerRight}
          <button className={styles.headerCloseButton} onClick={closeAndReset}>
            閉じる
          </button>
        </div>
      </div>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
}
