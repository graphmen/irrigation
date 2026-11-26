import React from 'react';
import {
  Smartphone, Download, ExternalLink, WifiOff, MapPin, ShieldCheck,
  Layers, CheckCircle2, FileCheck2
} from 'lucide-react';
import { DATA_AS_AT_DATE } from '../../../shared/surveySchema.js';

export default function MobileAppPage() {
  const capabilities = [
    {
      icon: WifiOff,
      title: 'Offline-first capture',
      desc: 'Complete all 8 NIMIS and mWater baseline sections in remote wards without mobile data. Drafts save on-device and sync automatically once connectivity returns.'
    },
    {
      icon: MapPin,
      title: 'Verified GPS coordinates',
      desc: 'Captures latitude, longitude, altitude, and receiver accuracy directly from the device GPS chip for every registered irrigation scheme.'
    },
    {
      icon: ShieldCheck,
      title: 'Authoritative Scheme IDs & workflow',
      desc: 'Generates unique ZIM-PRO-DIS-NNN identifiers and submits records into Stage 1 (Captured) of the 5-stage District → Province → National verification workflow.'
    },
    {
      icon: Layers,
      title: 'Unified area & energy standards',
      desc: 'Records Design, Equipped, Functional, and Actually Irrigated hectares separately alongside ZESA/solar power status and seasonal crop production.'
    },
  ];

  const installSteps = [
    { step: '01', title: 'Download the APK package', desc: 'Tap "Download Android APK" on your Android phone or transfer the file via USB/WhatsApp.' },
    { step: '02', title: 'Allow installation from browser', desc: 'When prompted by Android security settings, enable "Install unknown apps" for your browser or file manager.' },
    { step: '03', title: 'Capture offline & sync', desc: 'Open NIMIS Field Collector, record schemes in the field, and sync directly to the National Registry when online.' },
  ];

  const releases = [
    { version: 'v2.5', date: DATA_AS_AT_DATE, platform: 'Android 8.0+ (APK)', size: '4.1 MB', notes: 'Aligned to NIMIS Concept Note: 4 area measures, ZESA/solar power status, Coat of Arms branding, Stage 1 verification audit trail.' },
    { version: 'v1.0', date: '20 July 2026',  platform: 'Android 8.0+ (APK)', size: '3.9 MB', notes: 'Initial mWater 8-step smallholder irrigation baseline questionnaire with offline drafts and GPS capture.' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-[#E7E5E0]">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-lg bg-[#133A26] text-white flex items-center justify-center shrink-0">
            <Smartphone className="w-4 h-4" />
          </span>
          <div>
            <h2 className="text-2xl font-bold text-[#141A16] leading-tight">Mobile field collector</h2>
            <p className="text-sm text-[#525E56] mt-0.5">
              Android-first offline data collection app for District, Provincial, and Scheme Irrigation Officers
            </p>
          </div>
        </div>
        <div className="text-xs font-medium text-[#738077] shrink-0">Latest release: v2.5 · {DATA_AS_AT_DATE}</div>
      </div>

      {/* Hero Download Card + Clean Phone Preview */}
      <div className="agri-card rounded-xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#133A26] p-2 flex items-center justify-center shrink-0">
              <div className="w-full h-full rounded-md bg-white p-0.5 flex items-center justify-center">
                <img
                  src="/zimbabwe-coat-of-arms.svg"
                  alt="Republic of Zimbabwe Coat of Arms"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#141A16]">NIMIS Field Collector for Android</h3>
              <p className="text-xs text-[#738077] tabular-nums">
                Version 2.5 · Android 8.0+ · Offline-capable · Signed APK
              </p>
            </div>
          </div>

          <p className="text-sm text-[#525E56] leading-relaxed">
            Built for field officers operating in low-connectivity rural districts across Zimbabwe&apos;s 8 agricultural provinces. Capture structured scheme assessments, attach GPS coordinates, save unlimited offline drafts, and synchronise directly into the NIMIS national registry.
          </p>

          {/* Primary & Secondary Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <a
              href="https://github.com/graphmen/irrigation/raw/main/Irrigation_Data_Collector_v1.0.apk"
              download="NIMIS_Field_Collector_v2.5.apk"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#133A26] hover:bg-[#0F2F1E] text-white text-sm font-semibold transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download Android APK</span>
            </a>

            <a
              href="https://github.com/graphmen/irrigation"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-white border border-[#E2E0D9] hover:border-[#133A26] text-[#141A16] text-sm font-medium transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-[#133A26]" />
              <span>GitHub Repository & Releases</span>
            </a>
          </div>

          {/* Compliance Specs Strip */}
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#ECEAE4] text-xs">
            <div>
              <span className="text-[#738077] block">Platform</span>
              <strong className="text-[#141A16] font-semibold">Android 8.0+ / PWA</strong>
            </div>
            <div>
              <span className="text-[#738077] block">Offline storage</span>
              <strong className="text-[#141A16] font-semibold">Unlimited drafts</strong>
            </div>
            <div>
              <span className="text-[#738077] block">Sync target</span>
              <strong className="text-[#141A16] font-semibold">NIMIS Master Registry</strong>
            </div>
          </div>
        </div>

        {/* Right: Clean Architectural Phone Mockup Preview */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-[270px] rounded-[28px] border-[6px] border-[#141A16] bg-[#F6F6F2] overflow-hidden shadow-md">
            {/* Phone Status + App Header */}
            <div className="bg-[#133A26] text-white px-4 py-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-white p-0.5 flex items-center justify-center">
                    <img src="/zimbabwe-coat-of-arms.svg" alt="Coat of Arms" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <div className="text-xs font-bold leading-none">NIMIS</div>
                    <div className="text-[12px] text-white/70 leading-tight">Field Collector</div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-xs text-white/85">
                  <span className="w-2 h-2 rounded-full bg-[#4ADE80]" />
                  Ready
                </span>
              </div>
              <div className="text-xs font-semibold text-white/95">Department of Irrigation</div>
              <div className="text-xs text-white/65 mt-0.5">8-step offline scheme assessment</div>
            </div>

            {/* Phone Body */}
            <div className="p-3.5 space-y-3">
              <div className="bg-white border border-[#E7E5E0] rounded-lg grid grid-cols-3 divide-x divide-[#ECEAE4] text-center py-2">
                <div>
                  <div className="text-xs text-[#738077]">GPS</div>
                  <div className="text-xs font-semibold text-[#141A16] tabular-nums">±4m</div>
                </div>
                <div>
                  <div className="text-xs text-[#738077]">Drafts</div>
                  <div className="text-xs font-semibold text-[#141A16] tabular-nums">2</div>
                </div>
                <div>
                  <div className="text-xs text-[#738077]">Synced</div>
                  <div className="text-xs font-semibold text-[#2D7A4D] tabular-nums">51</div>
                </div>
              </div>

              <div className="bg-[#133A26] text-white rounded-lg px-3 py-2.5 text-xs font-semibold flex items-center justify-between">
                <span>Start new assessment</span>
                <span>→</span>
              </div>

              <div className="bg-white border border-[#E7E5E0] rounded-lg p-3 space-y-1.5">
                <div className="text-xs font-semibold text-[#141A16]">Capture checklist</div>
                {['GPS & Ward boundary', '4 area measures (ha)', 'Assets, O&M & ZESA', 'Seasonal crop yields'].map(row => (
                  <div key={row} className="flex items-center gap-2 text-xs text-[#525E56]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2D7A4D] shrink-0" />
                    <span>{row}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Key Capabilities */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {capabilities.map(item => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="agri-card rounded-xl p-5 space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#F3F4F0] text-[#133A26] flex items-center justify-center">
                <Icon className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-[#141A16]">{item.title}</h3>
              <p className="text-xs text-[#525E56] leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>

      {/* 3-Step Installation Guide */}
      <div className="agri-card rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-semibold text-[#141A16]">Android installation guide</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {installSteps.map(s => (
            <div key={s.step} className="p-4 rounded-lg bg-[#FAF9F6] border border-[#E7E5E0] space-y-1.5">
              <span className="text-xs font-semibold text-[#133A26] tabular-nums">Step {s.step}</span>
              <h4 className="text-sm font-semibold text-[#141A16]">{s.title}</h4>
              <p className="text-xs text-[#525E56] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Release History Table */}
      <div className="agri-card rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#ECEAE4] flex items-center gap-2">
          <FileCheck2 className="w-4 h-4 text-[#133A26]" />
          <h3 className="text-sm font-semibold text-[#141A16]">Release history</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#FAF9F6] text-xs font-medium text-[#525E56] border-b border-[#ECEAE4]">
              <tr>
                <th className="px-5 py-3">Version</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Platform</th>
                <th className="px-4 py-3">Release notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EFEA]">
              {releases.map(r => (
                <tr key={r.version} className="hover:bg-[#FAF9F6]">
                  <td className="px-5 py-3 font-semibold text-[#141A16] tabular-nums">{r.version}</td>
                  <td className="px-4 py-3 text-[#525E56] whitespace-nowrap">{r.date}</td>
                  <td className="px-4 py-3 text-[#525E56] whitespace-nowrap">{r.platform}</td>
                  <td className="px-4 py-3 text-xs text-[#525E56]">{r.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
