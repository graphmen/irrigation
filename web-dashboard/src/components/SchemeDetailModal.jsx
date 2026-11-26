import React, { useState } from 'react';
import {
  X, Printer, MapPin, AlertTriangle, ShieldCheck, CheckCircle2,
  Zap, Droplets, FileText, ArrowRight, Clock, Sprout, Wrench
} from 'lucide-react';
import { VERIFICATION_STAGES } from '../../../shared/surveySchema.js';
import { advanceSchemeVerification } from '../firebase.js';

export default function SchemeDetailModal({ scheme, activeRole, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [workflowNote, setWorkflowNote] = useState('');

  if (!scheme) return null;

  const currentStage = scheme.verification?.stage || 'Captured';
  const currentStageIdx = Math.max(0, VERIFICATION_STAGES.findIndex(v => v.id === currentStage));
  const nextStageObj = VERIFICATION_STAGES[currentStageIdx + 1] || null;

  const handleAdvanceStage = () => {
    if (!nextStageObj) return;
    const actor = activeRole?.label || 'NIMIS Officer';
    advanceSchemeVerification(scheme.id, nextStageObj.id, actor, workflowNote.trim());
    setWorkflowNote('');
  };

  const funcRate = scheme.technical?.equipped_area_ha > 0
    ? ((scheme.technical.functional_area_ha / scheme.technical.equipped_area_ha) * 100).toFixed(1)
    : '0.0';

  return (
    <div className="fixed inset-0 z-50 bg-[#141A16]/50 backdrop-blur-[1px] flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-4xl bg-white border border-[#E7E5E0] rounded-xl max-h-[92vh] flex flex-col shadow-xl overflow-hidden my-auto">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-start justify-between gap-4 bg-[#f8faf8]">
          <div className="flex items-center gap-4 min-w-0">
            <img
              src={scheme.photo_scheme || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=300&q=80'}
              alt={scheme.scheme_name}
              className="w-16 h-16 rounded-xl object-cover border-2 border-emerald-800 shadow shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300">
                  {scheme.id}
                </span>
                <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-800 text-white">
                  {scheme.technical?.status || 'Active'}
                </span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> {currentStage}
                </span>
              </div>
              <h2 className="text-lg font-black text-slate-900 mt-1 truncate">{scheme.scheme_name}</h2>
              <p className="text-xs font-bold text-slate-600 mt-0.5 flex items-center gap-1.5 flex-wrap">
                <MapPin className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                {scheme.province} • {scheme.district} • {scheme.ward} • {scheme.technical?.sector_type || 'Communal'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 no-print">
            <button
              onClick={() => window.print()}
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black flex items-center gap-1.5 border border-slate-300"
            >
              <Printer className="w-4 h-4 text-emerald-800" />
              <span className="hidden sm:inline">Print Profile</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 font-bold"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 7-Tab Navigation (Aligned with PDF Page 4 Scheme Profile) */}
        <div className="flex border-b border-slate-200 px-4 bg-slate-100 overflow-x-auto text-xs font-black no-print">
          {[
            { id: 'overview',       label: 'Overview' },
            { id: 'infrastructure', label: 'Infrastructure' },
            { id: 'water_energy',   label: 'Water & Energy' },
            { id: 'production',     label: 'Production' },
            { id: 'om',             label: 'Finance & O&M' },
            { id: 'workflow',       label: 'Risks & Verification' },
            { id: 'documents',      label: 'Documents' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-3.5 border-b-2 font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-emerald-800 text-emerald-800 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-sm text-slate-800">

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-5">
              {/* Four Distinct Area Measures (NIMIS Core Rule) */}
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-500 mb-2.5">
                  Authoritative Area Measures (Ha)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {[
                    { label: 'Design Area',        val: `${scheme.technical?.design_area_ha || scheme.technical?.equipped_area_ha || 0} Ha`, color: 'text-slate-800' },
                    { label: 'Equipped Area',      val: `${scheme.technical?.equipped_area_ha || 0} Ha`, color: 'text-emerald-800' },
                    { label: 'Developed Area',     val: `${scheme.technical?.developed_area_ha || scheme.technical?.equipped_area_ha || 0} Ha`, color: 'text-emerald-700' },
                    { label: 'Functional Area',    val: `${scheme.technical?.functional_area_ha || 0} Ha`, sub: `${funcRate}% rate`, color: 'text-sky-800' },
                    { label: 'Actually Irrigated', val: `${scheme.technical?.actual_irrigated_area_ha || scheme.technical?.functional_area_ha || 0} Ha`, sub: scheme.technical?.current_season || 'Current', color: 'text-teal-800' },
                  ].map(a => (
                    <div key={a.label} className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-extrabold text-slate-500 block uppercase">{a.label}</span>
                      <strong className={`text-base font-black ${a.color} block mt-0.5`}>{a.val}</strong>
                      {a.sub && <span className="text-[10px] font-bold text-slate-500">{a.sub}</span>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Scheme Identity Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                {[
                  { label: 'Commissioned Year',  val: scheme.technical?.commissioning_year || 'N/A' },
                  { label: 'Beneficiaries / Active', val: `${scheme.technical?.beneficiaries_count || 0} / ${scheme.technical?.active_farmers_count || scheme.technical?.beneficiaries_count || 0}` },
                  { label: 'Irrigation Technology', val: scheme.technical?.irrigation_system || 'N/A' },
                  { label: 'Management Model',   val: scheme.technical?.management_model || 'N/A' },
                  { label: 'Average Plot Size',  val: scheme.technical?.plot_size_ha ? `${scheme.technical.plot_size_ha} Ha` : 'N/A' },
                  { label: 'Expansion Potential',val: `${scheme.technical?.potential_expansion_ha || 0} Ha` },
                  { label: 'GPS Coordinates',    val: `${scheme.coordinates?.lat}, ${scheme.coordinates?.lng}` },
                  { label: 'Data Source Type',   val: scheme.verification?.data_source_type || 'Field Officer Survey' },
                ].map(item => (
                  <div key={item.label} className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">{item.label}</span>
                    <strong className="text-slate-900 font-extrabold mt-0.5 block">{item.val}</strong>
                  </div>
                ))}
              </div>

              {/* Responsible Officer */}
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-[10px] text-emerald-800 font-black block uppercase">Responsible Field Officer</span>
                  <strong className="text-slate-900 text-sm">{scheme.officer?.name || 'N/A'}</strong>
                  <p className="text-slate-600 font-bold">{scheme.officer?.designation || 'Irrigation Officer'}</p>
                </div>
                <div>
                  <span className="text-[10px] text-emerald-800 font-black block uppercase">Phone</span>
                  <span className="text-slate-800 font-bold">{scheme.officer?.phone || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-emerald-800 font-black block uppercase">Email</span>
                  <span className="text-slate-800 font-bold break-all">{scheme.officer?.email || 'N/A'}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INFRASTRUCTURE */}
          {activeTab === 'infrastructure' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Wrench className="w-4 h-4 text-emerald-700" /> Engineering Asset Condition Ratings
                </h4>
                <span className="text-[11px] font-bold text-slate-500">
                  Last Assessment: {scheme.infrastructure?.last_assessment_date || '2026-10-15'}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: 'Head Works Rating',         val: scheme.infrastructure?.headworks },
                  { label: 'Conveyance Line Rating',    val: scheme.infrastructure?.conveyance },
                  { label: 'Night Storage Dam (NSD)',   val: scheme.infrastructure?.storage },
                  { label: 'Infield Infrastructure',    val: scheme.infrastructure?.infield },
                  { label: 'Perimeter Fence',           val: scheme.infrastructure?.perimeter_fence },
                  { label: 'Access Road',               val: scheme.infrastructure?.access_road },
                  { label: 'Mobile Network Coverage',   val: scheme.infrastructure?.mobile_network },
                ].map(i => (
                  <div key={i.label} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">{i.label}</span>
                    <span className={`px-3 py-1 rounded text-xs font-black ${
                      i.val === 'Good' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : i.val === 'Moderate' ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-rose-100 text-rose-900 border border-rose-300'
                    }`}>
                      {i.val || 'N/A'}
                    </span>
                  </div>
                ))}
              </div>

              {scheme.rehab && (
                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-xs font-medium text-[#738077] block">Rehabilitation priority</span>
                    <strong className="text-sm font-semibold text-[#141A16]">{scheme.rehab.priority}</strong>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-[#738077] block">Estimated investment needed</span>
                    <strong className="text-sm font-semibold text-[#141A16] tabular-nums">US${(scheme.rehab.estimated_cost_usd || 0).toLocaleString()}</strong>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-[#738077] block">Linked programme</span>
                    <strong className="text-sm font-semibold text-[#141A16]">{scheme.rehab.programme || 'PSIP'}</strong>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: WATER & ENERGY */}
          {activeTab === 'water_energy' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-sky-700" /> Water Resource &amp; Allocation
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  {[
                    { label: 'Water Source Type',      val: scheme.technical?.water_source || 'N/A' },
                    { label: 'Water Source Name',      val: scheme.technical?.water_source_name || 'N/A' },
                    { label: 'Abstraction Capacity',   val: scheme.technical?.abstraction_capacity_ls ? `${scheme.technical.abstraction_capacity_ls} L/s` : 'N/A' },
                    { label: 'Annual Allocation',      val: scheme.technical?.water_allocation_m3 ? `${(scheme.technical.water_allocation_m3 / 1e6).toFixed(2)} Mm³` : 'N/A' },
                    { label: 'Annual Abstraction',     val: scheme.technical?.water_abstraction_m3 ? `${(scheme.technical.water_abstraction_m3 / 1e6).toFixed(2)} Mm³` : 'N/A' },
                    { label: 'Sufficient Year-Round?', val: scheme.water_mgmt?.sufficient_year_round || 'N/A' },
                    { label: 'Active IMC Committee?',  val: scheme.water_mgmt?.has_committee || 'N/A' },
                    { label: 'On-Site Weather Station',val: scheme.water_mgmt?.weather_station || 'N/A' },
                    { label: 'Water Saving Practices', val: scheme.water_mgmt?.water_saving || 'N/A' },
                  ].map(item => (
                    <div key={item.label} className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-500 uppercase block">{item.label}</span>
                      <strong className="text-slate-900 font-black mt-0.5 block">{item.val}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-600" /> Energy &amp; ZESA / Solar Connection
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  {[
                    { label: 'Primary Energy Source', val: scheme.technical?.energy_source || 'N/A' },
                    { label: 'Power Status',          val: scheme.energy?.power_status || 'N/A' },
                    { label: 'Meter / System ID',     val: scheme.energy?.zesa_meter_no || 'N/A' },
                    { label: 'Bill / Account Status', val: scheme.energy?.bill_status || 'N/A' },
                  ].map(item => (
                    <div key={item.label} className="bg-[#FAF9F6] p-3 rounded-xl border border-[#E7E5E0]">
                      <span className="text-xs font-medium text-[#738077] block">{item.label}</span>
                      <strong className="text-[#141A16] font-semibold mt-0.5 block">{item.val}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PRODUCTION */}
          {activeTab === 'production' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Sprout className="w-4 h-4 text-emerald-700" /> Season-Specific Crop &amp; Production History
                </h4>
                <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Cropping Intensity: {scheme.agronomic?.cropping_intensity_pct || 120}%
                </span>
              </div>

              {(scheme.seasonal_production || []).length > 0 ? (
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-[10px] font-black uppercase text-slate-600">
                      <tr>
                        <th className="p-2.5">Season</th>
                        <th className="p-2.5">Crop</th>
                        <th className="p-2.5 text-right">Planted (Ha)</th>
                        <th className="p-2.5 text-right">Yield (t/Ha)</th>
                        <th className="p-2.5 text-right">Production (MT)</th>
                        <th className="p-2.5">Market Destination</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {scheme.seasonal_production.map((r, i) => (
                        <tr key={i} className="hover:bg-slate-50 font-semibold">
                          <td className="p-2.5 font-bold text-slate-600">{r.season}</td>
                          <td className="p-2.5 font-black text-slate-900">{r.crop}</td>
                          <td className="p-2.5 text-right">{r.planted_ha}</td>
                          <td className="p-2.5 text-right font-black text-emerald-800">{r.yield_t_ha}</td>
                          <td className="p-2.5 text-right font-black text-slate-900">{r.production_mt.toLocaleString()}</td>
                          <td className="p-2.5 text-slate-600">{r.market_destination}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {(scheme.agronomic?.crops || []).map(c => (
                    <span key={c} className="px-3 py-1 bg-emerald-100 text-emerald-800 font-black text-xs rounded-full border border-emerald-200">{c}</span>
                  ))}
                </div>
              )}

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Primary Market Outlets</span>
                <p className="font-extrabold text-slate-900 mt-1">{scheme.agronomic?.markets || 'Local Markets & GMB'}</p>
              </div>
            </div>
          )}

          {/* TAB 5: FINANCE & O&M */}
          {activeTab === 'om' && (
            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">Operation, Maintenance &amp; Finance</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  { label: 'Entity Responsible for O&M', val: scheme.om?.responsible || 'Farmers / IMC' },
                  { label: 'O&M Manual Available?',      val: scheme.om?.has_manual || 'N/A' },
                  { label: 'O&M Fund Established?',      val: scheme.om?.has_fund || 'N/A' },
                  { label: 'Farmers Pay Levy?',          val: scheme.om?.pays_levy || 'N/A' },
                  { label: 'O&M Fund Balance (Est.)',    val: `US$${(scheme.om?.fund_balance_usd || 0).toLocaleString()}` },
                  { label: 'Last Rehabilitation Year',   val: `${scheme.om?.last_rehab_year || 'N/A'} (${scheme.om?.rehabilitated_by || 'GoZ'})` },
                ].map(item => (
                  <div key={item.label} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">{item.label}</span>
                    <strong className="text-slate-900 text-sm font-black mt-1 block">{item.val}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: RISKS & 5-STAGE VERIFICATION WORKFLOW */}
          {activeTab === 'workflow' && (
            <div className="space-y-5">
              {/* 5-Stage Verification Stepper (PDF Section 6) */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    5-Stage National Data Verification Workflow
                  </h4>
                  <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    Current: {currentStage}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                  {VERIFICATION_STAGES.map((st, idx) => {
                    const done = idx <= currentStageIdx;
                    const isCurrent = idx === currentStageIdx;
                    return (
                      <div
                        key={st.id}
                        className={`p-2.5 rounded-xl border text-center ${
                          isCurrent
                            ? 'bg-emerald-800 text-white border-emerald-900 shadow-sm'
                            : done
                            ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                            : 'bg-white text-slate-400 border-slate-200'
                        }`}
                      >
                        <div className="text-[10px] font-black uppercase">Stage {st.step}</div>
                        <div className="text-[11px] font-black mt-0.5 leading-tight">{st.short}</div>
                      </div>
                    );
                  })}
                </div>

                {nextStageObj ? (
                  <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-slate-200 no-print">
                    <input
                      type="text"
                      placeholder={`Verification note for Stage ${nextStageObj.step} (${nextStageObj.id})...`}
                      value={workflowNote}
                      onChange={e => setWorkflowNote(e.target.value)}
                      className="flex-1 agri-input px-3 py-2 rounded-xl text-xs font-semibold"
                    />
                    <button
                      type="button"
                      onClick={handleAdvanceStage}
                      className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shrink-0"
                    >
                      <span>Approve → {nextStageObj.short}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-black flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Published to Authoritative National NIMIS Registry (Audit Trail Locked)
                  </div>
                )}

                {/* Audit Trail */}
                {(scheme.verification?.audit_log || []).length > 0 && (
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[10px] font-black uppercase text-slate-500 block">Audit Trail History</span>
                    {scheme.verification.audit_log.map((entry, idx) => (
                      <div key={idx} className="flex items-start justify-between gap-3 p-2.5 bg-white rounded-lg border border-slate-200 text-xs">
                        <div>
                          <span className="font-black text-emerald-800">{entry.stage}</span>
                          <span className="text-slate-500 font-bold"> • {entry.by}</span>
                          <p className="text-slate-700 font-medium mt-0.5">{entry.note}</p>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-slate-400 shrink-0 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {entry.date}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sustainability Challenges */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2.5">
                  Identified Sustainability &amp; Operational Risks
                </h4>
                <div className="space-y-2">
                  {(scheme.challenges || ['No operational risks logged']).map((ch, idx) => (
                    <div key={idx} className="p-3 bg-[#FAF9F6] rounded-xl border border-[#E7E5E0] flex items-start gap-2.5 text-xs font-medium text-[#141A16]">
                      <span className="w-2 h-2 rounded-full bg-[#C88A2E] shrink-0 mt-1.5" />
                      <span>{ch}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: DOCUMENTS */}
          {activeTab === 'documents' && (
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
                Supporting Documents, GIS Boundaries &amp; Evidence
              </h4>
              {(scheme.documents || []).length > 0 ? (
                <div className="space-y-2">
                  {scheme.documents.map((doc, idx) => (
                    <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-black text-slate-900">{doc.title}</div>
                          <div className="text-[10px] font-bold text-slate-500">{doc.type} • Uploaded by {doc.uploaded_by}</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-400">{doc.date}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 font-semibold">No supporting documents uploaded yet.</p>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
