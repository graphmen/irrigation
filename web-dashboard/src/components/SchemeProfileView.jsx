import React, { useState } from 'react';
import {
  ArrowLeft, Printer, ShieldCheck, CheckCircle2, AlertTriangle,
  Sprout, Droplets, Zap, Wrench, FileText, ArrowRight, Clock
} from 'lucide-react';
import {
  IrrigatedFieldIcon, HarvestSackIcon, YieldChartIcon, OmFundBagIcon
} from './NimisIcons.jsx';
import { VERIFICATION_STAGES } from '../../../shared/surveySchema.js';
import { advanceSchemeVerification } from '../firebase.js';

export default function SchemeProfileView({ scheme, activeRole, onBack }) {
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

  const totalProductionMt = (scheme.seasonal_production || []).reduce((s, r) => s + (Number(r.production_mt) || 0), 0);
  const totalPlantedHa = (scheme.seasonal_production || []).reduce((s, r) => s + (Number(r.planted_ha) || 0), 0);
  const avgYield = totalPlantedHa > 0 ? (totalProductionMt / totalPlantedHa).toFixed(1) : '7.2';

  const statusPillColor =
    scheme.technical?.status === 'Fully functional'
      ? 'bg-[#1D7A46] text-white'
      : scheme.technical?.status === 'Partially functional'
      ? 'bg-[#F59E0B] text-white'
      : scheme.technical?.status === 'Non-functional'
      ? 'bg-[#C62828] text-white'
      : 'bg-[#1E6BB8] text-white';

  const tabs = [
    { id: 'overview',       label: 'Overview' },
    { id: 'infrastructure', label: 'Infrastructure' },
    { id: 'water_energy',   label: 'Water & Energy' },
    { id: 'production',     label: 'Production' },
    { id: 'om',             label: 'Finance & O&M' },
    { id: 'risks',          label: 'Risks' },
    { id: 'documents',      label: 'Documents' },
  ];

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Top Bar matching PDF Screen 7 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DCE5DF]">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-[#165B33] text-white text-sm font-black flex items-center justify-center shrink-0">
              7
            </span>
            <h2 className="text-xl font-black text-slate-900">Scheme Registry – Scheme Profile</h2>
          </div>
          <div className="flex items-center gap-2.5 pl-1">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#165B33] hover:underline no-print"
            >
              <ArrowLeft className="w-4 h-4" /> All Schemes
            </button>
            <span className="text-slate-300">/</span>
            <span className="text-base font-black text-slate-900">
              {scheme.scheme_name} <span className="font-mono text-sm text-[#165B33]">({scheme.id})</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 no-print">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-lg bg-white border border-[#DCE5DF] hover:bg-slate-50 text-slate-700 text-xs font-black flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4 text-[#165B33]" /> Print Profile
          </button>
          <button
            onClick={() => setActiveTab('risks')}
            className="px-4 py-2 rounded-lg bg-[#165B33] hover:bg-[#114627] text-white text-xs font-black flex items-center gap-1.5 shadow-xs"
          >
            <ShieldCheck className="w-4 h-4" /> Verify ({currentStage})
          </button>
        </div>
      </div>

      {/* Horizontal Pill Tabs matching PDF Screen 7 */}
      <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-xl border border-[#DCE5DF] overflow-x-auto no-print">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-black transition-all whitespace-nowrap ${
              activeTab === t.id
                ? 'bg-[#165B33] text-white shadow-xs'
                : 'text-slate-600 hover:bg-[#F4F7F5] hover:text-slate-900'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW (Exact match to PDF Screen 7) */}
      {activeTab === 'overview' && (
        <div className="space-y-5">
          {/* Split Card: Left Scheme Photo + Right 2-Column Metadata Grid */}
          <div className="agri-card p-5 rounded-2xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 space-y-3">
              <img
                src={scheme.photo_scheme || '/images/pivot-irrigation.jpg'}
                alt={scheme.scheme_name}
                className="w-full h-48 sm:h-64 object-cover rounded-xl border border-[#E7E5E0]"
              />
              <div className="p-3 rounded-xl bg-[#F4F7F5] border border-[#DCE5DF] flex items-center justify-between text-xs font-bold text-slate-700">
                <span>GPS: <strong className="font-mono text-[#165B33]">{scheme.coordinates?.lat}, {scheme.coordinates?.lng}</strong></span>
                <span>Alt: <strong>{scheme.coordinates?.alt || 600} m</strong></span>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
              {[
                { label: 'Province',             val: scheme.province },
                { label: 'District',             val: scheme.district },
                { label: 'Ward',                 val: scheme.ward },
                { label: 'Scheme Category',      val: scheme.technical?.sector_type || 'Communal' },
                { label: 'Water Source',         val: `${scheme.technical?.water_source} (${scheme.technical?.water_source_name || 'Main'})` },
                { label: 'Irrigation Technology',val: scheme.technical?.irrigation_system || 'N/A' },
                { label: 'Established',          val: scheme.technical?.commissioning_year || 'N/A' },
                { label: 'Beneficiaries',        val: `${scheme.technical?.beneficiaries_count || 0} (${scheme.technical?.active_farmers_count || scheme.technical?.beneficiaries_count || 0} active)` },
                { label: 'Design Area',          val: `${scheme.technical?.design_area_ha || scheme.technical?.equipped_area_ha || 0} ha` },
                { label: 'Equipped Area',        val: `${scheme.technical?.equipped_area_ha || 0} ha` },
                { label: 'Functional Area',      val: `${scheme.technical?.functional_area_ha || 0} ha` },
                { label: 'Current Irrigated Area', val: `${scheme.technical?.actual_irrigated_area_ha || scheme.technical?.functional_area_ha || 0} ha` },
                { label: 'Responsible Officer',  val: `${scheme.officer?.name || 'N/A'} (${scheme.officer?.phone || ''})` },
                { label: 'Verification Stage',   val: currentStage },
              ].map(row => (
                <div key={row.label} className="flex items-baseline justify-between gap-2 py-2 border-b border-slate-100">
                  <span className="text-slate-500 font-semibold">{row.label}:</span>
                  <strong className="text-slate-900 font-black text-right">{row.val}</strong>
                </div>
              ))}
              <div className="sm:col-span-2 flex items-center justify-between pt-2">
                <span className="text-slate-500 font-semibold">Operational Status:</span>
                <span className={`px-3.5 py-1 rounded-md text-xs font-black ${statusPillColor}`}>
                  {scheme.technical?.status || 'Active'}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom 6-Column Key Performance Strip — Clean Editorial Style */}
          <div className="agri-card p-5 rounded-xl">
            <h3 className="text-sm font-semibold text-[#141A16] mb-4">
              Key performance ({scheme.technical?.current_season || '2026/27 season'})
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-y lg:divide-y-0 lg:divide-x divide-[#ECEAE4]">
              {[
                { icon: Sprout,             label: 'Crops',        val: (scheme.agronomic?.crops || []).slice(0, 3).join(', ') || 'Maize, Wheat', sub: '' },
                { icon: IrrigatedFieldIcon, label: 'Area planted', val: `${scheme.technical?.actual_irrigated_area_ha || scheme.technical?.functional_area_ha || 0} ha`, sub: 'Current season' },
                { icon: HarvestSackIcon,    label: 'Production',   val: `${totalProductionMt.toLocaleString()} MT`, sub: 'Verified harvest' },
                { icon: YieldChartIcon,     label: 'Average yield',val: `${avgYield} t/ha`, sub: 'Weighted avg' },
                { icon: OmFundBagIcon,      label: 'O&M fund',     val: scheme.om?.has_fund || 'Yes', sub: scheme.om?.fund_balance_usd ? `US$${scheme.om.fund_balance_usd.toLocaleString()}` : 'Active' },
                { icon: Zap,                label: 'Power status', val: (scheme.energy?.power_status || scheme.technical?.energy_source || 'Connected').split(' ')[0], sub: scheme.energy?.bill_status || 'Stable' },
              ].map((kpi, idx) => {
                const Icon = kpi.icon;
                return (
                  <div key={idx} className="px-4 py-2 flex flex-col items-start">
                    <div className="flex items-center gap-2 text-xs font-medium text-[#738077] mb-1.5">
                      <Icon className="w-4 h-4 text-[#133A26]" />
                      <span>{kpi.label}</span>
                    </div>
                    <strong className="text-sm font-semibold text-[#141A16] leading-snug tabular-nums">{kpi.val}</strong>
                    {kpi.sub && <span className="text-xs text-[#738077] mt-0.5">{kpi.sub}</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INFRASTRUCTURE */}
      {activeTab === 'infrastructure' && (
        <div className="agri-card p-6 rounded-2xl space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-[#165B33]" /> Engineering Asset Condition Ratings
            </h3>
            <span className="text-xs font-bold text-slate-500">Last Assessed: {scheme.infrastructure?.last_assessment_date || '2026-10-15'}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {[
              { label: 'Head Works',         val: scheme.infrastructure?.headworks },
              { label: 'Conveyance Lines',   val: scheme.infrastructure?.conveyance },
              { label: 'Night Storage Dam',  val: scheme.infrastructure?.storage },
              { label: 'Infield System',     val: scheme.infrastructure?.infield },
              { label: 'Perimeter Fence',    val: scheme.infrastructure?.perimeter_fence },
              { label: 'Access Road',        val: scheme.infrastructure?.access_road },
            ].map(i => (
              <div key={i.label} className="p-4 bg-[#F7FAF8] rounded-xl border border-[#DCE5DF] flex items-center justify-between">
                <span className="text-sm font-bold text-slate-800">{i.label}</span>
                <span className={`px-3 py-1 rounded-md text-xs font-black ${
                  i.val === 'Good' ? 'bg-[#EAFAF1] text-[#165B33] border border-[#A9DFBF]'
                  : i.val === 'Moderate' ? 'bg-[#FEF9EC] text-[#B9770E] border border-[#F9E79F]'
                  : 'bg-[#FDEDEC] text-[#B03A2E] border border-[#F5B7B1]'
                }`}>
                  {i.val || 'N/A'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: WATER & ENERGY */}
      {activeTab === 'water_energy' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="agri-card p-6 rounded-2xl space-y-3">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Droplets className="w-5 h-5 text-[#1E6BB8]" /> Water Resource &amp; Management
            </h3>
            {[
              { k: 'Water Source',          v: `${scheme.technical?.water_source} — ${scheme.technical?.water_source_name || ''}` },
              { k: 'Abstraction Capacity',  v: scheme.technical?.abstraction_capacity_ls ? `${scheme.technical.abstraction_capacity_ls} L/s` : 'N/A' },
              { k: 'Annual Allocation',     v: scheme.technical?.water_allocation_m3 ? `${(scheme.technical.water_allocation_m3 / 1e6).toFixed(2)} Mm³` : 'N/A' },
              { k: 'Annual Abstraction',    v: scheme.technical?.water_abstraction_m3 ? `${(scheme.technical.water_abstraction_m3 / 1e6).toFixed(2)} Mm³` : 'N/A' },
              { k: 'Sufficient Year-Round', v: scheme.water_mgmt?.sufficient_year_round || 'N/A' },
              { k: 'Active IMC Committee',  v: scheme.water_mgmt?.has_committee || 'N/A' },
              { k: 'Weather Station',       v: scheme.water_mgmt?.weather_station || 'N/A' },
            ].map(r => (
              <div key={r.k} className="flex justify-between py-2 border-b border-slate-100 text-sm">
                <span className="text-slate-500 font-semibold">{r.k}</span>
                <strong className="text-slate-900 font-black">{r.v}</strong>
              </div>
            ))}
          </div>

          <div className="agri-card p-6 rounded-2xl space-y-3">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#D97706]" /> Energy &amp; ZESA / Solar Connection
            </h3>
            {[
              { k: 'Primary Energy Source', v: scheme.technical?.energy_source || 'N/A' },
              { k: 'Power Status',          v: scheme.energy?.power_status || 'N/A' },
              { k: 'Meter / System ID',     v: scheme.energy?.zesa_meter_no || 'N/A' },
              { k: 'Monthly Consumption',   v: scheme.energy?.monthly_kwh ? `${scheme.energy.monthly_kwh.toLocaleString()} kWh` : '0 kWh (Gravity)' },
              { k: 'Bill / Account Status', v: scheme.energy?.bill_status || 'N/A' },
            ].map(r => (
              <div key={r.k} className="flex justify-between py-2 border-b border-slate-100 text-sm">
                <span className="text-slate-500 font-semibold">{r.k}</span>
                <strong className="text-slate-900 font-black">{r.v}</strong>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PRODUCTION */}
      {activeTab === 'production' && (
        <div className="agri-card p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900">Season-Specific Crop &amp; Production Records</h3>
            <span className="text-xs font-black px-3 py-1 rounded-full bg-[#EAFAF1] text-[#165B33] border border-[#A9DFBF]">
              Cropping Intensity: {scheme.agronomic?.cropping_intensity_pct || 120}%
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#F4F7F5] text-xs font-black uppercase text-slate-600 border-b border-[#DCE5DF]">
                <tr>
                  <th className="p-3">Season</th>
                  <th className="p-3">Crop</th>
                  <th className="p-3 text-right">Planted (ha)</th>
                  <th className="p-3 text-right">Yield (t/ha)</th>
                  <th className="p-3 text-right">Production (MT)</th>
                  <th className="p-3">Market Destination</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(scheme.seasonal_production || []).map((r, i) => (
                  <tr key={i} className="hover:bg-slate-50 font-semibold">
                    <td className="p-3 text-slate-600">{r.season}</td>
                    <td className="p-3 font-black text-slate-900">{r.crop}</td>
                    <td className="p-3 text-right">{r.planted_ha}</td>
                    <td className="p-3 text-right font-black text-[#165B33]">{r.yield_t_ha}</td>
                    <td className="p-3 text-right font-black text-slate-900">{r.production_mt.toLocaleString()}</td>
                    <td className="p-3 text-slate-600">{r.market_destination}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: FINANCE & O&M */}
      {activeTab === 'om' && (
        <div className="agri-card p-6 rounded-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: 'O&M Responsible',    val: scheme.om?.responsible || 'Farmers / IMC' },
            { label: 'O&M Manual',         val: scheme.om?.has_manual || 'N/A' },
            { label: 'O&M Fund Active',    val: scheme.om?.has_fund || 'N/A' },
            { label: 'Fund Balance',       val: `US$${(scheme.om?.fund_balance_usd || 0).toLocaleString()}` },
            { label: 'Last Rehab Year',    val: `${scheme.om?.last_rehab_year || 'N/A'} (${scheme.om?.rehabilitated_by || 'GoZ'})` },
            { label: 'Rehab Investment',   val: scheme.rehab?.estimated_cost_usd ? `US$${scheme.rehab.estimated_cost_usd.toLocaleString()} (${scheme.rehab.priority})` : 'None Pending' },
          ].map(item => (
            <div key={item.label} className="p-4 rounded-xl bg-[#F7FAF8] border border-[#DCE5DF]">
              <span className="text-xs font-bold text-slate-500 uppercase block">{item.label}</span>
              <strong className="text-base font-black text-slate-900 mt-1 block">{item.val}</strong>
            </div>
          ))}
        </div>
      )}

      {/* TAB 6: RISKS & 5-STAGE VERIFICATION WORKFLOW */}
      {activeTab === 'risks' && (
        <div className="space-y-5">
          <div className="agri-card p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#165B33]" /> 5-Stage National Data Verification Workflow
              </h3>
              <span className="text-xs font-black px-3 py-1 rounded-full bg-[#EAFAF1] text-[#165B33] border border-[#A9DFBF]">
                Current Stage: {currentStage}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
              {VERIFICATION_STAGES.map((st, idx) => {
                const done = idx <= currentStageIdx;
                const isCurrent = idx === currentStageIdx;
                return (
                  <div
                    key={st.id}
                    className={`p-3 rounded-xl border text-center ${
                      isCurrent ? 'bg-[#165B33] text-white border-[#114627]'
                      : done ? 'bg-[#EAFAF1] text-[#165B33] border-[#A9DFBF]'
                      : 'bg-white text-slate-400 border-slate-200'
                    }`}
                  >
                    <div className="text-xs font-black uppercase">Stage {st.step}</div>
                    <div className="text-sm font-black mt-0.5">{st.short}</div>
                  </div>
                );
              })}
            </div>

            {nextStageObj ? (
              <div className="flex flex-col sm:flex-row gap-2.5 pt-2 border-t border-slate-200 no-print">
                <input
                  type="text"
                  placeholder={`Verification note for Stage ${nextStageObj.step} (${nextStageObj.id})...`}
                  value={workflowNote}
                  onChange={e => setWorkflowNote(e.target.value)}
                  className="flex-1 agri-input px-3.5 py-2.5 rounded-xl text-sm font-semibold"
                />
                <button
                  type="button"
                  onClick={handleAdvanceStage}
                  className="px-5 py-2.5 bg-[#165B33] hover:bg-[#114627] text-white rounded-xl text-sm font-black flex items-center justify-center gap-1.5 shrink-0"
                >
                  <span>Approve → {nextStageObj.short}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-[#EAFAF1] text-[#165B33] text-sm font-black flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> Published to Authoritative National NIMIS Registry
              </div>
            )}

            <div className="space-y-2 pt-2">
              {(scheme.verification?.audit_log || []).map((entry, idx) => (
                <div key={idx} className="flex items-start justify-between gap-3 p-3 bg-[#F7FAF8] rounded-xl border border-[#DCE5DF] text-sm">
                  <div>
                    <span className="font-black text-[#165B33]">{entry.stage}</span>
                    <span className="text-slate-500 font-bold"> • {entry.by}</span>
                    <p className="text-slate-700 font-medium mt-0.5">{entry.note}</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400 shrink-0 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {entry.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="agri-card p-6 rounded-2xl space-y-3">
            <h3 className="text-base font-black text-slate-900">Operational &amp; Sustainability Risks</h3>
            {(scheme.challenges || ['No operational risks logged']).map((ch, idx) => (
              <div key={idx} className="p-3.5 bg-[#FEF9EC] rounded-xl border border-[#F9E79F] flex items-start gap-2.5 text-sm font-bold text-[#9C640C]">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{ch}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: DOCUMENTS */}
      {activeTab === 'documents' && (
        <div className="agri-card p-6 rounded-2xl space-y-3">
          <h3 className="text-base font-black text-slate-900">Supporting Documents, GIS Boundaries &amp; Evidence</h3>
          {(scheme.documents || []).map((doc, idx) => (
            <div key={idx} className="p-4 bg-[#F7FAF8] rounded-xl border border-[#DCE5DF] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#EAFAF1] text-[#165B33] flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-black text-slate-900">{doc.title}</div>
                  <div className="text-xs font-bold text-slate-500">{doc.type} • Uploaded by {doc.uploaded_by}</div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-slate-400">{doc.date}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
