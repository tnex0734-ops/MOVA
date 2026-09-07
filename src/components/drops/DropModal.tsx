import React, { useState, useRef } from 'react';
import { Drop } from '../../types/mova';
import { X, Check, Camera, Upload, Trash2 } from 'lucide-react';
import { Button } from '../common/Button';
import { formatSecondsToTimer } from '../../lib/utils';
import { sanitizeText } from '../../lib/validation';
import { Icon3D } from '../common/Icon3D';
import { useFocusTrap } from '../../hooks/useFocusTrap';

interface DropModalProps {
  isOpen: boolean;
  drop: Drop | null;
  onClose: () => void;
  onSubmitContribution: (dropId: string, content: string, type: 'photo' | 'text' | 'voice', mediaUrl?: string) => void;
}

const SAMPLE_DROP_PHOTOS = [
  { label: '🌅 Sky View', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80' },
  { label: '☕ Desk POV', url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80' },
  { label: '🌿 Lawn Vibes', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80' },
];

export const DropModal: React.FC<DropModalProps> = ({
  isOpen,
  drop,
  onClose,
  onSubmitContribution,
}) => {
  const [type, setType] = useState<'photo' | 'text' | 'voice'>('photo');
  const [content, setContent] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string>(SAMPLE_DROP_PHOTOS[0].url);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const modalRef = useFocusTrap<HTMLDivElement>({
    isOpen,
    onClose,
  });

  if (!isOpen || !drop) return null;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotoUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && type === 'text') return;

    onSubmitContribution(
      drop.id,
      sanitizeText(content) || (type === 'photo' ? 'Live Camera Snapshot' : '0:12 Live Voice Drop'),
      type,
      type === 'photo' ? photoUrl : undefined
    );

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setContent('');
      onClose();
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-mova-nearblack/50 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drop-modal-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-lg bg-white rounded-3xl sm:rounded-drawer p-5 sm:p-7 shadow-2xl border border-mova-ice-border overflow-y-auto max-h-[90dvh]"
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close drop modal"
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-mova-ice-soft flex items-center justify-center text-mova-muted hover:text-mova-nearblack transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Drop Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Icon3D name="spark" size="xs" />
            <span className="text-xs font-bold uppercase tracking-wider text-mova-ocean">
              Live Synchronized Community Drop
            </span>
          </div>

          <span className="font-mono-tabular text-xs font-extrabold px-2.5 py-1 rounded-pill bg-mova-ocean text-white flex items-center gap-1.5 shadow-sm">
            <Icon3D name="clock" size="xs" />
            <span>{formatSecondsToTimer(drop.remainingSeconds)}</span>
          </span>
        </div>

        <h2 id="drop-modal-title" className="font-crayon text-2xl sm:text-3xl font-bold text-mova-ocean leading-tight mb-2">
          "{drop.prompt}"
        </h2>
        <p className="text-xs text-mova-muted mb-5">
          At this exact moment, campus is dropping their live perspective together.
        </p>

        {drop.status === 'completed' || drop.remainingSeconds <= 0 ? (
          <div className="flex flex-col gap-4">
            <div className="p-4 rounded-2xl bg-mova-ice-soft/60 border border-mova-ice-border">
              <span className="text-[10px] font-bold uppercase tracking-wider text-mova-muted block mb-1">
                Synchronized Capsule Gallery
              </span>
              <p className="text-xs text-mova-ocean font-medium">
                This 5-minute drop has concluded. Below are the synchronous perspectives contributed by the campus collective.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {(drop.previewImages.length > 0 ? drop.previewImages : SAMPLE_DROP_PHOTOS.map(s => s.url)).map((img, idx) => (
                <div key={idx} className="relative rounded-2xl overflow-hidden border border-mova-ice-border shadow-xs group">
                  <img src={img} alt={`Perspective ${idx + 1}`} className="w-full h-28 object-cover group-hover:scale-105 transition-transform" />
                  <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md bg-black/60 text-white text-[9px] font-bold backdrop-blur-xs">
                    POV #{idx + 1}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-mova-border flex items-center justify-between">
              <span className="text-xs text-mova-muted font-medium">{drop.contributionsCount} total contributions archived</span>
              <Button variant="secondary" size="sm" onClick={onClose}>
                Close Gallery
              </Button>
            </div>
          </div>
        ) : drop.status === 'upcoming' ? (
          <div className="p-8 text-center flex flex-col items-center justify-center rounded-2xl bg-mova-ice-soft/40 border border-mova-ice-border">
            <div className="w-12 h-12 rounded-2xl bg-white border border-mova-ice-border flex items-center justify-center shadow-xs mb-3 text-mova-ocean">
              <Icon3D name="clock" size="md" />
            </div>
            <h3 className="font-crayon text-2xl font-bold text-mova-ocean mb-1">Coming Up Soon</h3>
            <p className="text-xs text-mova-muted max-w-sm mb-5">
              When this prompt opens, everyone on campus will have a strict 5-minute countdown window to drop their raw perspective simultaneously.
            </p>
            <Button variant="secondary" size="md" onClick={onClose}>
              Got It
            </Button>
          </div>
        ) : isSubmitted ? (
          <div className="p-8 text-center flex flex-col items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="font-crayon text-2xl font-bold text-mova-ocean">
              Dropped into the Collective!
            </h3>
            <p className="text-xs text-mova-muted mt-1">
              Your photo and perspective are now part of the synchronized collection.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Mode Selector */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setType('photo')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  type === 'photo'
                    ? 'bg-mova-ocean text-white shadow-xs'
                    : 'bg-mova-ice-soft text-mova-ocean border border-mova-ice-border hover:bg-mova-ice/50'
                }`}
              >
                <Icon3D name="photo" size="xs" />
                <span>Snap Photo</span>
              </button>

              <button
                type="button"
                onClick={() => setType('text')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  type === 'text'
                    ? 'bg-mova-ocean text-white shadow-xs'
                    : 'bg-mova-ice-soft text-mova-ocean border border-mova-ice-border hover:bg-mova-ice/50'
                }`}
              >
                <Icon3D name="text" size="xs" />
                <span>Quick Text</span>
              </button>

              <button
                type="button"
                onClick={() => setType('voice')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  type === 'voice'
                    ? 'bg-mova-ocean text-white shadow-xs'
                    : 'bg-mova-ice-soft text-mova-ocean border border-mova-ice-border hover:bg-mova-ice/50'
                }`}
              >
                <Icon3D name="voice" size="xs" />
                <span>Voice Memo</span>
              </button>
            </div>

            {/* Input area */}
            <div>
              {type === 'photo' && (
                <div className="flex flex-col gap-2.5">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />

                  {photoUrl ? (
                    <div className="relative h-44 rounded-2xl overflow-hidden border border-mova-ice-border group">
                      <img src={photoUrl} alt="Drop Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3 py-1.5 rounded-full bg-white text-xs font-bold text-mova-nearblack shadow-sm flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                          <Upload className="w-3.5 h-3.5" /> Replace Photo
                        </button>
                        <button
                          type="button"
                          onClick={() => setPhotoUrl('')}
                          aria-label="Remove uploaded drop photo"
                          className="p-1.5 rounded-full bg-red-600 text-white shadow-sm hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => fileInputRef.current?.click()}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          fileInputRef.current?.click();
                        }
                      }}
                      aria-label="Drop photo or tap to take snapshot"
                      className="p-6 rounded-2xl bg-mova-ice-soft/40 border-2 border-dashed border-mova-ice-border hover:border-mova-ocean/60 text-center flex flex-col items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-mova-ocean"
                    >
                      <Camera className="w-8 h-8 text-mova-ocean mb-2" />
                      <p className="text-xs font-bold text-mova-ocean">
                        Drop photo or tap to take snapshot
                      </p>
                      <p className="text-[11px] text-mova-muted mt-0.5">
                        Share your real live perspective in this 5-minute drop
                      </p>
                    </div>
                  )}

                  {/* Sample selection */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-mova-muted uppercase">Samples:</span>
                    {SAMPLE_DROP_PHOTOS.map((sample) => (
                      <button
                        key={sample.label}
                        type="button"
                        onClick={() => setPhotoUrl(sample.url)}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-semibold transition-all ${
                          photoUrl === sample.url
                            ? 'bg-mova-ocean text-white shadow-xs'
                            : 'bg-mova-ice-soft text-mova-ocean hover:bg-mova-ice'
                        }`}
                      >
                        {sample.label}
                      </button>
                    ))}
                  </div>

                  <input
                    type="text"
                    placeholder="Short caption (e.g. Current view from library stairs)..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-mova-ice-border text-xs font-medium focus:ring-2 focus:ring-mova-ocean focus:outline-none"
                  />
                </div>
              )}

              {type === 'voice' && (
                <div className="p-6 rounded-2xl bg-mova-ice-soft/40 border-2 border-dashed border-mova-ice-border text-center flex flex-col items-center justify-center">
                  <Icon3D name="voice" size="xl" className="mb-2" />
                  <p className="text-xs font-bold text-mova-ocean">
                    Tap to Record Voice Note
                  </p>
                  <p className="text-[11px] text-mova-muted mt-0.5">
                    10s snippet will be synced into the community drop
                  </p>
                </div>
              )}

              {type === 'text' && (
                <textarea
                  rows={3}
                  placeholder="What is directly in front of you right now?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-mova-ice-border text-xs font-medium focus:ring-2 focus:ring-mova-ocean focus:outline-none resize-none"
                  required
                />
              )}
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-mova-border">
              <Button type="button" variant="ghost" size="sm" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="md" className="font-bold shadow-md">
                <Icon3D name="spark" size="xs" />
                <span>Confirm & Drop</span>
              </Button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
