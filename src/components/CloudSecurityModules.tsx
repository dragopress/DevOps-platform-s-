import React, { useState } from 'react';
import { 
  Cloud, 
  Server, 
  Cpu, 
  Boxes, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Code2, 
  Copy, 
  Check, 
  Zap, 
  Lock,
  Layers,
  Sparkles
} from 'lucide-react';
import { CloudSecurityFinding } from '../types';
import { sampleCloudFindings } from '../data/mockPlatformData';

export const CloudSecurityModules: React.FC = () => {
  const [findings, setFindings] = useState<CloudSecurityFinding[]>(sampleCloudFindings);
  const [activeProvider, setActiveProvider] = useState<string>('AWS');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const providers = [
    { id: 'AWS', name: 'AWS Security Hub', icon: Cloud, count: 2 },
    { id: 'Azure', name: 'Azure Defender', icon: Server, count: 1 },
    { id: 'GCP', name: 'Google Cloud SCC', icon: Cloud, count: 1 },
    { id: 'Kubernetes', name: 'Kubernetes Hardening', icon: Cpu, count: 1 },
    { id: 'Docker', name: 'Docker CIS Benchmark', icon: Boxes, count: 1 },
    { id: 'Terraform', name: 'Terraform Security', icon: Code2, count: 2 },
    { id: 'Helm', name: 'Helm Security Scan', icon: Layers, count: 1 }
  ];

  const currentFindings = findings.filter(f => f.provider === activeProvider || activeProvider === 'ALL');

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-xl">
            <Cloud className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Multi-Cloud & Container Security Modules</h1>
            <p className="text-xs text-slate-400">
              AWS Security Hub, Azure Defender, GCP SCC, Kubernetes NSA Benchmarks & Docker Hardening
            </p>
          </div>
        </div>
      </div>

      {/* Cloud Provider Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900 border border-slate-800 p-2 rounded-2xl">
        {providers.map((p) => {
          const Icon = p.icon;
          return (
            <button
              key={p.id}
              onClick={() => setActiveProvider(p.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
                activeProvider === p.id 
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{p.name}</span>
            </button>
          );
        })}
      </div>

      {/* Findings List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {currentFindings.map((finding) => (
          <div key={finding.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-lg hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-cyan-400">{finding.checkId}</span>
                <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase ${
                  finding.severity === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                  finding.severity === 'HIGH' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                  'bg-slate-800 text-slate-400'
                }`}>
                  {finding.severity}
                </span>
              </div>

              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center space-x-1 ${
                finding.status === 'PASSED' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              }`}>
                {finding.status === 'PASSED' ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                <span>{finding.status}</span>
              </span>
            </div>

            <h3 className="text-sm font-bold text-white">{finding.checkName}</h3>
            <p className="text-xs text-slate-400 font-mono">Resource: {finding.resource}</p>

            {/* Remediation Code Block */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 relative font-mono text-xs">
              <div className="flex items-center justify-between text-[10px] text-slate-500 pb-1 mb-2 border-b border-slate-800">
                <span className="flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>AI Remediation Fix Code</span>
                </span>
                <button
                  onClick={() => handleCopyCode(finding.id, finding.remediationCode)}
                  className="hover:text-white flex items-center space-x-1 cursor-pointer"
                >
                  {copiedId === finding.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedId === finding.id ? 'Copied' : 'Copy Fix'}</span>
                </button>
              </div>
              <pre className="text-cyan-300 overflow-x-auto whitespace-pre-wrap">{finding.remediationCode}</pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
