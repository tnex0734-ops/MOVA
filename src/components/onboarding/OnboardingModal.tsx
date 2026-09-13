import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles, MapPin, Compass, Camera, ArrowRight, Check } from 'lucide-react';
import { VibeId } from '../../types/mova';
import { CANONICAL_VIBES } from '../../data/mockVibes';
import { Icon3D } from '../common/Icon3D';
import movaLogo from '../../assets/MOVALOGO.png';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (selectedVibe: VibeId, campusArea: string) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const [step, setStep] = useState<'welcome' | 'how_it_works' | 'vibe' | 'context' | 'permissions'>('welcome');
  const [chosenVibe, setChosenVibe] = useState<VibeId>('spontaneous');
  const [chosenArea, setChosenArea] = useState<string>('Central Quad & Steps');
  const [cameraGranted, setCameraGranted] = useState<boolean>(true);
  const [locationGranted, setLocationGranted] = useState<boolean>(true);

  if (!isOpen) return null;

  const handleFinish = () => {
    try {
      localStorage.removeItem('mova_onboarded');
    } catch {
      // ignore
    }
    onComplete(chosenVibe, chosenArea);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-mova-nearblack/60 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-full max-w-xl bg-white rounded-3xl sm:rounded-drawer p-6 sm:p-10 shadow-2xl border border-black/[0.08] overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        {/* Skip / Close Button */}
        <button
          onClick={handleFinish}
          aria-label="Close or skip onboarding"
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-black/[0.03] hover:bg-black/[0.06] text-mova-muted hover:text-mova-nearblack flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* STEP 1: WELCOME & LANDING */}
        {step === 'welcome' && (
          <div className="flex flex-col items-center text-center">
            <div className="w-18 h-18 rounded-3xl bg-mova-maroon p-3.5 shadow-md mb-6 flex items-center justify-center">
              <img src={movaLogo} alt="MOVA Logo" className="w-full h-full object-contain" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-mova-gold mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Welcome to MOVA
            </span>

            <h1 id="onboarding-title" className="font-crayon text-3xl sm:text-4xl font-bold text-mova-maroon leading-tight mb-3">
              Don't Follow People.<br />Follow Moments.
            </h1>

            <p className="text-sm text-mova-muted leading-relaxed max-w-md mb-8">
              See what's happening within walking distance. Share your spontaneous vibe. Join the situation right now.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
              <button
                onClick={() => setStep('vibe')}
                className="w-full py-3.5 px-6 rounded-2xl bg-mova-maroon hover:bg-mova-maroon-hover text-white font-bold text-sm shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>ENTER MOVA</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setStep('how_it_works')}
                className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-black/[0.03] hover:bg-black/[0.06] text-mova-nearblack font-semibold text-sm transition-all whitespace-nowrap"
              >
                HOW IT WORKS
              </button>
            </div>
          </div>
        )}

        {/* STEP 1B: HOW IT WORKS EXPLAINER */}
        {step === 'how_it_works' && (
          <div className="flex flex-col">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-mova-gold">The MOVA Loop</span>
              <h2 className="font-crayon text-2xl sm:text-3xl font-bold text-mova-maroon mt-1">
                How spontaneous social works
              </h2>
            </div>

            <div className="flex flex-col gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-black/[0.02] border border-black/[0.05] flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-mova-maroon/10 text-mova-maroon flex items-center justify-center font-bold shrink-0">1</div>
                <div>
                  <h3 className="text-sm font-bold text-mova-nearblack">Vibe & Discover</h3>
                  <p className="text-xs text-mova-muted mt-0.5 leading-relaxed">
                    Filter campus by what you're up for right now—chai, badminton, deep study, or spontaneous music jams.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-black/[0.02] border border-black/[0.05] flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-mova-maroon/10 text-mova-maroon flex items-center justify-center font-bold shrink-0">2</div>
                <div>
                  <h3 className="text-sm font-bold text-mova-nearblack">Join & Drop</h3>
                  <p className="text-xs text-mova-muted mt-0.5 leading-relaxed">
                    Swipe right or tap "I'm in". Contribute real perspectives via photos, voice clips, or doodles.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-black/[0.02] border border-black/[0.05] flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-mova-maroon/10 text-mova-maroon flex items-center justify-center font-bold shrink-0">3</div>
                <div>
                  <h3 className="text-sm font-bold text-mova-nearblack">Evolve & Remember</h3>
                  <p className="text-xs text-mova-muted mt-0.5 leading-relaxed">
                    When moments conclude, they archive into the community Memory scrapbook. No permanent profile baggage.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => setStep('welcome')}
                className="py-3 px-5 rounded-2xl text-xs font-semibold text-mova-muted hover:text-mova-nearblack"
              >
                Back
              </button>
              <button
                onClick={() => setStep('vibe')}
                className="py-3.5 px-6 rounded-2xl bg-mova-maroon hover:bg-mova-maroon-hover text-white font-bold text-sm shadow-sm active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Set Your First Vibe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: FIRST VIBE SETUP */}
        {step === 'vibe' && (
          <div className="flex flex-col">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-mova-gold">Step 1 of 3</span>
              <h2 className="font-crayon text-2xl sm:text-3xl font-bold text-mova-maroon mt-1">
                What's your vibe right now?
              </h2>
              <p className="text-xs text-mova-muted mt-1">
                This primes your live campus discovery. You can change it anytime.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-8">
              {CANONICAL_VIBES.map((vibe) => {
                const isSelected = chosenVibe === vibe.id;
                return (
                  <button
                    key={vibe.id}
                    onClick={() => setChosenVibe(vibe.id)}
                    className={`p-3 rounded-2xl flex flex-col items-center text-center gap-2 transition-all select-none ${
                      isSelected
                        ? 'bg-mova-maroon text-white shadow-sm ring-2 ring-mova-maroon ring-offset-2'
                        : 'bg-black/[0.02] hover:bg-black/[0.05] text-mova-nearblack border border-black/[0.05]'
                    }`}
                  >
                    {vibe.icon3d ? (
                      <Icon3D name={vibe.icon3d} size="md" fallbackText={vibe.icon} />
                    ) : (
                      <span className="text-2xl">{vibe.icon}</span>
                    )}
                    <span className="text-xs font-bold">{vibe.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => setStep('welcome')}
                className="py-3 px-5 rounded-2xl text-xs font-semibold text-mova-muted hover:text-mova-nearblack"
              >
                Back
              </button>
              <button
                onClick={() => setStep('context')}
                className="py-3.5 px-6 rounded-2xl bg-mova-maroon hover:bg-mova-maroon-hover text-white font-bold text-sm shadow-sm active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CONTEXT / CAMPUS AREA SETUP */}
        {step === 'context' && (
          <div className="flex flex-col">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-mova-gold">Step 2 of 3</span>
              <h2 className="font-crayon text-2xl sm:text-3xl font-bold text-mova-maroon mt-1">
                Where are you hanging out?
              </h2>
              <p className="text-xs text-mova-muted mt-1">
                We use your general area to compute 2-minute walking times.
              </p>
            </div>

            <div className="flex flex-col gap-2.5 mb-8">
              {[
                { name: 'Central Quad & Steps', desc: 'Heart of campus · Hub for chai runs and open air gatherings' },
                { name: 'Library & Learning Commons', desc: 'Quiet wings · Fast sprints & deep collaboration desks' },
                { name: 'Campus Canteen & Verandah', desc: 'Food stalls · Evening tea, snacks & lively conversations' },
                { name: 'Sports Courts & Turf', desc: 'Badminton, basketball & late evening workout circles' },
                { name: 'Arts Studio & Design Hall', desc: 'Maker spaces · Late night sketching and creative jams' },
              ].map((area) => {
                const isSelected = chosenArea === area.name;
                return (
                  <button
                    key={area.name}
                    onClick={() => setChosenArea(area.name)}
                    className={`p-3.5 rounded-2xl flex items-center justify-between text-left transition-all ${
                      isSelected
                        ? 'bg-mova-maroon text-white shadow-sm'
                        : 'bg-black/[0.02] hover:bg-black/[0.05] text-mova-nearblack border border-black/[0.05]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className={`w-4 h-4 ${isSelected ? 'text-mova-gold' : 'text-mova-muted'}`} />
                      <div>
                        <div className="text-xs font-bold">{area.name}</div>
                        <div className={`text-[11px] ${isSelected ? 'text-white/80' : 'text-mova-muted'}`}>
                          {area.desc}
                        </div>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-mova-gold shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>

            {/* Custom Location Input */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Or type custom campus spot (e.g. Mechanical Block, Hostel 3 Lobby)..."
                value={chosenArea}
                onChange={(e) => setChosenArea(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-black/[0.02] border border-black/[0.08] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-mova-maroon"
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => setStep('vibe')}
                className="py-3 px-5 rounded-2xl text-xs font-semibold text-mova-muted hover:text-mova-nearblack"
              >
                Back
              </button>
              <button
                onClick={() => setStep('permissions')}
                className="py-3.5 px-6 rounded-2xl bg-mova-maroon hover:bg-mova-maroon-hover text-white font-bold text-sm shadow-sm active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: PERMISSIONS EXPLANATION */}
        {step === 'permissions' && (
          <div className="flex flex-col">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-mova-gold">Step 3 of 3</span>
              <h2 className="font-crayon text-2xl sm:text-3xl font-bold text-mova-maroon mt-1">
                Transparent permissions
              </h2>
              <p className="text-xs text-mova-muted mt-1">
                MOVA respects your privacy. Optional capabilities never block the app.
              </p>
            </div>

            <div className="flex flex-col gap-3.5 mb-8">
              <div className="p-4 rounded-2xl bg-black/[0.02] border border-black/[0.05] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-mova-gold/10 text-mova-gold flex items-center justify-center shrink-0">
                    <Compass className="w-4 h-4 text-mova-maroon" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-mova-nearblack">Location Services</h3>
                    <p className="text-[11px] text-mova-muted">Used solely to find moments within walking distance.</p>
                  </div>
                </div>
                <button
                  onClick={() => setLocationGranted(!locationGranted)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all ${
                    locationGranted
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-black/[0.06] text-mova-muted'
                  }`}
                >
                  {locationGranted ? 'ALLOWED' : 'OFF'}
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-black/[0.02] border border-black/[0.05] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-mova-gold/10 text-mova-gold flex items-center justify-center shrink-0">
                    <Camera className="w-4 h-4 text-mova-maroon" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-mova-nearblack">Camera & Photos</h3>
                    <p className="text-[11px] text-mova-muted">Only accessed when you drop a perspective into a moment.</p>
                  </div>
                </div>
                <button
                  onClick={() => setCameraGranted(!cameraGranted)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all ${
                    cameraGranted
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-black/[0.06] text-mova-muted'
                  }`}
                >
                  {cameraGranted ? 'ALLOWED' : 'OFF'}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => setStep('context')}
                className="py-3 px-5 rounded-2xl text-xs font-semibold text-mova-muted hover:text-mova-nearblack"
              >
                Back
              </button>
              <button
                onClick={handleFinish}
                className="py-3.5 px-6 rounded-2xl bg-mova-maroon hover:bg-mova-maroon-hover text-white font-bold text-sm shadow-sm active:scale-95 transition-all flex items-center gap-2"
              >
                <span>ENTER THE WORLD</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
