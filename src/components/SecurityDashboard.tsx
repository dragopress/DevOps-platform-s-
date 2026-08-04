import React from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Lock, 
  CheckCircle2, 
  Activity, 
  TrendingUp, 
  Database, 
  Cpu, 
  Server, 
  FileText, 
  Sparkles, 
  ArrowUpRight,
  ExternalLink,
  Zap,
  Globe,
  Layers,
  Award
} from 'lucide-react';
import { ActiveTab } from '../types';
import { sampleVulnerabilities } from '../data/mockPlatformData';

interface SecurityDashboardProps {
  onNavigateTab: (tab: ActiveTab) => void;
}

export const SecurityDashboard: React.FC<SecurityDashboardProps> = ({ onNavigateTab }) => {
  const openVulns = sampleVulnerabilities.filter(v => v.status !== 'Resolved');
  const criticalCount = openVulns.filter(v => v.severity === 'CRITICAL').length;
  const highCount = openVulns.filter(v => v.severity === 'HIGH').length;

  const complianceFrameworks = [
    { name: "SOC 2 Type II", status: "Compliant", score: "98%", badge: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
    { name: "ISO 27001:2022", status: "Compliant", score: "100%", badge: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
    { name: "PCI-DSS v4.0", status: "Compliant", score: "96%", badge: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
    { name: "HIPAA Security", status: "Compliant", score: "99%", badge: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
    { name: "NIST SP 800-53", status: "In Audit", score: "92%", badge: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
    { name: "FedRAMP High", status: "In Audit", score: "89%", badge: "bg-amber-500/20 text-amber-400 border-amber-500/30" }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner & AI Security Posture Summary */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-cyan-500/10 blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-blue-600/30 border border-blue-500/40 rounded-xl text-blue-400">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  Enterprise Security Posture & Dashboard
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                    GRADE A+
                  </span>
                </h1>
                <p className="text-xs text-slate-400">
                  Continuous AI-Driven Pipeline Scanning, Vulnerability Management & Compliance Enforcement
                </p>
              </div>
            </div>

            {/* AI Security Posture Executive Summary Card */}
            <div className="mt-4 p-3 bg-slate-950/80 border border-blue-900/40 rounded-xl text-xs text-slate-300 flex items-start space-x-3">
              <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-cyan-300">AI Security Briefing: </span>
                Overall security posture is excellent at <span className="text-emerald-400 font-bold">88/100</span>. Secret scanning (Gitleaks) reports zero hardcoded secrets. 2 critical CVEs (XZ backdoor & libwebp) are flagged in Trivy/Semgrep with patches pending execution.
              </div>
            </div>
          </div>

          {/* Security Score Gauge Circle */}
          <div className="flex items-center space-x-6 bg-slate-950/60 p-4 rounded-xl border border-slate-800 shrink-0">
            <div className="text-center">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border-4 border-slate-800 border-t-emerald-400 border-r-cyan-400 border-b-blue-500 flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold text-white tracking-tight">88</span>
                  <span className="text-[10px] text-slate-400">/ 100</span>
                </div>
              </div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mt-1">SECURITY SCORE</span>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">Critical Vulns:</span>
                <span className="text-rose-400 font-bold">{criticalCount}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">High Vulns:</span>
                <span className="text-amber-400 font-bold">{highCount}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">Secret Leaks:</span>
                <span className="text-emerald-400 font-bold">0</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">IaC Compliance:</span>
                <span className="text-cyan-400 font-bold">100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Core Security Pillar Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Card 1: Dependency Health (SCA) */}
        <div 
          onClick={() => onNavigateTab('vulnerability-mgmt')}
          className="bg-slate-900 border border-slate-800 hover:border-blue-500/50 p-5 rounded-2xl transition-all cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
                <Database className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-white uppercase tracking-wider">Dependency Health (SCA)</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
          </div>

          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-black text-white">98.2%</span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 1,240 Libraries Clean
            </span>
          </div>

          <p className="text-xs text-slate-400 mt-1">Scanned by Trivy & Dependabot. 1 package update required.</p>
        </div>

        {/* Card 2: Secret Leaks (Gitleaks) */}
        <div 
          onClick={() => onNavigateTab('cicd')}
          className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 p-5 rounded-2xl transition-all cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
                <Lock className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-white uppercase tracking-wider">Secret Scanning (Gitleaks)</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
          </div>

          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-black text-emerald-400">0 Leaks</span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Clean Git History
            </span>
          </div>

          <p className="text-xs text-slate-400 mt-1">Pre-commit hooks & PR blocking active across all repos.</p>
        </div>

        {/* Card 3: Container Security (Trivy) */}
        <div 
          onClick={() => onNavigateTab('supply-chain')}
          className="bg-slate-900 border border-slate-800 hover:border-purple-500/50 p-5 rounded-2xl transition-all cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-white uppercase tracking-wider">Container & Cosign Signing</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" />
          </div>

          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-black text-white">SLSA Lv.3</span>
            <span className="text-xs text-purple-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Cosign Verified
            </span>
          </div>

          <p className="text-xs text-slate-400 mt-1">100% OCI container images cryptographically signed.</p>
        </div>

        {/* Card 4: Infrastructure Security (Checkov) */}
        <div 
          onClick={() => onNavigateTab('cloud-security')}
          className="bg-slate-900 border border-slate-800 hover:border-cyan-500/50 p-5 rounded-2xl transition-all cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg">
                <Server className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-white uppercase tracking-wider">Cloud & IaC Security</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
          </div>

          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-black text-cyan-400">7 / 7 Passed</span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Checkov Clean
            </span>
          </div>

          <p className="text-xs text-slate-400 mt-1">AWS S3, EKS, MSK, VPC Terraform modules verified.</p>
        </div>

        {/* Card 5: Policy as Code (OPA / Kyverno) */}
        <div 
          onClick={() => onNavigateTab('policy-as-code')}
          className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 p-5 rounded-2xl transition-all cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-white uppercase tracking-wider">Policy as Code Engine</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
          </div>

          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-black text-white">3 Policies</span>
            <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> Enforcing
            </span>
          </div>

          <p className="text-xs text-slate-400 mt-1">OPA / Rego & Kyverno admission controllers active.</p>
        </div>

        {/* Card 6: Observability & SIEM */}
        <div 
          onClick={() => onNavigateTab('observability-siem')}
          className="bg-slate-900 border border-slate-800 hover:border-rose-500/50 p-5 rounded-2xl transition-all cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-rose-500/20 text-rose-400 rounded-lg">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-white uppercase tracking-wider">Observability & SIEM</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-rose-400 transition-colors" />
          </div>

          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-black text-white">Prometheus</span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Splunk Sync
            </span>
          </div>

          <p className="text-xs text-slate-400 mt-1">Real-time alerts connected to Slack, PagerDuty, and Splunk.</p>
        </div>
      </div>

      {/* Middle Section: Compliance Status Grid + Historical Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Compliance Frameworks Matrix */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-cyan-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Compliance Framework Matrix</h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">Continuous Audit</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {complianceFrameworks.map((framework, idx) => (
              <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">{framework.name}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Control Coverage: <span className="text-white font-bold">{framework.score}</span></div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${framework.badge}`}>
                  {framework.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Historical 30-Day Risk Trend Chart */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">30-Day Risk & Vulnerability Burndown</h2>
            </div>
            <span className="text-xs text-emerald-400 font-bold">↓ 42% Risk Reduction</span>
          </div>

          {/* Bar Chart Representation */}
          <div className="h-44 w-full bg-slate-950 p-3 rounded-xl border border-slate-800/80 flex items-end space-x-2">
            {[92, 88, 85, 80, 78, 75, 72, 68, 65, 60, 58, 52, 48, 45, 40].map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                <div 
                  className="w-full bg-gradient-to-t from-emerald-600 to-cyan-400 rounded-t group-hover:brightness-125 transition-all" 
                  style={{ height: `${val}%` }} 
                />
                <span className="text-[9px] text-slate-500 font-mono hidden sm:inline">d{idx + 1}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <span>Baseline Vulns: <strong className="text-rose-400">42</strong></span>
            <span>Remediated: <strong className="text-emerald-400">36</strong></span>
            <span>Current Open: <strong className="text-cyan-400">6</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};
