import React, { useState } from 'react';
import { 
  Code2, 
  Terminal, 
  Play, 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  Layers, 
  Boxes, 
  GitBranch,
  BookOpen,
  CheckCircle2
} from 'lucide-react';

export const DeveloperExperience: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vscode' | 'cli' | 'docker' | 'github'>('vscode');
  const [copied, setCopied] = useState<boolean>(false);
  const [cliOutput, setCliOutput] = useState<string | null>(null);
  const [cliRunning, setCliRunning] = useState<boolean>(false);

  const dockerComposeContent = `version: '3.8'
services:
  devsecops-scanner:
    image: ghcr.io/devsecops-studio/scanner-agent:v2.4.0
    ports:
      - "8080:8080"
    environment:
      - GITLEAKS_ENABLE=true
      - TRIVY_CONTAINER_SCAN=true
      - OPA_REGO_ENFORCE=true
    volumes:
      - .:/workspace:ro

  opa-evaluator:
    image: openpolicyagent/opa:0.62.0
    ports:
      - "8181:8181"
    command:
      - "run"
      - "--server"
      - "--log-level=info"`;

  const githubActionContent = `name: DevSecOps Security Pipeline
on: [push, pull_request]

jobs:
  security-gate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Gitleaks Secret Scan
        uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}

      - name: Semgrep SAST Analysis
        uses: returntocorp/semgrep-action@v1

      - name: Trivy Container & Dependency Scan
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          security-checks: 'vuln,secret,config'

      - name: Cosign Image Sign
        uses: sigstore/cosign-installer@v3.4.0`;

  const handleRunCli = () => {
    setCliRunning(true);
    setCliOutput("Initiating devsecops-cli v2.4.0 scan across local repository...\n");
    
    setTimeout(() => {
      setCliOutput(prev => prev + "[1/4] Gitleaks secret scan: 0 leaks found (CLEAN)\n");
    }, 400);

    setTimeout(() => {
      setCliOutput(prev => prev + "[2/4] Semgrep SAST scan: 2 warnings (libwebp CVE-2023-4863)\n");
    }, 800);

    setTimeout(() => {
      setCliOutput(prev => prev + "[3/4] Checkov IaC scan: 7 checks passed, 0 failures\n");
    }, 1200);

    setTimeout(() => {
      setCliOutput(prev => prev + "[4/4] OPA Rego policy evaluation: PASSED\n\nRESULT: SECURITY GATE PASSED! Ready for PR merge.\n");
      setCliRunning(false);
    }, 1600);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-xl">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Developer Experience & Developer Tooling</h1>
            <p className="text-xs text-slate-400">
              VS Code Extension Simulator, CLI Tool (`devsecops scan`), Docker Compose Stack & GitHub Actions
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 p-2 rounded-2xl">
        {[
          { id: 'vscode', label: 'VS Code Extension Emulator', icon: Code2 },
          { id: 'cli', label: 'CLI Tool (`devsecops scan`)', icon: Terminal },
          { id: 'docker', label: 'Docker Compose Stack', icon: Boxes },
          { id: 'github', label: 'GitHub Action Template', icon: GitBranch }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: VS Code Extension Simulator */}
      {activeTab === 'vscode' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Code2 className="w-5 h-5 text-cyan-400" />
              <h2 className="text-sm font-bold text-white">VS Code Security Linter Simulation</h2>
            </div>
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Extension Active
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs space-y-3">
            <div className="text-slate-500">// file: terraform/modules/s3.tf</div>
            <div className="text-slate-300">resource "aws_s3_bucket" "datalake" &#123;</div>
            <div className="text-slate-300 pl-4">bucket = "my-secops-bucket"</div>
            <div className="text-rose-400 pl-4 underline decoration-wavy decoration-rose-500 bg-rose-950/30 p-1 rounded">
              acl = "public-read"  <span className="text-rose-300 font-bold ml-2">← [Gitleaks / Checkov CKV_AWS_20] CRITICAL: S3 Bucket ACL public-read is forbidden!</span>
            </div>
            <div className="text-slate-300">&#125;</div>

            <div className="p-3 bg-blue-950/80 border border-blue-800 rounded-xl text-blue-200 text-xs flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Quick Fix: Replace with acl = "private" & add aws_s3_bucket_public_access_block</span>
              </div>
              <button className="px-3 py-1 bg-cyan-500 text-slate-950 font-bold rounded-lg text-xs hover:bg-cyan-400 transition-all cursor-pointer">
                Apply Fix
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: CLI Tool */}
      {activeTab === 'cli' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Terminal className="w-5 h-5 text-emerald-400" />
              <h2 className="text-sm font-bold text-white">DevSecOps Terminal CLI Simulator</h2>
            </div>
            <button
              onClick={handleRunCli}
              disabled={cliRunning}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all flex items-center space-x-2 cursor-pointer"
            >
              <Play className={`w-3.5 h-3.5 ${cliRunning ? 'animate-spin' : ''}`} />
              <span>{cliRunning ? 'Scanning...' : 'Run devsecops scan'}</span>
            </button>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-emerald-400 min-h-48 overflow-y-auto whitespace-pre-wrap">
            {cliOutput || "$ devsecops scan --all\nReady. Click 'Run devsecops scan' to initiate full local security pipeline evaluation..."}
          </div>
        </div>
      )}

      {/* Tab 3: Docker Compose */}
      {activeTab === 'docker' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white">docker-compose.security.yml</h2>
            <button
              onClick={() => handleCopy(dockerComposeContent)}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs flex items-center space-x-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Compose YAML'}</span>
            </button>
          </div>
          <pre className="bg-slate-950 p-4 rounded-xl text-xs font-mono text-cyan-300 overflow-x-auto border border-slate-800">
            {dockerComposeContent}
          </pre>
        </div>
      )}

      {/* Tab 4: GitHub Action */}
      {activeTab === 'github' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white">.github/workflows/devsecops-pipeline.yml</h2>
            <button
              onClick={() => handleCopy(githubActionContent)}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs flex items-center space-x-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Workflow'}</span>
            </button>
          </div>
          <pre className="bg-slate-950 p-4 rounded-xl text-xs font-mono text-emerald-300 overflow-x-auto border border-slate-800">
            {githubActionContent}
          </pre>
        </div>
      )}
    </div>
  );
};
