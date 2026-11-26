import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header.jsx';
import WelcomeScreen from './components/WelcomeScreen.jsx';
import StepRenderer from './components/StepRenderer.jsx';
import DraftsModal from './components/DraftsModal.jsx';
import { saveDraft, getDrafts, submitSurvey } from './services/storageService.js';
import { getCurrentLocation } from './services/locationService.js';
import {
  ChevronLeft, ChevronRight, Save, Send, CheckCircle2,
  MapPin, Plus, AlertCircle
} from 'lucide-react';

const STEPS = [
  { title: 'Demographics & GPS' },
  { title: 'Officer Contact' },
  { title: 'Technical & Areas' },
  { title: 'Infrastructure Audit' },
  { title: 'Operation & Maintenance' },
  { title: 'Water & Weather' },
  { title: 'Agronomy & Markets' },
  { title: 'Sustainability & Risks' },
];

const INITIAL_FORM = {
  scheme_name: '',
  site_name: '',
  province: '',
  district: '',
  ward: '',
  photo_scheme: '',
  coordinates: { lat: null, lng: null, alt: null, accuracy: null },
  officer: { name: '', designation: '', phone: '', email: '' },
  technical: {
    design_area_ha: '',
    irrigable_area_ha: '',
    equipped_area_ha: '',
    developed_area_ha: '',
    potential_expansion_ha: '',
    functional_area_ha: '',
    actual_irrigated_area_ha: '',
    current_season: '2026/27 Summer',
    water_source: 'River',
    water_source_name: '',
    beneficiaries_count: '',
    active_farmers_count: '',
    plot_size_ha: '',
    blocking_system: 'Yes',
    commissioning_year: '',
    status: 'Fully functional',
    irrigation_system: 'Gravity-fed sprinkler',
    energy_source: 'Solar',
    sector_type: 'Communal',
    management_model: 'Farmer/ IMC'
  },
  energy: {
    power_status: 'Solar Off-Grid',
    zesa_meter_no: '',
    bill_status: 'Current (Paid)'
  },
  verification: {
    stage: 'Captured',
    data_source_type: 'Field Officer Survey',
    method: 'Mobile Offline Field Capture'
  },
  infrastructure: {
    headworks: 'Good',
    conveyance: 'Good',
    storage: 'Good',
    infield: 'Good',
    perimeter_fence: 'Moderate',
    access_road: 'Good',
    mobile_network: 'Good',
    network_providers: ['Econet']
  },
  om: {
    responsible: 'Farmers',
    has_manual: 'Yes',
    has_fund: 'Yes',
    pays_levy: 'No',
    rehab_count: '1',
    last_rehab_year: '2020',
    rehabilitated_by: 'Government of Zimbabwe'
  },
  water_mgmt: {
    sufficient_year_round: 'Yes',
    has_committee: 'Yes',
    weather_station: 'No',
    instruments: []
  },
  agronomic: {
    crops: [],
    markets: '',
    conducts_market_analysis: 'Yes'
  },
  challenges: []
};

