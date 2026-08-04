import React, { useState } from 'react';
import { 
  FileText, 
  Play, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ShieldCheck, 
  Code2, 
  Copy, 
  Check, 
  Zap,
  Sliders
} from 'lucide-react';
import { PolicyRule } from '../types';
import { samplePolicyRules } from '../data/mockPlatformData';

export const PolicyAsCodeEngine: React.FC = () => {
  const [policies, setPolicies] = useState<PolicyRule[]>(samplePolicyRules);
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyRule>(samplePolicyRules[0]);
  const [testPayload, setTestPayload] = useState<string>(`{
  "resource": {
    "aws_s3_bucket": {
      "secops_datalake": {
        "bucket": "secops-datalake-prod",
        "acl": "private"
      }
    }
  }
}`);
  const [evalResult, setEvalResult] = useState<{ allowed: boolean; message: string } | null>(null);
  const [evaluating, setEvaluating] = useState<boolean>(false);

  const handleEvaluate = () => {
    setEvaluating(true);
    setTimeout(() => {
      setEvaluating(false);
      try {
        const parsed = JSON.parse(testPayload);
        const acl = parsed?.resource?.aws_s3_bucket?.secops_datalake?.acl;
        if (acl === 'private') {
          setEvalResult({ allowed: true, message: "POLICY COMPLIANT: S3 Bucket ACL is private. Admission Approved!" });
        } else {
          setEvalResult({ allowed: false, message: "POLICY VIOLATION DENIED: Bucket ACL is not private!" });
        }
      } catch (e) {
        setEvalResult({ allowed: false, message: "JSON Parse Error in Test Payload" });
      }
    }, 600);
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
            <h1 className="text-xl font-bold text-white tracking-tight">Policy as Code Engine</h1>
            <p className="text-xs text-slate-400">
              Open Policy Agent (OPA Rego) & Kyverno Kubernetes Admission Controller Evaluator
            </p>
          </div>
        </div>
      </div>

      {/* Main Split Policy Playground View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Policy Selector Sidebar */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">ORGANIZATION POLICIES</h2>
          <div className="space-y-2">
            {policies.map((pol) => (
              <div
                key={pol.id}
                onClick={() => { setSelectedPolicy(pol); setEvalResult(null); }}
                className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                  selectedPolicy.id === pol.id 
                    ? 'bg-amber-950/40 border-amber-500/60 text-white' 
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between font-bold">
                  <span className="text-white">{pol.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {pol.engine}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">{pol.description}</p>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800 text-[10px]">
                  <span className="text-emerald-400 font-bold">{pol.enforcement}</span>
                  <span className="text-slate-500">{pol.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Code Editor & Test Input */}
        <div className="lg:col-span-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Rego / Kyverno Code Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2 flex flex-col">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                <span className="font-bold text-amber-400 font-mono">{selectedPolicy.name}</span>
                <span className="text-slate-500 text-[10px]">{selectedPolicy.engine}</span>
              </div>
              <pre className="flex-1 bg-slate-950 p-3 rounded-xl text-xs font-mono text-cyan-300 overflow-x-auto whitespace-pre-wrap border border-slate-800">
                {selectedPolicy.regoCode}
              </pre>
            </div>

            {/* Test JSON Input Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2 flex flex-col">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                <span className="font-bold text-white">Input Payload (JSON)</span>
                <button
                  onClick={handleEvaluate}
                  disabled={evaluating}
                  className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition-all flex items-center space-x-1 cursor-pointer"
                >
                  <Play className={`w-3.5 h-3.5 ${evaluating ? 'animate-spin' : ''}`} />
                  <span>{evaluating ? 'Evaluating...' : 'Test Policy'}</span>
                </button>
              </div>
              <textarea
                value={testPayload}
                onChange={(e) => setTestPayload(e.target.value)}
                rows={10}
                className="w-full flex-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-emerald-400 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Evaluation Result */}
          {evalResult && (
            <div className={`p-4 rounded-xl border text-xs flex items-center space-x-3 font-mono font-bold ${
              evalResult.allowed 
                ? 'bg-emerald-950/90 border-emerald-600 text-emerald-300' 
                : 'bg-rose-950/90 border-rose-600 text-rose-300'
            }`}>
              {evalResult.allowed ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> : <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
              <span>{evalResult.message}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
