import React from 'react';
import {
  PROVINCES, WATER_SOURCES, SCHEME_STATUSES, IRRIGATION_SYSTEMS,
  ENERGY_SOURCES, POWER_STATUSES, SECTOR_TYPES, INFRASTRUCTURE_RATINGS,
  MANAGEMENT_MODELS, SUSTAINABILITY_CHALLENGES
} from '../../../shared/surveySchema.js';
import {
  MapPin, User, Phone, Mail, Droplets, Zap, Sprout,
  AlertTriangle, ShieldCheck, Wrench, CloudSun, ShoppingBag,
  Hash, Calendar, Layers
} from 'lucide-react';
import GPSCapture from './GPSCapture.jsx';

// ─── Reusable field components ───────────────────────────────────────────────
const Label = ({ children, required }) => (
  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">
    {children}{required && <span className="text-rose-500 ml-0.5">*</span>}
  </label>
);

const Input = ({ className = '', ...props }) => (
  <input
    className={`w-full agri-input px-3.5 py-3 rounded-xl text-sm font-semibold placeholder-slate-400 ${className}`}
    {...props}
  />
);

const Select = ({ children, className = '', ...props }) => (
  <select
    className={`w-full agri-input px-3.5 py-3 rounded-xl text-sm font-semibold ${className}`}
    {...props}
  >
    {children}
  </select>
);

const ToggleGroup = ({ options, value, onChange, colors }) => (
  <div className="flex gap-2">
    {options.map(opt => {
      const active = value === opt;
      const color = colors?.[opt] || (active ? 'bg-emerald-800 text-white border-emerald-900' : 'bg-white text-slate-600 border-slate-200');
      return (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`flex-1 py-3 rounded-xl text-xs font-black border transition-all ${
            active
              ? colors?.[opt] || 'bg-emerald-800 text-white border-emerald-900 shadow-sm'
              : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
          }`}
        >
          {opt === 'Yes' ? '✓ Yes' : opt === 'No' ? '✕ No' : opt}
        </button>
      );
    })}
  </div>
);

const SectionHeader = ({ icon: Icon, title, subtitle, iconClass = 'text-emerald-700' }) => (
  <div className="flex items-start gap-3 mb-4 pb-3 border-b border-slate-100">
    <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
      <Icon className={`w-4 h-4 ${iconClass}`} />
    </div>
    <div>
      <h3 className="text-sm font-black text-slate-900 leading-tight">{title}</h3>
      {subtitle && <p className="text-[11px] text-slate-500 font-semibold mt-0.5">{subtitle}</p>}
    </div>
  </div>
);

