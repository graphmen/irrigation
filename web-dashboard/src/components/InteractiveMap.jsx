import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, ZoomControl, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ExternalLink, Navigation, Layers, Droplets, ShieldCheck } from 'lucide-react';
import { PROVINCES, IRRIGATION_SYSTEMS, MAJOR_DAMS_DATA } from '../../../shared/surveySchema.js';

const { BaseLayer } = LayersControl;

const STATUS_CONFIG = {
  'Fully functional':     { color: '#15803d', bg: '#dcfce7', text: '#15803d', label: 'Fully Functional' },
  'Partially functional': { color: '#d97706', bg: '#fef3c7', text: '#92400e', label: 'Partially Functional' },
  'Under rehabilitation': { color: '#0284c7', bg: '#e0f2fe', text: '#075985', label: 'Under Rehabilitation' },
  'Under Construction':   { color: '#7c3aed', bg: '#ede9fe', text: '#5b21b6', label: 'Under Construction' },
  'Non-functional':       { color: '#e11d48', bg: '#ffe4e6', text: '#9f1239', label: 'Non-Functional' },
};

const DAM_COORDS = {
  'DAM-001': [-20.73, 30.89],
  'DAM-002': [-20.24, 31.02],
  'DAM-003': [-18.76, 32.49],
  'DAM-004': [-20.84, 30.39],
  'DAM-005': [-20.66, 29.31],
  'DAM-006': [-16.52, 28.76],
};

const LEGEND = [
  { label: 'Fully Functional',     color: '#15803d' },
  { label: 'Partially Functional', color: '#d97706' },
  { label: 'Under Rehabilitation', color: '#0284c7' },
  { label: 'Non-Functional',       color: '#e11d48' },
  { label: 'Major Dam / Reservoir',color: '#0369a1', isDam: true },
];

