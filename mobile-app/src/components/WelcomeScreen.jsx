import React, { useState, useEffect } from 'react';
import {
  MapPin, Wifi, WifiOff, FileText, CheckCircle2,
  ChevronRight, Wrench, Sprout, ShieldAlert, ArrowRight, Clock, Plus
} from 'lucide-react';
import { getCurrentLocation } from '../services/locationService.js';
import { getCompletedSurveys } from '../services/storageService.js';

export default function WelcomeScreen({
  onStartSurvey,
  onOpenDrafts,
  draftsCount,
  isOnline
}) {
  const [gpsStatus, setGpsStatus] = useState({ state: 'checking', coords: null });
  const [completedList, setCompletedList] = useState([]);

  useEffect(() => {
    setCompletedList(getCompletedSurveys());
    getCurrentLocation()
      .then(loc => setGpsStatus({ state: 'ready', coords: loc }))
      .catch(err => setGpsStatus({ state: 'error', message: err.message }));
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F6F2] text-[#141A16] flex flex-col font-sans">
      {/* Unified Deep Forest Header matching NIMIS Web Prototype */}
      <header className="bg-[#133A26] text-white px-5 pt-6 pb-7 border-b border-white/10">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg bg-white p-1 flex items-center justify-center shrink-0">
                <img
                  src="/zimbabwe-coat-of-arms.svg"
                  alt="Republic of Zimbabwe Coat of Arms"
                  className="w-full h-full object-contain"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
              <div>
                <div className="text-lg font-bold tracking-tight leading-none">NIMIS</div>
                <div className="text-xs text-white/70 mt-0.5">Field Data Collector</div>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-white/10 border border-white/15">
              <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-[#4ADE80]' : 'bg-[#F59E0B]'}`} />
              {isOnline ? 'Online' : 'Offline mode'}
            </span>
          </div>

          <h1 className="text-xl font-bold text-white leading-snug">
            Department of Irrigation Development
          </h1>
          <p className="text-sm text-white/75 mt-1">
            Offline-first scheme registration, GPS verification, asset audit, and seasonal crop reporting.
          </p>
        </div>
      </header>

      <main className="flex-1 max-w-lg w-full mx-auto px-4 py-5 space-y-4">
        {/* Field Readiness Strip — Pure White Card */}
        <div className="agri-card rounded-xl grid grid-cols-3 divide-x divide-[#ECEAE4]">
          <div className="p-3.5">
            <div className="flex items-center gap-1.5 text-xs text-[#738077]">
              <MapPin className="w-3.5 h-3.5 text-[#133A26]" />
              <span>GPS fix</span>
            </div>
            <div className="text-sm font-semibold text-[#141A16] mt-1 tabular-nums truncate">
              {gpsStatus.state === 'ready' ? `±${gpsStatus.coords.accuracy}m` : gpsStatus.state === 'checking' ? 'Locating...' : 'Manual'}
            </div>
          </div>

          <div className="p-3.5">
            <div className="flex items-center gap-1.5 text-xs text-[#738077]">
              {isOnline ? <Wifi className="w-3.5 h-3.5 text-[#2D7A4D]" /> : <WifiOff className="w-3.5 h-3.5 text-[#C88A2E]" />}
              <span>Sync status</span>
            </div>
            <div className="text-sm font-semibold text-[#141A16] mt-1 tabular-nums">
              {completedList.length} submitted
            </div>
          </div>

          <div className="p-3.5">
            <div className="flex items-center gap-1.5 text-xs text-[#738077]">
              <FileText className="w-3.5 h-3.5 text-[#525E56]" />
              <span>Drafts</span>
            </div>
            <div className="text-sm font-semibold text-[#141A16] mt-1 tabular-nums">
              {draftsCount} saved
            </div>
          </div>
        </div>

        {/* Primary Actions */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={onStartSurvey}
            className="w-full py-3.5 px-4 rounded-xl bg-[#133A26] hover:bg-[#0F2F1E] text-white font-semibold text-sm flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <span className="block leading-tight font-semibold">Start new scheme assessment</span>
                <span className="text-xs font-normal text-white/70">8-step NIMIS &amp; mWater baseline form</span>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-white/80 shrink-0" />
          </button>

          {draftsCount > 0 && (
            <button
              type="button"
              onClick={onOpenDrafts}
              className="w-full py-3 px-4 rounded-xl bg-white border border-[#E7E5E0] hover:border-[#133A26] text-[#141A16] font-medium text-sm flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#C88A2E]" />
                <span>Resume saved draft ({draftsCount})</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#738077]" />
            </button>
          )}
        </div>

        {/* 4 Field Capture Modules */}
        <div className="space-y-2.5">
          <h2 className="text-xs font-medium text-[#738077] px-1">Capture modules</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: MapPin,      title: 'Scheme registry & GPS', desc: 'Unique ID, ward & verified fix' },
              { icon: Wrench,      title: 'Assets & energy',       desc: 'Headworks, canals & ZESA/solar' },
              { icon: Sprout,      title: 'Areas & production',    desc: '4 area measures & crop yields' },
              { icon: ShieldAlert, title: 'O&M & risk audit',      desc: 'IMC, O&M fund & bottlenecks' },
            ].map(item => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="agri-card rounded-xl p-3.5 space-y-1.5">
                  <Icon className="w-4 h-4 text-[#133A26]" />
                  <h3 className="text-sm font-semibold text-[#141A16] leading-tight">{item.title}</h3>
                  <p className="text-xs text-[#738077] leading-snug">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Submissions Queue */}
        {completedList.length > 0 && (
          <div className="agri-card rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#ECEAE4] flex items-center justify-between">
              <span className="text-xs font-semibold text-[#141A16]">Recent field submissions</span>
              <span className="text-xs text-[#2D7A4D] font-medium">Synced to NIMIS</span>
            </div>
            <div className="divide-y divide-[#F0EFEA]">
              {completedList.slice(0, 3).map(item => (
                <div key={item.id} className="px-4 py-3 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-[#141A16] truncate">{item.scheme_name}</div>
                    <div className="text-xs font-mono text-[#738077]">{item.id} · {item.province || 'Zimbabwe'}</div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-[#2D7A4D] shrink-0" />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-[#E7E5E0] bg-white px-4 py-3 text-center text-xs text-[#738077]">
        Republic of Zimbabwe · Ministry of Agriculture, Mechanisation &amp; Water Resources Development
      </footer>
    </div>
  );
}
