import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, MapPin, Edit2, Check, User, HeartHandshake, Layers } from 'lucide-react';
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

  if (!isOpen) return null;

  const currentVibe = CANONICAL_VIBES.find((v) => v.id === userProfile.currentVibeId);

  const handleSave = () => {
    onUpdateProfile({ name, bio, campusArea });
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
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-mova-maroon/20 shadow-sm"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 ring-2 ring-white" title="Active on Campus" />
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
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-black/[0.03] hover:bg-black/[0.06] font-bold text-xs text-mova-nearblack transition-colors"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
};