// ─── Step Components ──────────────────────────────────────────────────────────
export default function StepRenderer({ currentStep, formData, setFormData }) {
  const updateNested = (category, field, value) =>
    setFormData(prev => ({ ...prev, [category]: { ...prev[category], [field]: value } }));

  const handleCropToggle = (crop) => {
    const current = formData.agronomic?.crops || [];
    updateNested('agronomic', 'crops', current.includes(crop) ? current.filter(c => c !== crop) : [...current, crop]);
  };

  const handleChallengeToggle = (ch) => {
    const current = formData.challenges || [];
    setFormData(prev => ({
      ...prev,
      challenges: current.includes(ch) ? current.filter(c => c !== ch) : [...current, ch]
    }));
  };

  switch (currentStep) {

    // ── STEP 1: Demographics & GPS Location ──────────────────────────────────
    case 1:
      return (
        <div className="space-y-4">
          <SectionHeader icon={MapPin} title="Demographics & Geographic Location" subtitle="Scheme identification and GPS field coordinates" />

          <div>
            <Label required>Name of Irrigation Scheme</Label>
            <Input
              type="text"
              placeholder="e.g. Nyanyadzi Irrigation Scheme"
              value={formData.scheme_name}
              onChange={e => setFormData(prev => ({ ...prev, scheme_name: e.target.value }))}
            />
          </div>

          <div>
            <Label>Site / Block Name</Label>
            <Input
              type="text"
              placeholder="e.g. Main Block A"
              value={formData.site_name}
              onChange={e => setFormData(prev => ({ ...prev, site_name: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label required>Province</Label>
              <Select
                value={formData.province}
                onChange={e => setFormData(prev => ({ ...prev, province: e.target.value }))}
              >
                <option value="">Select Province</option>
                {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
              </Select>
            </div>
            <div>
              <Label required>District</Label>
              <Input
                type="text"
                placeholder="District name"
                value={formData.district}
                onChange={e => setFormData(prev => ({ ...prev, district: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label>Ward Name / Number</Label>
            <Input
              type="text"
              placeholder="Ward 8"
              value={formData.ward}
              onChange={e => setFormData(prev => ({ ...prev, ward: e.target.value }))}
            />
          </div>

          {/* Real GPS capture */}
          <div>
            <Label required>GPS Field Coordinates</Label>
            <GPSCapture
              coordinates={formData.coordinates}
              onChange={loc => setFormData(prev => ({ ...prev, coordinates: loc }))}
            />
          </div>
        </div>
      );

    // ── STEP 2: Officer Contact ───────────────────────────────────────────────
    case 2:
      return (
        <div className="space-y-4">
          <SectionHeader icon={User} title="Officer Contact & Respondent Details" subtitle="Government / extension officer filling out survey" />

          <div>
            <Label required>Officer Full Name</Label>
            <Input
              type="text"
              placeholder="e.g. Tendai Mutasa"
              value={formData.officer.name}
              onChange={e => updateNested('officer', 'name', e.target.value)}
            />
          </div>

          <div>
            <Label>Designation / Role</Label>
            <Input
              type="text"
              placeholder="District Irrigation Engineer"
              value={formData.officer.designation}
              onChange={e => updateNested('officer', 'designation', e.target.value)}
            />
          </div>

          <div>
            <Label>Phone Number</Label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <Input
                type="tel"
                placeholder="+263 77 123 4567"
                className="pl-10"
                value={formData.officer.phone}
                onChange={e => updateNested('officer', 'phone', e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label>Email Address</Label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <Input
                type="email"
                placeholder="officer@gov.zw"
                className="pl-10"
                value={formData.officer.email}
                onChange={e => updateNested('officer', 'email', e.target.value)}
              />
            </div>
          </div>
        </div>
      );

    // ── STEP 3: Technical Specs ───────────────────────────────────────────────
    case 3:
      return (
        <div className="space-y-4">
          <SectionHeader icon={Droplets} title="Technical Characteristics & Water Source" subtitle="Irrigation system specifications and capacity" />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Design Area (ha)</Label>
              <Input
                type="number" placeholder="435"
                value={formData.technical.design_area_ha}
                onChange={e => updateNested('technical', 'design_area_ha', e.target.value)}
              />
            </div>
            <div>
              <Label>Equipped Area (ha)</Label>
              <Input
                type="number" placeholder="412"
                value={formData.technical.equipped_area_ha}
                onChange={e => updateNested('technical', 'equipped_area_ha', e.target.value)}
              />
            </div>
            <div>
              <Label>Functional Area (ha)</Label>
              <Input
                type="number" placeholder="290"
                value={formData.technical.functional_area_ha}
                onChange={e => updateNested('technical', 'functional_area_ha', e.target.value)}
              />
            </div>
            <div>
              <Label>Actually Irrigated (ha)</Label>
              <Input
                type="number" placeholder="268"
                value={formData.technical.actual_irrigated_area_ha}
                onChange={e => updateNested('technical', 'actual_irrigated_area_ha', e.target.value)}
              />
            </div>
            <div>
              <Label>Beneficiaries Count</Label>
              <Input
                type="number" placeholder="245"
                value={formData.technical.beneficiaries_count}
                onChange={e => updateNested('technical', 'beneficiaries_count', e.target.value)}
              />
            </div>
            <div>
              <Label>Year Commissioned</Label>
              <Input
                type="number" placeholder="2015"
                value={formData.technical.commissioning_year}
                onChange={e => updateNested('technical', 'commissioning_year', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Scheme Category</Label>
              <Select
                value={formData.technical.sector_type}
                onChange={e => updateNested('technical', 'sector_type', e.target.value)}
              >
                {SECTOR_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
              </Select>
            </div>
            <div>
              <Label>Electricity / Power Status</Label>
              <Select
                value={formData.energy?.power_status || 'Solar Off-Grid'}
                onChange={e => updateNested('energy', 'power_status', e.target.value)}
              >
                {POWER_STATUSES.map(p => <option key={p} value={p}>{p}</option>)}
              </Select>
            </div>
          </div>

          <div>
            <Label>Primary Water Source</Label>
            <div className="grid grid-cols-2 gap-2">
              {WATER_SOURCES.map(src => (
                <button
                  key={src} type="button"
                  onClick={() => updateNested('technical', 'water_source', src)}
                  className={`py-2.5 px-3 rounded-lg text-xs font-medium border transition-colors text-left ${
                    formData.technical.water_source === src
                      ? 'bg-[#133A26] text-white border-[#133A26]'
                      : 'bg-white text-[#3F4A43] border-[#E2E0D9] hover:border-[#133A26]'
                  }`}
                >
                  {src}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label>Irrigation System Type</Label>
            <Select
              value={formData.technical.irrigation_system}
              onChange={e => updateNested('technical', 'irrigation_system', e.target.value)}
            >
              {IRRIGATION_SYSTEMS.map(s => <option key={s} value={s}>{s}</option>)}
            </Select>
          </div>

          <div>
            <Label>Current Functionality Status</Label>
            <div className="grid grid-cols-1 gap-2">
              {[
                { name: 'Fully functional',     dot: '#2D7A4D' },
                { name: 'Partially functional', dot: '#C88A2E' },
                { name: 'Under Construction',   dot: '#2B6CB0' },
                { name: 'Under rehabilitation', dot: '#2B6CB0' },
                { name: 'Non-functional',       dot: '#C53030' },
              ].map(({ name: st, dot }) => {
                const active = formData.technical.status === st;
                return (
                  <button
                    key={st} type="button"
                    onClick={() => updateNested('technical', 'status', st)}
                    className={`w-full py-2.5 px-3.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-2.5 ${
                      active
                        ? 'bg-[#133A26] text-white border-[#133A26]'
                        : 'bg-white text-[#3F4A43] border-[#E2E0D9] hover:border-[#133A26]'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: active ? '#FFFFFF' : dot }} />
                    <span>{st}</span>
                    {active && <span className="ml-auto text-xs opacity-75">Selected</span>}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <Label>Energy Source</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ENERGY_SOURCES.map(src => (
                <button
                  key={src} type="button"
                  onClick={() => updateNested('technical', 'energy_source', src)}
                  className={`py-2.5 px-3 rounded-lg text-xs font-medium border transition-colors text-center ${
                    formData.technical.energy_source === src
                      ? 'bg-[#133A26] text-white border-[#133A26]'
                      : 'bg-white text-[#3F4A43] border-[#E2E0D9] hover:border-[#133A26]'
                  }`}
                >
                  {src}
                </button>
              ))}
            </div>
          </div>
        </div>
      );

    // ── STEP 4: Infrastructure ────────────────────────────────────────────────
    case 4:
      return (
        <div className="space-y-4">
          <SectionHeader icon={ShieldCheck} title="Infrastructure Health Condition" subtitle="Rate the physical status of scheme assets" iconClass="text-[#133A26]" />

          {[
            { id: 'headworks',       label: 'Headworks (Dam / Intake)' },
            { id: 'conveyance',      label: 'Main Conveyance Line / Canal' },
            { id: 'storage',         label: 'Night Storage Dam (NSD)' },
            { id: 'infield',         label: 'Infield Infrastructure (Hydrants/Pipes)' },
            { id: 'perimeter_fence', label: 'Perimeter Security Fence' },
            { id: 'access_road',     label: 'Access Road Condition' },
          ].map(item => (
            <div key={item.id} className="p-3.5 bg-[#FAF9F6] rounded-xl border border-[#E7E5E0]">
              <div className="text-xs font-semibold text-[#141A16] mb-2.5">{item.label}</div>
              <div className="grid grid-cols-3 gap-2">
                {INFRASTRUCTURE_RATINGS.map(rating => {
                  const active = formData.infrastructure[item.id] === rating;
                  const dot = rating === 'Good' ? '#2D7A4D' : rating === 'Moderate' ? '#C88A2E' : '#C53030';
                  return (
                    <button
                      key={rating} type="button"
                      onClick={() => updateNested('infrastructure', item.id, rating)}
                      className={`py-2 px-2 rounded-lg text-xs font-medium border transition-colors flex items-center justify-center gap-1.5 ${
                        active
                          ? 'bg-[#133A26] text-white border-[#133A26]'
                          : 'bg-white text-[#3F4A43] border-[#E2E0D9] hover:border-[#133A26]'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ background: active ? '#FFFFFF' : dot }} />
                      <span>{rating}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      );

    // ── STEP 5: O&M Management ────────────────────────────────────────────────
    case 5:
      return (
        <div className="space-y-4">
          <SectionHeader icon={Wrench} title="Operation & Maintenance Management" subtitle="Institutional governance and maintenance practices" iconClass="text-[#133A26]" />

          <div>
            <Label>Management Model Responsible</Label>
            <div className="grid grid-cols-2 gap-2">
              {MANAGEMENT_MODELS.map(m => (
                <button
                  key={m} type="button"
                  onClick={() => updateNested('om', 'responsible', m)}
                  className={`p-3 rounded-lg text-xs font-medium border transition-colors text-left ${
                    formData.om.responsible === m
                      ? 'bg-[#133A26] text-white border-[#133A26]'
                      : 'bg-white text-[#3F4A43] border-[#E2E0D9]'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {[
              { field: 'has_manual', label: 'O&M Manual Available?' },
              { field: 'has_fund',   label: 'Dedicated O&M Fund Established?' },
              { field: 'pays_levy',  label: 'Farmers Pay Maintenance Levy?' },
            ].map(({ field, label }) => (
              <div key={field} className="p-3.5 bg-[#FAF9F6] rounded-xl border border-[#E7E5E0]">
                <Label>{label}</Label>
                <ToggleGroup
                  options={['Yes', 'No']}
                  value={formData.om[field]}
                  onChange={v => updateNested('om', field, v)}
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Last Rehabilitation Year</Label>
              <Input
                type="number" placeholder="2020"
                value={formData.om.last_rehab_year}
                onChange={e => updateNested('om', 'last_rehab_year', e.target.value)}
              />
            </div>
            <div>
              <Label>Rehabilitated By</Label>
              <Input
                type="text" placeholder="e.g. GoZ / NGO"
                value={formData.om.rehabilitated_by}
                onChange={e => updateNested('om', 'rehabilitated_by', e.target.value)}
              />
            </div>
          </div>
        </div>
      );

    // ── STEP 6: Water & Weather ───────────────────────────────────────────────
    case 6:
      return (
        <div className="space-y-4">
          <SectionHeader icon={CloudSun} title="Water Reliability & Weather Instruments" subtitle="Water supply security and climate monitoring" iconClass="text-[#133A26]" />

          {[
            { field: 'sufficient_year_round', label: 'Water Sufficient Year-Round?' },
            { field: 'has_committee',         label: 'Irrigation Management Committee (IMC)?' },
            { field: 'weather_station',       label: 'On-Site Weather Station?' },
            { field: 'water_saving',          label: 'Water Saving Practices in Use?' },
            { field: 'drainage',              label: 'Drainage System Present?' },
            { field: 'uniform_fittings',      label: 'Uniform Fittings Across Plots?' },
          ].map(({ field, label }) => (
            <div key={field} className="p-3.5 bg-[#FAF9F6] rounded-xl border border-[#E7E5E0]">
              <Label>{label}</Label>
              <ToggleGroup
                options={['Yes', 'No']}
                value={formData.water_mgmt?.[field] || 'No'}
                onChange={v => updateNested('water_mgmt', field, v)}
              />
            </div>
          ))}
        </div>
      );

    // ── STEP 7: Agronomic & Markets ───────────────────────────────────────────
    case 7:
      return (
        <div className="space-y-4">
          <SectionHeader icon={ShoppingBag} title="Agronomic Production & Crop Outlets" subtitle="Crops grown under irrigation and market destinations" iconClass="text-[#133A26]" />

          <div>
            <Label>Main Crops Cultivated (select all)</Label>
            <div className="grid grid-cols-2 gap-2">
              {[
                'Grain maize', 'Wheat', 'Sugarcane', 'Soyabeans',
                'Tobacco', 'Citrus / Oranges', 'Potatoes', 'Tomatoes',
                'Onions', 'Cabbage', 'Sugar beans', 'Butternuts',
                'Green mealies', 'Paprika / Chilly'
              ].map(crop => {
                const isSelected = (formData.agronomic?.crops || []).includes(crop);
                return (
                  <button
                    key={crop} type="button"
                    onClick={() => handleCropToggle(crop)}
                    className={`p-2.5 rounded-lg text-xs font-medium border transition-colors flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-[#133A26] text-white border-[#133A26]'
                        : 'bg-white text-[#3F4A43] border-[#E2E0D9] hover:border-[#133A26]'
                    }`}
                  >
                    <span className="truncate">{crop}</span>
                    {isSelected && <span className="text-xs font-semibold">✓</span>}
                  </button>
                );
              })}
            </div>
            {(formData.agronomic?.crops || []).length > 0 && (
              <p className="text-xs text-[#133A26] font-medium mt-2">
                {(formData.agronomic?.crops || []).length} crop(s) selected
              </p>
            )}
          </div>

          <div>
            <Label>Primary Market Destination</Label>
            <Input
              type="text" placeholder="e.g. Local Farmers Market & GMB"
              value={formData.agronomic?.markets || ''}
              onChange={e => updateNested('agronomic', 'markets', e.target.value)}
            />
          </div>

          <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-[#E7E5E0]">
            <Label>Conducts Market Analysis Before Planting?</Label>
            <ToggleGroup
              options={['Yes', 'No']}
              value={formData.agronomic?.conducts_market_analysis || 'No'}
              onChange={v => updateNested('agronomic', 'conducts_market_analysis', v)}
            />
          </div>
        </div>
      );

    // ── STEP 8: Sustainability Challenges ─────────────────────────────────────
    case 8:
    default:
      return (
        <div className="space-y-4">
          <SectionHeader icon={AlertTriangle} title="Sustainability & Operational Risk Factors" subtitle="Select all challenges currently facing this scheme" iconClass="text-rose-600" />

          <div className="space-y-2">
            {SUSTAINABILITY_CHALLENGES.map(ch => {
              const isSelected = (formData.challenges || []).includes(ch);
              return (
                <button
                  key={ch} type="button"
                  onClick={() => handleChallengeToggle(ch)}
                  className={`w-full p-3.5 rounded-2xl text-xs font-bold text-left border transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'bg-rose-800 text-white border-rose-900 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-rose-300'
                  }`}
                >
                  <span className={`shrink-0 w-5 h-5 rounded-lg mt-0.5 flex items-center justify-center font-black text-[10px] border ${
                    isSelected ? 'bg-white/20 text-white border-white/30' : 'border-slate-200 bg-slate-50'
                  }`}>
                    {isSelected ? '✓' : ''}
                  </span>
                  <span className="flex-1 leading-relaxed">{ch}</span>
                </button>
              );
            })}
          </div>

          {(formData.challenges || []).length > 0 && (
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs font-bold text-amber-900">
              ⚠ {(formData.challenges || []).length} risk factor(s) identified — will be recorded in the assessment report.
            </div>
          )}
        </div>
      );
  }
}
