// NIMIS Data Persistence, Verification Workflow & Local Storage Sync Engine
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { INITIAL_SCHEMES_DATA, VERIFICATION_STAGES } from '../../shared/surveySchema.js';

const firebaseConfig = {
  apiKey: "AIzaSyBcwhUc9DwERwEnpTZqGwj3BuO0-Y3TWfk",
  authDomain: "irrigation-68558.firebaseapp.com",
  projectId: "irrigation-68558",
  storageBucket: "irrigation-68558.firebasestorage.app",
  messagingSenderId: "690002988302",
  appId: "1:690002988302:web:857b796095d1f4af86db5f",
  measurementId: "G-973M2LPMPL"
};

let app, db;
try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (e) {
  console.warn('Firebase initialized in offline pilot mode:', e.message);
}

const DASHBOARD_KEY = 'nimis_dashboard_schemes_v5';

export function getInitialSchemes() {
  try {
    const stored = localStorage.getItem(DASHBOARD_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.length > 0 ? parsed : INITIAL_SCHEMES_DATA;
    }
  } catch (e) {
    console.error('Error reading stored NIMIS schemes:', e);
  }

  localStorage.setItem(DASHBOARD_KEY, JSON.stringify(INITIAL_SCHEMES_DATA));
  return INITIAL_SCHEMES_DATA;
}

export function generateSchemeId(province = 'ZIM', district = 'GEN', count = 1) {
  const provCode = (province || 'ZIM').replace(/[^A-Za-z]/g, '').slice(0, 3).toUpperCase().padEnd(3, 'X');
  const distCode = (district || 'GEN').replace(/[^A-Za-z]/g, '').slice(0, 3).toUpperCase().padEnd(3, 'X');
  const seq = String(count).padStart(3, '0');
  return `ZIM-${provCode}-${distCode}-${seq}`;
}

export function saveDashboardScheme(scheme) {
  const current = getInitialSchemes();
  const index = current.findIndex(s => s.id === scheme.id);
  let updated;

  if (index >= 0) {
    updated = [...current];
    updated[index] = { ...scheme, updatedAt: new Date().toISOString() };
  } else {
    const newId = scheme.id || generateSchemeId(scheme.province, scheme.district, current.length + 1);
    updated = [{
      ...scheme,
      id: newId,
      verification: scheme.verification || {
        stage: 'Captured',
        verified_by: scheme.officer?.name || 'Field Officer',
        verified_date: new Date().toISOString().slice(0, 10),
        method: 'Web Registry Entry',
        data_source_type: 'Manual Entry',
        completeness_pct: 75,
        audit_log: [
          {
            stage: 'Captured',
            by: scheme.officer?.name || 'Field Officer',
            date: new Date().toISOString().slice(0, 10),
            note: 'Initial scheme registration submitted'
          }
        ]
      },
      updatedAt: new Date().toISOString()
    }, ...current];
  }

  localStorage.setItem(DASHBOARD_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('dashboard_updated'));
  return updated;
}

export function advanceSchemeVerification(schemeId, targetStage, actorLabel, note = '') {
  const current = getInitialSchemes();
  const index = current.findIndex(s => s.id === schemeId);
  if (index < 0) return current;

  const validStage = VERIFICATION_STAGES.find(v => v.id === targetStage);
  if (!validStage) return current;

  const existing = current[index];
  const prevLog = existing.verification?.audit_log || [];
  const today = new Date().toISOString().slice(0, 10);

  const updatedScheme = {
    ...existing,
    verification: {
      ...(existing.verification || {}),
      stage: targetStage,
      verified_by: actorLabel,
      verified_date: today,
      audit_log: [
        ...prevLog,
        {
          stage: targetStage,
          by: actorLabel,
          date: today,
          note: note || `Advanced to ${targetStage} by ${actorLabel}`
        }
      ]
    },
    updatedAt: new Date().toISOString()
  };

  const updated = [...current];
  updated[index] = updatedScheme;
  localStorage.setItem(DASHBOARD_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('dashboard_updated'));
  return updatedScheme;
}

export function resetToSeedData() {
  localStorage.setItem(DASHBOARD_KEY, JSON.stringify(INITIAL_SCHEMES_DATA));
  window.dispatchEvent(new Event('dashboard_updated'));
  return INITIAL_SCHEMES_DATA;
}
