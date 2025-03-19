import React, { useCallback } from 'react';
import { ModalProps } from './types';
import { cn } from '@/utils';
import { useLockBodyScroll } from '@/app/_hooks/useLockBodyScroll';

export function Modal({ size = 'sm', children, hideBodyScrollBar, onClose, closeOnOutSideClick, isOpen }: ModalProps) {
  useLockBodyScroll(hideBodyScrollBar && isOpen);

  const handleLayoutClick = useCallback(() => {
    if (closeOnOutSideClick) onClose();
  }, [closeOnOutSideClick, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={handleLayoutClick}
      className='fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300'
    >
      <div
        onClick={e => e.stopPropagation()}
        className={cn('relative z-[1000] m-4 p-4', {
          'w-1/3': size === 'sm',
          'w-2/5': size === 'md',
          'w-3/5': size === 'lg',
        })}
      >
        {children}
      </div>
    </div>
  );
}
