import React from 'react';
import { motion } from 'framer-motion';
import { X, Bell, Sparkles, Users, Clock } from 'lucide-react';
import { ActivityNotification } from '../../types/mova';

interface ActivityDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: ActivityNotification[];
  onSelectNotification?: (notification: ActivityNotification) => void;
  onClearAll?: () => void;
}

export const ActivityDrawer: React.FC<ActivityDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onSelectNotification,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="activity-drawer-title"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 bg-mova-nearblack/50 backdrop-blur-sm"
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 350 }}
        className="relative w-full max-w-md h-full bg-white border-l border-black/[0.08] shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto z-10"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-black/[0.05] mb-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-mova-gold flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-mova-maroon" />
                Meaningful Activity
              </span>
              {notifications.length > 0 && (
                <span className="font-mono-tabular text-[10px] font-bold px-2 py-0.5 rounded-full bg-mova-maroon text-white">
                  {notifications.length}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {notifications.length > 0 && onClearAll && (
                <button
                  onClick={onClearAll}
                  className="text-xs text-mova-muted hover:text-mova-maroon font-semibold mr-1"
                >
                  Clear all
                </button>
              )}
              <button
                onClick={onClose}
                aria-label="Close activity drawer"
                className="w-8 h-8 rounded-full bg-black/[0.03] hover:bg-black/[0.06] text-mova-muted hover:text-mova-nearblack flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Activity List */}
          {notifications.length === 0 ? (
            <div className="py-16 text-center flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-black/[0.03] flex items-center justify-center text-mova-muted mb-3">
                <Bell className="w-6 h-6 opacity-40" />
              </div>
              <h3 className="font-crayon text-xl text-mova-nearblack mb-1">
                Nothing new yet.
              </h3>
              <p className="text-xs text-mova-muted max-w-xs leading-relaxed">
                Spontaneous things happen fast. When people join your situations or drops trigger, you'll see them here.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelectNotification?.(notif)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectNotification?.(notif);
                    }
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col gap-1.5 ${
                    !notif.read
                      ? 'bg-mova-maroon/[0.04] border-mova-maroon/20 hover:bg-mova-maroon/[0.07]'
                      : 'bg-black/[0.02] hover:bg-black/[0.04] border-black/[0.05]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-mova-maroon flex items-center gap-1.5">
                      {!notif.read && <span className="w-2 h-2 rounded-full bg-mova-orange animate-pulse" />}
                      {notif.type === 'join' && <Users className="w-3.5 h-3.5" />}
                      {notif.type === 'drop_start' && <Sparkles className="w-3.5 h-3.5 text-mova-gold" />}
                      {notif.type === 'moment_closed' && <Clock className="w-3.5 h-3.5 text-mova-muted" />}
                      {notif.title}
                    </span>
                    <span className="text-[10px] font-mono-tabular text-mova-muted">
                      {notif.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-mova-nearblack leading-relaxed">
                    {notif.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-black/[0.05]">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-black/[0.03] hover:bg-black/[0.06] font-bold text-xs text-mova-nearblack transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};
