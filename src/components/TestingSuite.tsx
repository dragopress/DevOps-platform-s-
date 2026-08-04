import React, { useState } from 'react';
import { Play, CheckCircle2, XCircle, Clock, ShieldAlert, Activity, BarChart2 } from 'lucide-react';

interface TestCase {
  id: string;
  name: string;
  category: 'Unit' | 'Integration' | 'E2E' | 'Security Regression' | 'Load / Performance';
  durationMs: number;
  status: 'PASSED' | 'FAILED' | 'SKIPPED';
  details: string;
}

export const TestingSuite: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<TestCase[]>([
    { id: "TEST-01", name: "Semgrep SAST Engine Rule Compilation", category: "Unit", durationMs: 142, status: "PASSED", details: "1,420 syntax patterns verified cleanly." },
    { id: "TEST-02", name: "Trivy Container Vulnerability Deduplication", category: "Unit", durationMs: 210, status: "PASSED", details: "Duplicate CVE-2024-3094 correctly deduplicated." },
    { id: "TEST-03", name: "OPA Rego Policy Enforcement - Block Public S3", category: "Integration", durationMs: 380, status: "PASSED", details: "Checkov CKV_AWS_20 correctly denied deploy." },
    { id: "TEST-04", name: "OAuth2 JWT Token Issuer & RBAC Permission Check", category: "Security Regression", durationMs: 490, status: "PASSED", details: "Auditor role blocked from modifying Sigma rules." },
    { id: "TEST-05", name: "Async Worker Job Queue Under 50 Concurrent Scans", category: "Load / Performance", durationMs: 1240, status: "PASSED", details: "p99 latency 34.2s, 0 failed jobs." },
    { id: "TEST-06", name: "OWASP ZAP DAST Vulnerability Sanitization Fix", category: "E2E", durationMs: 820, status: "PASSED", details: "SQL injection payload safely neutralized." }
  ]);

  const handleRunAll = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Automated Testing & Security Regression Suite</h1>
            <p className="text-xs text-slate-400">
              Unit Tests • Integration Tests • End-to-End Tests • Security Regression • Load & Latency Benchmarks
            </p>
          </div>
        </div>

        <button
          onClick={handleRunAll}
          disabled={isRunning}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl flex items-center space-x-2 transition-all cursor-pointer shadow-md"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>{isRunning ? "Executing Test Matrix..." : "Run Complete Test Suite"}</span>
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center space-x-3">
          <CheckCircle2 className="w-8 h-8 text-emerald-400 p-1.5 bg-emerald-500/10 rounded-lg" />
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Passed Tests</div>
            <div className="text-lg font-bold text-emerald-400">6 / 6 Passed (100%)</div>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center space-x-3">
          <Clock className="w-8 h-8 text-cyan-400 p-1.5 bg-cyan-500/10 rounded-lg" />
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Total Test Duration</div>
            <div className="text-lg font-bold text-white">3.28s</div>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center space-x-3">
          <ShieldAlert className="w-8 h-8 text-indigo-400 p-1.5 bg-indigo-500/10 rounded-lg" />
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Security Regressions</div>
            <div className="text-lg font-bold text-white">0 Regressions</div>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center space-x-3">
          <BarChart2 className="w-8 h-8 text-amber-400 p-1.5 bg-amber-500/10 rounded-lg" />
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Load Performance</div>
            <div className="text-lg font-bold text-white">1,250 RPS (Pass)</div>
          </div>
        </div>
      </div>

      {/* Test List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Test Suite Execution Results</h2>
        <div className="space-y-2">
          {testResults.map((t) => (
            <div key={t.id} className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="font-semibold text-white flex items-center space-x-2">
                    <span>{t.name}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">{t.category}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{t.details}</div>
                </div>
              </div>
              <div className="text-right font-mono text-[11px] text-slate-400">
                {t.durationMs}ms
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
