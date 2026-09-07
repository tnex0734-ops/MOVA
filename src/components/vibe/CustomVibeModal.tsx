import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles, Check } from 'lucide-react';

interface CustomVibeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveCustomVibe: (customVibeText: string) => void;
  initialValue?: string;
}

export const CustomVibeModal: React.FC<CustomVibeModalProps> = ({
  isOpen,
  onClose,
  onSaveCustomVibe,
  initialValue = '',
}) => {
  const [vibeText, setVibeText] = useState(initialValue);

  if (!isOpen) return null;

  const PRESETS = [
    '☕ Chai & reading outside',
    '📚 Deep study sprint until 9 PM',
    '🏸 Looking for badminton partner',
    '🎸 Jamming in hostel lobby',
    '🍕 Grabbing quick dinner nearby',
    '🚶 Sunset terrace walk',
  ];

  const handleSave = (textToSave?: string) => {
    const finalVal = textToSave || vibeText;
    if (finalVal.trim()) {
      onSaveCustomVibe(finalVal.trim());
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-mova-nearblack/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="custom-vibe-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-black/[0.08]"
      >
        <button
          onClick={onClose}
          aria-label="Close custom vibe modal"
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black/[0.03] hover:bg-black/[0.06] text-mova-muted hover:text-mova-nearblack flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-mova-gold flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-mova-maroon" />
            Custom Situation
          </span>
        </div>

        <h2 id="custom-vibe-title" className="font-crayon text-2xl font-bold text-mova-maroon mb-1">
          What are you up for?
        </h2>
        <p className="text-xs text-mova-muted mb-4">
          Set an exact status to let people nearby know your intention.
        </p>

        <div className="mb-4">
          <input
            type="text"
            placeholder="e.g. Studying until 9 PM, Need chess partner..."
            value={vibeText}
            onChange={(e) => setVibeText(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-black/[0.02] border border-black/[0.08] focus:border-mova-maroon focus:bg-white text-sm font-medium focus:ring-2 focus:ring-mova-maroon/20 focus:outline-none transition-all"
            maxLength={60}
          />
        </div>

        <div className="mb-6">
          <div className="text-[11px] font-bold uppercase tracking-wider text-mova-muted mb-2">
            Quick Examples
          </div>
          <div className="flex flex-wrap gap-1.5">
            {PRESETS.map((preset) => (
              <button
                key={preset}
                onClick={() => {
                  setVibeText(preset);
                  handleSave(preset);
                }}
                className="text-xs px-2.5 py-1.5 rounded-xl bg-black/[0.02] hover:bg-black/[0.06] border border-black/[0.05] text-mova-nearblack transition-colors text-left"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-mova-muted hover:text-mova-nearblack"
          >
            Cancel
          </button>
          <button
            onClick={() => handleSave()}
            disabled={!vibeText.trim()}
            className="px-5 py-2.5 rounded-xl bg-mova-maroon hover:bg-mova-maroon-hover disabled:opacity-40 text-white font-bold text-xs shadow-sm active:scale-95 transition-all flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Set Vibe</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
