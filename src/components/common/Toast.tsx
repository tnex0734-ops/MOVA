import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import {
  ToastContext,
  ToastItem,
  ToastOptions,
  ToastType,
  ToastAction,
} from '../../context/ToastContext';


export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (
      message: string,
      options?: ToastOptions | ToastType,
      undoCallback?: () => void
    ) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
      
      let toastType: ToastType = 'info';
      let toastAction: ToastAction | undefined;
      let toastDuration = 4500;

      if (typeof options === 'string') {
        toastType = options;
        if (undoCallback) {
          toastAction = {
            label: 'Undo',
            onClick: undoCallback,
          };
        }
      } else if (options) {
        toastType = options.type || 'info';
        toastAction = options.action;
        if (options.duration) toastDuration = options.duration;
      }

      const newToast: ToastItem = {
        id,
        message,
        type: toastType,
        action: toastAction,
        duration: toastDuration,
      };

      setToasts((prev) => [...prev.slice(-3), newToast]); // keep max 4

      if (newToast.duration && newToast.duration > 0) {
        setTimeout(() => {
          hideToast(id);
        }, newToast.duration);
      }
    },
    [hideToast]
  );

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {/* Toast Render Viewport */}
      <div
        className="fixed bottom-6 right-6 z-[99999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
        aria-live="polite"
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
              className={`pointer-events-auto p-4 rounded-2xl shadow-lg border flex items-center justify-between gap-3 text-sm font-medium ${
                toast.type === 'success'
                  ? 'bg-white border-emerald-200 text-emerald-950'
                  : toast.type === 'error'
                  ? 'bg-white border-rose-200 text-rose-950'
                  : 'bg-white border-black/[0.08] text-mova-nearblack'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                {toast.type === 'info' && <Info className="w-4 h-4 text-mova-maroon shrink-0" />}
                <span className="truncate">{toast.message}</span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {toast.action && (
                  <button
                    onClick={() => {
                      toast.action?.onClick();
                      hideToast(toast.id);
                    }}
                    className="text-xs font-bold px-2.5 py-1 rounded-md bg-mova-maroon text-white hover:bg-mova-maroon-hover active:scale-95 transition-all"
                  >
                    {toast.action.label}
                  </button>
                )}
                <button
                  onClick={() => hideToast(toast.id)}
                  aria-label="Dismiss notification"
                  className="w-6 h-6 rounded-full flex items-center justify-center text-mova-muted hover:text-mova-nearblack transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
