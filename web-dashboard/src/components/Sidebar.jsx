import React from 'react';
import {
  LayoutDashboard, Map, Droplets, Sprout, Wrench, ShieldAlert,
  Table, FileText, FolderKanban, X, Smartphone
} from 'lucide-react';
import { USER_ROLES } from '../../../shared/surveySchema.js';

export default function Sidebar({
  activeTab,
  setActiveTab,
  schemesCount,
  activeRole,
  setActiveRole,
  mobileOpen = false,
  onCloseMobile
}) {
  const menuItems = [
    { id: 'overview',       label: 'Executive Dashboard',   icon: LayoutDashboard },
    { id: 'spatial',        label: 'GIS & Spatial Mapping', icon: Map, badge: `${schemesCount}` },
    { id: 'telemetry',      label: 'Water Resources',       icon: Droplets },
    { id: 'infrastructure', label: 'Infrastructure & O&M',  icon: Wrench },
    { id: 'agronomic',      label: 'Agronomy & Production', icon: Sprout },
    { id: 'projects',       label: 'Projects & Contracts',  icon: FolderKanban },
    { id: 'registry',       label: 'Scheme Registry',       icon: Table },
    { id: 'sustainability', label: 'Sustainability & Risks',icon: ShieldAlert },
    { id: 'reports',        label: 'Reports & Analytics',   icon: FileText },
    { id: 'mobile_app',     label: 'Mobile Field App',      icon: Smartphone, badge: 'APK' },
  ];

  const handleSelect = (id) => {
    setActiveTab(id);
    if (onCloseMobile) onCloseMobile();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navContent = (
    <>
      <div className="px-5 pt-4 pb-2 flex items-center justify-between">
        <span className="text-xs font-medium text-[#8A948D]">Navigation</span>
        {mobileOpen && (
          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Close navigation menu"
            className="lg:hidden p-1.5 rounded-lg text-[#525E56] hover:bg-[#F3F4F0]"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <nav className="flex-1 px-3 pb-4 space-y-0.5 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-[#133A26] text-white font-semibold'
                  : 'text-[#3F4A43] font-medium hover:bg-[#F3F4F0] hover:text-[#141A16]'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon className={`w-[18px] h-[18px] shrink-0 ${isActive ? 'text-white/90' : 'text-[#738077]'}`} />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-xs px-2 py-0.5 rounded-md font-medium tabular-nums shrink-0 ${
                  isActive ? 'bg-white/15 text-white' : 'bg-[#F3F4F0] text-[#525E56]'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Role / Access Scope Switcher */}
      <div className="p-4 border-t border-[#E7E5E0]">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#525E56]">Access scope</span>
            <span className="text-xs font-medium text-[#133A26]">{activeRole?.scope || 'National'}</span>
          </div>
          <select
            value={activeRole?.id || 'national_director'}
            onChange={(e) => {
              const found = USER_ROLES.find(r => r.id === e.target.value);
              if (found && setActiveRole) setActiveRole(found);
            }}
            className="w-full text-xs font-medium text-[#141A16] bg-[#FAF9F6] border border-[#E2E0D9] rounded-lg px-2.5 py-2 outline-none focus:border-[#133A26]"
          >
            {USER_ROLES.map(r => (
              <option key={r.id} value={r.id}>{r.label}</option>
            ))}
          </select>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Docked Sidebar (>= 1024px) */}
      <aside className="hidden lg:flex w-64 shrink-0 bg-white border-r border-[#E7E5E0] flex-col min-h-[calc(100vh-64px)] sticky top-16 self-start z-20 no-print">
        {navContent}
      </aside>

      {/* Mobile / Tablet Slide-Over Drawer (< 1024px) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex no-print">
          <div
            className="fixed inset-0 bg-[#141A16]/50 backdrop-blur-[1px]"
            onClick={onCloseMobile}
          />
          <aside className="relative w-72 max-w-[85vw] bg-white h-full flex flex-col shadow-xl z-10">
            <div className="h-14 bg-[#133A26] px-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white p-0.5 flex items-center justify-center shrink-0">
                  <img
                    src="/zimbabwe-coat-of-arms.svg"
                    alt="Zimbabwe Coat of Arms"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-bold text-base">NIMIS</span>
              </div>
              <button
                type="button"
                onClick={onCloseMobile}
                className="p-1.5 rounded-lg text-white/80 hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {navContent}
          </aside>
        </div>
      )}
    </>
  );
}
