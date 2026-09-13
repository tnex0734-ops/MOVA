import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Moment, VibeId } from '../../types/mova';
import { ICONS_3D } from '../../lib/icons3d';
import { CANONICAL_VIBES } from '../../data/mockVibes';
import { Locate, Navigation2, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';
import { Icon3D } from '../common/Icon3D';

interface RealisticMapProps {
  moments: Moment[];
  selectedVibe: VibeId | 'all';
  activeMomentId?: string | null;
  onSelectMoment: (moment: Moment) => void;
  onQuickJoin: (moment: Moment) => void;
  onOpenThread?: (moment: Moment) => void;
  onSwitchToNetwork?: () => void;
}

const CAMPUS_CENTER: [number, number] = [37.8715, -122.2585];
const USER_COORDINATES: [number, number] = [37.8719, -122.2587];

const CAMPUS_LANDMARKS = [
  { name: '🏛️ Central Quad', coords: [37.8719, -122.2585] as [number, number] },
  { name: '📚 Library Steps', coords: [37.8726, -122.2596] as [number, number] },
  { name: '🎨 Arts Studio', coords: [37.8715, -122.2610] as [number, number] },
  { name: '☕ Canteen Verandah', coords: [37.8708, -122.2592] as [number, number] },
  { name: '🎾 Sports Complex', coords: [37.8689, -122.2562] as [number, number] },
];

export const RealisticMap: React.FC<RealisticMapProps> = ({
  moments,
  selectedVibe,
  activeMomentId,
  onSelectMoment,
  onQuickJoin,
  onOpenThread,
  onSwitchToNetwork,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);
  const [selectedPinMoment, setSelectedPinMoment] = useState<Moment | null>(null);

  // Filter moments according to active vibe
  const filteredMoments = moments.filter(
    (m) => selectedVibe === 'all' || m.vibeId === selectedVibe
  );

  // Keep selectedPinMoment in sync with fresh moment data (isJoined, participantCount)
  useEffect(() => {
    if (selectedPinMoment) {
      const fresh = filteredMoments.find((m) => m.id === selectedPinMoment.id);
      if (fresh) {
        setSelectedPinMoment(fresh);
      }
    }
  }, [filteredMoments]);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Create Map Instance with bounds restriction for campus
    const map = L.map(mapContainerRef.current, {
      center: CAMPUS_CENTER,
      zoom: 16.5,
      minZoom: 15,
      maxZoom: 19,
      zoomControl: false,
      attributionControl: false,
    });

    // Crisp, reliable open campus basemap (no watermark, full native high-zoom support)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      subdomains: 'abc',
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // Clicking map background dismisses selected pin preview
    map.on('click', () => {
      setSelectedPinMoment(null);
    });

    // Add Layer Group for dynamic moment pins
    const markersGroup = L.layerGroup().addTo(map);
    markersGroupRef.current = markersGroup;

    // Add Live User Location Pulse Marker
    const userIcon = L.divIcon({
      className: 'custom-map-marker',
      html: `
        <div class="relative flex flex-col items-center justify-center cursor-pointer group" role="button" tabindex="0" aria-label="Your location at Library Steps. Click to recenter.">
          <div class="relative flex items-center justify-center w-7 h-7">
            <div class="absolute w-12 h-12 rounded-full bg-mova-orange/30 animate-radar pointer-events-none"></div>
            <div class="w-6 h-6 rounded-full bg-white border-2 border-mova-ocean shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-150">
              <div class="w-2.5 h-2.5 rounded-full bg-mova-ocean"></div>
            </div>
          </div>
          <div class="mt-1 bg-mova-ocean/95 text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap shadow-sm group-hover:bg-mova-orange group-hover:text-mova-ocean transition-colors duration-150">
            You (Library Steps)
          </div>
        </div>
      `,
      iconSize: [140, 56],
      iconAnchor: [70, 14],
    });

    const userMarker = L.marker(USER_COORDINATES, { icon: userIcon, zIndexOffset: 1000 }).addTo(map);
    const userEl = userMarker.getElement();
    if (userEl) {
      L.DomEvent.disableClickPropagation(userEl);
      L.DomEvent.disableScrollPropagation(userEl);
      userEl.style.cursor = 'pointer';
      userEl.addEventListener('click', (e) => {
        e.stopPropagation();
        map.flyTo(USER_COORDINATES, 17, { duration: 0.8 });
      });
      userEl.addEventListener('keydown', (ke: KeyboardEvent) => {
        if (ke.key === 'Enter' || ke.key === ' ') {
          ke.preventDefault();
          map.flyTo(USER_COORDINATES, 17, { duration: 0.8 });
        }
      });
    }

    userMarker.on('click', () => {
      map.flyTo(USER_COORDINATES, 17, { duration: 0.8 });
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers whenever filteredMoments or activeMomentId changes
  useEffect(() => {
    if (!mapInstanceRef.current || !markersGroupRef.current) return;

    const markersGroup = markersGroupRef.current;
    markersGroup.clearLayers();

    filteredMoments.forEach((moment) => {
      if (!moment.geo) return;

      const isSelected = activeMomentId === moment.id || selectedPinMoment?.id === moment.id;
      const vibe = CANONICAL_VIBES.find((v) => v.id === moment.vibeId);
      const iconUrl = ICONS_3D[moment.vibeId];

      const ringColor =
        moment.activityLevel === 'hot'
          ? 'border-mova-orange ring-4 ring-mova-orange/30'
          : moment.activityLevel === 'closing'
          ? 'border-mova-ice ring-4 ring-mova-ice/40'
          : 'border-mova-ocean ring-2 ring-mova-ocean/20';

      const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `
          <div class="group relative flex flex-col items-center cursor-pointer select-none ${
            isSelected ? 'scale-125 z-50' : ''
          }" role="button" tabindex="0" aria-label="${moment.title}">
            <!-- 3D Icon Pin Badge -->
            <div class="w-12 h-12 rounded-full bg-white/95 backdrop-blur-sm border-2 ${ringColor} shadow-bento flex items-center justify-center p-1.5 group-hover:scale-110 transition-transform duration-150">
              <img src="${iconUrl}" alt="${vibe?.label || ''}" class="w-8 h-8 object-contain pointer-events-none drop-shadow-xs" />
              <div class="absolute -top-1 -right-1 bg-mova-ocean text-white font-mono-tabular font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                ${moment.participantCount}
              </div>
            </div>

            <!-- Callout Title Label -->
            <div class="mt-1 bg-white border-2 border-mova-ocean/70 px-2.5 py-0.5 rounded-full shadow-md text-[11px] text-mova-ocean whitespace-nowrap flex items-center gap-1 group-hover:bg-mova-ocean group-hover:text-white transition-colors duration-150">
              <span class="font-crayon text-xs font-bold">${moment.title.length > 20 ? moment.title.substring(0, 18) + '...' : moment.title}</span>
              <span class="text-[10px] text-mova-muted group-hover:text-white/80 font-bold font-mono-tabular">· ${moment.walkingMinutes || 2}m</span>
            </div>
          </div>
        `,
        iconSize: [220, 84],
        iconAnchor: [110, 24],
      });

      const handleMomentSelect = (e?: any) => {
        if (e) {
          if (typeof e.stopPropagation === 'function') e.stopPropagation();
          if (e.originalEvent && typeof e.originalEvent.stopPropagation === 'function') {
            e.originalEvent.stopPropagation();
          }
        }
        // Clicking pin shows the quick preview card (Image 2) and centers the map smoothly
        setSelectedPinMoment(moment);
        mapInstanceRef.current?.flyTo([moment.geo!.lat, moment.geo!.lng], 16.8, {
          duration: 0.8,
        });
      };

      const marker = L.marker([moment.geo.lat, moment.geo.lng], {
        icon: customIcon,
        zIndexOffset: isSelected ? 500 : 100,
        title: moment.title,
      });

      marker.on('click', handleMomentSelect);
      marker.addTo(markersGroup);

      // Secure DOM level interaction and prevent map drag interception
      const markerEl = marker.getElement();
      if (markerEl) {
        L.DomEvent.disableClickPropagation(markerEl);
        L.DomEvent.disableScrollPropagation(markerEl);
        markerEl.style.pointerEvents = 'auto';
        markerEl.style.cursor = 'pointer';
        markerEl.setAttribute('role', 'button');
        markerEl.setAttribute('tabindex', '0');
        markerEl.setAttribute(
          'aria-label',
          `Moment: ${moment.title}. ${moment.participantCount} people gathered, ${moment.walkingMinutes || 2} minute walk. Click to preview.`
        );
        markerEl.addEventListener('click', handleMomentSelect);
        markerEl.addEventListener('keydown', (ke: KeyboardEvent) => {
          if (ke.key === 'Enter' || ke.key === ' ') {
            ke.preventDefault();
            handleMomentSelect(ke);
          }
        });
      }
    });
  }, [filteredMoments, activeMomentId]);

  // Recenter to user
  const handleRecenter = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo(USER_COORDINATES, 17, { duration: 0.8 });
  };

  // Jump to specific landmark
  const handleJumpToLandmark = (coords: [number, number]) => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo(coords, 17, { duration: 0.8 });
  };

  return (
    <div className="relative isolate overflow-hidden w-full h-[460px] sm:h-[540px] lg:h-[580px] rounded-bento border border-black/[0.06] shadow-bento bg-[#F4F0EB]">
      {/* Top Map Header & Controls Overlay (High-Contrast Floating HUD) */}
      <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Live Campus Radar Badge - High Contrast Ocean & Orange */}
        <div className="bg-mova-ocean/95 text-white backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-float flex items-center gap-2.5 pointer-events-auto">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mova-orange opacity-85"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-mova-orange"></span>
          </span>
          <span className="font-extrabold text-xs uppercase tracking-wider text-white">
            Campus Live Map
          </span>
          <span className="text-[11px] text-mova-ice font-mono-tabular font-bold bg-white/15 px-2 py-0.5 rounded-full">
            {filteredMoments.length} active spots
          </span>
        </div>

        {/* View Actions & Landmark Shortcuts - High Contrast Bold Outline Buttons */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={handleRecenter}
            className="px-3.5 py-1.5 rounded-full bg-white border-2 border-mova-ocean text-mova-ocean shadow-float text-xs font-extrabold hover:bg-mova-ocean hover:text-white flex items-center gap-1.5 transition-all group"
            title="Recenter on My Location"
          >
            <Locate className="w-3.5 h-3.5 text-mova-ocean group-hover:text-white transition-colors" />
            <span className="hidden sm:inline">My Spot</span>
          </button>

          {onSwitchToNetwork && (
            <button
              onClick={onSwitchToNetwork}
              className="px-3.5 py-1.5 rounded-full bg-white border-2 border-mova-ocean text-mova-ocean shadow-float text-xs font-extrabold hover:bg-mova-ocean hover:text-white flex items-center gap-1.5 transition-all group"
            >
              <Navigation2 className="w-3.5 h-3.5 text-mova-ocean group-hover:text-white transition-colors" />
              <span>Spatial Graph</span>
            </button>
          )}
        </div>
      </div>

      {/* Landmark Teleport Pills Bar - High Contrast Dark HUD Pills */}
      <div className="absolute top-13 sm:top-14 left-3 right-3 z-20 flex items-center gap-2 overflow-x-auto no-scrollbar pointer-events-auto py-1 pr-4">
        {CAMPUS_LANDMARKS.map((landmark) => (
          <button
            key={landmark.name}
            onClick={() => handleJumpToLandmark(landmark.coords)}
            className="px-3 py-1.5 bg-mova-ocean/90 backdrop-blur-md text-white border border-white/20 rounded-full shadow-float text-xs font-bold hover:bg-mova-orange hover:text-mova-ocean hover:border-mova-orange hover:scale-105 transition-all shrink-0 flex items-center gap-1.5"
          >
            {landmark.name}
          </button>
        ))}
      </div>

      {/* The Actual Leaflet Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Selected Moment Quick Preview Card (Slides in at bottom) */}
      {selectedPinMoment && !activeMomentId && (
        <div className="absolute bottom-3 left-3 right-3 z-30 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-mova-ice-border shadow-float flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <button
            type="button"
            className="flex items-center gap-3 min-w-0 cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-mova-ocean rounded-xl flex-1"
            onClick={() => {
              if (selectedPinMoment.isJoined && onOpenThread) {
                onOpenThread(selectedPinMoment);
              } else {
                onSelectMoment(selectedPinMoment);
              }
              setSelectedPinMoment(null);
            }}
            aria-label={selectedPinMoment.isJoined ? `Open living thread for ${selectedPinMoment.title}` : `Inspect and join ${selectedPinMoment.title}`}
          >
            {selectedPinMoment.photoUrl ? (
              <img
                src={selectedPinMoment.photoUrl}
                alt={selectedPinMoment.title}
                className="w-14 h-14 rounded-xl object-cover border border-mova-ice-border shrink-0"
              />
            ) : (
              <div className="w-14 h-14 rounded-xl bg-mova-ice-soft flex items-center justify-center shrink-0">
                <Icon3D name={selectedPinMoment.vibeId} size="sm" />
              </div>
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-mova-ice-soft text-mova-ocean border border-mova-ice-border">
                  {selectedPinMoment.vibeId}
                </span>
                <span className="text-[11px] text-mova-muted font-mono-tabular">
                  {selectedPinMoment.distanceMeters || 180}m away · {selectedPinMoment.walkingMinutes || 2} min walk
                </span>
              </div>
              <h4 className="font-crayon text-base font-bold text-mova-ocean truncate mt-0.5">
                {selectedPinMoment.title}
              </h4>
              <p className="text-xs text-mova-muted truncate">
                {selectedPinMoment.location} · {selectedPinMoment.participantCount} people gathered
              </p>
            </div>
          </button>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setSelectedPinMoment(null)}
              aria-label="Dismiss moment preview"
              className="px-3 py-2 text-xs font-semibold text-mova-muted hover:text-mova-ocean rounded-xl hover:bg-mova-ice-soft transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-mova-ocean"
            >
              Dismiss
            </button>
            {selectedPinMoment.isJoined ? (
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  if (onOpenThread) {
                    onOpenThread(selectedPinMoment);
                  } else {
                    onSelectMoment(selectedPinMoment);
                  }
                  setSelectedPinMoment(null);
                }}
                className="gap-1.5 shadow-sm bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>You're In · Thread</span>
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  onQuickJoin(selectedPinMoment);
                  setSelectedPinMoment(null);
                }}
                className="gap-1.5 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>I'M IN!</span>
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Bottom Map Legend */}
      {!selectedPinMoment && (
        <div className="absolute bottom-3 left-3 z-10 hidden sm:flex items-center gap-3 bg-mova-ocean/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-float text-[11px] text-white">
          <span className="flex items-center gap-1.5 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-mova-orange inline-block"></span>
            Hot ({filteredMoments.filter((m) => m.activityLevel === 'hot').length})
          </span>
          <span className="flex items-center gap-1.5 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-white inline-block"></span>
            Active ({filteredMoments.filter((m) => m.activityLevel === 'active').length})
          </span>
          <span className="flex items-center gap-1.5 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-mova-ice inline-block"></span>
            Closing Soon
          </span>
        </div>
      )}
    </div>
  );
};
