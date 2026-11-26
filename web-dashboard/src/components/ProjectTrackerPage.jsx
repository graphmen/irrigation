import React, { useState } from 'react';
import { Eye, Settings, Clock } from 'lucide-react';
import { BullseyeTargetIcon, YieldChartIcon, GoldCoinIcon } from './NimisIcons.jsx';
import { NATIONAL_PROJECTS_DATA, DATA_AS_AT_DATE } from '../../../shared/surveySchema.js';

export default function ProjectTrackerPage({ schemes = [], onSelectScheme }) {
  const [statusFilter, setStatusFilter] = useState('All');

  const projects = NATIONAL_PROJECTS_DATA.filter(p =>
    statusFilter === 'All' ? true : p.status === statusFilter
  );

  const totalTargetHa = NATIONAL_PROJECTS_DATA.reduce((s, p) => s + p.target_ha, 0);
  const totalAchievedHa = NATIONAL_PROJECTS_DATA.reduce((s, p) => s + p.achieved_ha, 0);
  const totalBudgetUsd = NATIONAL_PROJECTS_DATA.reduce((s, p) => s + p.budget_usd, 0);
  const totalSpentUsd = NATIONAL_PROJECTS_DATA.reduce((s, p) => s + p.spent_usd, 0);
  const overallPhysicalPct = Math.round((totalAchievedHa / Math.max(1, totalTargetHa)) * 100);
  const overallFinancialPct = Math.round((totalSpentUsd / Math.max(1, totalBudgetUsd)) * 100);

  const rehabSchemes = schemes.filter(
    s => s.rehab?.needs_rehab || ['Partially functional', 'Under rehabilitation', 'Non-functional'].includes(s.technical?.status)
  );

  const statusDot = (status) => {
    if (status === 'On Track')    return '#2D7A4D';
    if (status === 'Behind')      return '#C53030';
    if (status === 'In Progress') return '#C88A2E';
    return '#64748B';
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-[#E7E5E0]">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-lg bg-[#133A26] text-white text-xs font-semibold flex items-center justify-center shrink-0 tabular-nums">
            06
          </span>
          <div>
            <h2 className="text-2xl font-bold text-[#141A16] leading-tight">Project implementation tracker</h2>
            <p className="text-sm text-[#525E56] mt-0.5">
              Development, rehabilitation and expansion programmes — physical milestones tracked separately from financial spend
            </p>
          </div>
        </div>
        <div className="text-xs font-medium text-[#738077] shrink-0">Data as at {DATA_AS_AT_DATE}</div>
      </div>

      {/* 4 Compact Pure-White KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="agri-card rounded-xl px-4 py-3 flex flex-col justify-between gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#525E56]">Active projects</span>
            <Settings className="w-5 h-5 text-[#133A26]" />
          </div>
          <div>
            <div className="text-2xl font-bold text-[#141A16] tabular-nums leading-none">{NATIONAL_PROJECTS_DATA.length}</div>
            <div className="text-xs text-[#738077] mt-1">National programmes</div>
          </div>
        </div>

        <div className="agri-card rounded-xl px-4 py-3 flex flex-col justify-between gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#525E56]">Target area (2027)</span>
            <BullseyeTargetIcon className="w-6 h-6 text-[#1E5B88]" />
          </div>
          <div>
            <div className="text-2xl font-bold text-[#141A16] tabular-nums leading-none">
              {totalTargetHa.toLocaleString()} <span className="text-sm font-medium text-[#738077]">ha</span>
            </div>
            <div className="text-xs text-[#738077] mt-1">Planned expansion</div>
          </div>
        </div>

        <div className="agri-card rounded-xl px-4 py-3 flex flex-col justify-between gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#525E56]">Cumulative area</span>
            <YieldChartIcon className="w-6 h-6 text-[#2D7A4D]" />
          </div>
          <div>
            <div className="text-2xl font-bold text-[#141A16] tabular-nums leading-none">
              {totalAchievedHa.toLocaleString()} <span className="text-sm font-medium text-[#738077]">ha</span>
            </div>
            <div className="text-xs text-[#2D7A4D] font-medium mt-1 tabular-nums">{overallPhysicalPct}% physical progress</div>
          </div>
        </div>

        <div className="agri-card rounded-xl px-4 py-3 flex flex-col justify-between gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#525E56]">Total value (2026)</span>
            <GoldCoinIcon className="w-6 h-6 text-[#B9770E]" />
          </div>
          <div>
            <div className="text-2xl font-bold text-[#141A16] tabular-nums leading-none">
              US$ {(totalBudgetUsd / 1e6).toFixed(1)}M
            </div>
            <div className="text-xs text-[#738077] mt-1 tabular-nums">{overallFinancialPct}% financial spend (separate)</div>
          </div>
        </div>
      </div>

      {/* Ongoing Key Projects Table */}
      <div className="agri-card rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#ECEAE4] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-[#141A16]">Ongoing key projects</h3>
          <div className="flex items-center gap-1 bg-[#F3F4F0] p-1 rounded-lg">
            {['All', 'On Track', 'In Progress', 'Behind'].map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  statusFilter === st ? 'bg-white text-[#141A16] shadow-xs' : 'text-[#525E56] hover:text-[#141A16]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#FAF9F6] text-xs font-medium text-[#525E56] border-b border-[#ECEAE4]">
              <tr>
                <th className="px-5 py-3">Project / Programme</th>
                <th className="px-4 py-3 text-right">Target (ha)</th>
                <th className="px-4 py-3">Physical progress</th>
                <th className="px-4 py-3">Financial spend</th>
                <th className="px-4 py-3">Next milestone</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EFEA] bg-white">
              {projects.map(p => (
                <tr key={p.id} className="hover:bg-[#FAF9F6] transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="font-semibold text-[#141A16]">{p.programme}</div>
                    <div className="text-xs text-[#738077]">{p.funding_source} · {p.province}</div>
                  </td>
                  <td className="px-4 py-3.5 text-right font-semibold text-[#141A16] tabular-nums whitespace-nowrap">
                    {p.target_ha.toLocaleString()}
                    <div className="text-xs font-normal text-[#738077]">{p.achieved_ha.toLocaleString()} done</div>
                  </td>
                  <td className="px-4 py-3.5 min-w-[170px]">
                    <div className="flex items-center gap-2.5">
                      <div className="flex-1 h-2 bg-[#ECEAE4] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${p.physical_progress_pct}%`, background: statusDot(p.status) }}
                        />
                      </div>
                      <span className="font-semibold text-[#141A16] w-9 text-right tabular-nums text-xs">{p.physical_progress_pct}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 min-w-[140px]">
                    <div className="text-xs font-medium text-[#141A16] tabular-nums">
                      US${(p.spent_usd / 1e6).toFixed(1)}M <span className="text-[#738077]">({p.financial_progress_pct}%)</span>
                    </div>
                    <div className="h-1.5 bg-[#ECEAE4] rounded-full overflow-hidden mt-1.5">
                      <div className="h-full bg-[#64748B] rounded-full" style={{ width: `${p.financial_progress_pct}%` }} />
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-[#525E56] max-w-[230px]">
                    <div>{p.next_milestone}</div>
                    <div className="text-[11px] text-[#8A948D] mt-0.5 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {p.last_updated}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className="inline-flex items-center gap-2 text-xs font-medium text-[#141A16]">
                      <span className="w-2 h-2 rounded-full" style={{ background: statusDot(p.status) }} />
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Linked Scheme Rehabilitation Pipeline */}
      <div className="agri-card rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#ECEAE4]">
          <h3 className="text-sm font-semibold text-[#141A16]">Linked scheme rehabilitation pipeline</h3>
          <p className="text-xs text-[#738077] mt-0.5">Traceable to authoritative Scheme IDs</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#FAF9F6] text-xs font-medium text-[#525E56] border-b border-[#ECEAE4]">
              <tr>
                <th className="px-5 py-3">Scheme</th>
                <th className="px-4 py-3">Province / District</th>
                <th className="px-4 py-3">Programme</th>
                <th className="px-4 py-3 text-right">Est. rehab cost</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EFEA] bg-white">
              {rehabSchemes.map(s => (
                <tr key={s.id} className="hover:bg-[#FAF9F6] transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="font-semibold text-[#141A16]">{s.scheme_name}</div>
                    <div className="text-xs font-mono text-[#738077]">{s.id}</div>
                  </td>
                  <td className="px-4 py-3.5 text-[#525E56]">{s.province} · {s.district}</td>
                  <td className="px-4 py-3.5">
                    <div className="font-medium text-[#141A16]">{s.rehab?.programme || 'PSIP Candidate'}</div>
                    <div className="text-xs text-[#738077]">{s.rehab?.funding_source || 'GoZ Treasury'}</div>
                  </td>
                  <td className="px-4 py-3.5 text-right font-semibold text-[#141A16] tabular-nums">
                    US${(s.rehab?.estimated_cost_usd || 0).toLocaleString()}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#141A16]">
                      <span className="w-2 h-2 rounded-full" style={{
                        background: s.rehab?.priority === 'Critical' ? '#C53030' : s.rehab?.priority === 'High' ? '#C88A2E' : '#64748B'
                      }} />
                      {s.rehab?.priority || 'Moderate'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={() => onSelectScheme && onSelectScheme(s)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E2E0D9] bg-white hover:border-[#133A26] hover:text-[#133A26] text-xs font-medium text-[#3F4A43] transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" /> Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
