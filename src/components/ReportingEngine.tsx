import React, { useState } from 'react';
import { FileText, Download, Check, Sparkles, ShieldCheck, Printer, FileCode, Database } from 'lucide-react';
import { sampleVulnerabilities } from '../data/mockPlatformData';

export const ReportingEngine: React.FC = () => {
  const [selectedFormat, setSelectedFormat] = useState<'PDF' | 'SARIF' | 'HTML' | 'JSON' | 'CSV'>('PDF');
  const [downloadMsg, setDownloadMsg] = useState<string | null>(null);

  const handleDownload = () => {
    setDownloadMsg(`Generated and exported official DevSecOps ${selectedFormat} report!`);
    setTimeout(() => setDownloadMsg(null), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Enterprise Compliance & Security Reporting</h1>
            <p className="text-xs text-slate-400">
              Executive Summaries • Developer Findings • SARIF v2.1.0 Standard • Audit PDF & Compliance Reports
            </p>
          </div>
        </div>

        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-xl flex items-center space-x-2 transition-all cursor-pointer shadow-md"
        >
          <Download className="w-4 h-4" />
          <span>Generate & Export {selectedFormat} Report</span>
        </button>
      </div>

      {downloadMsg && (
        <div className="p-3 bg-amber-950/80 border border-amber-600/80 text-amber-300 rounded-xl text-xs flex items-center space-x-2 animate-fadeIn">
          <Check className="w-4 h-4 text-amber-400" />
          <span>{downloadMsg}</span>
        </div>
      )}

      {/* Format Selectors */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {(['PDF', 'SARIF', 'HTML', 'JSON', 'CSV'] as const).map((fmt) => (
          <button
            key={fmt}
            onClick={() => setSelectedFormat(fmt)}
            className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
              selectedFormat === fmt
                ? 'bg-amber-950/60 border-amber-500/60 text-amber-200 shadow-md font-bold'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <div className="text-sm font-mono">{fmt}</div>
            <div className="text-[10px] text-slate-400 mt-1">
              {fmt === 'PDF' ? 'Executive PDF' : fmt === 'SARIF' ? 'OASIS Standard' : fmt === 'HTML' ? 'Interactive Web' : fmt === 'JSON' ? 'Raw API Data' : 'Spreadsheet'}
            </div>
          </button>
        ))}
      </div>

      {/* Executive Report Preview Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Executive Summary Preview</h2>
          </div>
          <span className="text-xs font-mono text-slate-400">Generated: {new Date().toLocaleDateString()}</span>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs text-slate-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <div>
              <div className="text-lg font-bold text-white">Platform Security Score: 92/100</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Scanned 14 Repositories • 8 Security Scanners Active</div>
            </div>
            <div className="flex space-x-4">
              <div>
                <div className="text-slate-400 text-[10px] uppercase font-bold">Critical</div>
                <div className="text-base font-bold text-rose-400">3</div>
              </div>
              <div>
                <div className="text-slate-400 text-[10px] uppercase font-bold">High</div>
                <div className="text-base font-bold text-amber-400">5</div>
              </div>
              <div>
                <div className="text-slate-400 text-[10px] uppercase font-bold">MTTR (Avg)</div>
                <div className="text-base font-bold text-cyan-400">1.8 days</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white mb-2">Key Compliance Attestations</h3>
            <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
              <li><strong className="text-slate-200">SOC2 Type II:</strong> Continuous SAST, DAST, and secret scanning verified on all pull requests.</li>
              <li><strong className="text-slate-200">SLSA Level 3:</strong> Container images signed with Cosign cryptographic keys with published SBOM.</li>
              <li><strong className="text-slate-200">ISO 27001:</strong> Centralized vulnerability tracking with automated SLA tickets in Jira.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
