import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Navbar from './components/Navbar.jsx';
import WeatherWidget from './components/WeatherWidget.jsx';
import KPIMetrics from './components/KPIMetrics.jsx';
import InteractiveMap from './components/InteractiveMap.jsx';
import AnalyticsCharts from './components/AnalyticsCharts.jsx';
import SchemeTable from './components/SchemeTable.jsx';
import SchemeDetailModal from './components/SchemeDetailModal.jsx';
import NewSchemeModal from './components/NewSchemeModal.jsx';
import ReportsPage from './components/ReportsPage.jsx';
import ProjectTrackerPage from './components/ProjectTrackerPage.jsx';
import GisSpatialPage from './components/GisSpatialPage.jsx';
import SchemeProfileView from './components/SchemeProfileView.jsx';
import MobileAppPage from './components/MobileAppPage.jsx';
import { getInitialSchemes } from './firebase.js';
import {
  USER_ROLES, MAJOR_DAMS_DATA, IRRIGATED_AREA_TREND,
  PROGRAMME_CONTRIBUTION_DATA, MARKET_DESTINATIONS_DATA,
  DATA_AS_AT_DATE, calculateSummaryMetrics
} from '../../shared/surveySchema.js';
import {
  AlertTriangle, Layers, Activity
} from 'lucide-react';
import {
  DamSpillwayIcon, ReservoirLakeIcon, WaterDropAllocIcon, WaterPumpIcon, BalanceScalesIcon,
  HeadworksGaugeIcon, ConveyancePipeIcon, InfieldSprinklerIcon, AccessRoadIcon, OmFundBagIcon,
  IrrigatedFieldIcon, HarvestSackIcon, YieldChartIcon, SeasonCycleIcon
} from './components/NimisIcons.jsx';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell
} from 'recharts';

const BOTANICAL_CHART_PALETTE = ['#133A26', '#2D7A4D', '#5F9E78', '#9BC2AA', '#C88A2E', '#CBD5E1'];
const TOOLTIP_STYLE = {
  backgroundColor: '#141A16',
  border: 'none',
  borderRadius: '8px',
  color: '#FFFFFF',
  fontSize: '12px',
  padding: '8px 12px'
};

