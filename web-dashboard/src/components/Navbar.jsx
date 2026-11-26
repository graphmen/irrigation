import React from 'react';
import {
  Search, Plus, Download, RotateCcw, X, Bell, User, Menu
} from 'lucide-react';
import { resetToSeedData } from '../firebase.js';
import { DATA_AS_AT_DATE } from '../../../shared/surveySchema.js';

export default function Navbar({
  onOpenNewSchemeModal,
  onExportCSV,
  onToggleMobileMenu,
  schemesCount,
  verifiedCount = 0,
  searchTerm,
  setSearchTerm,
  activeRole
}) {
  const handleReset = () => {
    if (confirm('Reset NIMIS pilot registry to default seed dataset?')) {
      resetToSeedData();
    }
  };

  return (
    <header className="sticky top-0 z-30 no-print">
      <div className="h-14 sm:h-16 bg-[#133A26] px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-5 text-white border-b border-white/10">
        {/* Left: Mobile Menu Toggle + Coat of Arms + NIMIS Brand */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
          <button
            type="button"
            onClick={onToggleMobileMenu}
            aria-label="Open navigation menu"
            className="lg:hidden p-2 -ml-1 rounded-lg text-white/90 hover:bg-white/10 transition-colors shrink-0"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white p-0.5 sm:p-1 flex items-center justify-center shrink-0">
            <img
              src="/zimbabwe-coat-of-arms.svg"
              alt="Republic of Zimbabwe Coat of Arms"
              className="w-full h-full object-contain"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
          <div className="min-w-0">
            <div className="text-base sm:text-lg font-bold tracking-tight leading-none">NIMIS</div>
            <div className="hidden sm:block text-xs font-normal text-white/70 leading-tight mt-0.5 truncate">
              National Irrigation Management Information System
            </div>
          </div>
        </div>

        {/* Center-Left: Ministry & Department (Desktop XL) */}
        <div className="hidden xl:flex items-center pl-6 border-l border-white/15 min-w-0">
          <div className="min-w-0">
            <div className="text-sm font-medium text-white/95 truncate">
              Ministry of Agriculture, Mechanisation and Water Resources Development
            </div>
            <div className="text-xs text-white/60 truncate">
              Department of Irrigation Development · {schemesCount} schemes ({verifiedCount} verified)
            </div>
          </div>
        </div>

        {/* Right: Search + Quiet Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 ml-auto shrink-0">
          <div className="relative hidden lg:block w-56 xl:w-60">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
            <input
              type="text"
              placeholder="Search schemes or districts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-lg text-sm bg-white/10 border border-white/15 text-white placeholder-white/50 outline-none focus:bg-white focus:text-[#141A16] focus:placeholder-slate-400 transition-colors"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/60 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={onExportCSV}
            title="Export Registry CSV"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/15 border border-white/15 text-white/90 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Export</span>
          </button>

          <button
            onClick={onOpenNewSchemeModal}
            className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-xs font-semibold bg-white text-[#133A26] hover:bg-[#F6F6F2] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Register scheme</span>
            <span className="sm:hidden">New</span>
          </button>

          <button
            onClick={handleReset}
            title="Reset pilot seed data"
            className="p-2 rounded-lg text-white/65 hover:text-white hover:bg-white/10 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="hidden md:flex items-center gap-2.5 pl-3 border-l border-white/15">
            <Bell className="w-4 h-4 text-white/65" />
            <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-white/90">
              <User className="w-4 h-4" />
            </div>
            <div className="text-right leading-tight">
              <div className="text-xs font-medium text-white max-w-[140px] truncate">
                {activeRole?.label?.split('—')[0]?.trim() || 'Director — DOI'}
              </div>
              <div className="text-xs text-white/55">
                {DATA_AS_AT_DATE}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