export default function App() {
  const [view, setView]                     = useState('welcome'); // 'welcome' | 'survey'
  const [currentStep, setCurrentStep]       = useState(1);
  const [formData, setFormData]             = useState(INITIAL_FORM);
  const [isOnline, setIsOnline]             = useState(navigator.onLine);
  const [drafts, setDrafts]                 = useState([]);
  const [showDraftsModal, setShowDraftsModal] = useState(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);
  const [lastSubmittedId, setLastSubmittedId]       = useState('');
  const [validationError, setValidationError]       = useState('');
  const stepPillRefs = useRef([]);

  useEffect(() => {
    const el = stepPillRefs.current[currentStep - 1];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [currentStep, view]);

  // ── Network status ──
  useEffect(() => {
    setDrafts(getDrafts());
    const up   = () => setIsOnline(true);
    const down = () => setIsOnline(false);
    window.addEventListener('online',  up);
    window.addEventListener('offline', down);
    return () => { window.removeEventListener('online', up); window.removeEventListener('offline', down); };
  }, []);

  const refreshDrafts = () => setDrafts(getDrafts());

  // ── GPS auto-capture on load ──
  useEffect(() => {
    if (!formData.coordinates.lat) {
      getCurrentLocation()
        .then(loc => setFormData(prev => ({ ...prev, coordinates: loc })))
        .catch(() => {/* silent — user can retry in step 1 UI */});
    }
  }, []);

  const handleSaveDraft = () => {
    saveDraft(formData);
    refreshDrafts();
    setValidationError('✓ Draft saved to device storage.');
    setTimeout(() => setValidationError(''), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.scheme_name.trim()) {
      setValidationError('Please enter a Scheme Name before submitting.');
      setCurrentStep(1);
      return;
    }
    if (!formData.coordinates.lat) {
      setValidationError('GPS coordinates are required. Please capture your location on Step 1.');
      setCurrentStep(1);
      return;
    }
    const saved = submitSurvey(formData);
    setLastSubmittedId(saved.id);
    setIsSubmittedSuccess(true);
    refreshDrafts();
  };

  const handleResetForm = () => {
    setFormData(INITIAL_FORM);
    setCurrentStep(1);
    setIsSubmittedSuccess(false);
    setValidationError('');
    setView('welcome');
  };

  const handleLoadDraft = (draft) => {
    setFormData(draft);
    setShowDraftsModal(false);
    setCurrentStep(1);
    setView('survey');
  };

  const goNext = () => {
    setValidationError('');
    setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
  };

  const goPrev = () => {
    setValidationError('');
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // ─── Render Welcome Screen ───
  if (view === 'welcome' && !isSubmittedSuccess) {
    return (
      <>
        <WelcomeScreen
          onStartSurvey={() => { setView('survey'); setCurrentStep(1); }}
          onOpenDrafts={() => setShowDraftsModal(true)}
          draftsCount={drafts.length}
          isOnline={isOnline}
        />
        {showDraftsModal && (
          <DraftsModal
            drafts={drafts}
            onClose={() => setShowDraftsModal(false)}
            onLoadDraft={handleLoadDraft}
            onRefresh={refreshDrafts}
          />
        )}
      </>
    );
  }

  // ─── Success Screen ───
  if (isSubmittedSuccess) {
    return (
      <div className="min-h-screen bg-[#F6F6F2] flex flex-col items-center justify-center p-6 text-center">
        <div className="agri-card rounded-2xl p-6 max-w-sm w-full space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#EDF4EF] text-[#133A26] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#141A16]">Assessment submitted</h2>
            <p className="text-sm text-[#525E56] mt-1">
              <strong className="text-[#141A16]">{formData.scheme_name}</strong> has been saved at Stage 1 (Captured) and queued for NIMIS sync.
            </p>
          </div>
          {lastSubmittedId && (
            <div className="py-2 px-3 rounded-lg bg-[#FAF9F6] border border-[#E7E5E0] font-mono text-xs font-semibold text-[#133A26]">
              Scheme ID: {lastSubmittedId}
            </div>
          )}
          {formData.coordinates.lat && (
            <div className="flex items-center justify-center gap-1.5 text-xs text-[#525E56] tabular-nums">
              <MapPin className="w-3.5 h-3.5 text-[#133A26]" />
              <span>{formData.coordinates.lat}, {formData.coordinates.lng}</span>
            </div>
          )}
          <div className="flex flex-col gap-2.5 pt-2">
            <button
              onClick={() => { setFormData(INITIAL_FORM); setIsSubmittedSuccess(false); setCurrentStep(1); setView('survey'); }}
              className="w-full py-3 bg-[#133A26] hover:bg-[#0F2F1E] text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New assessment
            </button>
            <button
              onClick={handleResetForm}
              className="w-full py-2.5 bg-white border border-[#E2E0D9] text-[#3F4A43] font-medium rounded-xl text-sm hover:bg-[#FAF9F6] transition-colors"
            >
              Return to Field Hub
            </button>
          </div>
        </div>
      </div>
    );
  }

  const stepInfo = STEPS[currentStep - 1];
  const progress = (currentStep / STEPS.length) * 100;

  // ─── Main Survey Wizard ───
  return (
    <div className="min-h-screen bg-[#F6F6F2] flex flex-col font-sans">
      <Header
        isOnline={isOnline}
        draftsCount={drafts.length}
        onOpenDrafts={() => setShowDraftsModal(true)}
        onGoHome={() => setView('welcome')}
      />

      {/* ── Step Progress Header (Clean White Surface matching DESIGN.md) ── */}
      <div className="bg-white border-b border-[#E7E5E0] px-4 py-3.5">
        <div className="max-w-lg mx-auto space-y-2.5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-[#738077] tabular-nums">
                Step {currentStep} of {STEPS.length}
              </p>
              <h2 className="text-base font-bold text-[#141A16] leading-tight">{stepInfo.title}</h2>
            </div>
            <span className="text-xs font-semibold text-[#133A26] bg-[#EDF4EF] px-2.5 py-1 rounded-md tabular-nums">
              {Math.round(progress)}%
            </span>
          </div>

          <div className="h-1.5 bg-[#ECEAE4] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#133A26] rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-0.5 pr-4 scrollbar-hide">
            {STEPS.map((s, i) => (
              <button
                key={i}
                ref={el => { stepPillRefs.current[i] = el; }}
                type="button"
                onClick={() => { setCurrentStep(i + 1); setValidationError(''); }}
                className={`shrink-0 px-3 py-1.5 rounded-md text-xs font-medium transition-colors border whitespace-nowrap ${
                  i + 1 === currentStep
                    ? 'bg-[#133A26] text-white border-[#133A26]'
                    : i + 1 < currentStep
                    ? 'bg-[#EDF4EF] text-[#133A26] border-[#C8DEC8]'
                    : 'bg-[#FAF9F6] text-[#738077] border-[#E7E5E0]'
                }`}
              >
                {i + 1}. {s.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Form Body ── */}
      <main className="flex-1 max-w-lg w-full mx-auto px-4 py-4 flex flex-col gap-4">
        {validationError && (
          <div className={`flex items-start gap-2.5 p-3 rounded-xl text-xs font-medium border ${
            validationError.startsWith('✓')
              ? 'bg-[#EDF4EF] border-[#C8DEC8] text-[#133A26]'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}>
            {validationError.startsWith('✓')
              ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              : <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            }
            <span>{validationError.replace('✓ ', '')}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
          <div className="agri-card rounded-xl p-4 sm:p-5 flex-1">
            <StepRenderer
              currentStep={currentStep}
              formData={formData}
              setFormData={setFormData}
            />
          </div>

          {/* ── Navigation Footer ── */}
          <div className="sticky bottom-0 z-20 pb-safe">
            <div className="bg-[#F6F6F2] pt-2 pb-3">
              <div className="flex items-center gap-2">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={goPrev}
                    className="p-3 bg-white border border-[#E2E0D9] text-[#3F4A43] rounded-xl hover:bg-[#FAF9F6] transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="px-3.5 py-3 bg-white border border-[#E2E0D9] text-[#3F4A43] rounded-xl hover:bg-[#FAF9F6] transition-colors flex items-center gap-1.5 text-xs font-semibold"
                >
                  <Save className="w-4 h-4 text-[#133A26]" />
                  <span>Save</span>
                </button>

                {currentStep < STEPS.length ? (
                  <button
                    type="button"
                    onClick={goNext}
                    className="flex-1 py-3 px-5 bg-[#133A26] hover:bg-[#0F2F1E] text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>Next: {STEPS[currentStep].title.split(' ')[0]}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex-1 py-3 px-5 bg-[#133A26] hover:bg-[#0F2F1E] text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit assessment</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </main>

      {showDraftsModal && (
        <DraftsModal
          drafts={drafts}
          onClose={() => setShowDraftsModal(false)}
          onLoadDraft={handleLoadDraft}
          onRefresh={refreshDrafts}
        />
      )}
    </div>
  );
}
