import { useState, useCallback } from 'react';
import { PanInfo } from 'framer-motion';

interface UseSwipeProps {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  swipeThreshold?: number;
}

export const useSwipe = ({
  onSwipeLeft,
  onSwipeRight,
  swipeThreshold = 100,
}: UseSwipeProps = {}) => {
  const [dragDirection, setDragDirection] = useState<'left' | 'right' | null>(null);
  const [dragDistance, setDragDistance] = useState(0);

  const handleDragStart = useCallback(() => {
    setDragDirection(null);
    setDragDistance(0);
  }, []);

  const handleDrag = useCallback((_, info: PanInfo) => {
    setDragDistance(info.offset.x);
    setDragDirection(info.offset.x > 0 ? 'right' : 'left');
  }, []);

  const handleDragEnd = useCallback(
    (_, info: PanInfo) => {
      if (Math.abs(info.offset.x) > swipeThreshold) {
        if (info.offset.x > 0 && onSwipeRight) {
          onSwipeRight();
        } else if (info.offset.x < 0 && onSwipeLeft) {
          onSwipeLeft();
        }
      }
      setDragDirection(null);
      setDragDistance(0);
    },
    [onSwipeLeft, onSwipeRight, swipeThreshold]
  );

  return {
    dragDirection,
    dragDistance,
    handlers: {
      onDragStart: handleDragStart,
      onDrag: handleDrag,
      onDragEnd: handleDragEnd,
    },
  };
};

export default useSwipe;