const SectionTitle = ({ num, title, subtitle, right }) => (
  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-[#E7E5E0]">
    <div className="flex items-center gap-3">
      {num && (
        <span className="w-7 h-7 rounded-lg bg-[#133A26] text-white text-xs font-semibold flex items-center justify-center shrink-0 tabular-nums">
          0{num}
        </span>
      )}
      <div>
        <h2 className="text-2xl font-bold text-[#141A16] leading-tight">{title}</h2>
        {subtitle && <p className="text-sm text-[#525E56] mt-0.5">{subtitle}</p>}
      </div>
    </div>
    <div className="text-xs font-medium text-[#738077] shrink-0">
      {right || `Data as at ${DATA_AS_AT_DATE}`}
    </div>
  </div>
);

export default function App() {
  const [schemes, setSchemes] = useState([]);
  const [selectedSchemeId, setSelectedSchemeId] = useState(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [activeRole, setActiveRole] = useState(USER_ROLES[0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const reloadSchemes = () => {
    let list = getInitialSchemes();
    try {
      const mobileCompleted = localStorage.getItem('irrigation_survey_completed');
      if (mobileCompleted) {
        const parsed = JSON.parse(mobileCompleted);
        const existingIds = new Set(list.map(s => s.id));
        const newFromMobile = parsed.filter(m => !existingIds.has(m.id));
        if (newFromMobile.length > 0) list = [...newFromMobile, ...list];
      }
    } catch (e) {
      console.error('Error checking mobile submissions:', e);
    }
    setSchemes(list);
  };

  useEffect(() => {
    reloadSchemes();
    const handleUpdate = () => reloadSchemes();
    window.addEventListener('dashboard_updated', handleUpdate);
    window.addEventListener('survey_submitted', handleUpdate);
    return () => {
      window.removeEventListener('dashboard_updated', handleUpdate);
      window.removeEventListener('survey_submitted', handleUpdate);
    };
  }, []);

  const visibleSchemes = useMemo(() => {
    if (!activeRole || activeRole.scope === 'National' || activeRole.scope === 'Scheme') {
      return schemes;
    }
    return schemes.filter(s => {
      if (activeRole.district) return s.district === activeRole.district;
      if (activeRole.province) return s.province === activeRole.province;
      return true;
    });
  }, [schemes, activeRole]);

  const selectedScheme = useMemo(
    () => schemes.find(s => s.id === selectedSchemeId) || null,
    [schemes, selectedSchemeId]
  );

  const summary = useMemo(() => calculateSummaryMetrics(visibleSchemes), [visibleSchemes]);

  const handleExportCSV = () => {
    if (visibleSchemes.length === 0) return;
    const headers = [
      'Scheme ID', 'Scheme Name', 'Site Name', 'Province', 'District', 'Ward',
      'Category', 'Design Area (Ha)', 'Equipped Area (Ha)', 'Developed Area (Ha)',
      'Functional Area (Ha)', 'Actually Irrigated (Ha)', 'Water Source',
      'Irrigation Technology', 'Power Status', 'Operational Status',
      'Verification Stage', 'Officer Name', 'Officer Phone', 'Crops'
    ];
    const rows = visibleSchemes.map(s => [
      s.id,
      `"${s.scheme_name || ''}"`,
      `"${s.site_name || ''}"`,
      s.province || '', s.district || '', s.ward || '',
      s.technical?.sector_type || '',
      s.technical?.design_area_ha || 0,
      s.technical?.equipped_area_ha || 0,
      s.technical?.developed_area_ha || 0,
      s.technical?.functional_area_ha || 0,
      s.technical?.actual_irrigated_area_ha || 0,
      s.technical?.water_source || '',
      `"${s.technical?.irrigation_system || ''}"`,
      `"${s.energy?.power_status || s.technical?.energy_source || ''}"`,
      s.technical?.status || '',
      s.verification?.stage || 'Captured',
      `"${s.officer?.name || ''}"`,
      `"${s.officer?.phone || ''}"`,
      `"${(s.agronomic?.crops || []).join('; ')}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `NIMIS_Zimbabwe_Scheme_Registry_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Water Source Stats (Botanical institutional palette)
  const waterSources = ['Dam', 'River', 'Borehole', 'Spring', 'Well', 'Treated wastewater', 'Other'];
  const waterStats = waterSources.map((src, i) => ({
    name: src,
    count: visibleSchemes.filter(s => s.technical?.water_source === src).length,
    pct: Math.round((visibleSchemes.filter(s => s.technical?.water_source === src).length / Math.max(1, visibleSchemes.length)) * 100),
    color: BOTANICAL_CHART_PALETTE[i % BOTANICAL_CHART_PALETTE.length]
  })).filter(w => w.count > 0);

  const sufficientPct = Math.round((visibleSchemes.filter(s => s.water_mgmt?.sufficient_year_round === 'Yes').length / Math.max(1, visibleSchemes.length)) * 100);
  const imcPct        = Math.round((visibleSchemes.filter(s => s.water_mgmt?.has_committee === 'Yes').length / Math.max(1, visibleSchemes.length)) * 100);
  const weatherPct    = Math.round((visibleSchemes.filter(s => s.water_mgmt?.weather_station === 'Yes').length / Math.max(1, visibleSchemes.length)) * 100);
  const omFundPct     = Math.round((visibleSchemes.filter(s => s.om?.has_fund === 'Yes').length / Math.max(1, visibleSchemes.length)) * 100);

  // Infrastructure Matrix
  const infraCategories = [
    { key: 'headworks',       label: 'Headworks' },
    { key: 'conveyance',      label: 'Conveyance' },
    { key: 'storage',         label: 'Storage Dams' },
    { key: 'infield',         label: 'Infield Systems' },
    { key: 'perimeter_fence', label: 'Perimeter Fence' },
    { key: 'access_road',     label: 'Access Roads' },
  ];
  const ratingBg = (v) => {
    if (v === 'Good') return 'heatmap-good';
    if (v === 'Moderate') return 'heatmap-moderate';
    if (['Bad', 'Poor/ Bad', 'Poor/Bad'].includes(v)) return 'heatmap-bad';
    return 'heatmap-na';
  };

  // Crop & Production Aggregations
  const cropProductionMap = {};
  visibleSchemes.forEach(s => {
    (s.seasonal_production || []).forEach(r => {
      if (!cropProductionMap[r.crop]) {
        cropProductionMap[r.crop] = { crop: r.crop, planted_ha: 0, harvested_ha: 0, production_mt: 0, markets: new Set() };
      }
      cropProductionMap[r.crop].planted_ha += Number(r.planted_ha) || 0;
      cropProductionMap[r.crop].harvested_ha += Number(r.harvested_ha) || 0;
      cropProductionMap[r.crop].production_mt += Number(r.production_mt) || 0;
      if (r.market_destination) cropProductionMap[r.crop].markets.add(r.market_destination);
    });
  });
  const cropProductionRows = Object.values(cropProductionMap)
    .map(c => ({
      ...c,
      avg_yield: c.harvested_ha > 0 ? (c.production_mt / c.harvested_ha).toFixed(1) : '0.0',
      marketsList: Array.from(c.markets).slice(0, 2).join(', ')
    }))
    .sort((a, b) => b.planted_ha - a.planted_ha);

  const avgYieldOverall = summary.totalSeasonalPlantedHa > 0
    ? (summary.totalProductionMt / summary.totalSeasonalPlantedHa).toFixed(1)
    : '0.0';

  return (
    <div className="min-h-screen bg-[#F6F6F2] text-[#141A16] flex flex-col font-sans selection:bg-[#133A26] selection:text-white">
      {/* Unified Full-Width Ministry Top Header */}
      <Navbar
        onOpenNewSchemeModal={() => setShowNewModal(true)}
        onExportCSV={handleExportCSV}
        onToggleMobileMenu={() => setMobileMenuOpen(v => !v)}
        schemesCount={visibleSchemes.length}
        verifiedCount={summary.verifiedSchemesCount}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeRole={activeRole}
      />

      {/* Body: Left Sidebar (Desktop) / Drawer (Mobile) + Full-Width Main Workspace */}
      <div className="flex flex-1 min-w-0">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          schemesCount={visibleSchemes.length}
          activeRole={activeRole}
          setActiveRole={setActiveRole}
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        <div className="flex-1 flex flex-col min-w-0">
          <main className="flex-1 px-3.5 sm:px-6 py-4 sm:py-5 w-full space-y-4 sm:space-y-5 overflow-x-hidden">

            {/* ── SCREEN 1: EXECUTIVE DASHBOARD ── */}
            {activeTab === 'overview' && (
              <div className="space-y-5 animate-fadeIn">
                <SectionTitle
                  num="1"
                  title="Executive Dashboard – National Irrigation Performance"
                  subtitle="Equipped, functional & seasonally irrigated area, scheme status breakdown, and programme contributions"
                />

                <KPIMetrics schemes={visibleSchemes} onNavigate={setActiveTab} />

                {/* 2-Column Analytical Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {/* Left: Irrigated Area Trend (ha) */}
                  <div className="agri-card p-5 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-sm font-semibold text-[#141A16]">Irrigated area trajectory (ha)</h3>
                        <p className="text-xs text-[#738077] mt-0.5">Annual national progression (2022–2026)</p>
                      </div>
                      <span className="text-xs font-medium text-[#2D7A4D] bg-[#EDF4EF] px-2.5 py-1 rounded-md tabular-nums">
                        +40.6% since 2022
                      </span>
                    </div>
                    <div className="h-56">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={IRRIGATED_AREA_TREND} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="nimisTrendGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#133A26" stopOpacity={0.18} />
                              <stop offset="95%" stopColor="#133A26" stopOpacity={0.0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ECEAE4" />
                          <XAxis dataKey="year" axisLine={false} tickLine={false} fontSize={12} stroke="#738077" />
                          <YAxis axisLine={false} tickLine={false} fontSize={11} stroke="#738077" domain={[150000, 350000]} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
                          <Tooltip contentStyle={TOOLTIP_STYLE} itemStyle={{ color: '#FFFFFF' }} formatter={(val) => [`${Number(val).toLocaleString()} ha`, 'Irrigated area']} />
                          <Area
                            type="monotone"
                            dataKey="irrigated_ha"
                            stroke="#133A26"
                            fill="url(#nimisTrendGrad)"
                            strokeWidth={2.5}
                            dot={{ r: 3.5, fill: '#133A26', stroke: '#FFFFFF', strokeWidth: 2 }}
                            activeDot={{ r: 5, fill: '#2D7A4D' }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Right: Irrigation Area by Programme Donut */}
                  <div className="agri-card p-5 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-sm font-semibold text-[#141A16]">Irrigation area by programme</h3>
                        <p className="text-xs text-[#738077] mt-0.5">Share of national equipped hectarage</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4 min-h-[224px] sm:h-56">
                      <div className="h-52 relative">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={PROGRAMME_CONTRIBUTION_DATA}
                              dataKey="pct"
                              nameKey="name"
                              cx="50%" cy="50%"
                              innerRadius={56} outerRadius={82}
                              paddingAngle={2}
                              stroke="none"
                            >
                              {PROGRAMME_CONTRIBUTION_DATA.map((entry, idx) => (
                                <Cell key={idx} fill={BOTANICAL_CHART_PALETTE[idx % BOTANICAL_CHART_PALETTE.length]} />
                              ))}
                            </Pie>
                            <Tooltip contentStyle={TOOLTIP_STYLE} itemStyle={{ color: '#FFFFFF' }} formatter={(val) => `${val}%`} />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                          <span className="text-lg font-bold text-[#141A16] tabular-nums">305,121</span>
                          <span className="text-xs text-[#738077]">hectares</span>
                        </div>
                      </div>
                      <div className="space-y-2.5">
                        {PROGRAMME_CONTRIBUTION_DATA.map((p, idx) => (
                          <div key={p.name} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: BOTANICAL_CHART_PALETTE[idx % BOTANICAL_CHART_PALETTE.length] }} />
                              <span className="font-medium text-[#3F4A43] truncate">{p.name}</span>
                            </div>
                            <span className="font-semibold text-[#141A16] tabular-nums">{p.pct}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Focused Bottom Row: Scheme Performance Summary Table + Regional Agro-Climate Card */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 items-stretch">
                  <div className="xl:col-span-2 agri-card rounded-xl overflow-hidden flex flex-col">
                    <div className="px-5 py-4 border-b border-[#ECEAE4] flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-[#141A16]">Scheme performance summary</h3>
                        <p className="text-xs text-[#738077] mt-0.5">Active schemes in current access scope</p>
                      </div>
                      <button
                        onClick={() => setActiveTab('registry')}
                        className="text-xs font-semibold text-[#133A26] hover:underline"
                      >
                        View all →
                      </button>
                    </div>
                    <div className="overflow-x-auto flex-1">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-[#FAF9F6] text-xs font-medium text-[#525E56] border-b border-[#ECEAE4]">
                          <tr>
                            <th className="px-5 py-3">Scheme</th>
                            <th className="px-4 py-3">Province</th>
                            <th className="px-4 py-3 text-right">Equipped</th>
                            <th className="px-4 py-3 text-right">Irrigated</th>
                            <th className="px-4 py-3">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F0EFEA]">
                          {visibleSchemes.slice(0, 5).map(s => (
                            <tr
                              key={s.id}
                              onClick={() => { setSelectedSchemeId(s.id); setActiveTab('registry'); }}
                              className="hover:bg-[#FAF9F6] transition-colors cursor-pointer"
                            >
                              <td className="px-5 py-3">
                                <div className="font-semibold text-[#141A16]">{s.scheme_name}</div>
                                <div className="text-xs font-mono text-[#738077]">{s.id}</div>
                              </td>
                              <td className="px-4 py-3 text-[#525E56]">{s.province}</td>
                              <td className="px-4 py-3 text-right font-medium text-[#141A16] tabular-nums">{s.technical?.equipped_area_ha} ha</td>
                              <td className="px-4 py-3 text-right font-semibold text-[#133A26] tabular-nums">{s.technical?.actual_irrigated_area_ha || s.technical?.functional_area_ha} ha</td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className="inline-flex items-center gap-2 text-xs font-medium text-[#141A16]">
                                  <span className="w-2 h-2 rounded-full" style={{
                                    background: s.technical?.status === 'Fully functional' ? '#2D7A4D'
                                      : s.technical?.status === 'Partially functional' ? '#C88A2E'
                                      : s.technical?.status === 'Non-functional' ? '#C53030' : '#2B6CB0'
                                  }} />
                                  {s.technical?.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div>
                    <WeatherWidget />
                  </div>
                </div>
              </div>
            )}

            {/* ── SCREEN 2: GIS & SPATIAL MAPPING ── */}
            {activeTab === 'spatial' && (
              <GisSpatialPage
                schemes={visibleSchemes}
                onSelectScheme={s => setSelectedSchemeId(s.id)}
              />
            )}

            {/* ── SCREEN 3: WATER RESOURCES & HYDROLOGY ── */}
            {activeTab === 'telemetry' && (
              <div className="space-y-5 animate-fadeIn">
                <SectionTitle
                  num="3"
                  title="Water Resources & Hydrology Monitoring"
                  subtitle="Dams, river flows, groundwater, water allocation and irrigation water balance"
                />

                {/* 5 Clean White Editorial Cards — Water Resources */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {[
                    { icon: DamSpillwayIcon,    label: 'National dam storage', value: '83.1%', sub: 'ZINWA reference', accent: 'text-[#133A26]' },
                    { icon: ReservoirLakeIcon,  label: 'Lake Kariba',          value: '34.6%', sub: 'ZRA reference',    accent: 'text-[#1E5B88]' },
                    { icon: WaterDropAllocIcon, label: 'Water allocated',      value: `${(summary.totalWaterAllocationM3 / 1e6).toFixed(2)} Mm³`, sub: 'Pilot schemes', accent: 'text-[#1E5B88]' },
                    { icon: WaterPumpIcon,      label: 'Water abstracted',     value: `${(summary.totalWaterAbstractionM3 / 1e6).toFixed(2)} Mm³`, sub: `${Math.round((summary.totalWaterAbstractionM3 / Math.max(1, summary.totalWaterAllocationM3)) * 100)}% utilised`, accent: 'text-[#B9770E]' },
                    { icon: BalanceScalesIcon,  label: 'Water balance',        value: `+${((summary.totalWaterAllocationM3 - summary.totalWaterAbstractionM3) / 1e6).toFixed(2)} Mm³`, sub: 'Surplus allocation', accent: 'text-[#2D7A4D]' },
                  ].map(item => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="agri-card rounded-xl px-4 py-3 flex flex-col justify-between gap-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-medium text-[#525E56]">{item.label}</span>
                          <Icon className={`w-6 h-6 shrink-0 ${item.accent}`} />
                        </div>
                        <div>
                          <div className="text-xl font-bold text-[#141A16] tabular-nums leading-none">{item.value}</div>
                          <div className="text-xs text-[#738077] mt-1">{item.sub}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 2-Column matching PDF Screen 3: Major Dams Table + Water Source Donut */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  <div className="lg:col-span-2 agri-card p-5 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-black text-slate-900">Major Dams – Storage Levels</h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-50 text-[#1B4F72] border border-sky-200">
                        ZINWA Ready (Demo)
                      </span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-[#F4F7F5] text-[10px] font-black uppercase text-slate-600 border-b border-[#DCE5DF]">
                          <tr>
                            <th className="p-2.5">Dam</th>
                            <th className="p-2.5 text-right">Capacity (Mm³)</th>
                            <th className="p-2.5 text-right">Storage (Mm³)</th>
                            <th className="p-2.5">Level</th>
                            <th className="p-2.5">Source</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {MAJOR_DAMS_DATA.map(d => (
                            <tr key={d.id} className="hover:bg-slate-50 font-semibold">
                              <td className="p-2.5 font-black text-slate-900">{d.name}</td>
                              <td className="p-2.5 text-right font-mono">{d.capacity_mcm.toLocaleString()}</td>
                              <td className="p-2.5 text-right font-mono">{d.storage_mcm.toLocaleString()}</td>
                              <td className="p-2.5 min-w-[140px]">
                                <div className="flex items-center gap-2">
                                  <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                      className={`h-full rounded-full ${d.pct >= 70 ? 'bg-[#279B5E]' : d.pct >= 45 ? 'bg-amber-500' : 'bg-rose-500'}`}
                                      style={{ width: `${d.pct}%` }}
                                    />
                                  </div>
                                  <span className="font-black text-slate-900 w-9 text-right">{d.pct}%</span>
                                </div>
                              </td>
                              <td className="p-2.5 text-[10px] text-slate-500 font-bold">{d.source}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Right: Water Source Donut */}
                  <div className="agri-card p-5 rounded-xl flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-[#141A16]">Water source distribution</h3>
                      <p className="text-xs text-[#738077] mt-0.5">Primary supply across active schemes</p>
                    </div>
                    <div className="h-48 relative my-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={waterStats} dataKey="count" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={76} paddingAngle={2} stroke="none">
                            {waterStats.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                          </Pie>
                          <Tooltip contentStyle={TOOLTIP_STYLE} itemStyle={{ color: '#FFFFFF' }} />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-lg font-bold text-[#141A16] tabular-nums">{visibleSchemes.length}</span>
                        <span className="text-xs text-[#738077]">schemes</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {waterStats.map(w => (
                        <div key={w.name} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-sm" style={{ background: w.color }} />
                            <span className="font-medium text-[#3F4A43]">{w.name}</span>
                          </div>
                          <span className="font-semibold text-[#141A16] tabular-nums">{w.pct}% ({w.count})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Water Management Compliance from mWater Questionnaire */}
                <div className="agri-card p-5 rounded-xl">
                  <h3 className="text-sm font-black text-slate-900 mb-3 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#165B33]" />
                    Scheme Water Management &amp; IMC Compliance (mWater Field Survey)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                    {[
                      { label: 'Year-Round Water Security', val: sufficientPct },
                      { label: 'Active IMC Committees',     val: imcPct },
                      { label: 'Water Saving Practices',    val: Math.round((visibleSchemes.filter(s => s.water_mgmt?.water_saving === 'Yes').length / Math.max(1, visibleSchemes.length)) * 100) },
                      { label: 'Drainage Systems',          val: Math.round((visibleSchemes.filter(s => s.water_mgmt?.drainage === 'Yes').length / Math.max(1, visibleSchemes.length)) * 100) },
                      { label: 'On-Site Weather Stations',  val: weatherPct },
                    ].map(item => (
                      <div key={item.label} className="p-3 rounded-xl bg-[#F7FAF8] border border-[#DCE5DF]">
                        <div className="text-[10px] font-bold text-slate-500">{item.label}</div>
                        <div className="text-xl font-black text-[#165B33] mt-1">{item.val}%</div>
                        <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden mt-1.5">
                          <div className="h-full bg-[#1D7A46] rounded-full" style={{ width: `${item.val}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── SCREEN 4: INFRASTRUCTURE HEALTH & O&M ── */}
            {activeTab === 'infrastructure' && (
              <div className="space-y-5 animate-fadeIn">
                <SectionTitle
                  num="4"
                  title="Infrastructure Health Audit & O&M Compliance"
                  subtitle="Condition, functionality, maintenance requirements, O&M fund compliance and rehabilitation estimates"
                />

                {/* 6 Clean White Editorial Cards — Infrastructure Health */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {(() => {
                    const iconByKey = {
                      headworks: HeadworksGaugeIcon,
                      conveyance: ConveyancePipeIcon,
                      storage: DamSpillwayIcon,
                      infield: InfieldSprinklerIcon,
                      access_road: AccessRoadIcon,
                    };
                    const topFive = ['headworks', 'conveyance', 'storage', 'infield', 'access_road'].map(k => {
                      const meta = infraCategories.find(c => c.key === k);
                      const good = visibleSchemes.filter(s => s.infrastructure?.[k] === 'Good').length;
                      const pct = Math.round((good / Math.max(1, visibleSchemes.length)) * 100);
                      return {
                        icon: iconByKey[k],
                        label: meta?.label || k,
                        pct,
                        tag: pct >= 60 ? 'Good' : pct >= 40 ? 'Fair' : 'Poor',
                        dot: pct >= 60 ? '#2D7A4D' : pct >= 40 ? '#C88A2E' : '#C53030',
                        accent: pct >= 60 ? 'text-[#133A26]' : pct >= 40 ? 'text-[#B9770E]' : 'text-[#C53030]'
                      };
                    });
                    const allSix = [
                      ...topFive,
                      {
                        icon: OmFundBagIcon,
                        label: 'O&M Fund',
                        pct: omFundPct,
                        tag: omFundPct >= 60 ? 'Compliant' : 'Low',
                        dot: omFundPct >= 60 ? '#2D7A4D' : '#C88A2E',
                        accent: 'text-[#133A26]'
                      }
                    ];
                    return allSix.map(card => {
                      const Icon = card.icon;
                      return (
                        <div key={card.label} className="agri-card rounded-xl px-3.5 py-3 flex flex-col justify-between gap-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-medium text-[#525E56] truncate">{card.label}</span>
                            <Icon className={`w-5 h-5 shrink-0 ${card.accent}`} />
                          </div>
                          <div className="flex items-baseline justify-between">
                            <span className="text-xl font-bold text-[#141A16] tabular-nums">{card.pct}%</span>
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#525E56]">
                              <span className="w-2 h-2 rounded-full" style={{ background: card.dot }} />
                              {card.tag}
                            </span>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>

                {/* 2-Column matching PDF Screen 4: National Infrastructure Condition Bars + Rehabilitation Requirements */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  <div className="lg:col-span-2 agri-card p-5 rounded-xl space-y-3.5">
                    <h3 className="text-sm font-black text-slate-900">National Infrastructure Condition</h3>
                    {infraCategories.map(cat => {
                      const total = Math.max(1, visibleSchemes.length);
                      const good = visibleSchemes.filter(s => s.infrastructure?.[cat.key] === 'Good').length;
                      const mod  = visibleSchemes.filter(s => s.infrastructure?.[cat.key] === 'Moderate').length;
                      const bad  = total - good - mod;
                      const goodPct = Math.round((good / total) * 100);
                      const modPct  = Math.round((mod / total) * 100);
                      const badPct  = Math.max(0, 100 - goodPct - modPct);
                      return (
                        <div key={cat.key} className="flex items-center gap-3 text-xs">
                          <span className="w-32 font-bold text-slate-700 shrink-0">{cat.label}</span>
                          <div className="flex-1 h-4 bg-slate-100 rounded-md overflow-hidden flex">
                            {goodPct > 0 && <div className="bg-[#279B5E] h-full" style={{ width: `${goodPct}%` }} title={`Good: ${goodPct}%`} />}
                            {modPct > 0  && <div className="bg-[#F1C40F] h-full" style={{ width: `${modPct}%` }} title={`Moderate: ${modPct}%`} />}
                            {badPct > 0  && <div className="bg-[#D9534F] h-full" style={{ width: `${badPct}%` }} title={`Poor/Bad: ${badPct}%`} />}
                          </div>
                          <span className="w-10 text-right font-black text-slate-900">{goodPct}%</span>
                        </div>
                      );
                    })}
                    <div className="flex items-center gap-4 pt-2 text-[10px] font-bold text-slate-500">
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-[#279B5E]" /> Good</span>
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-[#F1C40F]" /> Moderate</span>
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-[#D9534F]" /> Poor / Critical</span>
                    </div>
                  </div>

                  {/* Right: Rehabilitation Requirements */}
                  <div className="agri-card p-5 rounded-xl space-y-3">
                    <h3 className="text-sm font-black text-slate-900">Rehabilitation Requirements</h3>
                    {[
                      { label: 'Schemes Requiring Rehab',      val: `${summary.schemesNeedingRehab} schemes`, color: 'text-[#165B33]' },
                      { label: 'Estimated Rehabilitation Cost', val: `US$ ${(summary.totalRehabCostUsd / 1e6).toFixed(2)} M`, color: 'text-[#B9770E]' },
                      { label: 'Priority (Critical & High)',    val: `${visibleSchemes.filter(s => ['Critical', 'High'].includes(s.rehab?.priority)).length} schemes`, color: 'text-[#B03A2E]' },
                      { label: 'O&M Manual Available',          val: `${Math.round((visibleSchemes.filter(s => s.om?.has_manual === 'Yes').length / Math.max(1, visibleSchemes.length)) * 100)}%`, color: 'text-[#1B4F72]' },
                    ].map(r => (
                      <div key={r.label} className="flex items-center justify-between p-3 rounded-lg bg-[#F7FAF8] border border-[#DCE5DF] text-xs">
                        <span className="font-bold text-slate-700">{r.label}</span>
                        <span className={`font-black ${r.color}`}>{r.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Per-Scheme Engineering Asset Heatmap */}
                <div className="agri-card p-5 rounded-xl">
                  <h3 className="text-sm font-black text-slate-900 mb-3 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#165B33]" />
                    Per-Scheme Engineering Asset Condition Heatmap
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead className="bg-[#F4F7F5] border-b border-[#DCE5DF] text-[10px] font-black uppercase text-slate-600">
                        <tr>
                          <th className="p-3 text-left">Scheme</th>
                          {infraCategories.map(c => (
                            <th key={c.key} className="p-3 text-center whitespace-nowrap">{c.label}</th>
                          ))}
                          <th className="p-3 text-center">O&amp;M Fund</th>
                          <th className="p-3 text-center">Rehab Est.</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {visibleSchemes.map(s => (
                          <tr key={s.id} className="hover:bg-slate-50 cursor-pointer" onClick={() => setSelectedSchemeId(s.id)}>
                            <td className="p-3 font-black text-slate-900 whitespace-nowrap">
                              <div>{s.scheme_name}</div>
                              <div className="text-[10px] font-semibold text-slate-500">{s.id} • {s.province}</div>
                            </td>
                            {infraCategories.map(c => {
                              const val = s.infrastructure?.[c.key];
                              return (
                                <td key={c.key} className="p-2 text-center">
                                  <span className={`px-2 py-1 rounded text-[10px] font-black ${ratingBg(val)}`}>{val || 'N/A'}</span>
                                </td>
                              );
                            })}
                            <td className="p-2 text-center">
                              <span className={`px-2 py-1 rounded text-[10px] font-black ${s.om?.has_fund === 'Yes' ? 'heatmap-good' : 'heatmap-bad'}`}>
                                {s.om?.has_fund || 'N/A'}
                              </span>
                            </td>
                            <td className="p-2 text-center font-black text-slate-800 whitespace-nowrap">
                              {s.rehab?.estimated_cost_usd ? `US$${(s.rehab.estimated_cost_usd / 1000).toFixed(0)}k` : '—'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ── SCREEN 5: AGRONOMY & PRODUCTION ── */}
            {activeTab === 'agronomic' && (
              <div className="space-y-5 animate-fadeIn">
                <SectionTitle
                  num="5"
                  title="Agronomic Production & Crop Performance"
                  subtitle="Crops, planted areas, yields, production volumes, cropping intensity and market outlets"
                />

                {/* 4 Clean White Editorial Cards — Agronomy & Production */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { icon: IrrigatedFieldIcon, label: 'Planted area',       val: `${summary.totalSeasonalPlantedHa.toLocaleString()} ha`, sub: '2026/27 seasons', accent: 'text-[#133A26]' },
                    { icon: HarvestSackIcon,    label: 'Total production',   val: `${summary.totalProductionMt.toLocaleString()} MT`,      sub: 'Irrigated output', accent: 'text-[#1E5B88]' },
                    { icon: YieldChartIcon,     label: 'Average yield',      val: `${avgYieldOverall} t/ha`,                               sub: 'Weighted average', accent: 'text-[#B9770E]' },
                    { icon: SeasonCycleIcon,    label: 'Cropping intensity', val: `${summary.croppingIntensityPct}%`,                      sub: 'Cropping seasons/yr', accent: 'text-[#2D7A4D]' },
                  ].map(card => {
                    const Icon = card.icon;
                    return (
                      <div key={card.label} className="agri-card rounded-xl px-4 py-3.5 flex flex-col justify-between gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-[#525E56]">{card.label}</span>
                          <Icon className={`w-6 h-6 shrink-0 ${card.accent}`} />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-[#141A16] tabular-nums leading-none">{card.val}</div>
                          <div className="text-xs text-[#738077] mt-1">{card.sub}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 2-Column matching PDF Screen 5: Crop Production Table + Market Destinations Donut */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  <div className="lg:col-span-2 agri-card p-5 rounded-xl">
                    <h3 className="text-sm font-black text-slate-900 mb-3">Crop Area and Production (Irrigated)</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-[#F4F7F5] text-[10px] font-black uppercase text-slate-600 border-b border-[#DCE5DF]">
                          <tr>
                            <th className="p-2.5">Crop</th>
                            <th className="p-2.5 text-right">Area (ha)</th>
                            <th className="p-2.5 text-right">Yield (t/ha)</th>
                            <th className="p-2.5 text-right">Production (MT)</th>
                            <th className="p-2.5">Market Outlets</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {cropProductionRows.map(r => (
                            <tr key={r.crop} className="hover:bg-slate-50 font-semibold">
                              <td className="p-2.5 font-black text-slate-900">{r.crop}</td>
                              <td className="p-2.5 text-right font-bold">{r.planted_ha.toLocaleString()}</td>
                              <td className="p-2.5 text-right font-black text-[#165B33]">{r.avg_yield}</td>
                              <td className="p-2.5 text-right font-black text-slate-900">{r.production_mt.toLocaleString()}</td>
                              <td className="p-2.5 text-slate-600">{r.marketsList || 'Local Markets'}</td>
                            </tr>
                          ))}
                          <tr className="bg-[#F4F7F5] font-black text-slate-900 border-t-2 border-[#DCE5DF]">
                            <td className="p-2.5">Total</td>
                            <td className="p-2.5 text-right">{summary.totalSeasonalPlantedHa.toLocaleString()}</td>
                            <td className="p-2.5 text-right">{avgYieldOverall}</td>
                            <td className="p-2.5 text-right">{summary.totalProductionMt.toLocaleString()}</td>
                            <td className="p-2.5 text-slate-500">All Channels</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Right: Market Destinations Donut */}
                  <div className="agri-card p-5 rounded-xl flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-[#141A16]">Market destinations</h3>
                      <p className="text-xs text-[#738077] mt-0.5">Off-take channel distribution</p>
                    </div>
                    <div className="h-48 relative my-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={MARKET_DESTINATIONS_DATA} dataKey="pct" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={76} paddingAngle={2} stroke="none">
                            {MARKET_DESTINATIONS_DATA.map((entry, idx) => <Cell key={idx} fill={BOTANICAL_CHART_PALETTE[idx % BOTANICAL_CHART_PALETTE.length]} />)}
                          </Pie>
                          <Tooltip contentStyle={TOOLTIP_STYLE} itemStyle={{ color: '#FFFFFF' }} formatter={v => `${v}%`} />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-base font-bold text-[#141A16] tabular-nums">{(summary.totalProductionMt / 1000).toFixed(1)}k</span>
                        <span className="text-xs text-[#738077]">MT total</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {MARKET_DESTINATIONS_DATA.map((m, idx) => (
                        <div key={m.name} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-sm" style={{ background: BOTANICAL_CHART_PALETTE[idx % BOTANICAL_CHART_PALETTE.length] }} />
                            <span className="font-medium text-[#3F4A43]">{m.name}</span>
                          </div>
                          <span className="font-semibold text-[#141A16] tabular-nums">{m.pct}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── SCREEN 6: PROJECT IMPLEMENTATION TRACKER ── */}
            {activeTab === 'projects' && (
              <ProjectTrackerPage schemes={visibleSchemes} onSelectScheme={s => setSelectedSchemeId(s.id)} />
            )}

            {/* ── SCREEN 7: SCHEME REGISTRY & INLINE PROFILE (PDF Screen 7) ── */}
            {activeTab === 'registry' && (
              selectedScheme ? (
                <SchemeProfileView
                  scheme={selectedScheme}
                  activeRole={activeRole}
                  onBack={() => setSelectedSchemeId(null)}
                />
              ) : (
                <div className="space-y-5 animate-fadeIn">
                  <SectionTitle
                    num="7"
                    title="Scheme Registry – Authoritative Master Records"
                    subtitle="One irrigation scheme, one master record — click any scheme to open its inline 7-tab Scheme Profile & verification workflow"
                  />
                  <SchemeTable
                    schemes={visibleSchemes}
                    onSelectScheme={s => setSelectedSchemeId(s.id)}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    selectedProvince={selectedProvince}
                    setSelectedProvince={setSelectedProvince}
                  />
                </div>
              )
            )}

            {/* ── SUSTAINABILITY & OPERATIONAL RISKS ── */}
            {activeTab === 'sustainability' && (
              <div className="space-y-5 animate-fadeIn">
                <SectionTitle
                  title="Sustainability & operational risk register"
                  subtitle="Recurring operational bottlenecks, climate risk vulnerability, and institutional sustainability priorities"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {visibleSchemes.flatMap(s => (s.challenges || []).map(c => ({ challenge: c, scheme: s.scheme_name, id: s.id, province: s.province }))).slice(0, 8).map((c, i) => (
                    <div key={i} className="agri-card p-4 rounded-xl flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#C88A2E] shrink-0 mt-2" />
                      <div>
                        <div className="text-xs font-medium text-[#738077]">Operational risk #{i + 1}</div>
                        <p className="text-sm font-semibold text-[#141A16] mt-0.5">{c.challenge}</p>
                        <p className="text-xs text-[#738077] mt-1 font-mono">{c.id} · {c.scheme} ({c.province})</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── REPORTS & POWER BI EXPORT ── */}
            {activeTab === 'reports' && (
              <ReportsPage schemes={visibleSchemes} />
            )}

            {/* ── MOBILE FIELD APP DOWNLOAD PAGE ── */}
            {activeTab === 'mobile_app' && (
              <MobileAppPage />
            )}

          </main>

          <footer className="bg-white border-t border-[#DCE5DF] py-3.5 text-center text-xs text-slate-600 font-bold no-print">
            <div className="w-full px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
              <p>© 2026 Republic of Zimbabwe • Ministry of Agriculture, Mechanisation &amp; Water Resources Development</p>
              <div className="flex items-center gap-4 text-[#165B33] font-black">
                <span>NIMIS Prototype v2.5</span>
                <span>Department of Irrigation Development</span>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {selectedScheme && activeTab !== 'registry' && (
        <SchemeDetailModal
          scheme={selectedScheme}
          activeRole={activeRole}
          onClose={() => setSelectedSchemeId(null)}
        />
      )}
      {showNewModal && (
        <NewSchemeModal onClose={() => setShowNewModal(false)} onSaved={reloadSchemes} />
      )}
    </div>
  );
}
