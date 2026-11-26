import React, { useState } from 'react';
import { Eye, Layers } from 'lucide-react';
import { PROVINCES, WATER_SOURCES, SCHEME_STATUSES, VERIFICATION_STAGES, SECTOR_TYPES } from '../../../shared/surveySchema.js';

export default function SchemeTable({
  schemes = [],
  onSelectScheme,
  searchTerm = '',
  selectedProvince = '',
  setSelectedProvince
}) {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedWaterSource, setSelectedWaterSource] = useState('');
  const [selectedStage, setSelectedStage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredSchemes = (schemes || []).filter(s => {
    if (!s) return false;
    const term = (searchTerm || '').toLowerCase();

    const matchesSearch =
      !term ||
      (s.id || '').toLowerCase().includes(term) ||
      (s.scheme_name || '').toLowerCase().includes(term) ||
      (s.district || '').toLowerCase().includes(term) ||
      (s.ward || '').toLowerCase().includes(term) ||
      (s.officer?.name || '').toLowerCase().includes(term);

    const matchesProvince = !selectedProvince || s.province === selectedProvince;
    const matchesStatus = !selectedStatus || s.technical?.status === selectedStatus;
    const matchesWaterSource = !selectedWaterSource || s.technical?.water_source === selectedWaterSource;
    const matchesStage = !selectedStage || (s.verification?.stage || 'Captured') === selectedStage;
    const matchesCategory = !selectedCategory || s.technical?.sector_type === selectedCategory;

    return matchesSearch && matchesProvince && matchesStatus && matchesWaterSource && matchesStage && matchesCategory;
  });

  const statusDot = (status) => {
    if (status === 'Fully functional') return '#2D7A4D';
    if (status === 'Partially functional') return '#C88A2E';
    if (['Under rehabilitation', 'Under Construction'].includes(status)) return '#2B6CB0';
    return '#C53030';
  };

  return (
    <div className="agri-card rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-[#ECEAE4] flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-[#141A16] flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#133A26]" />
            National scheme master registry
          </h3>
          <p className="text-xs text-[#738077] mt-0.5 tabular-nums">
            Showing {filteredSchemes.length} of {(schemes || []).length} registered schemes
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 px-5 py-3.5 bg-[#FAF9F6] border-b border-[#ECEAE4]">
        {[
          { label: 'Province', value: selectedProvince, onChange: e => setSelectedProvince && setSelectedProvince(e.target.value), all: 'All provinces', opts: PROVINCES },
          { label: 'Operational status', value: selectedStatus, onChange: e => setSelectedStatus(e.target.value), all: 'All statuses', opts: SCHEME_STATUSES },
          { label: 'Category', value: selectedCategory, onChange: e => setSelectedCategory(e.target.value), all: 'All categories', opts: SECTOR_TYPES },
          { label: 'Water source', value: selectedWaterSource, onChange: e => setSelectedWaterSource(e.target.value), all: 'All sources', opts: WATER_SOURCES },
          { label: 'Verification', value: selectedStage, onChange: e => setSelectedStage(e.target.value), all: 'All stages', opts: VERIFICATION_STAGES.map(v => v.id) },
        ].map(f => (
          <div key={f.label}>
            <label className="block text-[11px] font-medium text-[#738077] mb-1">{f.label}</label>
            <select
              className="w-full agri-input px-2.5 py-1.5 rounded-lg text-xs font-medium"
              value={f.value}
              onChange={f.onChange}
            >
              <option value="">{f.all}</option>
              {f.opts.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        ))}
      </div>

      {/* Enterprise Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#FAF9F6] text-[#525E56] font-medium text-xs border-b border-[#ECEAE4]">
            <tr>
              <th className="px-5 py-3">Scheme</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3 text-right">Equipped</th>
              <th className="px-4 py-3 text-right">Functional</th>
              <th className="px-4 py-3 text-right">Irrigated</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Verification</th>
              <th className="px-5 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0EFEA] bg-white">
            {filteredSchemes.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-8 text-center text-[#738077] text-sm">
                  No irrigation schemes match the active filters.
                </td>
              </tr>
            ) : (
              filteredSchemes.map((scheme) => {
                const stage = scheme.verification?.stage || 'Captured';
                return (
                  <tr
                    key={scheme.id}
                    onClick={() => onSelectScheme && onSelectScheme(scheme)}
                    className="hover:bg-[#FAF9F6] transition-colors cursor-pointer"
                  >
                    <td className="px-5 py-3.5">
                      <div className="font-semibold text-[#141A16]">{scheme.scheme_name}</div>
                      <div className="text-xs font-mono text-[#738077]">{scheme.id} · {scheme.technical?.sector_type || 'Communal'}</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="text-[#141A16] font-medium">{scheme.province}</div>
                      <div className="text-xs text-[#738077]">{scheme.district} · {scheme.ward}</div>
                    </td>
                    <td className="px-4 py-3.5 text-right font-medium text-[#141A16] tabular-nums">
                      {scheme.technical?.equipped_area_ha || 0} ha
                    </td>
                    <td className="px-4 py-3.5 text-right font-medium text-[#525E56] tabular-nums">
                      {scheme.technical?.functional_area_ha || 0} ha
                    </td>
                    <td className="px-4 py-3.5 text-right font-semibold text-[#133A26] tabular-nums">
                      {scheme.technical?.actual_irrigated_area_ha || scheme.technical?.functional_area_ha || 0} ha
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="inline-flex items-center gap-2 text-xs font-medium text-[#141A16]">
                        <span className="w-2 h-2 rounded-full" style={{ background: statusDot(scheme.technical?.status) }} />
                        {scheme.technical?.status || 'Unknown'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="text-xs font-medium text-[#525E56] bg-[#F3F4F0] px-2 py-1 rounded-md">
                        {stage}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); onSelectScheme && onSelectScheme(scheme); }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E2E0D9] bg-white hover:border-[#133A26] hover:text-[#133A26] text-xs font-medium text-[#3F4A43] transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
