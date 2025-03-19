import React from 'react';

export type ModalProps = {
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  hideBodyScrollBar?: boolean;
  isOpen: boolean;
  onClose?: () => void;
  closeOnOutSideClick: boolean;
} & (
  | {
      closeOnOutSideClick: true;
      onClose: () => void;
    }
  | {
      closeOnOutSideClick: false;
      onClose?: never;
    }
);
