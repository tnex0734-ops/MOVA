import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moment, ContributionType } from '../../types/mova';
import { X, Users, Check, Camera, Mic, Edit3, Trash2, Square } from 'lucide-react';
import { Button } from '../common/Button';
import { formatTimeRemaining } from '../../lib/utils';
import { CANONICAL_VIBES } from '../../data/mockVibes';
import { Icon3D } from '../common/Icon3D';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { sound } from '../../lib/sound';

interface ConfirmationDrawerProps {
  isOpen: boolean;
  moment: Moment | null;
  onClose: () => void;
  onConfirm: (
    moment: Moment,
    initialContribution?: {
      type: ContributionType;
      content: string;
      mediaUrl?: string;
      sketchDataUrl?: string;
    }
  ) => void;
}

const SAMPLE_PERSPECTIVE_PHOTOS = [
  'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
];

export const ConfirmationDrawer: React.FC<ConfirmationDrawerProps> = ({
  isOpen,
  moment,
  onClose,
  onConfirm,
}) => {
  const [selectedContributionType, setSelectedContributionType] = useState<ContributionType>('photo');
  const [contributionText, setContributionText] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [voiceSeconds, setVoiceSeconds] = useState(0);
  const [voiceRecorded, setVoiceRecorded] = useState(false);
  const [sketchDataUrl, setSketchDataUrl] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const confirmBtnRef = useRef<HTMLButtonElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);

  const isExpired = moment ? (moment.status === 'closed' || moment.remainingMinutes <= 0) : false;
  const isFull = moment ? (moment.status === 'full' || moment.isFull || (moment.maxParticipants ? moment.participantCount >= moment.maxParticipants : false)) : false;
  const isCancelled = moment ? (moment.status === 'cancelled' || moment.isCancelled) : false;

  const drawerRef = useFocusTrap<HTMLDivElement>({
    isOpen,
    onClose,
    initialFocusRef: confirmBtnRef,
  });

  // Voice recording timer simulation
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isRecordingVoice) {
      interval = setInterval(() => {
        setVoiceSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecordingVoice]);

  // Handle Photo upload
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

  // Sketch Canvas Drawing Handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    isDrawingRef.current = true;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.strokeStyle = '#2B2024';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    const canvas = canvasRef.current;
    if (canvas) {
      setSketchDataUrl(canvas.toDataURL());
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSketchDataUrl('');
  };

  if (!isOpen || !moment) return null;

  const vibe = CANONICAL_VIBES.find((v) => v.id === moment.vibeId);

  const handleConfirmArrival = () => {
    if (isSubmitting || isExpired || isCancelled) return;
    setIsSubmitting(true);

    let finalContent = contributionText.trim();
    if (!finalContent) {
      if (selectedContributionType === 'photo') finalContent = 'Live photo perspective';
      else if (selectedContributionType === 'voice') finalContent = `Voice note (${voiceSeconds || 5}s)`;
      else if (selectedContributionType === 'sketch') finalContent = 'Live crayon sketch';
      else finalContent = 'Arrived at the moment!';
    }

    try {
      onConfirm(moment, {
        type: selectedContributionType,
        content: finalContent,
        mediaUrl: photoUrl || (selectedContributionType === 'photo' ? SAMPLE_PERSPECTIVE_PHOTOS[0] : undefined),
        sketchDataUrl: sketchDataUrl || undefined,
      });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[9999] flex items-end justify-center"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
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

        {/* Spring Drawer Sheet */}
        <motion.div
          ref={drawerRef}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 380,
            damping: 32,
            mass: 0.85,
          }}
          className="relative w-full max-w-2xl bg-white rounded-t-3xl sm:rounded-t-drawer border-t border-x border-mova-ice-border shadow-drawer p-4 sm:p-6 sm:p-8 z-10 flex flex-col max-h-[90dvh] overflow-y-auto overscroll-contain"
        >
          {/* Drag Handle Bar */}
          <div className="w-12 h-1.5 rounded-full bg-mova-border mx-auto mb-3 shrink-0" />

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close confirmation drawer"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 rounded-full bg-mova-ice-soft flex items-center justify-center text-mova-muted hover:text-mova-nearblack transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="mb-4 pr-8">
            <span className="text-xs font-bold uppercase tracking-wider text-mova-ocean flex items-center gap-1.5 mb-1">
              <span className={`w-2 h-2 rounded-full ${isExpired || isCancelled ? 'bg-red-500' : isFull ? 'bg-amber-500' : 'bg-mova-orange animate-pulse'}`} />
              {isExpired ? 'Moment Ended' : isCancelled ? 'Moment Cancelled' : isFull ? 'Capacity Reached' : "You're Joining"}
            </span>
            <h2 id="drawer-title" className="font-crayon text-2xl sm:text-3xl font-bold text-mova-ocean leading-tight break-words">
              {moment.title}
            </h2>
          </div>

          {/* Live Edge-Case Status Warnings */}
          {isExpired && (
            <div className="mb-4 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium flex items-center gap-2">
              <span className="text-base">⏳</span>
              <div>
                <strong className="font-bold">This Moment has concluded.</strong>
                <p className="text-[11px] text-amber-800">You can no longer join as an active participant, but you can explore its Living Thread memories.</p>
              </div>
            </div>
          )}

          {isCancelled && (
            <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-950 text-xs font-medium flex items-center gap-2">
              <span className="text-base">🚫</span>
              <div>
                <strong className="font-bold">This Moment was cancelled by the host.</strong>
                <p className="text-[11px] text-red-800">No new check-ins are being accepted.</p>
              </div>
            </div>
          )}

          {isFull && (
            <div className="mb-4 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium flex items-center gap-2">
              <span className="text-base">👥</span>
              <div>
                <strong className="font-bold">Maximum group capacity reached.</strong>
                <p className="text-[11px] text-amber-800">New joins are paused to maintain high-quality intimate group dynamics.</p>
              </div>
            </div>
          )}

          {/* Moment Context Box */}
          <div className="p-4 rounded-2xl bg-mova-ice-soft border border-mova-ice-border/70 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white border border-mova-ice-border flex items-center justify-center shadow-xs">
                {vibe?.icon3d ? (
                  <Icon3D name={vibe.icon3d} size="md" fallbackText={vibe.icon} />
                ) : (
                  <span className="text-2xl">{vibe?.icon}</span>
                )}
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-mova-ocean">
                  <Icon3D name="location" size="xs" />
                  <span>{moment.location}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-mova-muted mt-0.5">
                  <span className="flex items-center gap-1">
                    <Icon3D name="clock" size="xs" />
                    <span>{formatTimeRemaining(moment.remainingMinutes)}</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-mova-muted" />
                    <span>{moment.participantCount} in</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Avatar Stack */}
            <div className="flex -space-x-2">
              {moment.participants.slice(0, 4).map((p) => (
                <img
                  key={p.id}
                  src={p.avatar}
                  alt={p.name}
                  className="w-7 h-7 rounded-full ring-2 ring-white object-cover shadow-xs"
                />
              ))}
            </div>
          </div>

          {/* Perspective Type Selection Tabs */}
          <div className="mb-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-mova-muted mb-2">
              Add Your Perspective / Check-in Mode
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
              <button
                type="button"
                onClick={() => setSelectedContributionType('photo')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  selectedContributionType === 'photo'
                    ? 'bg-mova-ocean text-white shadow-xs'
                    : 'bg-mova-ice-soft text-mova-ocean hover:bg-mova-ice/60 border border-mova-ice-border'
                }`}
              >
                <Icon3D name="photo" size="xs" />
                <span>Photo</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedContributionType('voice')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  selectedContributionType === 'voice'
                    ? 'bg-mova-ocean text-white shadow-xs'
                    : 'bg-mova-ice-soft text-mova-ocean hover:bg-mova-ice/60 border border-mova-ice-border'
                }`}
              >
                <Icon3D name="voice" size="xs" />
                <span>Voice</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedContributionType('sketch')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  selectedContributionType === 'sketch'
                    ? 'bg-mova-ocean text-white shadow-xs'
                    : 'bg-mova-ice-soft text-mova-ocean hover:bg-mova-ice/60 border border-mova-ice-border'
                }`}
              >
                <Icon3D name="sketch" size="xs" />
                <span>Sketch</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedContributionType('text')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  selectedContributionType === 'text'
                    ? 'bg-mova-ocean text-white shadow-xs'
                    : 'bg-mova-ice-soft text-mova-ocean hover:bg-mova-ice/60 border border-mova-ice-border'
                }`}
              >
                <Icon3D name="text" size="xs" />
                <span>Note</span>
              </button>
            </div>

            {/* Interactive Perspective Content Panels */}
            
            {/* 1. PHOTO PERSPECTIVE */}
            {selectedContributionType === 'photo' && (
              <div className="p-3.5 rounded-2xl bg-mova-ice-soft/50 border border-mova-ice-border flex flex-col gap-2.5">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />

                {photoUrl ? (
                  <div className="relative h-32 rounded-xl overflow-hidden border border-mova-ice-border group">
                    <img src={photoUrl} alt="Perspective Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setPhotoUrl('')}
                      aria-label="Remove uploaded photo"
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600 text-white shadow-sm hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
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
                    aria-label="Tap to take photo or upload snapshot"
                    className="p-4 rounded-xl border-2 border-dashed border-mova-ice-border hover:border-mova-ocean/60 bg-white text-center cursor-pointer transition-all flex flex-col items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-mova-ocean"
                  >
                    <Camera className="w-5 h-5 text-mova-ocean" />
                    <span className="text-xs font-bold text-mova-ocean">Tap to take photo or upload snapshot</span>
                    <span className="text-[10px] text-mova-muted">Show everyone what this moment looks like</span>
                  </div>
                )}

                {/* Quick Sample Presets */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-bold text-mova-muted">Samples:</span>
                  {SAMPLE_PERSPECTIVE_PHOTOS.map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setPhotoUrl(sample)}
                      aria-label={`Select sample perspective ${idx + 1}`}
                      className="w-8 h-8 rounded-lg overflow-hidden border border-mova-ice-border hover:scale-105 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-mova-ocean"
                    >
                      <img src={sample} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    placeholder="Or paste image URL (https://...)"
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

                <input
                  type="text"
                  placeholder="Photo caption (e.g. Just sat down at table 4!)..."
                  aria-label="Perspective photo caption"
                  value={contributionText}
                  onChange={(e) => setContributionText(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-mova-ice-border text-xs font-medium focus:ring-2 focus:ring-mova-ocean focus:outline-none"
                />
              </div>
            )}

            {/* 2. VOICE PERSPECTIVE */}
            {selectedContributionType === 'voice' && (
              <div className="p-4 rounded-2xl bg-mova-ice-soft/50 border border-mova-ice-border flex flex-col items-center gap-3 text-center">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (isRecordingVoice) {
                        setIsRecordingVoice(false);
                        setVoiceRecorded(true);
                        sound.playClick();
                      } else {
                        setIsRecordingVoice(true);
                        setVoiceSeconds(0);
                        setVoiceRecorded(false);
                        sound.playClick();
                      }
                    }}
                    aria-label={isRecordingVoice ? 'Stop recording voice note' : 'Start recording voice note'}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-mova-ocean ${
                      isRecordingVoice
                        ? 'bg-red-500 text-white animate-pulse shadow-md scale-105'
                        : 'bg-mova-ocean text-white shadow-sm hover:scale-105'
                    }`}
                  >
                    {isRecordingVoice ? <Square className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                  </button>

                  <div className="text-left">
                    <span className="text-xs font-bold text-mova-ocean block">
                      {isRecordingVoice ? 'Recording Voice Memo...' : voiceRecorded ? 'Voice Note Captured!' : 'Tap Mic to Speak'}
                    </span>
                    <span className="text-xs font-mono-tabular text-mova-ocean font-bold">
                      0:{voiceSeconds < 10 ? '0' : ''}{voiceSeconds}s
                    </span>
                  </div>

                  {voiceRecorded && !isRecordingVoice && (
                    <button
                      type="button"
                      onClick={() => sound.playJoin()}
                      className="px-2.5 py-1 bg-white border border-mova-ice-border rounded-lg text-[11px] font-semibold text-mova-ocean flex items-center gap-1 shadow-xs hover:bg-mova-ice-soft"
                    >
                      <span>▶ Preview</span>
                    </button>
                  )}
                </div>

                {/* Animated Simulated Waveform */}
                <div className="flex items-center gap-1 h-6">
                  {[40, 70, 25, 90, 60, 80, 45, 100, 30, 85, 50, 75, 20].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: isRecordingVoice ? `${h}%` : '20%' }}
                      className={`w-1 rounded-full transition-all duration-150 ${
                        isRecordingVoice ? 'bg-mova-ocean' : 'bg-mova-border'
                      }`}
                    />
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="Memo tag (e.g. Bringing two extra cups!)..."
                  value={contributionText}
                  onChange={(e) => setContributionText(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-mova-ice-border text-xs font-medium focus:ring-2 focus:ring-mova-ocean focus:outline-none"
                />
              </div>
            )}

            {/* 3. SKETCH PERSPECTIVE */}
            {selectedContributionType === 'sketch' && (
              <div className="p-3.5 rounded-2xl bg-mova-ice-soft/50 border border-mova-ice-border flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-mova-ocean flex items-center gap-1">
                    <Edit3 className="w-3.5 h-3.5 text-mova-ocean" />
                    <span>Doodle / Crayon Pad</span>
                  </span>
                  <button
                    type="button"
                    onClick={clearCanvas}
                    aria-label="Clear doodle pad"
                    className="text-[11px] font-bold text-mova-muted hover:text-mova-ocean focus:outline-none focus-visible:ring-2 focus-visible:ring-mova-ocean rounded"
                  >
                    Clear Pad
                  </button>
                </div>

                <div className="border border-mova-ice-border rounded-xl bg-white overflow-hidden shadow-xs">
                  <canvas
                    ref={canvasRef}
                    width={500}
                    height={140}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="w-full h-32 cursor-crosshair touch-none"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Sketch caption (e.g. Map of Court 3)..."
                  value={contributionText}
                  onChange={(e) => setContributionText(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-mova-ice-border text-xs font-medium focus:ring-2 focus:ring-mova-ocean focus:outline-none"
                />
              </div>
            )}

            {/* 4. TEXT PERSPECTIVE */}
            {selectedContributionType === 'text' && (
              <div className="p-3.5 rounded-2xl bg-mova-ice-soft/50 border border-mova-ice-border flex flex-col gap-2">
                <textarea
                  rows={2}
                  placeholder="Say something to the group (e.g. Sitting on the 3rd step wearing green jacket)..."
                  value={contributionText}
                  onChange={(e) => setContributionText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-mova-ice-border text-xs font-medium focus:ring-2 focus:ring-mova-ocean focus:outline-none resize-none"
                />
              </div>
            )}

          </div>

          {/* Primary CTA (Sticky bottom to ensure accessible on mobile & small viewports) */}
          <div className="sticky bottom-0 bg-white/95 backdrop-blur-md pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] -mx-4 sm:-mx-6 sm:-mx-8 px-4 sm:px-6 sm:px-8 border-t border-mova-border/40 mt-2 z-20">
            {isExpired || isCancelled ? (
              <Button
                ref={confirmBtnRef}
                variant="secondary"
                size="lg"
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 text-sm sm:text-base font-bold tracking-wide py-3.5"
              >
                <span>CLOSE DRAWER</span>
              </Button>
            ) : isFull ? (
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={onClose}
                  className="w-full flex items-center justify-center text-sm font-bold py-3.5"
                >
                  <span>CANCEL</span>
                </Button>
                <Button
                  ref={confirmBtnRef}
                  variant="primary"
                  size="lg"
                  onClick={handleConfirmArrival}
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 text-sm font-bold tracking-wide py-3.5"
                >
                  <span>OBSERVE THREAD</span>
                </Button>
              </div>
            ) : (
              <Button
                ref={confirmBtnRef}
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                onClick={handleConfirmArrival}
                className={`w-full flex items-center justify-center gap-2 text-sm sm:text-base font-bold shadow-md tracking-wide py-3.5 ${
                  isSubmitting ? 'opacity-70 cursor-wait' : ''
                }`}
              >
                <Check className="w-5 h-5" />
                <span>{isSubmitting ? 'JOINING MOMENT...' : 'CONFIRM ARRIVAL & ENTER THREAD'}</span>
              </Button>
            )}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