export default function InteractiveMap({ schemes = [], onSelectScheme, compact = false }) {
  const [mapFilter, setMapFilter] = useState('all');
  const [provinceFilter, setProvinceFilter] = useState('');
  const [techFilter, setTechFilter] = useState('');
  const [showDams, setShowDams] = useState(true);
  const [mapReady, setMapReady] = useState(false);

  const CENTER = [-19.0154, 29.1549];
  const ZOOM = 6;

  const filteredSchemes = schemes.filter(s => {
    if (mapFilter === 'functional' && s.technical?.status !== 'Fully functional') return false;
    if (mapFilter === 'attention' && s.technical?.status === 'Fully functional') return false;
    if (provinceFilter && s.province !== provinceFilter) return false;
    if (techFilter && s.technical?.irrigation_system !== techFilter) return false;
    return true;
  });

  useEffect(() => {
    const t = setTimeout(() => setMapReady(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="agri-card p-5 rounded-2xl mb-6 relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <Navigation className="w-5 h-5 text-emerald-700" />
            NIMIS GIS &amp; Spatial Mapping — Zimbabwe Irrigation Schemes
          </h3>
          <p className="text-xs font-semibold text-slate-500 mt-0.5">
            Switch between Street, ESRI Satellite, and Terrain base maps. Toggle Major Dams layer or click any scheme marker to inspect its authoritative master record.
          </p>
        </div>

        {/* Status Quick Filters */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start lg:self-auto">
          {[
            { key: 'all',        label: `All (${schemes.length})` },
            { key: 'functional', label: 'Functional' },
            { key: 'attention',  label: 'Needs Attention' },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setMapFilter(f.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                mapFilter === f.key
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* GIS Filter & Layer Toolbar (PDF Page 4 GIS Screen) */}
      {!compact && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4 p-3 bg-slate-50 rounded-xl border border-slate-200/80">
          <select
            value={provinceFilter}
            onChange={e => setProvinceFilter(e.target.value)}
            className="agri-input px-3 py-2 rounded-lg text-xs font-bold"
          >
            <option value="">All Provinces</option>
            {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>

          <select
            value={techFilter}
            onChange={e => setTechFilter(e.target.value)}
            className="agri-input px-3 py-2 rounded-lg text-xs font-bold"
          >
            <option value="">All Irrigation Technologies</option>
            {IRRIGATION_SYSTEMS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          <button
            type="button"
            onClick={() => setShowDams(v => !v)}
            className={`px-3 py-2 rounded-lg text-xs font-black flex items-center justify-center gap-2 border transition-all ${
              showDams
                ? 'bg-sky-700 text-white border-sky-800 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:border-sky-300'
            }`}
          >
            <Droplets className="w-3.5 h-3.5" />
            <span>{showDams ? 'Dams & Reservoirs Layer: ON' : 'Dams & Reservoirs Layer: OFF'}</span>
          </button>
        </div>
      )}

      {/* Leaflet Map */}
      <div className={`w-full ${compact ? 'h-[380px]' : 'h-[450px]'} rounded-xl overflow-hidden border border-slate-200 relative`}>
        {mapReady && (
          <MapContainer
            center={CENTER}
            zoom={ZOOM}
            style={{ width: '100%', height: '100%' }}
            zoomControl={false}
            scrollWheelZoom={true}
          >
            <ZoomControl position="topright" />
            <LayersControl position="topright">
              <BaseLayer checked name="Street (OpenStreetMap)">
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </BaseLayer>
              <BaseLayer name="Satellite (ESRI Imagery)">
                <TileLayer
                  attribution='&copy; Esri, DigitalGlobe, GeoEye'
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                />
              </BaseLayer>
              <BaseLayer name="Terrain (OpenTopoMap)">
                <TileLayer
                  attribution='&copy; OpenTopoMap contributors'
                  url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                />
              </BaseLayer>
            </LayersControl>

            {/* Major Dams Layer */}
            {showDams && MAJOR_DAMS_DATA.map(dam => {
              const coords = DAM_COORDS[dam.id];
              if (!coords) return null;
              return (
                <CircleMarker
                  key={dam.id}
                  center={coords}
                  radius={9}
                  pathOptions={{
                    fillColor: '#0369a1',
                    fillOpacity: 0.75,
                    color: '#bae6fd',
                    weight: 2,
                  }}
                >
                  <Popup maxWidth={240}>
                    <div className="p-1 font-sans">
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                        Major Dam • {dam.source}
                      </span>
                      <h4 className="font-black text-slate-900 text-sm mt-1">{dam.name}</h4>
                      <p className="text-xs text-slate-500 font-semibold">{dam.province}</p>
                      <div className="mt-2 text-xs font-bold text-slate-700">
                        Storage: <span className="text-sky-700 font-black">{dam.pct}%</span> ({dam.storage_mcm.toLocaleString()} / {dam.capacity_mcm.toLocaleString()} Mm³)
                      </div>
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}

            {/* Irrigation Scheme Markers */}
            {filteredSchemes.map(scheme => {
              const lat = scheme.coordinates?.lat;
              const lng = scheme.coordinates?.lng;
              if (!lat || !lng) return null;
              const status = scheme.technical?.status || 'Partially functional';
              const config = STATUS_CONFIG[status] || STATUS_CONFIG['Partially functional'];

              return (
                <CircleMarker
                  key={scheme.id}
                  center={[lat, lng]}
                  radius={13}
                  pathOptions={{
                    fillColor: config.color,
                    fillOpacity: 0.9,
                    color: '#ffffff',
                    weight: 3,
                  }}
                >
                  <Popup maxWidth={310}>
                    <div className="p-1 font-sans">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span
                          className="text-[10px] font-black uppercase px-2 py-0.5 rounded"
                          style={{ background: config.bg, color: config.text }}
                        >
                          {config.label}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 font-bold">{scheme.id}</span>
                      </div>
                      <h4 className="font-black text-slate-900 text-sm leading-tight">{scheme.scheme_name}</h4>
                      <p className="text-xs text-slate-600 font-semibold mt-0.5">
                        {scheme.district}, {scheme.province} • {scheme.technical?.sector_type}
                      </p>
                      <div className="grid grid-cols-3 gap-1.5 mt-2.5 text-center">
                        <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-200">
                          <span className="text-slate-500 block text-[9px] uppercase font-bold">Equipped</span>
                          <strong className="text-emerald-800 font-black text-xs">{scheme.technical?.equipped_area_ha} Ha</strong>
                        </div>
                        <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-200">
                          <span className="text-slate-500 block text-[9px] uppercase font-bold">Functional</span>
                          <strong className="text-sky-700 font-black text-xs">{scheme.technical?.functional_area_ha} Ha</strong>
                        </div>
                        <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-200">
                          <span className="text-slate-500 block text-[9px] uppercase font-bold">Irrigated</span>
                          <strong className="text-teal-700 font-black text-xs">{scheme.technical?.actual_irrigated_area_ha || scheme.technical?.functional_area_ha} Ha</strong>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-[10px] font-bold text-slate-500">
                        <span className="flex items-center gap-1 text-emerald-700">
                          <ShieldCheck className="w-3 h-3" /> {scheme.verification?.stage || 'Captured'}
                        </span>
                        <span>{scheme.verification?.data_source_type || 'Field Survey'}</span>
                      </div>
                      <button
                        onClick={() => onSelectScheme(scheme)}
                        className="mt-2.5 w-full py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-black rounded-lg flex items-center justify-center gap-1.5 transition-all"
                      >
                        <span>Open Authoritative Scheme Profile</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}
          </MapContainer>
        )}

        {/* Legend overlay */}
        <div className="absolute bottom-3 left-3 z-[1000] bg-white/95 backdrop-blur-sm border border-slate-200 rounded-xl p-3 shadow-lg">
          <p className="text-[10px] font-black uppercase text-slate-500 mb-2 flex items-center gap-1">
            <Layers className="w-3 h-3" /> Map Layers
          </p>
          <div className="space-y-1.5">
            {LEGEND.map(l => (
              <div key={l.label} className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full border-2 shadow-sm ${l.isDam ? 'border-sky-200' : 'border-white'}`}
                  style={{ background: l.color }}
                />
                <span className="text-[11px] font-bold text-slate-700">{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
