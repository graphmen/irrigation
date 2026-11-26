import React, { useState, useRef } from 'react';
import {
  FileText, Printer, Download, MapPin, CheckCircle2, AlertTriangle,
  Droplets, Sprout, Wrench, User, Phone, Mail, ChevronDown, ChevronUp,
  ShieldAlert, Calendar, Layers, Activity, Search
} from 'lucide-react';

const statusColor = (status) => {
  switch (status) {
    case 'Fully functional':    return 'badge-functional';
    case 'Partially functional':return 'badge-partial';
    case 'Under rehabilitation':
    case 'Under Construction':  return 'badge-rehab';
    default:                    return 'badge-nonfunctional';
  }
};

const infraRatingColor = (val) => {
  if (val === 'Good')    return 'heatmap-good';
  if (val === 'Moderate') return 'heatmap-moderate';
  if (['Bad','Poor/ Bad'].includes(val)) return 'heatmap-bad';
  return 'heatmap-na';
};

const yesNoColor = (val) => val === 'Yes' ? 'text-emerald-700 font-black' : 'text-rose-600 font-black';

function SchemeReport({ scheme }) {
  const [expanded, setExpanded] = useState(false);
  const s = scheme;

  return (
    <div className="agri-card rounded-2xl overflow-hidden mb-6 print-report">
      {/* Header Band */}
      <div className="bg-[#133A26] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={s.photo_scheme || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=200&q=80'}
            alt={s.scheme_name}
            className="w-14 h-14 rounded-xl object-cover border-2 border-white/30 shadow"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black bg-white/20 text-white px-2 py-0.5 rounded uppercase">{s.id}</span>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${statusColor(s.technical?.status)}`}>
                {s.technical?.status || 'Unknown'}
              </span>
            </div>
            <h3 className="text-lg font-black text-white leading-tight">{s.scheme_name}</h3>
            <p className="text-xs text-emerald-200 font-semibold flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3" />
              {s.province} • {s.district} • {s.ward}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 no-print">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-black rounded-xl transition-all"
          >
            {expanded ? <><ChevronUp className="w-4 h-4" />Collapse</> : <><ChevronDown className="w-4 h-4" />Expand</>}
          </button>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-slate-100 bg-emerald-50/60 border-b border-slate-100">
        {[
          { label: 'Equipped Area', value: `${s.technical?.equipped_area_ha || 0} Ha`, color: 'text-emerald-800' },
          { label: 'Functional Area', value: `${s.technical?.functional_area_ha || 0} Ha`, color: 'text-sky-700' },
          { label: 'Beneficiaries', value: (s.technical?.beneficiaries_count || 0).toLocaleString(), color: 'text-amber-800' },
          { label: 'Water Source', value: s.technical?.water_source || 'N/A', color: 'text-violet-700' },
        ].map(item => (
          <div key={item.label} className="p-3 text-center">
            <span className="text-[10px] font-black text-slate-500 uppercase block">{item.label}</span>
            <strong className={`text-sm font-black ${item.color} block mt-0.5`}>{item.value}</strong>
          </div>
        ))}
      </div>

      {/* Expanded Detail Sections */}
      {expanded && (
        <div className="p-6 space-y-6 animate-fadeIn text-sm">
          {/* Officer Contact */}
          <div>
            <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider mb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-emerald-700" /> Survey Field Officer
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Name</span>
                <strong className="text-slate-900">{s.officer?.name || 'N/A'}</strong>
                <p className="text-xs text-slate-500">{s.officer?.designation}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Phone</span>
                <strong className="text-slate-900 flex items-center gap-1 mt-0.5"><Phone className="w-3 h-3 text-emerald-700" />{s.officer?.phone || 'N/A'}</strong>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Email</span>
                <strong className="text-slate-900 flex items-center gap-1 mt-0.5 break-all"><Mail className="w-3 h-3 text-emerald-700" />{s.officer?.email || 'N/A'}</strong>
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div>
            <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-700" /> Technical Specifications
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'System Type',     value: s.technical?.irrigation_system || 'N/A' },
                { label: 'Energy Source',   value: s.technical?.energy_source || 'N/A' },
                { label: 'Sector Type',     value: s.technical?.sector_type || 'N/A' },
                { label: 'Management',      value: s.technical?.management_model || 'N/A' },
                { label: 'Plot Size',       value: s.technical?.plot_size_ha ? `${s.technical.plot_size_ha} Ha` : 'N/A' },
                { label: 'Commissioned',    value: s.technical?.commissioning_year || 'N/A' },
                { label: 'Expansion Pot.',  value: s.technical?.potential_expansion_ha ? `${s.technical.potential_expansion_ha} Ha` : 'N/A' },
                { label: 'Water Source',    value: s.technical?.water_source_name || s.technical?.water_source || 'N/A' },
              ].map(item => (
                <div key={item.label} className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">{item.label}</span>
                  <strong className="text-slate-900 text-xs mt-0.5 block">{item.value}</strong>
                </div>
              ))}
            </div>
          </div>

          {/* Infrastructure Health Matrix */}
          <div>
            <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider mb-3 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-emerald-700" /> Infrastructure Health Matrix
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { label: 'Headworks',        val: s.infrastructure?.headworks },
                { label: 'Conveyance Lines', val: s.infrastructure?.conveyance },
                { label: 'Night Storage Dam',val: s.infrastructure?.storage },
                { label: 'Infield System',   val: s.infrastructure?.infield },
                { label: 'Perimeter Fence',  val: s.infrastructure?.perimeter_fence },
                { label: 'Access Road',      val: s.infrastructure?.access_road },
              ].map(item => (
                <div key={item.label} className={`p-3 rounded-xl ${infraRatingColor(item.val)} flex items-center justify-between`}>
                  <span className="text-xs font-bold">{item.label}</span>
                  <span className="text-xs font-black px-2 py-0.5 rounded bg-white/60">{item.val || 'N/A'}</span>
                </div>
              ))}
            </div>
          </div>

          {/* O&M + Water Management */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-700" /> Operation & Maintenance
              </h4>
              <div className="space-y-2 text-xs">
                {[
                  { label: 'O&M Responsible',      value: s.om?.responsible || 'N/A' },
                  { label: 'Has O&M Manual',        value: s.om?.has_manual || 'N/A', yn: true },
                  { label: 'O&M Fund Established',  value: s.om?.has_fund || 'N/A', yn: true },
                  { label: 'Pays Maintenance Levy', value: s.om?.pays_levy || 'N/A', yn: true },
                  { label: 'Last Rehab Year',       value: s.om?.last_rehab_year || 'N/A' },
                  { label: 'Rehabilitated By',      value: s.om?.rehabilitated_by || 'N/A' },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-600 font-semibold">{item.label}</span>
                    <span className={item.yn ? yesNoColor(item.value) : 'text-slate-900 font-bold'}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider mb-3 flex items-center gap-2">
                <Droplets className="w-4 h-4 text-sky-700" /> Water Management
              </h4>
              <div className="space-y-2 text-xs">
                {[
                  { label: 'Year-Round Water',      value: s.water_mgmt?.sufficient_year_round || 'N/A', yn: true },
                  { label: 'Has IMC Committee',     value: s.water_mgmt?.has_committee || 'N/A', yn: true },
                  { label: 'Uniform Fittings',      value: s.water_mgmt?.uniform_fittings || 'N/A', yn: true },
                  { label: 'Irrigation Schedule',   value: s.water_mgmt?.consistent_schedule || 'N/A', yn: true },
                  { label: 'Water Saving Practices',value: s.water_mgmt?.water_saving || 'N/A', yn: true },
                  { label: 'On-Site Weather Station',value: s.water_mgmt?.weather_station || 'N/A', yn: true },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-600 font-semibold">{item.label}</span>
                    <span className={item.yn ? yesNoColor(item.value) : 'text-slate-900 font-bold'}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Crops + Challenges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider mb-3 flex items-center gap-2">
                <Sprout className="w-4 h-4 text-emerald-700" /> Agronomic & Markets
              </h4>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {(s.agronomic?.crops || []).map(c => (
                  <span key={c} className="px-2.5 py-1 bg-[#F3F4F0] text-[#141A16] text-xs font-medium rounded-md border border-[#E7E5E0]">{c}</span>
                ))}
              </div>
              <p className="text-xs font-bold text-slate-700">
                <span className="text-slate-500 font-semibold block mb-0.5 uppercase text-[10px]">Market Outlets</span>
                {s.agronomic?.markets || 'N/A'}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider mb-3 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-600" /> Sustainability Risks
              </h4>
              <div className="space-y-1.5">
                {(s.challenges || ['No challenges reported']).map((ch, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2.5 bg-[#FAF9F6] rounded-lg border border-[#E7E5E0] text-xs font-medium text-[#141A16]">
                    <span className="w-2 h-2 rounded-full bg-[#C88A2E] shrink-0 mt-1.5" />
                    <span>{ch}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* GPS Coordinates */}
          <div className="p-3 bg-slate-900 rounded-xl text-xs font-mono text-emerald-400 flex items-center gap-3">
            <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
            <span><strong className="text-slate-300">GPS:</strong> {s.coordinates?.lat}, {s.coordinates?.lng}</span>
            <span className="text-slate-500">|</span>
            <span><strong className="text-slate-300">Alt:</strong> {s.coordinates?.alt || 'N/A'} m</span>
            <span className="text-slate-500">|</span>
            <span><strong className="text-slate-300">Updated:</strong> {s.updatedAt ? new Date(s.updatedAt).toLocaleDateString('en-GB') : 'N/A'}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ReportsPage({ schemes }) {
  const [searchTerm, setSearchTerm] = useState('');
  const printRef = useRef();

  const filtered = schemes.filter(s => {
    const term = searchTerm.toLowerCase();
    return !term ||
      (s.scheme_name || '').toLowerCase().includes(term) ||
      (s.province || '').toLowerCase().includes(term) ||
      (s.district || '').toLowerCase().includes(term);
  });

  const handlePrint = () => window.print();

  const downloadStarSchemaTable = (tableName) => {
    let rows = [];
    if (tableName === 'DimScheme') {
      rows = schemes.map(s => ({
        SchemeID: s.id,
        SchemeName: s.scheme_name,
        Province: s.province,
        District: s.district,
        Ward: s.ward,
        Latitude: s.coordinates?.lat,
        Longitude: s.coordinates?.lng,
        Category: s.technical?.sector_type,
        ManagementModel: s.technical?.management_model,
        CommissioningYear: s.technical?.commissioning_year,
        VerificationStage: s.verification?.stage || 'Captured',
        DataSource: s.verification?.data_source_type || 'Field Officer Survey'
      }));
    } else if (tableName === 'FactAreaStatus') {
      rows = schemes.map(s => ({
        SchemeID: s.id,
        Season: s.technical?.current_season || '2026/27 Summer',
        DesignAreaHa: s.technical?.design_area_ha || s.technical?.equipped_area_ha || 0,
        EquippedAreaHa: s.technical?.equipped_area_ha || 0,
        DevelopedAreaHa: s.technical?.developed_area_ha || s.technical?.equipped_area_ha || 0,
        FunctionalAreaHa: s.technical?.functional_area_ha || 0,
        ActuallyIrrigatedAreaHa: s.technical?.actual_irrigated_area_ha || 0,
        OperationalStatus: s.technical?.status,
        VerifiedDate: s.verification?.verified_date || ''
      }));
    } else if (tableName === 'FactProduction') {
      rows = schemes.flatMap(s =>
        (s.seasonal_production || []).map(r => ({
          SchemeID: s.id,
          Season: r.season,
          Crop: r.crop,
          PlantedHa: r.planted_ha,
          HarvestedHa: r.harvested_ha,
          YieldTHa: r.yield_t_ha,
          ProductionMT: r.production_mt,
          MarketDestination: r.market_destination
        }))
      );
    } else if (tableName === 'FactAssetCondition') {
      rows = schemes.map(s => ({
        SchemeID: s.id,
        AssessmentDate: s.infrastructure?.last_assessment_date || '',
        Headworks: s.infrastructure?.headworks,
        Conveyance: s.infrastructure?.conveyance,
        StorageNSD: s.infrastructure?.storage,
        Infield: s.infrastructure?.infield,
        PerimeterFence: s.infrastructure?.perimeter_fence,
        AccessRoad: s.infrastructure?.access_road,
        HasOMFund: s.om?.has_fund,
        RehabPriority: s.rehab?.priority || 'Low',
        EstimatedRehabCostUSD: s.rehab?.estimated_cost_usd || 0
      }));
    }

    if (rows.length === 0) return;
    const headers = Object.keys(rows[0]);
    const csv = [
      headers.join(','),
      ...rows.map(r => headers.map(h => `"${String(r[h] ?? '').replace(/"/g, '""')}"`).join(','))
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NIMIS_PowerBI_${tableName}_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const functionalCount    = schemes.filter(s => s.technical?.status === 'Fully functional').length;
  const totalArea          = schemes.reduce((a, s) => a + Number(s.technical?.equipped_area_ha || 0), 0);
  const totalBeneficiaries = schemes.reduce((a, s) => a + Number(s.technical?.beneficiaries_count || 0), 0);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <FileText className="w-6 h-6 text-emerald-800" />
              Assessment Reports &amp; Power BI Semantic Exports
            </h2>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
              Printable per-scheme field assessment reports + Power BI Star-Schema extracts (NIMIS owns records; Power BI owns governed analytics)
            </p>
          </div>
          <button
            onClick={handlePrint}
            className="no-print px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-black rounded-xl flex items-center gap-2 shadow-sm transition-all"
          >
            <Printer className="w-4 h-4" />
            Print All Reports
          </button>
        </div>
      </div>

      {/* Power BI Star-Schema Export & KPI Dictionary (PDF Sections 14-16) */}
      <div className="agri-card p-5 rounded-2xl border-l-4 border-emerald-800 no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Download className="w-4 h-4 text-emerald-700" />
              Power BI Integration — Conformed Star-Schema Exports (CSV)
            </h3>
            <p className="text-[11px] font-semibold text-slate-500">
              Export validated NIMIS dimension &amp; fact tables directly for Microsoft Power BI semantic model ingestion
            </p>
          </div>
          <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 self-start">
            Read-Only BI Feed
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { id: 'DimScheme',          desc: 'Scheme master & GPS' },
            { id: 'FactAreaStatus',     desc: '4 area measures & status' },
            { id: 'FactProduction',     desc: 'Seasonal crops & yields' },
            { id: 'FactAssetCondition', desc: 'Assets, O&M & rehab' },
          ].map(tbl => (
            <button
              key={tbl.id}
              type="button"
              onClick={() => downloadStarSchemaTable(tbl.id)}
              className="p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-left transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-900 group-hover:text-emerald-800">{tbl.id}</span>
                <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700" />
              </div>
              <span className="text-[10px] font-semibold text-slate-500 block mt-0.5">{tbl.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* National Summary Banner */}
      <div className="agri-card rounded-xl grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#ECEAE4]">
        {[
          { label: 'Total schemes',      value: schemes.length },
          { label: 'Fully functional',   value: `${functionalCount} / ${schemes.length}` },
          { label: 'Total equipped (ha)',value: totalArea.toLocaleString() },
          { label: 'Beneficiaries',      value: totalBeneficiaries.toLocaleString() },
        ].map(item => (
          <div key={item.label} className="px-4 py-3">
            <span className="text-xs font-medium text-[#738077] block">{item.label}</span>
            <strong className="text-xl font-bold text-[#141A16] tabular-nums block mt-0.5">{item.value}</strong>
          </div>
        ))}
      </div>

      {/* Search + filter */}
      <div className="relative no-print">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Search reports by scheme name, province, or district..."
          className="w-full agri-input pl-10 pr-4 py-2.5 rounded-xl text-xs font-semibold"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Scheme Reports */}
      <div ref={printRef}>
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-500 text-sm font-semibold">
            No schemes match your search.
          </div>
        ) : (
          filtered.map(scheme => (
            <SchemeReport key={scheme.id} scheme={scheme} />
          ))
        )}
      </div>

      {/* Footer note */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-600 font-semibold">
        <strong className="text-slate-900">Report Generated:</strong> {new Date().toLocaleString('en-GB')} &nbsp;|&nbsp;
        <strong className="text-slate-900">Data Source:</strong> Water Survey Baseline 2026 &nbsp;|&nbsp;
        <strong className="text-slate-900">Authority:</strong> Ministry of Lands, Agriculture, Fisheries, Water & Rural Development — Government of Zimbabwe
      </div>
    </div>
  );
}
