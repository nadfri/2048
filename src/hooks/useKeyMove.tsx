import { useEffect, useCallback } from 'react';
import { useStoreBoard } from '@/store/useStoreBoard';
import { Directions } from '@/types/types';

export function useKeyMove() {
  const { handleMove } = useStoreBoard();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const direction = event.key as Directions;
      handleMove(direction);
    },
    [handleMove],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return {};
}
