import React, { createContext, useContext, useState, ReactNode } from 'react';

type ModalContextType = {
  isModalOpen: boolean;
  openModal: (subject?: string) => void;
  closeModal: () => void;
  subject: string;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subject, setSubject] = useState('');

  const openModal = (subj = '') => {
    setSubject(subj);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSubject('');
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal, subject }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within a ModalProvider');
  return context;
}
