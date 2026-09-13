import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, MapPin, Edit2, Check, User, HeartHandshake, Layers, Camera } from 'lucide-react';
import { UserProfile } from '../../types/mova';
import { CANONICAL_VIBES } from '../../data/mockVibes';
import { Icon3D } from '../common/Icon3D';

interface IdentityDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onOpenCustomVibe: () => void;
}

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&auto=format&fit=crop&q=80',
];

export const IdentityDrawer: React.FC<IdentityDrawerProps> = ({
  isOpen,
  onClose,
  userProfile,
  onUpdateProfile,
  onOpenCustomVibe,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userProfile.name);
  const [bio, setBio] = useState(userProfile.bio);
  const [campusArea, setCampusArea] = useState(userProfile.campusArea);
  const [avatar, setAvatar] = useState(userProfile.avatar);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setName(userProfile.name);
    setBio(userProfile.bio);
    setCampusArea(userProfile.campusArea);
    setAvatar(userProfile.avatar);
  }, [userProfile.name, userProfile.bio, userProfile.campusArea, userProfile.avatar, isOpen]);

  if (!isOpen) return null;

  const currentVibe = CANONICAL_VIBES.find((v) => v.id === userProfile.currentVibeId);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatar(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onUpdateProfile({ name, bio, campusArea, avatar });
    setIsEditing(false);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="identity-drawer-title"
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
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="relative w-full max-w-md h-full bg-white shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto z-10"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] mb-6">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-mova-maroon" />
              <h3 className="font-crayon text-xl font-bold text-mova-maroon">
                Presence & Identity
              </h3>
            </div>
            <button
              onClick={onClose}
              aria-label="Close identity drawer"
              className="w-8 h-8 rounded-full bg-black/[0.03] hover:bg-black/[0.06] text-mova-muted hover:text-mova-nearblack flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* User Card */}
          <div className="flex items-center gap-4 mb-4">
            <input
              type="file"
              ref={avatarInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
            />

            <div className="relative group">
              <img
                src={avatar}
                alt={name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-mova-maroon/20 shadow-sm"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 ring-2 ring-white" title="Active on Campus" />
              {isEditing && (
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  title="Upload profile photo"
                  className="absolute inset-0 rounded-2xl bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                >
                  <Camera className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="flex-1 min-w-0">
              {isEditing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-1.5 text-sm font-bold rounded-lg border border-black/[0.1] focus:ring-2 focus:ring-mova-maroon"
                />
              ) : (
                <h2 id="identity-drawer-title" className="text-xl font-bold text-mova-nearblack truncate">
                  {userProfile.name}
                </h2>
              )}

              <div className="flex items-center gap-1.5 text-xs text-mova-muted mt-1 truncate">
                <MapPin className="w-3 h-3 text-mova-maroon shrink-0" />
                {isEditing ? (
                  <input
                    type="text"
                    value={campusArea}
                    onChange={(e) => setCampusArea(e.target.value)}
                    className="w-full px-2 py-0.5 text-xs rounded border border-black/[0.1]"
                  />
                ) : (
                  <span>{userProfile.campusArea}</span>
                )}
              </div>
            </div>

            <button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className="p-2 rounded-xl bg-black/[0.03] hover:bg-black/[0.06] text-mova-nearblack transition-colors"
              title={isEditing ? 'Save changes' : 'Edit profile'}
            >
              {isEditing ? <Check className="w-4 h-4 text-emerald-600" /> : <Edit2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Avatar Presets & Custom URL when editing */}
          {isEditing && (
            <div className="mb-4 p-3 rounded-2xl bg-black/[0.02] border border-black/[0.05] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-mova-muted uppercase">Select Avatar:</span>
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  className="text-[10px] font-bold text-mova-maroon hover:underline flex items-center gap-1"
                >
                  <Camera className="w-3 h-3" /> Upload Picture
                </button>
              </div>
              <div className="flex items-center gap-2">
                {PRESET_AVATARS.map((url, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setAvatar(url)}
                    className={`w-9 h-9 rounded-xl overflow-hidden border-2 transition-transform hover:scale-105 ${
                      avatar === url ? 'border-mova-maroon ring-2 ring-mova-maroon/20' : 'border-transparent'
                    }`}
                  >
                    <img src={url} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              <input
                type="url"
                placeholder="Or paste avatar image URL (https://...)"
                value={avatar.startsWith('data:') ? '' : avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="w-full px-2.5 py-1 text-[11px] rounded-lg border border-black/[0.1] bg-white focus:outline-none focus:ring-1 focus:ring-mova-maroon"
              />
            </div>
          )}

          {/* Bio / State */}
          <div className="p-4 rounded-2xl bg-black/[0.02] border border-black/[0.05] mb-6">
            <div className="text-[11px] font-bold uppercase tracking-wider text-mova-muted mb-1">
              Current Statement
            </div>
            {isEditing ? (
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={2}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-black/[0.1] focus:ring-2 focus:ring-mova-maroon"
              />
            ) : (
              <p className="text-xs text-mova-nearblack leading-relaxed">
                "{userProfile.bio}"
              </p>
            )}
          </div>

          {/* Current Vibe Status */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-mova-muted">
                Active Vibe
              </span>
              <button
                onClick={onOpenCustomVibe}
                className="text-xs font-bold text-mova-maroon hover:underline"
              >
                Set Custom...
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-mova-maroon/5 border border-mova-maroon/15 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {currentVibe?.icon3d ? (
                  <Icon3D name={currentVibe.icon3d} size="sm" />
                ) : (
                  <span className="text-lg">⚡</span>
                )}
                <span className="text-xs font-bold text-mova-maroon">
                  {userProfile.customVibeText || currentVibe?.label || 'Spontaneous'}
                </span>
              </div>
              <span className="text-[10px] font-mono-tabular font-bold bg-mova-maroon text-white px-2 py-0.5 rounded-full">
                LIVE
              </span>
            </div>
          </div>

          {/* Anti-Vanity Shared Experiences Counters */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="p-4 rounded-2xl bg-black/[0.02] border border-black/[0.05] flex flex-col">
              <span className="text-2xl font-bold font-mono-tabular text-mova-nearblack">
                {userProfile.joinedMomentsCount}
              </span>
              <span className="text-xs text-mova-muted mt-0.5 flex items-center gap-1">
                <HeartHandshake className="w-3.5 h-3.5 text-mova-maroon" />
                Moments Joined
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-black/[0.02] border border-black/[0.05] flex flex-col">
              <span className="text-2xl font-bold font-mono-tabular text-mova-nearblack">
                {userProfile.contributionsCount}
              </span>
              <span className="text-xs text-mova-muted mt-0.5 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-mova-gold" />
                Contributions
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/50 text-[11px] text-amber-900 leading-relaxed">
            💡 <strong>MOVA Principle:</strong> No follower counts or vanity metrics. Only spontaneous moments you shared together.
          </div>
        </div>

        <div className="pt-4 border-t border-black/[0.05]">
          <button
            onClick={() => {
              if (isEditing) handleSave();
              onClose();
            }}
            className="w-full py-3 rounded-2xl bg-black/[0.03] hover:bg-black/[0.06] font-bold text-xs text-mova-nearblack transition-colors"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
};
