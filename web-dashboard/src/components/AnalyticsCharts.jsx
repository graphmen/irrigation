import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, AreaChart, Area, RadarChart,
  Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { BarChart3, PieChart as PieIcon, ShieldAlert, Droplets, Sprout, TrendingUp, Activity, Leaf } from 'lucide-react';

const COLORS = ['#15803d', '#0284c7', '#d97706', '#84cc16', '#78350f', '#e11d48', '#7c3aed', '#0891b2'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xl text-xs">
      <p className="font-black text-slate-800 mb-1">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-sm" style={{ background: p.color }} />
          <span className="text-slate-600 font-bold">{p.name}:</span>
          <span className="font-black text-slate-900">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

// Monthly water availability mock data (seasonal Zimbabwe pattern)
const MONTHLY_WATER_DATA = [
  { month: 'Jan', rainfall: 175, evapotranspiration: 165, irrigation: 62 },
  { month: 'Feb', rainfall: 148, evapotranspiration: 148, irrigation: 78 },
  { month: 'Mar', rainfall: 95,  evapotranspiration: 142, irrigation: 95 },
  { month: 'Apr', rainfall: 40,  evapotranspiration: 110, irrigation: 115 },
  { month: 'May', rainfall: 12,  evapotranspiration: 82,  irrigation: 135 },
  { month: 'Jun', rainfall: 4,   evapotranspiration: 58,  irrigation: 148 },
  { month: 'Jul', rainfall: 2,   evapotranspiration: 55,  irrigation: 152 },
  { month: 'Aug', rainfall: 5,   evapotranspiration: 75,  irrigation: 148 },
  { month: 'Sep', rainfall: 14,  evapotranspiration: 105, irrigation: 130 },
  { month: 'Oct', rainfall: 48,  evapotranspiration: 140, irrigation: 105 },
  { month: 'Nov', rainfall: 92,  evapotranspiration: 155, irrigation: 70 },
  { month: 'Dec', rainfall: 148, evapotranspiration: 162, irrigation: 48 },
];

export default function AnalyticsCharts({ schemes }) {
  // 1. Provincial Area Breakdown
  const provinceData = Object.entries(
    schemes.reduce((acc, s) => {
      const prov = s.province || 'Unknown';
      acc[prov] = (acc[prov] || 0) + Number(s.technical?.equipped_area_ha || 0);
      return acc;
    }, {})
  ).map(([name, area]) => ({ 
    name: name.replace('Mashonaland', 'Mash').replace('Matabeleland', 'Mat'), 
    area: Math.round(area)
  })).sort((a, b) => b.area - a.area);

  // 2. Water Sources Donut
  const waterSourceData = Object.entries(
    schemes.reduce((acc, s) => {
      const src = s.technical?.water_source || 'Other';
      acc[src] = (acc[src] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  // 3. Infrastructure Condition Stacked
  const infraData = [
    {
      category: 'Headworks',
      Good:     schemes.filter(s => s.infrastructure?.headworks === 'Good').length,
      Moderate: schemes.filter(s => s.infrastructure?.headworks === 'Moderate').length,
      Bad:      schemes.filter(s => s.infrastructure?.headworks === 'Bad').length,
    },
    {
      category: 'Conveyance',
      Good:     schemes.filter(s => s.infrastructure?.conveyance === 'Good').length,
      Moderate: schemes.filter(s => s.infrastructure?.conveyance === 'Moderate').length,
      Bad:      schemes.filter(s => s.infrastructure?.conveyance === 'Bad').length,
    },
    {
      category: 'Storage NSD',
      Good:     schemes.filter(s => s.infrastructure?.storage === 'Good').length,
      Moderate: schemes.filter(s => s.infrastructure?.storage === 'Moderate').length,
      Bad:      schemes.filter(s => s.infrastructure?.storage === 'Bad').length,
    },
    {
      category: 'Infield',
      Good:     schemes.filter(s => s.infrastructure?.infield === 'Good').length,
      Moderate: schemes.filter(s => s.infrastructure?.infield === 'Moderate').length,
      Bad:      schemes.filter(s => s.infrastructure?.infield === 'Bad').length,
    },
    {
      category: 'Fence',
      Good:     schemes.filter(s => s.infrastructure?.perimeter_fence === 'Good').length,
      Moderate: schemes.filter(s => s.infrastructure?.perimeter_fence === 'Moderate').length,
      Bad:      schemes.filter(s => ['Bad', 'Poor/ Bad'].includes(s.infrastructure?.perimeter_fence)).length,
    },
  ];

  // 4. Challenges Frequency Horizontal Bar
  const challengeCounts = {};
  schemes.forEach(s => {
    (s.challenges || []).forEach(ch => {
      challengeCounts[ch] = (challengeCounts[ch] || 0) + 1;
    });
  });
  const challengeData = Object.entries(challengeCounts)
    .map(([name, count]) => ({ name: name.length > 30 ? name.substring(0, 30) + '…' : name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  // 5. Crop Frequency Pie
  const cropCounts = {};
  schemes.forEach(s => {
    (s.agronomic?.crops || []).forEach(c => {
      cropCounts[c] = (cropCounts[c] || 0) + 1;
    });
  });
  const cropData = Object.entries(cropCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  // 6. Scheme performance radar (use first 3 schemes if available)
  const radarSchemes = schemes.slice(0, 3);
  const radarData = [
    { subject: 'Headworks',  ...Object.fromEntries(radarSchemes.map((s, i) => [s.scheme_name.split(' ')[0], s.infrastructure?.headworks === 'Good' ? 3 : s.infrastructure?.headworks === 'Moderate' ? 2 : 1])) },
    { subject: 'Conveyance', ...Object.fromEntries(radarSchemes.map((s, i) => [s.scheme_name.split(' ')[0], s.infrastructure?.conveyance === 'Good' ? 3 : s.infrastructure?.conveyance === 'Moderate' ? 2 : 1])) },
    { subject: 'Water Sec.', ...Object.fromEntries(radarSchemes.map((s, i) => [s.scheme_name.split(' ')[0], s.water_mgmt?.sufficient_year_round === 'Yes' ? 3 : 1])) },
    { subject: 'O&M Fund',   ...Object.fromEntries(radarSchemes.map((s, i) => [s.scheme_name.split(' ')[0], s.om?.has_fund === 'Yes' ? 3 : 1])) },
    { subject: 'IMC',        ...Object.fromEntries(radarSchemes.map((s, i) => [s.scheme_name.split(' ')[0], s.water_mgmt?.has_committee === 'Yes' ? 3 : 1])) },
    { subject: 'Market',     ...Object.fromEntries(radarSchemes.map((s, i) => [s.scheme_name.split(' ')[0], s.agronomic?.conducts_market_analysis === 'Yes' ? 3 : 1])) },
  ];

  const RADAR_COLORS = ['#15803d', '#0284c7', '#d97706'];

  return (
    <div className="space-y-6">
      {/* Row 1: Province Area + Water Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Provincial Equipped Area */}
        <div className="agri-card p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-800" />
              Equipped Area by Province (Ha)
            </h4>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={provinceData} barSize={32}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} fontWeight="700" tick={{ fill: '#64748b' }} />
                <YAxis stroke="#94a3b8" fontSize={11} fontWeight="700" tick={{ fill: '#64748b' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="area" fill="#15803d" radius={[6, 6, 0, 0]} name="Area (Ha)">
                  {provinceData.map((entry, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Water Source Donut */}
        <div className="agri-card p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Droplets className="w-4 h-4 text-sky-700" />
              Primary Water Source Distribution
            </h4>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={waterSourceData}
                  cx="50%" cy="50%"
                  innerRadius={55} outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {waterSourceData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2: Monthly Water Trend Area Chart */}
      <div className="agri-card p-5 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-sky-700" />
              Annual Hydrological Cycle — Rainfall vs Evapotranspiration vs Irrigation Demand (mm)
            </h4>
            <p className="text-xs text-slate-500 font-bold mt-0.5">Zimbabwe seasonal average — representative telemetry pattern</p>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MONTHLY_WATER_DATA}>
              <defs>
                <linearGradient id="rainGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0284c7" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0284c7" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="etGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d97706" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#d97706" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="irrGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#15803d" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#15803d" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} fontWeight="700" tick={{ fill: '#64748b' }} />
              <YAxis stroke="#94a3b8" fontSize={11} fontWeight="700" tick={{ fill: '#64748b' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px', fontWeight: '700', color: '#475569' }} />
              <Area type="monotone" dataKey="rainfall"          name="Rainfall (mm)"         stroke="#0284c7" fill="url(#rainGrad)" strokeWidth={2.5} dot={false} />
              <Area type="monotone" dataKey="evapotranspiration" name="Evapotranspiration (mm)" stroke="#d97706" fill="url(#etGrad)" strokeWidth={2} dot={false} strokeDasharray="5 3" />
              <Area type="monotone" dataKey="irrigation"        name="Irrigation Demand (mm)" stroke="#15803d" fill="url(#irrGrad)" strokeWidth={2.5} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 3: Infrastructure + Challenges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 3: Infrastructure Stacked */}
        <div className="agri-card p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Sprout className="w-4 h-4 text-emerald-800" />
              Infrastructure Functionality Matrix
            </h4>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={infraData} barSize={28}>
                <XAxis dataKey="category" stroke="#94a3b8" fontSize={10} fontWeight="700" tick={{ fill: '#64748b' }} />
                <YAxis stroke="#94a3b8" fontSize={10} fontWeight="700" tick={{ fill: '#64748b' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '11px', fontWeight: '700' }} />
                <Bar dataKey="Good"     fill="#15803d" stackId="a" name="Good" />
                <Bar dataKey="Moderate" fill="#f59e0b" stackId="a" name="Moderate" />
                <Bar dataKey="Bad"      fill="#e11d48" stackId="a" name="Bad" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Risk Factors Horizontal */}
        <div className="agri-card p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              Top Sustainability & Risk Factors
            </h4>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={challengeData} layout="vertical">
                <XAxis type="number" stroke="#94a3b8" fontSize={10} fontWeight="700" tick={{ fill: '#64748b' }} />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={9} fontWeight="700" width={130} tick={{ fill: '#64748b' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#9f1239" radius={[0, 6, 6, 0]} name="Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 4: Crop Mix + Scheme Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 5: Crop Frequency */}
        <div className="agri-card p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Leaf className="w-4 h-4 text-emerald-700" />
              Crop Cultivation Frequency
            </h4>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cropData} barSize={24}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} fontWeight="700" tick={{ fill: '#64748b' }} angle={-15} textAnchor="end" height={40} />
                <YAxis stroke="#94a3b8" fontSize={10} fontWeight="700" tick={{ fill: '#64748b' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" name="Schemes" radius={[5, 5, 0, 0]}>
                  {cropData.map((entry, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 6: Multi-Scheme Radar */}
        <div className="agri-card p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-violet-700" />
              Multi-Scheme Performance Radar
            </h4>
            <p className="text-[10px] text-slate-500 font-bold">Top 3 schemes</p>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} cx="50%" cy="50%">
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fontWeight: '700', fill: '#64748b' }} />
                <PolarRadiusAxis angle={30} domain={[0, 3]} tick={false} axisLine={false} />
                {radarSchemes.map((s, i) => (
                  <Radar
                    key={s.id}
                    name={s.scheme_name.split(' ')[0]}
                    dataKey={s.scheme_name.split(' ')[0]}
                    stroke={RADAR_COLORS[i]}
                    fill={RADAR_COLORS[i]}
                    fillOpacity={0.12}
                    strokeWidth={2}
                  />
                ))}
                <Legend wrapperStyle={{ fontSize: '11px', fontWeight: '700' }} />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
