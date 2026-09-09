import React, { useState, useRef } from 'react';
import { X, MapPin, Clock, Camera, Upload, Trash2 } from 'lucide-react';
import { Button } from '../common/Button';
import { VibeId, Moment } from '../../types/mova';
import { CANONICAL_VIBES } from '../../data/mockVibes';
import { validateMomentTitle, validateLocation, sanitizeText } from '../../lib/validation';
import { Icon3D } from '../common/Icon3D';
import { useFocusTrap } from '../../hooks/useFocusTrap';

interface SparkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateMoment: (moment: Moment) => void;
  defaultVibeId?: VibeId | 'all';
  initialTitle?: string;
}

const SAMPLE_PHOTOS = [
  { label: '☕ Chai & Snacks', url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80' },
  { label: '🌅 Sunset Terrace', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80' },
  { label: '📚 Study Sprint', url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80' },
  { label: '🎸 Jam Corner', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80' },
];

export const SparkModal: React.FC<SparkModalProps> = ({
  isOpen,
  onClose,
  onCreateMoment,
  defaultVibeId = 'spontaneous',
  initialTitle = '',
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [location, setLocation] = useState('');
  const [vibeId, setVibeId] = useState<VibeId>(
    defaultVibeId === 'all' ? 'spontaneous' : defaultVibeId
  );
  const [duration, setDuration] = useState<number>(30);
  const [maxCapacity, setMaxCapacity] = useState<number | undefined>(undefined);
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [isDraggingPhoto, setIsDraggingPhoto] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);

  const titleInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasDraft = title.trim().length > 0 || location.trim().length > 0 || photoUrl.length > 0;

  const handleRequestClose = () => {
    if (hasDraft) {
      setShowDiscardConfirm(true);
    } else {
      onClose();
    }
  };

  const handleConfirmDiscard = () => {
    setShowDiscardConfirm(false);
    setTitle('');
    setLocation('');
    setPhotoUrl('');
    setError(null);
    onClose();
  };

  const modalRef = useFocusTrap<HTMLDivElement>({
    isOpen,
    onClose: handleRequestClose,
    initialFocusRef: titleInputRef,
  });


  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingPhoto(false);
    const file = e.dataTransfer.files?.[0];
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

    const titleVal = validateMomentTitle(title);
    if (!titleVal.isValid) {
      setError(titleVal.error || 'Invalid title');
      return;
    }

    const locVal = validateLocation(location);
    if (!locVal.isValid) {
      setError(locVal.error || 'Invalid location');
      return;
    }

    const newMoment: Moment = {
      id: `moment-spark-${Date.now()}`,
      title: sanitizeText(title),
      vibeId,
      location: sanitizeText(location),
      participantCount: 1,
      maxParticipants: maxCapacity,
      remainingMinutes: duration,
      status: 'active',
      activityLevel: 'active',
      description: `Spontaneous moment sparked right now!`,
      photoUrl: photoUrl || undefined,
      geo: {
        lat: 37.8719 + (Math.random() - 0.5) * 0.003,
        lng: -122.2585 + (Math.random() - 0.5) * 0.004,
      },
      distanceMeters: Math.floor(Math.random() * 180) + 60,
      walkingMinutes: 2,
      initiator: {
        id: 'user-arun',
        name: 'Arun K.',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        role: 'Host',
        joinedAt: 'Just now',
      },
      participants: [
        {
          id: 'user-arun',
          name: 'Arun K.',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
          joinedAt: 'Just now',
        },
      ],
      tags: ['spontaneous', 'new', vibeId],
      coordinates: {
        x: Math.floor(Math.random() * 60) + 20,
        y: Math.floor(Math.random() * 60) + 20,
      },
      createdAt: 'Just now',
      isJoined: true,
    };

    onCreateMoment(newMoment);
    setTitle('');
    setLocation('');
    setPhotoUrl('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-mova-nearblack/50 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="spark-modal-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-xl bg-white rounded-3xl sm:rounded-drawer p-6 sm:p-9 shadow-2xl border border-black/[0.06] overflow-y-auto max-h-[85vh] sm:max-h-[88vh]"
      >
        
        {/* Close Button */}
        <button
          onClick={handleRequestClose}
          aria-label="Close spark modal"
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-black/[0.03] flex items-center justify-center text-mova-muted hover:text-mova-nearblack hover:bg-black/[0.06] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Unsaved Changes Confirmation Dialog Overlay */}
        {showDiscardConfirm && (
          <div className="absolute inset-0 z-30 bg-white/95 backdrop-blur-sm p-6 sm:p-8 flex flex-col items-center justify-center text-center animate-fadeIn">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
              <X className="w-6 h-6" />
            </div>
            <h3 className="font-crayon text-2xl font-bold text-mova-ocean mb-1">Discard this Moment?</h3>
            <p className="text-xs text-mova-muted max-w-xs mb-6">
              You have an unfinished moment draft. If you close now, your title, spot, and photo will not be saved.
            </p>
            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                size="md"
                onClick={() => setShowDiscardConfirm(false)}
                className="text-xs font-semibold"
              >
                Keep Editing
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleConfirmDiscard}
                className="text-xs font-bold bg-red-600 hover:bg-red-700 border-red-600"
              >
                Discard Draft
              </Button>
            </div>
          </div>
        )}

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-mova-orange-light/80 flex items-center justify-center shadow-xs">
            <Icon3D name="spark" size="md" />
          </div>
          <div>
            <h2 id="spark-modal-title" className="font-crayon text-2xl sm:text-3xl font-bold text-mova-ocean leading-tight">
              Spark a Moment
            </h2>
            <p className="font-crayon text-sm sm:text-base text-mova-ocean/85 font-semibold">
              Don't ask who to follow. Start what's happening.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-50 text-red-700 text-xs font-medium border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          {/* Moment Title */}
          <div>
            <label htmlFor="spark-title" className="block text-xs font-bold uppercase tracking-wider text-mova-muted mb-2">
              What is happening? <span className="text-mova-ocean">*</span>
            </label>
            <input
              id="spark-title"
              ref={titleInputRef}
              type="text"
              placeholder="e.g. Badminton doubles need 2, Chai run at canteen..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl bg-black/[0.02] focus:bg-white border border-black/[0.08] focus:border-mova-ocean text-sm font-medium focus:ring-2 focus:ring-mova-ocean/20 focus:outline-none transition-all"
              maxLength={80}
              required
            />
            <div className="flex items-center justify-between text-[11px] text-mova-muted mt-1 px-1">
              <span>Short, action-focused activity title</span>
              <span className={title.length > 70 ? 'text-mova-orange font-bold' : ''}>
                {title.length}/80
              </span>
            </div>
          </div>

          {/* Picture Upload Area */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-mova-muted mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Camera className="w-3.5 h-3.5 text-mova-ocean" />
                <span>Moment Picture (Photo Proof)</span>
              </span>
              <span className="text-[10px] text-mova-muted font-normal">Optional</span>
            </label>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {photoUrl ? (
              <div className="relative rounded-2xl overflow-hidden border border-mova-ice-border group h-36">
                <img
                  src={photoUrl}
                  alt="Moment Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-full bg-white text-xs font-bold text-mova-nearblack shadow-sm flex items-center gap-1"
                  >
                    <Upload className="w-3.5 h-3.5" /> Replace
                  </button>
                  <button
                    type="button"
                    onClick={() => setPhotoUrl('')}
                    aria-label="Remove uploaded photo"
                    className="p-1.5 rounded-full bg-red-600 text-white shadow-sm hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    title="Remove Photo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div
                role="button"
                tabIndex={0}
                onDragOver={(e) => { e.preventDefault(); setIsDraggingPhoto(true); }}
                onDragLeave={() => setIsDraggingPhoto(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
                aria-label="Drop a photo or browse device"
                className={`p-4 rounded-2xl border-2 border-dashed text-center cursor-pointer transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-mova-ocean ${
                  isDraggingPhoto
                    ? 'border-mova-ocean bg-mova-ice-soft'
                    : 'border-mova-ice-border hover:border-mova-ocean/50 bg-mova-ice-soft/40'
                }`}
              >
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-10 h-10 rounded-full bg-mova-ice-soft flex items-center justify-center text-mova-ocean">
                    <Icon3D name="photo" size="sm" />
                  </div>
                  <span className="text-xs font-bold text-mova-ocean">
                    Drop a photo or browse device
                  </span>
                  <span className="text-[10px] text-mova-muted">
                    Supports JPG, PNG, WEBP
                  </span>
                </div>
              </div>
            )}

            {/* Quick Sample Presets */}
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-bold text-mova-muted uppercase mr-1">Quick Select:</span>
              {SAMPLE_PHOTOS.map((sample) => (
                <button
                  key={sample.label}
                  type="button"
                  onClick={() => setPhotoUrl(sample.url)}
                  aria-label={`Select sample photo: ${sample.label}`}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-mova-ocean ${
                    photoUrl === sample.url
                      ? 'bg-mova-ocean text-white shadow-xs'
                      : 'bg-mova-ice-soft text-mova-ocean hover:bg-mova-ice'
                  }`}
                >
                  {sample.label}
                </button>
              ))}
            </div>
          </div>

          {/* Vibe Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-mova-muted mb-1.5">
              Match with a Vibe
            </label>
            <div className="grid grid-cols-4 gap-2">
              {CANONICAL_VIBES.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVibeId(v.id)}
                  className={`group flex flex-col items-center justify-center p-2 rounded-xl text-xs font-bold transition-all ${
                    vibeId === v.id
                      ? 'bg-mova-ocean text-white shadow-sm ring-2 ring-mova-ocean'
                      : 'bg-mova-ice-soft text-mova-ocean hover:bg-mova-ice border border-mova-ice-border'
                  }`}
                >
                  {v.icon3d ? (
                    <Icon3D name={v.icon3d} size="sm" fallbackText={v.icon} />
                  ) : (
                    <span className="text-lg">{v.icon}</span>
                  )}
                  <span className="text-[10px] mt-1 truncate max-w-full">{v.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Location and Duration Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="spark-location" className="block text-xs font-bold uppercase tracking-wider text-mova-muted mb-1.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-mova-ocean" />
                <span>Exact Spot</span>
              </label>
              <input
                id="spark-location"
                type="text"
                placeholder="e.g. Block B Canteen, Court 2"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-mova-ice-border text-xs font-medium focus:ring-2 focus:ring-mova-ocean focus:outline-none transition-all"
                maxLength={60}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-mova-muted mb-1.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-mova-orange" />
                <span>Time Window</span>
              </label>
              <div className="flex gap-1.5">
                {[15, 30, 45, 60].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setDuration(mins)}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                      duration === mins
                        ? 'bg-mova-ocean text-white shadow-xs'
                        : 'bg-mova-ice-soft text-mova-ocean border border-mova-ice-border hover:bg-mova-ice'
                    }`}
                  >
                    {mins}m
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Group Capacity Setting */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-mova-muted mb-1.5 flex items-center justify-between">
              <span>Group Size / Max Capacity</span>
              <span className="text-[10px] text-mova-muted font-normal">
                {maxCapacity ? `Max ${maxCapacity} people` : 'Open / No limit'}
              </span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: 'Open', val: undefined },
                { label: '4 (Squad)', val: 4 },
                { label: '8 (Group)', val: 8 },
                { label: '16 (Party)', val: 16 },
              ].map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => setMaxCapacity(opt.val)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    maxCapacity === opt.val
                      ? 'bg-mova-ocean text-white shadow-xs'
                      : 'bg-mova-ice-soft text-mova-ocean border border-mova-ice-border hover:bg-mova-ice'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2 mt-2 border-t border-mova-border flex items-center justify-end gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={handleRequestClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md" className="font-semibold shadow-md">
              Launch Moment Now
            </Button>
          </div>

        </form>

      </div>
    </div>
  );
};
