import { useState, useCallback } from 'react';

export function useConfirm() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState({
    title: '',
    message: '',
    onConfirm: () => {},
    type: 'danger'
  });

  const confirm = useCallback(({ title, message, onConfirm, type = 'danger' }) => {
    return new Promise((resolve) => {
      setConfig({
        title,
        message,
        onConfirm: () => {
          onConfirm();
          resolve(true);
        },
        type
      });
      setIsOpen(true);
    });
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    confirm,
    close,
    config
  };
}