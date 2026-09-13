import React, { useState, useRef } from 'react';
import { X, MapPin, Clock, Camera, Upload, Trash2, Calendar } from 'lucide-react';
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
  currentUser?: {
    id: string;
    name: string;
    avatar: string;
  };
}

const SAMPLE_PHOTOS = [
  { label: '☕ Chai & Snacks', url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80' },
  { label: '🌅 Sunset Terrace', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80' },
  { label: '📚 Study Sprint', url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80' },
  { label: '🎸 Jam Corner', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80' },
];

const getTodayISO = () => {
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, '0');
  const d = String(today.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const formatTimeTo12Hour = (time24: string): string => {
  if (!time24) return '';
  const [hStr, mStr] = time24.split(':');
  const h = parseInt(hStr, 10);
  if (isNaN(h)) return time24;
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12}:${mStr || '00'} ${period}`;
};

export const SparkModal: React.FC<SparkModalProps> = ({
  isOpen,
  onClose,
  onCreateMoment,
  defaultVibeId = 'spontaneous',
  initialTitle = '',
  currentUser,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [location, setLocation] = useState('');
  const [vibeId, setVibeId] = useState<VibeId>(
    defaultVibeId === 'all' ? 'spontaneous' : defaultVibeId
  );
  const [timingMode, setTimingMode] = useState<'now' | 'scheduled'>('now');
  const [scheduleDateOption, setScheduleDateOption] = useState<'today' | 'tomorrow' | 'weekend' | 'custom'>('today');
  const [customDate, setCustomDate] = useState<string>(getTodayISO);
  const [scheduledTime, setScheduledTime] = useState<string>('17:00');
  const [duration, setDuration] = useState<number>(30);
  const [maxCapacity, setMaxCapacity] = useState<number | undefined>(undefined);
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [isDraggingPhoto, setIsDraggingPhoto] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);

  const titleInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getComputedScheduledDate = (): string => {
    if (scheduleDateOption === 'today') return 'Today';
    if (scheduleDateOption === 'tomorrow') return 'Tomorrow';
    if (scheduleDateOption === 'weekend') return 'This Weekend';
    if (customDate) {
      try {
        const [y, m, d] = customDate.split('-').map(Number);
        const dt = new Date(y, m - 1, d);
        return dt.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
      } catch {
        return customDate;
      }
    }
    return 'Upcoming';
  };

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

    const isScheduled = timingMode === 'scheduled';
    const computedDate = isScheduled ? getComputedScheduledDate() : undefined;
    const computedTime = isScheduled ? formatTimeTo12Hour(scheduledTime) : undefined;

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
      description: isScheduled
        ? `Scheduled for ${computedDate} at ${computedTime}. Join early to hold your spot!`
        : `Spontaneous moment sparked right now!`,
      photoUrl: photoUrl || undefined,
      geo: {
        lat: 37.8719 + (Math.random() - 0.5) * 0.003,
        lng: -122.2585 + (Math.random() - 0.5) * 0.004,
      },
      distanceMeters: Math.floor(Math.random() * 180) + 60,
      walkingMinutes: 2,
      isScheduled,
      scheduledDate: computedDate,
      scheduledTime: computedTime,
      initiator: {
        id: currentUser?.id || 'user-arun',
        name: currentUser?.name || 'Arun K.',
        avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        role: 'Host',
        joinedAt: 'Just now',
      },
      participants: [
        {
          id: currentUser?.id || 'user-arun',
          name: currentUser?.name || 'Arun K.',
          avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
          joinedAt: 'Just now',
        },
      ],
      tags: [vibeId, isScheduled ? 'scheduled' : 'spontaneous', 'campus-live'],
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
      className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 bg-mova-nearblack/50 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="spark-modal-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-black/[0.08] flex flex-col max-h-[92dvh] sm:max-h-[88dvh] overflow-hidden overscroll-contain"
      >
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

        {/* Pinned Modal Header */}
        <div className="shrink-0 px-5 sm:px-6 py-3.5 sm:py-4 border-b border-black/[0.06] flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-mova-orange-light/80 flex items-center justify-center shadow-xs shrink-0">
              <Icon3D name="spark" size="sm" />
            </div>
            <div>
              <h2 id="spark-modal-title" className="font-crayon text-xl sm:text-2xl font-bold text-mova-ocean leading-tight">
                Spark a Moment
              </h2>
              <p className="font-crayon text-xs sm:text-sm text-mova-ocean/80 font-semibold">
                Don't ask who to follow. Start what's happening.
              </p>
            </div>
          </div>

          <button
            onClick={handleRequestClose}
            aria-label="Close spark modal"
            className="w-8 h-8 rounded-full bg-black/[0.03] flex items-center justify-center text-mova-muted hover:text-mova-nearblack hover:bg-black/[0.06] transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 overscroll-contain">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-xs font-medium border border-red-200">
              {error}
            </div>
          )}

          <form id="spark-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
          
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

            {/* Direct Image URL Input */}
            <div className="mt-2 flex items-center gap-2">
              <input
                type="url"
                placeholder="Or paste cover image URL (https://...)"
                value={photoUrl.startsWith('data:') ? '' : photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-mova-ice-border text-[11px] focus:outline-none focus:ring-1 focus:ring-mova-ocean"
              />
              {photoUrl && !photoUrl.startsWith('data:') && (
                <button
                  type="button"
                  onClick={() => setPhotoUrl('')}
                  className="text-[10px] font-bold text-mova-muted hover:text-red-500"
                >
                  Clear
                </button>
              )}
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
          {/* Exact Spot */}
          <div>
            <label htmlFor="spark-location" className="block text-xs font-bold uppercase tracking-wider text-mova-muted mb-1.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-mova-ocean" />
              <span>Exact Spot</span> <span className="text-mova-ocean">*</span>
            </label>
            <input
              id="spark-location"
              type="text"
              placeholder="e.g. Block B Canteen, Badminton Court 2, Rooftop Lawn"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-mova-ice-border text-xs font-medium focus:ring-2 focus:ring-mova-ocean focus:outline-none transition-all"
              maxLength={60}
              required
            />
          </div>

          {/* Timing & Date Scheduling Mode */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-mova-muted flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-mova-orange" />
                <span>When is this happening?</span>
              </label>
              <span className="text-[11px] font-semibold text-mova-ocean">
                {timingMode === 'now' ? 'Starting Immediately' : 'Scheduled Ahead'}
              </span>
            </div>

            {/* Timing Mode Segmented Switch */}
            <div className="grid grid-cols-2 p-1 rounded-2xl bg-black/[0.04] border border-black/[0.05] gap-1">
              <button
                type="button"
                onClick={() => setTimingMode('now')}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  timingMode === 'now'
                    ? 'bg-white text-mova-ocean shadow-xs'
                    : 'text-mova-muted hover:text-mova-nearblack'
                }`}
              >
                <span>⚡ Happening Now</span>
              </button>
              <button
                type="button"
                onClick={() => setTimingMode('scheduled')}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  timingMode === 'scheduled'
                    ? 'bg-mova-ocean text-white shadow-xs'
                    : 'text-mova-muted hover:text-mova-nearblack'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>📅 Schedule Ahead</span>
              </button>
            </div>

            {/* Sub-Panel: Happening Now Duration */}
            {timingMode === 'now' && (
              <div className="p-3 rounded-2xl bg-mova-ice-soft/60 border border-mova-ice-border flex flex-col gap-2 animate-fadeIn">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-mova-nearblack flex items-center gap-1">
                    <Clock className="w-3 h-3 text-mova-orange" />
                    Live Duration Window
                  </span>
                  <span className="text-[11px] text-mova-muted">Active immediately on campus map</span>
                </div>
                <div className="flex gap-1.5">
                  {[15, 30, 45, 60, 90].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setDuration(mins)}
                      className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                        duration === mins
                          ? 'bg-mova-ocean text-white shadow-xs'
                          : 'bg-white text-mova-ocean border border-mova-ice-border hover:bg-mova-ice-soft'
                      }`}
                    >
                      {mins}m
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sub-Panel: Schedule Ahead (Date & Time Picker) */}
            {timingMode === 'scheduled' && (
              <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex flex-col gap-3.5 animate-fadeIn">
                {/* 1. Date Selection */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-indigo-950 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Scheduled Date</span>
                    </label>
                    <span className="text-[11px] font-bold text-indigo-700">
                      {getComputedScheduledDate()}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { id: 'today', label: 'Today' },
                      { id: 'tomorrow', label: 'Tomorrow' },
                      { id: 'weekend', label: 'Weekend' },
                      { id: 'custom', label: 'Pick Date' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setScheduleDateOption(opt.id as any);
                        }}
                        className={`py-1.5 text-xs font-bold rounded-xl transition-all ${
                          scheduleDateOption === opt.id
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-white text-indigo-900 border border-indigo-200/70 hover:bg-indigo-100/50'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  {/* Specific Date input if custom is chosen */}
                  {scheduleDateOption === 'custom' && (
                    <div className="mt-1">
                      <input
                        type="date"
                        aria-label="Pick custom date"
                        value={customDate}
                        min={getTodayISO()}
                        onChange={(e) => setCustomDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-indigo-200 text-xs font-semibold text-indigo-950 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                  )}
                </div>

                {/* 2. Start Time Selection */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-indigo-950 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Start Time</span>
                    </label>
                    <span className="text-[11px] font-mono-tabular font-bold text-indigo-700">
                      {formatTimeTo12Hour(scheduledTime)}
                    </span>
                  </div>

                  {/* Quick Preset Buttons */}
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { label: 'In 1h', time: '17:00' },
                      { label: '3:00 PM', time: '15:00' },
                      { label: '6:00 PM', time: '18:00' },
                      { label: '8:30 PM', time: '20:30' },
                    ].map((p) => (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => setScheduledTime(p.time)}
                        className={`py-1.5 text-xs font-bold rounded-xl transition-all ${
                          scheduledTime === p.time
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-white text-indigo-900 border border-indigo-200/70 hover:bg-indigo-100/50'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>

                  {/* Exact Time Input */}
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-[11px] text-indigo-900/80 font-medium shrink-0">Exact Time:</span>
                    <input
                      type="time"
                      aria-label="Pick exact start time"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-xl bg-white border border-indigo-200 text-xs font-semibold text-indigo-950 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* 3. Duration Window */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-indigo-950">Expected Duration</span>
                    <span className="text-[11px] font-semibold text-indigo-700">
                      {duration >= 60 ? `${duration / 60} hour(s)` : `${duration} mins`}
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    {[30, 45, 60, 90, 120].map((mins) => (
                      <button
                        key={mins}
                        type="button"
                        onClick={() => setDuration(mins)}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
                          duration === mins
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-white text-indigo-900 border border-indigo-200/70 hover:bg-indigo-100/50'
                        }`}
                      >
                        {mins >= 60 ? `${mins / 60}h` : `${mins}m`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Summary Pill */}
                <div className="py-2 px-3 rounded-xl bg-indigo-100/80 text-indigo-900 text-xs font-medium flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>
                    Scheduled: <strong>{getComputedScheduledDate()}</strong> at <strong>{formatTimeTo12Hour(scheduledTime)}</strong> ({duration}m window)
                  </span>
                </div>
              </div>
            )}
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

        </form>
      </div>

      {/* Pinned Modal Footer */}
      <div className="shrink-0 px-5 sm:px-6 py-3 border-t border-black/[0.06] bg-white/98 backdrop-blur-sm flex items-center justify-end gap-2.5">
        <Button type="button" variant="ghost" size="sm" onClick={handleRequestClose}>
          Cancel
        </Button>
        <Button type="submit" form="spark-form" variant="primary" size="md" className="font-semibold shadow-md">
          {timingMode === 'scheduled' ? 'Schedule Moment' : 'Launch Moment Now'}
        </Button>
      </div>
    </div>
  </div>
  );
};
