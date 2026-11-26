import React from 'react';
import { X, Trash2, Edit3, Send, Clock, FileText, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitSurvey, deleteDraft } from '../services/storageService.js';

export default function DraftsModal({ drafts, onClose, onLoadDraft, onRefresh }) {

  const handleDirectSubmit = (draft) => {
    if (!draft.scheme_name) {
      alert('This draft has no scheme name and cannot be submitted.');
      return;
    }
    submitSurvey(draft);
    onRefresh();
  };

  const handleDelete = (id) => {
    if (confirm('Delete this draft permanently?')) {
      deleteDraft(id);
      onRefresh();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-end justify-center">
      <div className="w-full max-w-md bg-white rounded-t-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">

        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-slate-200" />
        </div>

        {/* Header */}
        <div className="px-5 py-3 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#F3F4F0] border border-[#E7E5E0] flex items-center justify-center">
              <Clock className="w-4 h-4 text-[#133A26]" />
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-900">Offline Drafts</h2>
              <p className="text-[10px] font-bold text-slate-500">{drafts.length} saved survey{drafts.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Draft list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {drafts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-3">
                <CheckCircle2 className="w-7 h-7 text-emerald-600" />
              </div>
              <p className="text-sm font-black text-slate-700">No saved drafts</p>
              <p className="text-xs font-semibold text-slate-400 mt-1">All surveys have been synced!</p>
            </div>
          ) : (
            drafts.map(draft => (
              <div
                key={draft.id}
                className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden"
              >
                {/* Draft info */}
                <div className="px-4 py-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                        <FileText className="w-4 h-4 text-emerald-800" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-black text-slate-900 truncate">
                          {draft.scheme_name || 'Unnamed Draft'}
                        </h4>
                        <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                          {draft.province && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500">
                              <MapPin className="w-2.5 h-2.5" />{draft.province}
                            </span>
                          )}
                          {draft.coordinates?.lat && (
                            <span className="text-xs font-mono text-[#133A26]">
                              GPS: {draft.coordinates.lat?.toFixed(4)}, {draft.coordinates.lng?.toFixed(4)}
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                          Saved {new Date(draft.updatedAt).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="px-4 pb-3 flex items-center gap-2">
                  <button
                    onClick={() => onLoadDraft(draft)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-emerald-800 text-white text-xs font-black hover:bg-emerald-700 transition-all shadow-sm"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Continue Editing
                  </button>
                  <button
                    onClick={() => handleDirectSubmit(draft)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-sky-700 text-white text-xs font-black hover:bg-sky-600 transition-all shadow-sm"
                    title="Submit directly"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(draft.id)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-rose-100 text-rose-700 border border-rose-200 text-xs font-black hover:bg-rose-200 transition-all"
                    title="Delete draft"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-slate-100 bg-slate-50">
          <p className="text-[10px] font-bold text-slate-400 text-center">
            Drafts are stored on-device and synced to the dashboard when submitted.
          </p>
        </div>
      </div>
    </div>
  );
}
