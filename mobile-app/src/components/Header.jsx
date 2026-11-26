import React from 'react';
import { Wifi, WifiOff, FileText, ArrowLeft } from 'lucide-react';

export default function Header({ isOnline, draftsCount, onOpenDrafts, onGoHome }) {
  return (
    <header className="sticky top-0 z-30 bg-[#133A26] text-white border-b border-white/10">
      <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between gap-3">
        {/* Left: Back / Coat of Arms + Title */}
        <div className="flex items-center gap-2.5 min-w-0">
          {onGoHome && (
            <button
              type="button"
              onClick={onGoHome}
              aria-label="Return to Field Hub"
              className="p-1.5 -ml-1 rounded-lg text-white/85 hover:bg-white/10 transition-colors shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div className="w-8 h-8 rounded-lg bg-white p-0.5 flex items-center justify-center shrink-0">
            <img
              src="/zimbabwe-coat-of-arms.svg"
              alt="Republic of Zimbabwe Coat of Arms"
              className="w-full h-full object-contain"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
          <div className="min-w-0">
            <h1 className="text-sm font-bold leading-none truncate">NIMIS Field Collector</h1>
            <p className="text-xs text-white/65 truncate mt-0.5">Dept. of Irrigation Development</p>
          </div>
        </div>

        {/* Right: Connectivity + Drafts */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-white/10 border border-white/15">
            {isOnline ? (
              <>
                <span className="w-2 h-2 rounded-full bg-[#4ADE80]" />
                <Wifi className="w-3.5 h-3.5 text-white/85" />
                <span className="hidden sm:inline">Online</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                <WifiOff className="w-3.5 h-3.5 text-amber-200" />
                <span className="hidden sm:inline">Offline</span>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={onOpenDrafts}
            className="relative p-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-white transition-colors"
            title="Saved Drafts"
          >
            <FileText className="w-4 h-4" />
            {draftsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] rounded-full bg-white text-[#133A26] text-xs font-bold flex items-center justify-center px-1 tabular-nums">
                {draftsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
