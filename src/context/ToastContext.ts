import { createContext } from 'react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastItem {
  id: string;
  message: string;
  type?: ToastType;
  action?: ToastAction;
  duration?: number;
}

export interface ToastOptions {
  type?: ToastType;
  action?: ToastAction;
  duration?: number;
}

export interface ToastContextType {
  showToast: (
    message: string,
    options?: ToastOptions | ToastType,
    undoCallback?: () => void
  ) => void;
  hideToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);
