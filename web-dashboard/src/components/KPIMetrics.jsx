import React from 'react';
import {
  IrrigatedFieldIcon, BullseyeTargetIcon, LandscapeSunriseIcon
} from './NimisIcons.jsx';
import { calculateSummaryMetrics, NATIONAL_2030_TARGET_HA } from '../../../shared/surveySchema.js';

export default function KPIMetrics({ schemes = [], onNavigate }) {
  const m = calculateSummaryMetrics(schemes);
  const functionalPct = parseFloat(m.functionalPercentage) || 0;
  const remainingPilotHa = Math.max(0, NATIONAL_2030_TARGET_HA - Number(m.totalActualIrrigatedArea));

  return (
    <div className="space-y-3">
      {/* Row 1: Compact Editorial 4-Card Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
        {/* Card 1: Primary Deep Forest Surface */}
        <div className="rounded-xl px-4 py-3.5 bg-[#133A26] text-white flex flex-col justify-between gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-white/75">Actually irrigated area</span>
            <IrrigatedFieldIcon className="w-6 h-6 text-emerald-300/90" />
          </div>
          <div>
            <div className="text-2xl font-bold tracking-tight tabular-nums leading-none">
              {Number(m.totalActualIrrigatedArea).toLocaleString()} <span className="text-sm font-medium text-white/70">ha</span>
            </div>
            <div className="text-xs text-white/65 mt-1.5 tabular-nums">
              Equipped {Number(m.totalEquippedArea).toLocaleString()} ha · Design {Number(m.totalDesignArea).toLocaleString()} ha
            </div>
          </div>
        </div>

        {/* Card 2: Crisp White — 2030 National Target */}
        <div className="agri-card rounded-xl px-4 py-3.5 flex flex-col justify-between gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#525E56]">2030 national target</span>
            <BullseyeTargetIcon className="w-6 h-6 text-[#133A26]" />
          </div>
          <div>
            <div className="text-2xl font-bold text-[#141A16] tracking-tight tabular-nums leading-none">
              {NATIONAL_2030_TARGET_HA.toLocaleString()} <span className="text-sm font-medium text-[#738077]">ha</span>
            </div>
            <div className="text-xs text-[#738077] mt-1.5 tabular-nums">
              National baseline ref: 305,121 ha (61.5%)
            </div>
          </div>
        </div>

        {/* Card 3: Crisp White — Functionality Rate */}
        <div className="agri-card rounded-xl px-4 py-3.5 flex flex-col justify-between gap-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-[#525E56]">Functionality rate</span>
            <span className="text-xs font-semibold text-[#133A26] bg-[#EDF4EF] px-2 py-0.5 rounded-md tabular-nums">
              {Math.round(Number(m.totalFunctionalArea)).toLocaleString()} / {Math.round(Number(m.totalEquippedArea)).toLocaleString()} ha
            </span>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#141A16] tracking-tight tabular-nums leading-none">
              {m.functionalPercentage}%
            </div>
            <div className="h-1.5 bg-[#ECEAE4] rounded-full overflow-hidden mt-2">
              <div className="h-full bg-[#2D7A4D] rounded-full" style={{ width: `${Math.min(100, functionalPct)}%` }} />
            </div>
          </div>
        </div>

        {/* Card 4: Crisp White — Cropping Intensity */}
        <div className="agri-card rounded-xl px-4 py-3.5 flex flex-col justify-between gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#525E56]">Cropping intensity</span>
            <LandscapeSunriseIcon className="w-6 h-6 text-[#B9770E]" />
          </div>
          <div>
            <div className="text-2xl font-bold text-[#141A16] tracking-tight tabular-nums leading-none">
              {m.croppingIntensityPct}%
            </div>
            <div className="text-xs text-[#738077] mt-1.5 tabular-nums">
              Target gap {(remainingPilotHa / 1000).toFixed(1)}k ha · {m.verificationCoveragePct}% verified
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Compact Unified 5-Column Status Bar */}
      <div className="agri-card rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-[#ECEAE4]">
        {[
          { label: 'Registered schemes',  value: m.totalSchemes,               sub: `${m.totalBeneficiaries.toLocaleString()} beneficiaries`, dot: '#133A26' },
          { label: 'Fully functional',    value: m.fullyFunctionalSchemes,     sub: `${m.fullyFunctionalRate}% of total`,                     dot: '#2D7A4D' },
          { label: 'Partially functional',value: m.partiallyFunctionalSchemes, sub: `${Math.round((m.partiallyFunctionalSchemes / Math.max(1, m.totalSchemes)) * 100)}% of total`, dot: '#C88A2E' },
          { label: 'Under rehabilitation',value: m.underRehabSchemes,          sub: `${Math.round((m.underRehabSchemes / Math.max(1, m.totalSchemes)) * 100)}% of total`, dot: '#2B6CB0' },
          { label: 'Non-functional',      value: m.nonFunctionalSchemes,       sub: `${Math.round((m.nonFunctionalSchemes / Math.max(1, m.totalSchemes)) * 100)}% of total`, dot: '#C53030' },
        ].map(item => (
          <button
            key={item.label}
            type="button"
            onClick={() => onNavigate && onNavigate('registry')}
            className="px-4 py-2.5 text-left hover:bg-[#FAF9F6] transition-colors first:rounded-l-xl last:rounded-r-xl"
          >
            <div className="flex items-center gap-2 text-xs font-medium text-[#525E56]">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: item.dot }} />
              <span>{item.label}</span>
            </div>
            <div className="mt-1 flex items-baseline justify-between gap-2">
              <span className="text-lg font-bold text-[#141A16] tabular-nums">{item.value}</span>
              <span className="text-xs text-[#738077] tabular-nums">{item.sub}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
