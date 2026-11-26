// Storage & Local Sync Service for NIMIS Offline-First Mobile Collector

const DRAFTS_KEY = 'irrigation_survey_drafts';
const COMPLETED_KEY = 'irrigation_survey_completed';

function makeNimisId(province = 'ZIM', district = 'GEN') {
  const p = (province || 'ZIM').replace(/[^A-Za-z]/g, '').slice(0, 3).toUpperCase().padEnd(3, 'X');
  const d = (district || 'GEN').replace(/[^A-Za-z]/g, '').slice(0, 3).toUpperCase().padEnd(3, 'X');
  const seq = String(Math.floor(100 + Math.random() * 899));
  return `ZIM-${p}-${d}-${seq}`;
}

export const getDrafts = () => {
  try {
    const data = localStorage.getItem(DRAFTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error reading drafts:', e);
    return [];
  }
};

export const saveDraft = (surveyData) => {
  const drafts = getDrafts();
  const index = drafts.findIndex(d => d.id === surveyData.id);

  const draftToSave = {
    ...surveyData,
    id: surveyData.id || `DRAFT-${Date.now()}`,
    updatedAt: new Date().toISOString(),
    status: 'draft'
  };

  if (index >= 0) {
    drafts[index] = draftToSave;
  } else {
    drafts.unshift(draftToSave);
  }

  localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
  return draftToSave;
};

export const deleteDraft = (id) => {
  const drafts = getDrafts().filter(d => d.id !== id);
  localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
  return drafts;
};

export const getCompletedSurveys = () => {
  try {
    const data = localStorage.getItem(COMPLETED_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error reading completed surveys:', e);
    return [];
  }
};

export const submitSurvey = (surveyData) => {
  const completed = getCompletedSurveys();
  const today = new Date().toISOString().slice(0, 10);
  const schemeId = surveyData.id?.startsWith('ZIM-')
    ? surveyData.id
    : makeNimisId(surveyData.province, surveyData.district);

  const submission = {
    ...surveyData,
    id: schemeId,
    submittedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'submitted',
    verification: {
      stage: 'Captured',
      verified_by: surveyData.officer?.name || 'Field Officer',
      verified_date: today,
      method: 'NIMIS Mobile Offline Capture',
      data_source_type: 'Field Officer Survey',
      completeness_pct: 90,
      audit_log: [
        {
          stage: 'Captured',
          by: surveyData.officer?.name || 'Field Officer',
          date: today,
          note: 'Submitted via NIMIS Offline Field Collector with GPS coordinates'
        }
      ]
    }
  };

  completed.unshift(submission);
  localStorage.setItem(COMPLETED_KEY, JSON.stringify(completed));

  if (surveyData.id) {
    deleteDraft(surveyData.id);
  }

  window.dispatchEvent(new Event('survey_submitted'));
  return submission;
};
