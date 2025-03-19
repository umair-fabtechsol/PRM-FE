import React from 'react';

const useModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const openModal = React.useCallback(() => setIsOpen(true), []);
  const closeModal = React.useCallback(() => setIsOpen(false), []);

  return { isOpen, openModal, closeModal };
};

export { useModal };
