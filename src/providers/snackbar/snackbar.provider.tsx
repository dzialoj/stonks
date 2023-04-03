import React, { createContext, useState, useContext } from 'react';

interface Snackbar {
  message: string;
  type: 'success' | 'error' | 'info';
  show: boolean;
}

interface SnackbarContextProps {
  snackbar: Snackbar;
  showSnackbar: (message: string, type: 'success' | 'error' | 'info') => void;
  hideSnackbar: () => void;
}

export const SnackbarContext = createContext<SnackbarContextProps | undefined>(undefined);

const useSnackbar = (): SnackbarContextProps => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

const SnackbarProvider: React.FC<any> = ({ children }) => {
  const [snackbar, setSnackbar] = useState<Snackbar>({
    message: '',
    type: 'success',
    show: false,
  });

  const showSnackbar = (message: string, type: 'success' | 'error' | 'info') => {
    setSnackbar({
      message,
      type,
      show: true,
    });
  };

  const hideSnackbar = () => {
    setSnackbar({
      message: '',
      type: 'success',
      show: false,
    });
  };

  return (
    <SnackbarContext.Provider value={{ snackbar, showSnackbar, hideSnackbar }}>
      {children}
      <div className='snackbar'></div>
    </SnackbarContext.Provider>
  );
};

export { SnackbarProvider, useSnackbar };
