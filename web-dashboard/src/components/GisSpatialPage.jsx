import React, { useState, useEffect, useMemo } from 'react';
import {
  MapContainer, TileLayer, CircleMarker, Popup,
  Polygon, GeoJSON, ZoomControl, ScaleControl
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ExternalLink, Layers, Loader2 } from 'lucide-react';
import {
  PROVINCES, SCHEME_STATUSES, IRRIGATION_SYSTEMS, MAJOR_DAMS_DATA
} from '../../../shared/surveySchema.js';

const STATUS_CONFIG = {
  'Fully functional':     { color: '#2D7A4D', label: 'Fully functional' },
  'Partially functional': { color: '#C88A2E', label: 'Partially functional' },
  'Under rehabilitation': { color: '#2B6CB0', label: 'Under rehabilitation' },
  'Under Construction':   { color: '#2B6CB0', label: 'Under construction' },
  'Non-functional':       { color: '#C53030', label: 'Non-functional' },
};

const BASE_MAPS = {
  map: {
    label: 'Map',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors'
  },
  satellite: {
    label: 'Satellite',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri, Maxar, Earthstar Geographics'
  },
  terrain: {
    label: 'Terrain',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenTopoMap contributors'
  }
};

const ESRI_LABELS_URL =
  'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}';

const DAM_COORDS = {
  'DAM-001': [-20.73, 30.89],
  'DAM-002': [-20.24, 31.02],
  'DAM-003': [-18.76, 32.49],
  'DAM-004': [-20.84, 30.39],
  'DAM-005': [-20.66, 29.31],
  'DAM-006': [-16.52, 28.76],
};

function makeSchemeBoundary(lat, lng, areaHa = 200) {
  const delta = Math.max(0.025, Math.min(0.07, Math.sqrt(areaHa) * 0.002));
  return [
    [lat + delta, lng - delta * 1.1],
    [lat + delta * 0.85, lng + delta * 1.15],
    [lat - delta * 0.9, lng + delta * 0.95],
    [lat - delta, lng - delta * 0.9],
  ];
}

