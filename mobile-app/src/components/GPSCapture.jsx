import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Loader2, CheckCircle2, AlertTriangle, Navigation, RefreshCw, Signal } from 'lucide-react';
import { getCurrentLocation, watchLocation, stopWatchingLocation } from '../services/locationService.js';

export default function GPSCapture({ coordinates, onChange }) {
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [accuracy, setAccuracy] = useState(null);
  const [watching, setWatching] = useState(false);
  const watchIdRef = useRef(null);

  // Auto-capture on mount
  useEffect(() => {
    captureLocation();
    return () => {
      if (watchIdRef.current !== null) stopWatchingLocation(watchIdRef.current);
    };
  }, []);

  const captureLocation = async () => {
    setStatus('loading');
    setErrorMsg('');
    try {
      const loc = await getCurrentLocation();
      onChange(loc);
      setAccuracy(loc.accuracy);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  };

  const startWatching = () => {
    setWatching(true);
    setStatus('loading');
    watchIdRef.current = watchLocation(
      (loc) => {
        onChange(loc);
        setAccuracy(loc.accuracy);
        setStatus('success');
      },
      (err) => {
        setStatus('error');
        setErrorMsg(err.message);
        setWatching(false);
      }
    );
  };

  const stopWatching = () => {
    stopWatchingLocation(watchIdRef.current);
    watchIdRef.current = null;
    setWatching(false);
  };

  const accuracyColor = !accuracy ? 'text-slate-500'
    : accuracy <= 5   ? 'text-emerald-700'
    : accuracy <= 15  ? 'text-amber-700'
    : 'text-rose-700';

  const accuracyLabel = !accuracy ? 'Unknown'
    : accuracy <= 5   ? 'Excellent'
    : accuracy <= 15  ? 'Good'
    : accuracy <= 30  ? 'Moderate'
    : 'Poor — move outside';

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
      {/* Header */}
      <div className={`px-4 py-3 flex items-center justify-between
        ${status === 'success' ? 'bg-emerald-800' : status === 'error' ? 'bg-rose-800' : 'bg-slate-800'}`}>
        <div className="flex items-center gap-2">
          <Navigation className="w-4 h-4 text-white/80" />
          <span className="text-xs font-black text-white uppercase tracking-wider">GPS Field Location</span>
        </div>
        <div className="flex items-center gap-1.5">
          {status === 'loading' && <Loader2 className="w-4 h-4 text-white animate-spin" />}
          {status === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-300" />}
          {status === 'error'   && <AlertTriangle className="w-4 h-4 text-rose-300" />}
          <span className="text-[10px] font-bold text-white/70 uppercase">
            {status === 'loading' ? 'Acquiring…' : status === 'success' ? 'Fixed' : status === 'error' ? 'Error' : 'Standby'}
          </span>
        </div>
      </div>

      {/* Coordinate Display */}
      <div className="bg-slate-900 px-4 py-3">
        {status === 'error' ? (
          <p className="text-xs font-bold text-rose-400 leading-relaxed">{errorMsg}</p>
        ) : (
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { label: 'Latitude',  value: coordinates?.lat ?? '—', unit: '°N/S' },
              { label: 'Longitude', value: coordinates?.lng ?? '—', unit: '°E/W' },
              { label: 'Altitude',  value: coordinates?.alt !== null && coordinates?.alt !== undefined ? coordinates.alt : '—', unit: 'm ASL' },
            ].map(f => (
              <div key={f.label}>
                <span className="text-[9px] font-black uppercase text-slate-500 block tracking-wider">{f.label}</span>
                <span className="text-sm font-black text-emerald-400 font-mono block leading-tight">
                  {typeof f.value === 'number' ? f.value : f.value}
                </span>
                <span className="text-[9px] text-slate-600 font-bold">{f.unit}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Accuracy + Signal bar */}
      {status === 'success' && accuracy !== null && (
        <div className="bg-slate-800/80 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Signal className="w-3.5 h-3.5 text-emerald-400" />
            <span className={`text-xs font-black ${accuracyColor.replace('text-', 'text-').replace('700', '400')}`}>
              ±{accuracy}m — {accuracyLabel}
            </span>
          </div>
          {watching && (
            <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Tracking
            </span>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="bg-white border-t border-slate-100 px-4 py-3 flex gap-2">
        <button
          type="button"
          onClick={captureLocation}
          disabled={status === 'loading' || watching}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-black
            bg-emerald-800 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed
            transition-all shadow-sm"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${status === 'loading' && !watching ? 'animate-spin' : ''}`} />
          {status === 'loading' && !watching ? 'Acquiring GPS…' : 'Capture My Location'}
        </button>

        {!watching ? (
          <button
            type="button"
            onClick={startWatching}
            disabled={status === 'loading'}
            className="px-3 py-2.5 rounded-xl text-xs font-black bg-sky-700 text-white hover:bg-sky-600 disabled:opacity-50 transition-all shadow-sm"
            title="Track location continuously"
          >
            <Signal className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={stopWatching}
            className="px-3 py-2.5 rounded-xl text-xs font-black bg-rose-700 text-white hover:bg-rose-600 transition-all shadow-sm"
            title="Stop live tracking"
          >
            ✕
          </button>
        )}
      </div>

      <p className="px-4 pb-3 text-xs text-[#738077] leading-relaxed bg-white">
        Uses your device GPS receiver. Move outdoors for best accuracy. Coordinates are saved with the survey submission.
      </p>
    </div>
  );
}
