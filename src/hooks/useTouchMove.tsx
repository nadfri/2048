import { useStoreBoard } from '@/store/useStoreBoard';
import { determineSwipeDirection } from '@/utils/utils';
import { useRef, useCallback, useEffect } from 'react';

export function useTouchMove(ref: React.RefObject<HTMLDivElement>) {
  const { handleMove } = useStoreBoard();

  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);

  const handleTouchStart = useCallback((event: TouchEvent) => {
    event.preventDefault();

    touchStartX.current = event.touches[0].clientX;
    touchStartY.current = event.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (event: TouchEvent) => {
      if (!touchStartX.current || !touchStartY.current) return;

      const touchEndX = event.changedTouches[0].clientX;
      const touchEndY = event.changedTouches[0].clientY;

      const deltaX = touchEndX - touchStartX.current;
      const deltaY = touchEndY - touchStartY.current;

      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      if (Math.max(absDeltaX, absDeltaY) < 30) return;

      const direction = determineSwipeDirection(deltaX, deltaY);
      handleMove(direction);

      touchStartX.current = 0;
      touchStartY.current = 0;
    },
    [handleMove],
  );

  useEffect(() => {
    const boardRef = ref.current;

    if (boardRef) {
      boardRef.addEventListener('touchstart', handleTouchStart, {
        passive: false,
      });
      boardRef.addEventListener('touchend', handleTouchEnd, { passive: false });
    }
    return () => {
      if (boardRef) {
        boardRef.removeEventListener('touchstart', handleTouchStart);
        boardRef.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [handleTouchStart, handleTouchEnd, ref]);
}
