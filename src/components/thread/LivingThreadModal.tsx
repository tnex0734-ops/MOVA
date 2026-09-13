import React, { useState, useRef, useEffect } from 'react';
import { Moment, Contribution, ContributionType, UserProfile } from '../../types/mova';
import { X, GitBranch, Plus, Heart, MapPin, Clock, Camera, Mic, Square, Edit3, Trash2 } from 'lucide-react';
import { Button } from '../common/Button';
import { formatTimeRemaining } from '../../lib/utils';
import { sanitizeText } from '../../lib/validation';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { sound } from '../../lib/sound';

interface LivingThreadModalProps {
  isOpen: boolean;
  moment: Moment | null;
  contributions: Contribution[];
  onClose: () => void;
  onAddContribution: (momentId: string, contribution: Omit<Contribution, 'id' | 'timestamp'>) => void;
  currentUser?: UserProfile;
}

export const LivingThreadModal: React.FC<LivingThreadModalProps> = ({
  isOpen,
  moment,
  contributions,
  onClose,
  onAddContribution,
  currentUser,
}) => {
  const [selectedParentId, setSelectedParentId] = useState<string | null>(null);
  const [branchName, setBranchName] = useState('');
  const [newContent, setNewContent] = useState('');
  const [contributionType, setContributionType] = useState<ContributionType>('text');
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [voiceSeconds, setVoiceSeconds] = useState(0);
  const [voiceRecorded, setVoiceRecorded] = useState(false);
  const [sketchDataUrl, setSketchDataUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);

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

  const modalRef = useFocusTrap<HTMLDivElement>({
    isOpen,
    onClose,
  });

  if (!isOpen || !moment) return null;

  const SAMPLE_THREAD_PHOTOS = [
    { label: '☕ Chai Table', url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80' },
    { label: '🌅 Campus Lawn', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80' },
    { label: '📚 Study Corner', url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80' },
    { label: '🎸 Jam Area', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80' },
  ];

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

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    isDrawingRef.current = true;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
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
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#0F2C59';
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    const canvas = canvasRef.current;
    if (canvas) {
      setSketchDataUrl(canvas.toDataURL('image/png'));
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

  const handlePostContribution = (e: React.FormEvent) => {
    e.preventDefault();
    const hasContent = Boolean(
      newContent.trim() ||
      (contributionType === 'photo' && photoUrl) ||
      (contributionType === 'sketch' && sketchDataUrl) ||
      (contributionType === 'voice' && voiceRecorded)
    );
    if (!hasContent) return;

    setSubmitError(null);
    setIsPublishing(true);

    let finalMediaUrl: string | undefined = undefined;
    if (contributionType === 'photo') {
      finalMediaUrl = photoUrl || SAMPLE_THREAD_PHOTOS[0].url;
    } else if (contributionType === 'sketch') {
      finalMediaUrl = sketchDataUrl || undefined;
    } else if (contributionType === 'voice') {
      finalMediaUrl = 'https://cdn.freesound.org/previews/preview.mp3';
    }

    let finalContent = sanitizeText(newContent);
    if (!finalContent) {
      if (contributionType === 'photo') finalContent = 'Photo Perspective';
      else if (contributionType === 'sketch') finalContent = 'Live hand sketch';
      else if (contributionType === 'voice') finalContent = `Voice note (${voiceSeconds || 4}s)`;
      else finalContent = 'Moment perspective';
    }

    try {
      onAddContribution(moment.id, {
        momentId: moment.id,
        parentId: selectedParentId,
        branchName: branchName.trim() || undefined,
        type: contributionType,
        content: finalContent,
        mediaUrl: finalMediaUrl,
        sketchDataUrl: contributionType === 'sketch' ? sketchDataUrl : undefined,
        voiceDurationSeconds: contributionType === 'voice' ? (voiceSeconds || 4) : undefined,
        author: {
          id: currentUser?.id || 'user-arun',
          name: currentUser?.name || 'Arun K.',
          avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
          joinedAt: 'Just now',
        },
        likesCount: 1,
      });

      setNewContent('');
      setPhotoUrl('');
      setSketchDataUrl('');
      setVoiceRecorded(false);
      setVoiceSeconds(0);
      setBranchName('');
      setSelectedParentId(null);
      setIsPreviewing(false);
      sound.playDropAlert();
    } catch {
      setSubmitError('Failed to publish contribution. Tap Retry to post again.');
    } finally {
      setIsPublishing(false);
    }
  };

  // Group contributions into root and branches
  const rootContributions = contributions.filter((c) => !c.parentId);
  const childContributions = (parentId: string) => contributions.filter((c) => c.parentId === parentId);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 bg-mova-nearblack/50 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="thread-modal-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-3xl bg-white rounded-3xl sm:rounded-drawer shadow-2xl border border-mova-ice-border flex flex-col max-h-[92dvh] sm:max-h-[90dvh] overflow-hidden"
      >
        
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-mova-border flex items-center justify-between bg-mova-ice-soft/40">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-mova-ocean flex items-center gap-1">
                <GitBranch className="w-3.5 h-3.5" />
                Living Branched Thread
              </span>
              <span className="text-xs text-mova-muted">·</span>
              <span className="font-mono-tabular text-xs text-mova-muted flex items-center gap-1">
                <Clock className="w-3 h-3 text-mova-orange" />
                {formatTimeRemaining(moment.remainingMinutes)}
              </span>
            </div>
            <h2 id="thread-modal-title" className="font-crayon text-2xl sm:text-3xl font-bold text-mova-ocean leading-tight break-words">
              {moment.title}
            </h2>
            <div className="flex items-center gap-2 text-xs text-mova-muted mt-1">
              <MapPin className="w-3.5 h-3.5 text-mova-ocean" />
              <span>{moment.location}</span>
              <span>·</span>
              <span>{moment.participantCount} participating</span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close living thread"
            className="w-9 h-9 rounded-full bg-mova-ice-soft flex items-center justify-center text-mova-muted hover:text-mova-ocean hover:bg-mova-ice transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Thread Tree Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <p className="text-xs text-mova-muted">
              Moments branch as people participate. Click <strong>Branch Out</strong> to spin off an activity.
            </p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setSelectedParentId(null);
                setIsComposerOpen(!isComposerOpen);
              }}
              className="flex items-center gap-1.5 text-xs font-semibold"
            >
              <Plus className="w-3.5 h-3.5 text-mova-ocean" />
              <span>New Contribution</span>
            </Button>
          </div>

          {/* New Contribution Composer Form */}
          {isComposerOpen && (
            <form onSubmit={handlePostContribution} className="p-4 rounded-2xl bg-mova-ice-soft border border-mova-ice-border flex flex-col gap-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-mova-ocean">
                  {selectedParentId ? 'Branching from selected contribution' : 'Root Contribution'}
                </span>
                <div className="flex gap-1">
                  {(['text', 'photo', 'voice', 'sketch'] as ContributionType[]).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        setContributionType(type);
                        setIsPreviewing(false);
                      }}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-lg capitalize transition-all ${
                        contributionType === type
                          ? 'bg-mova-ocean text-white'
                          : 'bg-white text-mova-ocean border border-mova-ice-border hover:bg-mova-ice-soft'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {submitError && (
                <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center justify-between">
                  <span>{submitError}</span>
                  <button
                    type="button"
                    onClick={handlePostContribution}
                    className="underline font-bold hover:text-red-900"
                  >
                    Retry
                  </button>
                </div>
              )}

              {/* Preview Toggle View */}
              {isPreviewing ? (
                <div className="p-3.5 rounded-xl bg-white border border-mova-ice-border flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-mova-muted">
                      Live Contribution Preview
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsPreviewing(false)}
                      className="text-xs text-mova-ocean font-bold hover:underline"
                    >
                      Edit Content
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'}
                      alt="You"
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span className="text-xs font-bold text-mova-ocean">{currentUser?.name || 'You (Arun K.)'}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-mova-ice-soft text-mova-ocean uppercase">
                      {branchName || contributionType}
                    </span>
                  </div>
                  {newContent && (
                    <p className="text-xs text-mova-nearblack leading-relaxed">
                      {newContent}
                    </p>
                  )}
                  {contributionType === 'photo' && photoUrl && (
                    <img
                      src={photoUrl}
                      alt="Preview"
                      className="rounded-xl w-full max-h-40 object-cover border border-mova-ice-border"
                    />
                  )}
                  {contributionType === 'sketch' && sketchDataUrl && (
                    <img
                      src={sketchDataUrl}
                      alt="Sketch Preview"
                      className="rounded-xl w-full max-h-40 object-contain bg-white border border-mova-ice-border"
                    />
                  )}
                  {contributionType === 'voice' && voiceRecorded && (
                    <div className="p-2.5 rounded-xl bg-mova-ice-soft border border-mova-ice-border flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mic className="w-4 h-4 text-mova-ocean" />
                        <span className="text-xs font-bold text-mova-ocean">Voice Note (0:{voiceSeconds < 10 ? '0' : ''}{voiceSeconds}s)</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => sound.playJoin()}
                        className="px-2.5 py-1 rounded-lg bg-mova-ocean text-white text-[10px] font-bold"
                      >
                        Play ▶
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Optional Branch Title (e.g. Tea Run, Guitar Song)..."
                    value={branchName}
                    onChange={(e) => setBranchName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-mova-ice-border text-xs font-medium focus:ring-2 focus:ring-mova-ocean focus:outline-none"
                  />

                  {/* 1. PHOTO INPUT */}
                  {contributionType === 'photo' && (
                    <div className="flex flex-col gap-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoUpload}
                      />
                      {photoUrl ? (
                        <div className="relative h-32 rounded-xl overflow-hidden border border-mova-ice-border">
                          <img src={photoUrl} alt="Upload" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setPhotoUrl('')}
                            className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-md bg-red-600 text-white text-[10px] font-bold"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="p-3.5 rounded-xl border-2 border-dashed border-mova-ice-border bg-white text-center cursor-pointer text-xs font-bold text-mova-ocean hover:bg-mova-ice-soft flex items-center justify-center gap-2"
                        >
                          <Camera className="w-4 h-4 text-mova-ocean" />
                          <span>Attach Photo from Device</span>
                        </div>
                      )}

                      {/* Photo Presets */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-bold text-mova-muted">Presets:</span>
                        {SAMPLE_THREAD_PHOTOS.map((sample) => (
                          <button
                            key={sample.label}
                            type="button"
                            onClick={() => setPhotoUrl(sample.url)}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-semibold transition-all ${
                              photoUrl === sample.url
                                ? 'bg-mova-ocean text-white shadow-xs'
                                : 'bg-white text-mova-ocean border border-mova-ice-border hover:bg-mova-ice'
                            }`}
                          >
                            {sample.label}
                          </button>
                        ))}
                      </div>

                      {/* Image URL input */}
                      <div className="flex items-center gap-2">
                        <input
                          type="url"
                          placeholder="Or paste photo URL (https://...)"
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
                  )}

                  {/* 2. VOICE INPUT */}
                  {contributionType === 'voice' && (
                    <div className="p-4 rounded-xl bg-white border border-mova-ice-border flex flex-col items-center gap-3 text-center">
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
                          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-mova-ocean ${
                            isRecordingVoice
                              ? 'bg-red-500 text-white animate-pulse shadow-md scale-105'
                              : 'bg-mova-ocean text-white shadow-sm hover:scale-105'
                          }`}
                        >
                          {isRecordingVoice ? <Square className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                        </button>

                        <div className="text-left">
                          <span className="text-xs font-bold text-mova-ocean block">
                            {isRecordingVoice ? 'Recording Voice Memo...' : voiceRecorded ? 'Voice Memo Captured!' : 'Tap Mic to Speak'}
                          </span>
                          <span className="text-xs font-mono-tabular text-mova-ocean font-bold">
                            0:{voiceSeconds < 10 ? '0' : ''}{voiceSeconds}s
                          </span>
                        </div>

                        {voiceRecorded && !isRecordingVoice && (
                          <button
                            type="button"
                            onClick={() => sound.playJoin()}
                            className="ml-auto px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold shadow-xs hover:bg-emerald-700"
                          >
                            Preview ▶
                          </button>
                        )}
                      </div>

                      {/* Live Waveform Indicator */}
                      <div className="flex items-center gap-1 h-5">
                        {[0.4, 0.8, 0.3, 0.9, 0.6, 0.7, 0.4, 0.8, 0.5, 0.7].map((h, i) => (
                          <div
                            key={i}
                            className={`w-1 rounded-full transition-all duration-150 ${
                              isRecordingVoice ? 'bg-red-500 animate-pulse' : voiceRecorded ? 'bg-emerald-500' : 'bg-mova-ice'
                            }`}
                            style={{
                              height: isRecordingVoice ? `${Math.max(6, Math.floor(h * 20))}px` : '6px',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 3. SKETCH PAD INPUT */}
                  {contributionType === 'sketch' && (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-mova-ocean flex items-center gap-1">
                          <Edit3 className="w-3.5 h-3.5 text-mova-ocean" />
                          <span>Draw or Doodle Perspective</span>
                        </span>
                        <button
                          type="button"
                          onClick={clearCanvas}
                          className="text-[10px] font-bold text-mova-muted hover:text-red-500 flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" /> Clear
                        </button>
                      </div>

                      <div className="relative border-2 border-dashed border-mova-ice-border rounded-xl bg-white overflow-hidden">
                        <canvas
                          ref={canvasRef}
                          width={480}
                          height={160}
                          onMouseDown={startDrawing}
                          onMouseMove={draw}
                          onMouseUp={stopDrawing}
                          onMouseLeave={stopDrawing}
                          onTouchStart={startDrawing}
                          onTouchMove={draw}
                          onTouchEnd={stopDrawing}
                          className="w-full h-36 bg-white cursor-crosshair touch-none"
                        />
                        {!sketchDataUrl && (
                          <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-xs text-mova-muted font-medium">
                            Draw a sketch, arrow, or diagram with mouse or touch
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Caption / Text Input */}
                  <textarea
                    rows={2}
                    placeholder={
                      contributionType === 'photo'
                        ? 'Add photo caption (optional)...'
                        : contributionType === 'voice'
                        ? 'Add note to voice memo (optional)...'
                        : contributionType === 'sketch'
                        ? 'Add note about sketch (optional)...'
                        : 'Share your live view, message, or sound note...'
                    }
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-mova-ice-border text-xs font-medium focus:ring-2 focus:ring-mova-ocean focus:outline-none"
                    required={contributionType === 'text'}
                  />
                </>
              )}

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => setIsPreviewing(!isPreviewing)}
                  disabled={!newContent && !photoUrl && !sketchDataUrl && !voiceRecorded}
                  className="text-xs font-bold text-mova-ocean hover:underline disabled:opacity-40"
                >
                  {isPreviewing ? 'Exit Preview' : '👁️ Preview Card'}
                </button>
                <div className="flex items-center gap-2">
                  <Button type="button" variant="ghost" size="sm" onClick={() => setIsComposerOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    disabled={isPublishing || (!newContent.trim() && !photoUrl && !sketchDataUrl && !voiceRecorded)}
                    className="font-semibold"
                  >
                    {isPublishing ? 'Publishing...' : 'Publish to Branch'}
                  </Button>
                </div>
              </div>
            </form>
          )}

          {/* Living Tree Visualization */}
          {rootContributions.length === 0 ? (
            <div className="p-8 text-center flex flex-col items-center justify-center rounded-2xl bg-mova-ice-soft/40 border border-mova-ice-border">
              <div className="w-12 h-12 rounded-2xl bg-white border border-mova-ice-border flex items-center justify-center shadow-xs mb-3 text-mova-ocean">
                <GitBranch className="w-6 h-6" />
              </div>
              <p className="font-crayon text-2xl text-mova-ocean font-bold mb-1">You're early. Start the story.</p>
              <p className="text-xs text-mova-muted max-w-sm mb-4">
                Be the first to share a live perspective, coordinate where to sit, or branch out a micro-activity.
              </p>
              <div className="flex flex-wrap gap-2 justify-center mb-5">
                <button
                  type="button"
                  onClick={() => {
                    setNewContent("Just arrived! Table near the sunlit window.");
                    setIsComposerOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-pill bg-white border border-mova-ice-border text-[11px] font-semibold text-mova-ocean hover:border-mova-ocean transition-all"
                >
                  📍 "Just arrived! Table near window"
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setContributionType('photo');
                    setIsComposerOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-pill bg-white border border-mova-ice-border text-[11px] font-semibold text-mova-ocean hover:border-mova-ocean transition-all"
                >
                  📸 Post a snapshot
                </button>
              </div>
              <Button variant="primary" size="sm" onClick={() => setIsComposerOpen(true)}>
                Start First Contribution
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4" role="tree" aria-label="Living moment thread tree">
              {rootContributions.map((root) => {
                const children = childContributions(root.id);

                return (
                  <div
                    key={root.id}
                    role="treeitem"
                    aria-level={1}
                    aria-label={`Root contribution by ${root.author.name}: ${root.content}`}
                    className="relative flex flex-col gap-3"
                  >
                    
                    {/* Root Contribution Node */}
                    <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-mova-ice-border shadow-xs flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={root.author.avatar}
                            alt={root.author.name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="text-xs font-bold text-mova-ocean">
                            {root.author.name}
                          </span>
                          <span className="text-[11px] text-mova-muted">· {root.timestamp}</span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-mova-ice-soft text-mova-ocean uppercase border border-mova-ice-border">
                          {root.branchName || root.type}
                        </span>
                      </div>

                      <p className="text-xs text-mova-ocean/90 leading-relaxed">
                        {root.content}
                      </p>

                      {root.type === 'voice' && (
                        <div className="p-2.5 rounded-xl bg-mova-ice-soft border border-mova-ice-border flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Mic className="w-4 h-4 text-mova-ocean" />
                            <span className="text-xs font-semibold text-mova-ocean">
                              Voice Note ({root.voiceDurationSeconds || 4}s)
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => sound.playJoin()}
                            className="px-2.5 py-1 rounded-lg bg-mova-ocean text-white text-[10px] font-bold hover:bg-mova-ocean-hover"
                          >
                            Play ▶
                          </button>
                        </div>
                      )}

                      {root.mediaUrl && root.type !== 'voice' && (
                        <img
                          src={root.mediaUrl}
                          alt="Contribution visual"
                          className="rounded-xl w-full max-h-48 object-cover border border-mova-ice-border"
                        />
                      )}

                      <div className="pt-2 border-t border-mova-border/40 flex items-center justify-between text-xs">
                        <button
                          aria-label={`Like contribution by ${root.author.name} (${root.likesCount || 0} likes)`}
                          className="flex items-center gap-1 text-mova-muted hover:text-mova-ocean focus:outline-none focus-visible:ring-2 focus-visible:ring-mova-ocean rounded"
                        >
                          <Heart className="w-3.5 h-3.5 text-mova-orange" />
                          <span>{root.likesCount || 0}</span>
                        </button>

                        <button
                          onClick={() => {
                            setSelectedParentId(root.id);
                            setIsComposerOpen(true);
                          }}
                          aria-label={`Branch out from contribution by ${root.author.name}`}
                          className="font-semibold text-mova-ocean hover:underline flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-mova-ocean rounded"
                        >
                          <GitBranch className="w-3.5 h-3.5 text-mova-ocean" />
                          <span>Branch Out</span>
                        </button>
                      </div>
                    </div>

                    {/* Child Branches with Visual SVG Link */}
                    {children.length > 0 && (
                      <div className="pl-6 border-l-2 border-dashed border-mova-ice flex flex-col gap-3 ml-4">
                        {children.map((child) => (
                          <div
                            key={child.id}
                            role="treeitem"
                            aria-level={2}
                            aria-label={`Branch contribution under ${root.branchName || root.author.name} by ${child.author.name}: ${child.content}`}
                            className="relative p-3.5 rounded-2xl bg-white border border-mova-ice-border shadow-xs flex flex-col gap-2"
                          >
                          {/* Connector node circle */}
                          <div className="absolute -left-[31px] top-4 w-3 h-3 rounded-full bg-mova-orange ring-2 ring-white" />

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <img
                                src={child.author.avatar}
                                alt={child.author.name}
                                className="w-5 h-5 rounded-full object-cover"
                              />
                              <span className="text-xs font-bold text-mova-ocean">
                                {child.author.name}
                              </span>
                              <span className="text-[10px] text-mova-muted">· {child.timestamp}</span>
                            </div>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-mova-ice-soft text-mova-ocean border border-mova-ice-border">
                              {child.branchName || child.type}
                            </span>
                          </div>

                          <p className="text-xs text-mova-ocean/90">
                            {child.content}
                          </p>

                          {child.type === 'voice' && (
                            <div className="p-2 rounded-xl bg-mova-ice-soft border border-mova-ice-border flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Mic className="w-3.5 h-3.5 text-mova-ocean" />
                                <span className="text-[11px] font-semibold text-mova-ocean">
                                  Voice Note ({child.voiceDurationSeconds || 4}s)
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => sound.playJoin()}
                                className="px-2 py-0.5 rounded-lg bg-mova-ocean text-white text-[10px] font-bold hover:bg-mova-ocean-hover"
                              >
                                Play ▶
                              </button>
                            </div>
                          )}

                          {child.mediaUrl && child.type !== 'voice' && (
                            <img
                              src={child.mediaUrl}
                              alt="Child visual"
                              className="rounded-xl w-full max-h-40 object-cover border border-mova-ice-border"
                            />
                          )}

                          <div className="pt-1.5 flex items-center justify-between text-[11px]">
                            <button
                              onClick={() => {
                                setSelectedParentId(child.id);
                                setIsComposerOpen(true);
                              }}
                              className="font-semibold text-mova-ocean hover:underline flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-mova-ocean rounded"
                            >
                              <GitBranch className="w-3 h-3 text-mova-ocean" />
                              <span>Sub-branch</span>
                            </button>
                            <span className="text-[10px] text-mova-muted">Level 2 branch</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-mova-border bg-mova-ice-soft/30 flex items-center justify-between">
          <span className="font-crayon text-sm text-mova-muted">
            Living Moments evolve with every participant
          </span>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close Thread
          </Button>
        </div>

      </div>
    </div>
  );
};
