import React, { useState } from 'react';
import { X, PlusCircle, Save } from 'lucide-react';
import {
  PROVINCES, WATER_SOURCES, SCHEME_STATUSES, SECTOR_TYPES,
  IRRIGATION_SYSTEMS, POWER_STATUSES
} from '../../../shared/surveySchema.js';
import { saveDashboardScheme } from '../firebase.js';

export default function NewSchemeModal({ onClose, onSaved }) {
  const [schemeName, setSchemeName] = useState('');
  const [province, setProvince] = useState('Masvingo');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('Ward 1');
  const [sectorType, setSectorType] = useState('Communal');
  const [commissioningYear, setCommissioningYear] = useState('2024');
  const [designArea, setDesignArea] = useState('');
  const [equippedArea, setEquippedArea] = useState('');
  const [functionalArea, setFunctionalArea] = useState('');
  const [irrigatedArea, setIrrigatedArea] = useState('');
  const [beneficiaries, setBeneficiaries] = useState('150');
  const [waterSource, setWaterSource] = useState('River');
  const [irrigationSystem, setIrrigationSystem] = useState('Gravity-fed sprinkler');
  const [powerStatus, setPowerStatus] = useState('Solar Off-Grid');
  const [status, setStatus] = useState('Fully functional');
  const [officerName, setOfficerName] = useState('');
  const [officerPhone, setOfficerPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!schemeName.trim()) {
      alert('Please enter a Scheme Name');
      return;
    }

    const eq = Number(equippedArea) || 100;
    const des = Number(designArea) || eq;
    const fn = Number(functionalArea) || eq;
    const irr = Number(irrigatedArea) || fn;

    const newScheme = {
      scheme_name: schemeName.trim(),
      site_name: `${schemeName.trim()} Main Block`,
      province,
      district: district.trim() || 'Central District',
      ward: ward.trim() || 'Ward 1',
      coordinates: { lat: -19.45, lng: 30.25, alt: 950, verified: false },
      officer: {
        name: officerName.trim() || 'Field Officer',
        designation: 'District Irrigation Officer',
        phone: officerPhone.trim() || '+263 77 000 0000',
        email: 'officer@irrigation.gov.zw'
      },
      technical: {
        design_area_ha: des,
        irrigable_area_ha: des,
        equipped_area_ha: eq,
        developed_area_ha: eq,
        functional_area_ha: fn,
        actual_irrigated_area_ha: irr,
        current_season: '2026/27 Summer',
        water_source: waterSource,
        water_source_name: `${waterSource} Supply`,
        irrigation_system: irrigationSystem,
        energy_source: powerStatus.includes('Solar') ? 'Solar' : powerStatus.includes('ZESA') ? 'Electricity' : 'Gravity',
        sector_type: sectorType,
        commissioning_year: Number(commissioningYear) || 2024,
        status,
        beneficiaries_count: Number(beneficiaries) || 150,
        active_farmers_count: Number(beneficiaries) || 150,
        management_model: 'Farmer/ IMC'
      },
      energy: {
        power_status: powerStatus,
        zesa_meter_no: 'Pending Registration',
        bill_status: 'Current (Paid)'
      },
      infrastructure: {
        headworks: 'Good',
        conveyance: 'Good',
        storage: 'Moderate',
        infield: 'Good',
        perimeter_fence: 'Moderate',
        access_road: 'Good',
        last_assessment_date: new Date().toISOString().slice(0, 10)
      },
      om: { responsible: 'Farmers', has_manual: 'Yes', has_fund: 'Yes', pays_levy: 'Yes' },
      water_mgmt: { sufficient_year_round: 'Yes', has_committee: 'Yes', weather_station: 'No' },
      agronomic: { crops: ['Grain maize', 'Sugar beans'], markets: 'Local & GMB', conducts_market_analysis: 'Yes', cropping_intensity_pct: 140 },
      seasonal_production: [
        { season: '2026/27 Summer', crop: 'Grain maize', planted_ha: irr, harvested_ha: irr, yield_t_ha: 6.5, production_mt: Math.round(irr * 6.5), market_destination: 'GMB & Local' }
      ],
      challenges: []
    };

    saveDashboardScheme(newScheme);
    onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#141A16]/50 backdrop-blur-[1px] flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-xl bg-white border border-[#E7E5E0] rounded-xl p-6 shadow-xl space-y-4 my-auto max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-emerald-800" />
              Register New NIMIS Irrigation Scheme
            </h3>
            <p className="text-[11px] font-semibold text-slate-500">Minimum National Scheme Registration Dataset (Auto-assigns Unique Scheme ID)</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 font-bold">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs font-semibold text-slate-800">
          <div>
            <label className="block text-slate-700 font-bold uppercase mb-1">Scheme Name *</label>
            <input
              type="text"
              placeholder="e.g. Chisumbanje Smallholder Irrigation Scheme"
              className="w-full agri-input p-2.5 rounded-xl text-sm"
              value={schemeName}
              onChange={(e) => setSchemeName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div>
              <label className="block text-slate-700 font-bold uppercase mb-1">Province</label>
              <select className="w-full agri-input p-2 rounded-xl font-bold" value={province} onChange={e => setProvince(e.target.value)}>
                {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-slate-700 font-bold uppercase mb-1">District</label>
              <input type="text" placeholder="District" className="w-full agri-input p-2 rounded-xl" value={district} onChange={e => setDistrict(e.target.value)} />
            </div>
            <div>
              <label className="block text-slate-700 font-bold uppercase mb-1">Ward</label>
              <input type="text" placeholder="Ward 1" className="w-full agri-input p-2 rounded-xl" value={ward} onChange={e => setWard(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div>
              <label className="block text-slate-700 font-bold uppercase mb-1">Scheme Category</label>
              <select className="w-full agri-input p-2 rounded-xl font-bold" value={sectorType} onChange={e => setSectorType(e.target.value)}>
                {SECTOR_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-slate-700 font-bold uppercase mb-1">Year Est.</label>
              <input type="number" className="w-full agri-input p-2 rounded-xl" value={commissioningYear} onChange={e => setCommissioningYear(e.target.value)} />
            </div>
            <div>
              <label className="block text-slate-700 font-bold uppercase mb-1">Beneficiaries</label>
              <input type="number" className="w-full agri-input p-2 rounded-xl" value={beneficiaries} onChange={e => setBeneficiaries(e.target.value)} />
            </div>
          </div>

          {/* 4 Distinct Area Measures */}
          <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-2">
            <span className="text-[10px] font-black uppercase text-emerald-800 block">Four Distinct Area Measures (Ha)</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Design (Ha)</label>
                <input type="number" placeholder="120" className="w-full agri-input p-2 rounded-lg" value={designArea} onChange={e => setDesignArea(e.target.value)} />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Equipped (Ha)</label>
                <input type="number" placeholder="100" className="w-full agri-input p-2 rounded-lg" value={equippedArea} onChange={e => setEquippedArea(e.target.value)} />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Functional (Ha)</label>
                <input type="number" placeholder="90" className="w-full agri-input p-2 rounded-lg" value={functionalArea} onChange={e => setFunctionalArea(e.target.value)} />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Irrigated (Ha)</label>
                <input type="number" placeholder="85" className="w-full agri-input p-2 rounded-lg" value={irrigatedArea} onChange={e => setIrrigatedArea(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block text-slate-700 font-bold uppercase mb-1">Water Source</label>
              <select className="w-full agri-input p-2 rounded-xl font-bold" value={waterSource} onChange={e => setWaterSource(e.target.value)}>
                {WATER_SOURCES.map(ws => <option key={ws} value={ws}>{ws}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-slate-700 font-bold uppercase mb-1">Irrigation Technology</label>
              <select className="w-full agri-input p-2 rounded-xl font-bold" value={irrigationSystem} onChange={e => setIrrigationSystem(e.target.value)}>
                {IRRIGATION_SYSTEMS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block text-slate-700 font-bold uppercase mb-1">Electricity / Power Status</label>
              <select className="w-full agri-input p-2 rounded-xl font-bold" value={powerStatus} onChange={e => setPowerStatus(e.target.value)}>
                {POWER_STATUSES.map(ps => <option key={ps} value={ps}>{ps}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-slate-700 font-bold uppercase mb-1">Operational Status</label>
              <select className="w-full agri-input p-2 rounded-xl font-bold" value={status} onChange={e => setStatus(e.target.value)}>
                {SCHEME_STATUSES.map(st => <option key={st} value={st}>{st}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block text-slate-700 font-bold uppercase mb-1">Responsible Officer</label>
              <input type="text" placeholder="Officer Full Name" className="w-full agri-input p-2 rounded-xl" value={officerName} onChange={e => setOfficerName(e.target.value)} />
            </div>
            <div>
              <label className="block text-slate-700 font-bold uppercase mb-1">Officer Phone</label>
              <input type="text" placeholder="+263 77 ..." className="w-full agri-input p-2 rounded-xl" value={officerPhone} onChange={e => setOfficerPhone(e.target.value)} />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-black rounded-xl flex items-center justify-center gap-2 transition-all shadow-md text-sm"
          >
            <Save className="w-4 h-4" />
            <span>Register Authoritative Scheme Record</span>
          </button>
        </form>
      </div>
    </div>
  );
}