export default function GisSpatialPage({ schemes = [], onSelectScheme }) {
  const [provinceFilter, setProvinceFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [techFilter, setTechFilter] = useState('');
  const [baseMap, setBaseMap] = useState('satellite');
  const [mapReady, setMapReady] = useState(false);

  const [layers, setLayers] = useState({
    provinces: true,
    districts: false,
    wards: false,
    schemes: true,
    dams: true,
    boundaries: false,
    placeLabels: true,
  });

  // GeoJSON data caches (lazy-loaded on demand)
  const [geoData, setGeoData] = useState({
    provinces: null,
    districts: null,
    wards: null,
  });
  const [loadingLayer, setLoadingLayer] = useState({
    provinces: false,
    districts: false,
    wards: false,
  });

  const toggleLayer = (key) => setLayers(prev => ({ ...prev, [key]: !prev[key] }));

  useEffect(() => {
    const t = setTimeout(() => setMapReady(true), 40);
    return () => clearTimeout(t);
  }, []);

  // Load real Zimbabwe ADM1/ADM2/ADM3 GeoJSON whenever toggled on
  useEffect(() => {
    const files = {
      provinces: '/geo/zwe-provinces.geojson',
      districts: '/geo/zwe-districts.geojson',
      wards: '/geo/zwe-wards.geojson',
    };

    Object.entries(files).forEach(([key, url]) => {
      if (layers[key] && !geoData[key] && !loadingLayer[key]) {
        setLoadingLayer(prev => ({ ...prev, [key]: true }));
        fetch(url)
          .then(res => res.json())
          .then(data => {
            setGeoData(prev => ({ ...prev, [key]: data }));
          })
          .catch(err => console.error(`Failed to load ${key} GeoJSON:`, err))
          .finally(() => {
            setLoadingLayer(prev => ({ ...prev, [key]: false }));
          });
      }
    });
  }, [layers.provinces, layers.districts, layers.wards]);

  const filteredSchemes = useMemo(() => {
    return schemes.filter(s => {
      if (provinceFilter && s.province !== provinceFilter) return false;
      if (statusFilter && s.technical?.status !== statusFilter) return false;
      if (techFilter && s.technical?.irrigation_system !== techFilter) return false;
      return true;
    });
  }, [schemes, provinceFilter, statusFilter, techFilter]);

  const statusBreakdown = useMemo(() => {
    const total = Math.max(1, filteredSchemes.length);
    const items = [
      { key: 'Fully functional',     label: 'Fully functional',     color: '#2D7A4D', count: filteredSchemes.filter(s => s.technical?.status === 'Fully functional').length },
      { key: 'Partially functional', label: 'Partially functional', color: '#C88A2E', count: filteredSchemes.filter(s => s.technical?.status === 'Partially functional').length },
      { key: 'Under rehabilitation', label: 'Under rehabilitation', color: '#2B6CB0', count: filteredSchemes.filter(s => ['Under rehabilitation', 'Under Construction'].includes(s.technical?.status)).length },
      { key: 'Non-functional',       label: 'Non-functional',       color: '#C53030', count: filteredSchemes.filter(s => s.technical?.status === 'Non-functional').length },
    ];
    return items.map(it => ({ ...it, pct: ((it.count / total) * 100).toFixed(1) }));
  }, [filteredSchemes]);

  const provinceCounts = useMemo(() => {
    const map = {};
    filteredSchemes.forEach(s => {
      if (s.province) map[s.province.toLowerCase()] = (map[s.province.toLowerCase()] || 0) + 1;
    });
    return map;
  }, [filteredSchemes]);

  const activeBase = BASE_MAPS[baseMap];

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Header + 3 Inline Dropdowns */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 pb-4 border-b border-[#E7E5E0]">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-lg bg-[#133A26] text-white text-xs font-semibold flex items-center justify-center shrink-0 tabular-nums">
            02
          </span>
          <div>
            <h2 className="text-2xl font-bold text-[#141A16] leading-tight">
              GIS &amp; spatial mapping
            </h2>
            <p className="text-sm text-[#525E56] mt-0.5">
              Administrative boundaries (Province, District, Ward), scheme distribution and water infrastructure
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 w-full xl:w-auto shrink-0">
          <div>
            <label className="block text-xs font-medium text-[#738077] mb-1">Province</label>
            <select
              value={provinceFilter}
              onChange={e => setProvinceFilter(e.target.value)}
              className="w-full sm:min-w-[155px] bg-white border border-[#E2E0D9] rounded-lg px-3 py-2 text-xs font-medium text-[#141A16] outline-none focus:border-[#133A26]"
            >
              <option value="">All provinces</option>
              {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-[#738077] mb-1">Scheme status</label>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full sm:min-w-[155px] bg-white border border-[#E2E0D9] rounded-lg px-3 py-2 text-xs font-medium text-[#141A16] outline-none focus:border-[#133A26]"
            >
              <option value="">All statuses</option>
              {SCHEME_STATUSES.map(st => <option key={st} value={st}>{st}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-[#738077] mb-1">Technology</label>
            <select
              value={techFilter}
              onChange={e => setTechFilter(e.target.value)}
              className="w-full sm:min-w-[155px] bg-white border border-[#E2E0D9] rounded-lg px-3 py-2 text-xs font-medium text-[#141A16] outline-none focus:border-[#133A26]"
            >
              <option value="">All technologies</option>
              {IRRIGATION_SYSTEMS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Main Split: Full-Bleed Map Canvas (left) + Status & Administrative Layers Panel (right) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        <div className="xl:col-span-9 rounded-xl overflow-hidden border border-[#E7E5E0] shadow-xs relative bg-slate-900 h-[380px] sm:h-[460px] lg:h-[560px]">
          {mapReady && (
            <MapContainer
              center={[-19.0154, 29.85]}
              zoom={6}
              preferCanvas={true}
              style={{ width: '100%', height: '100%' }}
              zoomControl={false}
              scrollWheelZoom={true}
            >
              <ZoomControl position="topleft" />
              <ScaleControl position="bottomright" imperial={false} />

              <TileLayer
                key={baseMap}
                attribution={activeBase.attribution}
                url={activeBase.url}
              />

              {/* Cartographic Place & Road Labels Overlay for Satellite */}
              {baseMap === 'satellite' && layers.placeLabels && (
                <TileLayer url={ESRI_LABELS_URL} opacity={0.85} />
              )}

              {/* Administrative Layer 3: Wards (ADM3 — 1,961 polygons) */}
              {layers.wards && geoData.wards && (
                <GeoJSON
                  key="adm3-wards"
                  data={geoData.wards}
                  style={() => ({
                    color: '#7DD3FC',
                    weight: 0.7,
                    opacity: 0.75,
                    fillColor: '#0EA5E9',
                    fillOpacity: 0.03,
                  })}
                  onEachFeature={(feature, layer) => {
                    const name = feature.properties?.shapeName || 'Ward';
                    layer.bindTooltip(`Ward: ${name}`, { sticky: true, direction: 'top' });
                    layer.on({
                      mouseover: (e) => e.target.setStyle({ fillOpacity: 0.18, weight: 1.4 }),
                      mouseout:  (e) => e.target.setStyle({ fillOpacity: 0.03, weight: 0.7 }),
                    });
                  }}
                />
              )}

              {/* Administrative Layer 2: Districts (ADM2 — 91 polygons) */}
              {layers.districts && geoData.districts && (
                <GeoJSON
                  key="adm2-districts"
                  data={geoData.districts}
                  style={() => ({
                    color: '#FDE68A',
                    weight: 1.2,
                    dashArray: '4 3',
                    opacity: 0.85,
                    fillColor: '#F59E0B',
                    fillOpacity: 0.04,
                  })}
                  onEachFeature={(feature, layer) => {
                    const name = feature.properties?.shapeName || 'District';
                    layer.bindTooltip(`District: ${name}`, { sticky: true, direction: 'top' });
                    layer.on({
                      mouseover: (e) => e.target.setStyle({ fillOpacity: 0.16, weight: 2 }),
                      mouseout:  (e) => e.target.setStyle({ fillOpacity: 0.04, weight: 1.2 }),
                    });
                  }}
                />
              )}

              {/* Administrative Layer 1: Provinces (ADM1 — 10 polygons) */}
              {layers.provinces && geoData.provinces && (
                <GeoJSON
                  key={`adm1-provinces-${provinceFilter}-${filteredSchemes.length}`}
                  data={geoData.provinces}
                  style={(feature) => {
                    const name = feature.properties?.shapeName || '';
                    const isSelected = provinceFilter && name.toLowerCase().includes(provinceFilter.toLowerCase());
                    return {
                      color: isSelected ? '#4ADE80' : '#FFFFFF',
                      weight: isSelected ? 2.6 : 1.7,
                      opacity: 0.9,
                      fillColor: isSelected ? '#2D7A4D' : '#133A26',
                      fillOpacity: isSelected ? 0.22 : 0.06,
                    };
                  }}
                  onEachFeature={(feature, layer) => {
                    const name = feature.properties?.shapeName || 'Province';
                    const count = provinceCounts[name.toLowerCase()] || 0;
                    const suffix = count > 0 ? ` · ${count} ${count === 1 ? 'scheme' : 'schemes'}` : '';
                    layer.bindTooltip(`${name}${suffix}`, { sticky: true, direction: 'top' });
                    layer.on({
                      mouseover: (e) => e.target.setStyle({ fillOpacity: 0.2, weight: 2.4 }),
                      mouseout:  (e) => e.target.setStyle({ fillOpacity: 0.06, weight: 1.7 }),
                    });
                  }}
                />
              )}

              {/* Layer: Scheme Command-Area Boundaries */}
              {layers.boundaries && filteredSchemes.map(s => {
                const lat = s.coordinates?.lat;
                const lng = s.coordinates?.lng;
                if (!lat || !lng) return null;
                return (
                  <Polygon
                    key={`poly-${s.id}`}
                    positions={makeSchemeBoundary(lat, lng, s.technical?.equipped_area_ha)}
                    pathOptions={{ color: '#4ADE80', weight: 1.8, fillColor: '#22C55E', fillOpacity: 0.22 }}
                  />
                );
              })}

              {/* Layer: Dams & Reservoirs */}
              {layers.dams && MAJOR_DAMS_DATA.map(dam => {
                const coords = DAM_COORDS[dam.id];
                if (!coords) return null;
                return (
                  <CircleMarker
                    key={dam.id}
                    center={coords}
                    radius={6.5}
                    pathOptions={{ fillColor: '#0284C7', fillOpacity: 0.92, color: '#FFFFFF', weight: 2 }}
                  >
                    <Popup maxWidth={240}>
                      <div className="p-1 font-sans">
                        <div className="text-xs font-medium text-[#1E5B88]">Major dam · {dam.province}</div>
                        <h4 className="font-bold text-[#141A16] text-sm mt-0.5">{dam.name}</h4>
                        <div className="mt-1.5 text-xs text-[#525E56] tabular-nums">
                          Storage: <strong className="text-[#141A16]">{dam.pct}%</strong> ({dam.storage_mcm.toLocaleString()} / {dam.capacity_mcm.toLocaleString()} Mm³)
                        </div>
                      </div>
                    </Popup>
                  </CircleMarker>
                );
              })}

              {/* Layer: Irrigation Schemes */}
              {layers.schemes && filteredSchemes.map(scheme => {
                const lat = scheme.coordinates?.lat;
                const lng = scheme.coordinates?.lng;
                if (!lat || !lng) return null;
                const status = scheme.technical?.status || 'Partially functional';
                const cfg = STATUS_CONFIG[status] || STATUS_CONFIG['Partially functional'];
                return (
                  <CircleMarker
                    key={scheme.id}
                    center={[lat, lng]}
                    radius={9}
                    pathOptions={{ fillColor: cfg.color, fillOpacity: 0.95, color: '#FFFFFF', weight: 2.5 }}
                  >
                    <Popup maxWidth={300}>
                      <div className="p-1 font-sans">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#141A16]">
                            <span className="w-2 h-2 rounded-full" style={{ background: cfg.color }} />
                            {cfg.label}
                          </span>
                          <span className="text-xs font-mono text-[#738077]">{scheme.id}</span>
                        </div>
                        <h4 className="font-bold text-[#141A16] text-sm">{scheme.scheme_name}</h4>
                        <p className="text-xs text-[#525E56]">{scheme.district}, {scheme.province} · {scheme.ward}</p>
                        <div className="grid grid-cols-3 gap-1.5 mt-2.5 text-center tabular-nums">
                          <div className="bg-[#FAF9F6] p-1.5 rounded border border-[#E7E5E0]">
                            <span className="text-xs text-[#738077] block">Equipped</span>
                            <strong className="text-xs font-semibold text-[#141A16]">{scheme.technical?.equipped_area_ha} ha</strong>
                          </div>
                          <div className="bg-[#FAF9F6] p-1.5 rounded border border-[#E7E5E0]">
                            <span className="text-xs text-[#738077] block">Functional</span>
                            <strong className="text-xs font-semibold text-[#141A16]">{scheme.technical?.functional_area_ha} ha</strong>
                          </div>
                          <div className="bg-[#FAF9F6] p-1.5 rounded border border-[#E7E5E0]">
                            <span className="text-xs text-[#738077] block">Irrigated</span>
                            <strong className="text-xs font-semibold text-[#133A26]">{scheme.technical?.actual_irrigated_area_ha || scheme.technical?.functional_area_ha} ha</strong>
                          </div>
                        </div>
                        <button
                          onClick={() => onSelectScheme && onSelectScheme(scheme)}
                          className="mt-2.5 w-full py-1.5 bg-[#133A26] hover:bg-[#0F2F1E] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5"
                        >
                          <span>Open scheme profile</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </Popup>
                  </CircleMarker>
                );
              })}
            </MapContainer>
          )}

          {/* Bottom-Left Segmented Base-Map Switcher: [ Map | Satellite | Terrain ] */}
          <div className="absolute bottom-4 left-4 z-[1000] inline-flex bg-white/95 backdrop-blur-sm rounded-lg p-1 shadow-md border border-[#E7E5E0]">
            {Object.entries(BASE_MAPS).map(([key, cfg]) => (
              <button
                key={key}
                type="button"
                onClick={() => setBaseMap(key)}
                className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  baseMap === key
                    ? 'bg-[#133A26] text-white'
                    : 'text-[#3F4A43] hover:bg-[#F3F4F0]'
                }`}
              >
                {cfg.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side Panel — Status Breakdown + Administrative & Asset Layers */}
        <div className="xl:col-span-3 space-y-4">
          {/* Card 1: Scheme Status */}
          <div className="agri-card p-4 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#141A16]">
                Scheme status ({filteredSchemes.length})
              </h3>
              {statusFilter && (
                <button onClick={() => setStatusFilter('')} className="text-xs font-medium text-[#133A26] hover:underline">
                  Clear
                </button>
              )}
            </div>
            <div className="space-y-1.5">
              {statusBreakdown.map(item => {
                const active = statusFilter === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setStatusFilter(active ? '' : item.key)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors ${
                      active ? 'bg-[#EDF4EF] ring-1 ring-[#133A26]' : 'hover:bg-[#FAF9F6]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: item.color }} />
                      <span className="font-medium text-[#141A16]">{item.label}</span>
                    </div>
                    <span className="font-semibold text-[#141A16] tabular-nums">
                      {item.count} <span className="text-[#738077] font-normal">({item.pct}%)</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Card 2: Administrative Boundaries */}
          <div className="agri-card p-4 rounded-xl space-y-2.5">
            <h3 className="text-sm font-semibold text-[#141A16]">Administrative boundaries</h3>
            <div className="space-y-1.5">
              {[
                { key: 'provinces', label: 'Provinces (ADM1)', count: '10',    swatch: '#FFFFFF', border: '#94A3B8' },
                { key: 'districts', label: 'Districts (ADM2)', count: '91',    swatch: '#FDE68A', border: '#D97706' },
                { key: 'wards',     label: 'Wards (ADM3)',     count: '1,961', swatch: '#7DD3FC', border: '#0284C7' },
              ].map(l => (
                <label
                  key={l.key}
                  className="flex items-center justify-between gap-2 px-2 py-1.5 rounded-lg hover:bg-[#FAF9F6] cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={layers[l.key]}
                      onChange={() => toggleLayer(l.key)}
                      className="w-4 h-4 rounded accent-[#133A26] cursor-pointer"
                    />
                    <span
                      className="w-3.5 h-2.5 rounded-xs shrink-0"
                      style={{ background: l.swatch, border: `1.5px solid ${l.border}` }}
                    />
                    <span className={`text-xs font-medium ${layers[l.key] ? 'text-[#141A16]' : 'text-[#738077]'}`}>
                      {l.label}
                    </span>
                  </div>
                  {loadingLayer[l.key] ? (
                    <Loader2 className="w-3.5 h-3.5 text-[#133A26] animate-spin shrink-0" />
                  ) : (
                    <span className="text-xs text-[#8A948D] tabular-nums">{l.count}</span>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Card 3: Infrastructure & Reference Layers */}
          <div className="agri-card p-4 rounded-xl space-y-2.5">
            <h3 className="text-sm font-semibold text-[#141A16]">Infrastructure layers</h3>
            <div className="space-y-1.5">
              {[
                { key: 'schemes',     label: 'Irrigation schemes' },
                { key: 'dams',        label: 'Major dams & reservoirs' },
                { key: 'boundaries',  label: 'Scheme command boundaries' },
                { key: 'placeLabels', label: 'Place & road labels' },
              ].map(l => (
                <label
                  key={l.key}
                  className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-[#FAF9F6] cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={layers[l.key]}
                    onChange={() => toggleLayer(l.key)}
                    className="w-4 h-4 rounded accent-[#133A26] cursor-pointer"
                  />
                  <span className={`text-xs font-medium ${layers[l.key] ? 'text-[#141A16]' : 'text-[#738077]'}`}>
                    {l.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Verified Coordinates & Spatial Telemetry Registry Table */}
      <div className="agri-card rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#ECEAE4]">
          <h3 className="text-sm font-semibold text-[#141A16] flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#133A26]" />
            Verified coordinates &amp; spatial registry ({filteredSchemes.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#FAF9F6] text-xs font-medium text-[#525E56] border-b border-[#ECEAE4]">
              <tr>
                <th className="px-5 py-3">Scheme ID</th>
                <th className="px-4 py-3">Scheme name</th>
                <th className="px-4 py-3">Province / District / Ward</th>
                <th className="px-4 py-3">GPS coordinates</th>
                <th className="px-4 py-3 text-right">Equipped / Irrigated</th>
                <th className="px-4 py-3">Verification</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EFEA] bg-white">
              {filteredSchemes.map(s => (
                <tr key={s.id} className="hover:bg-[#FAF9F6] transition-colors">
                  <td className="px-5 py-3 font-mono text-xs font-semibold text-[#133A26]">{s.id}</td>
                  <td className="px-4 py-3 font-semibold text-[#141A16]">{s.scheme_name}</td>
                  <td className="px-4 py-3 text-[#525E56]">{s.province} · {s.district} · {s.ward}</td>
                  <td className="px-4 py-3 font-mono text-xs text-[#141A16]">
                    {s.coordinates?.lat}, {s.coordinates?.lng}
                    <span className="text-[#8A948D] ml-1.5">({s.coordinates?.alt || 600}m)</span>
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-[#141A16] tabular-nums">
                    {s.technical?.equipped_area_ha} / <span className="text-[#133A26] font-semibold">{s.technical?.actual_irrigated_area_ha || s.technical?.functional_area_ha} ha</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-medium text-[#525E56] bg-[#F3F4F0] px-2 py-1 rounded-md">
                      {s.verification?.stage || 'Captured'}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={() => onSelectScheme && onSelectScheme(s)}
                      className="px-3 py-1.5 rounded-lg border border-[#E2E0D9] bg-white hover:border-[#133A26] hover:text-[#133A26] text-xs font-medium text-[#3F4A43] transition-colors"
                    >
                      Inspect
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
