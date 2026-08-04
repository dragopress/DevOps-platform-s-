import React, { useState } from 'react';
import { CustomVariables, SigmaRule, ActiveTab } from '../types';
import { defaultSigmaRules, checkovResults } from '../data/mockSecurityData';
import { 
  Folder, 
  FileCode2, 
  Terminal, 
  Sparkles, 
  Play, 
  Download, 
  ChevronRight, 
  ChevronDown, 
  Search, 
  GitBranch, 
  Settings, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Copy, 
  Check, 
  FileText,
  Boxes,
  Code2
} from 'lucide-react';

interface DeveloperIdeViewProps {
  vars: CustomVariables;
  rules: SigmaRule[];
  onNavigateTab: (tab: ActiveTab) => void;
  onOpenTerraformModule: (moduleName: string) => void;
}

export const DeveloperIdeView: React.FC<DeveloperIdeViewProps> = ({
  vars,
  rules,
  onNavigateTab,
  onOpenTerraformModule
}) => {
  const [activeFile, setActiveFile] = useState<string>("sigma_rules.yaml");
  const [activeTab, setActiveTab] = useState<"editor" | "rendered">("editor");
  const [terminalTab, setTerminalTab] = useState<"terminal" | "problems" | "output">("terminal");
  const [copied, setCopied] = useState<boolean>(false);
  const [validating, setValidating] = useState<boolean>(false);
  const [validationSuccess, setValidationSuccess] = useState<boolean | null>(null);

  const currentRule = rules[0] || defaultSigmaRules[0];

  const fileTree = [
    {
      name: "infrastructure",
      type: "folder",
      children: [
        { name: "modules/networking", type: "folder" },
        { name: "modules/messaging", type: "folder" },
        { name: "modules/processing", type: "folder" },
        { name: "modules/data_lake", type: "folder" }
      ]
    },
    {
      name: "rules",
      type: "folder",
      expanded: true,
      children: [
        { name: "sigma_rules.yaml", type: "file", active: true },
        { name: "templates/", type: "folder" }
      ]
    },
    {
      name: "services",
      type: "folder",
      children: [
        { name: "auth-service/", type: "folder" },
        { name: "user-service/", type: "folder" },
        { name: "order-service/", type: "folder" },
        { name: "payment-service/", type: "folder" },
        { name: "inventory-service/", type: "folder" }
      ]
    },
    {
      name: "terraform",
      type: "folder",
      children: [
        { name: "main.tf", type: "file" },
        { name: "variables.tf", type: "file" },
        { name: "outputs.tf", type: "file" }
      ]
    }
  ];

  const yamlLines = (currentRule.detectionYaml || `title: ${currentRule.title}
id: 3f2c6b6e-8d6b-4b45-9e3a-5d8f3a6c9b21
status: experimental
description: Detects attempts to escalate privileges via AddUserToGroup or AttachUserPolicy.
author: DevSecOps Studio
date: 2025-05-24
references:
  - https://attack.mitre.org/techniques/T1078/
logsource:
  product: aws
  service: cloudtrail
detection:
  selection:
    eventSource: iam.amazonaws.com
    eventName:
      - AddUserToGroup
      - AttachUserPolicy
  filter:
    userIdentity.type: Root
  condition: selection and not filter
falsepositives:
  - Legitimate administrative activities
level: medium
tags:
  - attack.privilege_escalation
  - attack.t1078`).split('\n');

  const handleValidate = () => {
    setValidating(true);
    setTimeout(() => {
      setValidating(false);
      setValidationSuccess(true);
      setTimeout(() => setValidationSuccess(null), 3000);
    }, 800);
  };

  return (
    <div className="bg-[#18181b] text-[#d4d4d4] font-mono min-h-screen -mx-4 -my-6 flex flex-col border border-[#27272a] shadow-2xl">
      {/* Top macOS Style Window Header */}
      <div className="bg-[#1e1e24] px-4 py-2 border-b border-[#27272a] flex items-center justify-between text-xs">
        {/* Window Dots & Breadcrumbs */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
          </div>
          <div className="text-slate-400 text-[11px] flex items-center space-x-1">
            <span>gro</span>
            <ChevronRight className="w-3 h-3" />
            <span>devsecops-studio</span>
            <ChevronRight className="w-3 h-3" />
            <span>pipeline-topology</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-semibold">prod</span>
          </div>
        </div>

        {/* Command Search Bar */}
        <div className="flex-1 max-w-md mx-4">
          <div className="bg-[#121215] border border-[#27272a] rounded-lg px-3 py-1 flex items-center space-x-2 text-slate-400">
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs">Go to anything (⌘K)</span>
          </div>
        </div>

        {/* Layout Icons */}
        <div className="flex items-center space-x-2 text-slate-400">
          <button className="p-1 hover:text-white"><Layers className="w-4 h-4" /></button>
          <button className="p-1 hover:text-white"><Settings className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Main IDE Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Activity Bar */}
        <div className="w-12 bg-[#121215] border-r border-[#27272a] flex flex-col items-center py-3 space-y-4 text-slate-400">
          <button className="p-2 text-white bg-[#27272a] rounded-lg shadow"><Folder className="w-5 h-5" /></button>
          <button className="p-2 hover:text-white"><Search className="w-5 h-5" /></button>
          <button className="p-2 hover:text-white"><GitBranch className="w-5 h-5" /></button>
          <button className="p-2 hover:text-white"><Play className="w-5 h-5" /></button>
          <button className="p-2 hover:text-white"><Boxes className="w-5 h-5" /></button>
          <div className="flex-1"></div>
          <button className="p-2 hover:text-white"><Settings className="w-5 h-5" /></button>
        </div>

        {/* Sidebar File Explorer */}
        <div className="w-64 bg-[#18181b] border-r border-[#27272a] p-3 text-xs overflow-y-auto">
          <div className="font-bold text-[10px] text-slate-400 uppercase tracking-wider mb-2">EXPLORER</div>
          <div className="space-y-1">
            {fileTree.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center space-x-1.5 text-slate-300 font-semibold py-1 hover:bg-[#27272a] px-1 rounded cursor-pointer">
                  {item.expanded ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                  <Folder className="w-3.5 h-3.5 text-blue-400" />
                  <span>{item.name}</span>
                </div>
                {item.children && item.expanded && (
                  <div className="pl-4 space-y-1 border-l border-[#27272a] ml-2">
                    {item.children.map((child, cIdx) => (
                      <div 
                        key={cIdx} 
                        onClick={() => {
                          if (child.name.endsWith('.tf')) {
                            onOpenTerraformModule(child.name.replace('.tf', ''));
                          } else {
                            setActiveFile(child.name);
                          }
                        }}
                        className={`flex items-center space-x-2 py-1 px-2 rounded cursor-pointer ${
                          child.active || activeFile === child.name 
                            ? 'bg-[#27272a] text-cyan-400 font-bold' 
                            : 'text-slate-400 hover:text-slate-200 hover:bg-[#1e1e24]'
                        }`}
                      >
                        <FileCode2 className="w-3.5 h-3.5 text-amber-400" />
                        <span>{child.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Work Area (Split Editor + Preview) */}
        <div className="flex-1 flex flex-col bg-[#1e1e24]">
          {/* Main Code Editor & Preview Split View */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 divide-x divide-[#27272a] overflow-hidden">
            {/* Left Code Editor Tab */}
            <div className="flex flex-col h-full bg-[#18181b]">
              <div className="bg-[#121215] px-3 py-1.5 border-b border-[#27272a] flex items-center space-x-2 text-xs">
                <FileCode2 className="w-3.5 h-3.5 text-rose-400" />
                <span className="text-white font-semibold">sigma_rules.yaml</span>
                <span className="text-[10px] text-slate-500">rules /</span>
              </div>

              {/* Code Line Numbers & YAML Text */}
              <div className="flex-1 p-4 font-mono text-xs overflow-y-auto leading-relaxed flex space-x-4">
                <div className="text-slate-600 select-none text-right pr-2 border-r border-[#27272a]">
                  {yamlLines.map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                <div className="text-slate-200 overflow-x-auto flex-1 select-text">
                  {yamlLines.map((line, i) => (
                    <div key={i} className="hover:bg-[#27272a]/50 px-1 rounded">
                      <span className={
                        line.startsWith('title:') ? 'text-cyan-400 font-bold' :
                        line.startsWith('detection:') ? 'text-amber-400 font-bold' :
                        line.startsWith('level:') ? 'text-rose-400 font-bold' :
                        line.includes(':') ? 'text-purple-300 font-semibold' : 'text-slate-300'
                      }>
                        {line}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Rendered Rule & Validation Pane */}
            <div className="flex flex-col h-full bg-[#1e1e24] p-4 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between border-b border-[#27272a] pb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-white uppercase">Rendered Rule</span>
                  <span className="text-[10px] bg-amber-950 text-amber-400 border border-amber-800 px-1.5 py-0.5 rounded font-mono">
                    Experimental
                  </span>
                </div>

                <button
                  onClick={handleValidate}
                  disabled={validating}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition-all shadow-md flex items-center space-x-1.5 cursor-pointer"
                >
                  <Sparkles className={`w-3.5 h-3.5 ${validating ? 'animate-spin' : ''}`} />
                  <span>{validating ? 'Validating...' : 'Validate Rule'}</span>
                </button>
              </div>

              {validationSuccess && (
                <div className="p-3 bg-emerald-950/80 border border-emerald-700 text-emerald-300 rounded-lg text-xs flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Sigma Rule syntax valid! 100% matched against MITRE ATT&CK T1078.</span>
                </div>
              )}

              {/* Rendered Rule Details */}
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-500 text-[10px] uppercase block">TITLE</span>
                  <span className="text-white font-bold text-sm">{currentRule.title}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase block">RULE ID</span>
                  <span className="text-cyan-400 font-mono">3f2c6b6e-8d6b-4b45-9e3a-5d8f3a6c9b21</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase block">DESCRIPTION</span>
                  <p className="text-slate-300">{currentRule.description}</p>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase block">LOG SOURCE</span>
                  <span className="text-emerald-400 font-mono">product: aws | service: cloudtrail</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Integrated Terminal Panel */}
          <div className="h-48 border-t border-[#27272a] bg-[#121215] flex flex-col">
            {/* Terminal Header Tabs */}
            <div className="flex items-center justify-between bg-[#18181b] px-4 py-1.5 border-b border-[#27272a] text-xs">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setTerminalTab("terminal")}
                  className={`font-semibold cursor-pointer ${terminalTab === "terminal" ? "text-cyan-400 border-b-2 border-cyan-400 pb-0.5" : "text-slate-400"}`}
                >
                  TERMINAL
                </button>
                <button 
                  onClick={() => setTerminalTab("problems")}
                  className={`font-semibold cursor-pointer ${terminalTab === "problems" ? "text-cyan-400 border-b-2 border-cyan-400 pb-0.5" : "text-slate-400"}`}
                >
                  PROBLEMS <span className="px-1.5 py-0.2 rounded-full bg-rose-950 text-rose-400 text-[10px]">3</span>
                </button>
                <button className="text-slate-400">OUTPUT</button>
                <button className="text-slate-400">DEBUG CONSOLE</button>
              </div>
              <div className="text-slate-500 text-[10px] flex items-center space-x-2">
                <Terminal className="w-3.5 h-3.5" />
                <span>bash</span>
              </div>
            </div>

            {/* Terminal Console Output */}
            <div className="flex-1 p-3 overflow-y-auto font-mono text-xs space-y-1 select-text">
              <div className="text-slate-400">$ cd terraform && checkov -d .</div>
              <div className="text-cyan-400 font-bold">Checkov v3.2.112</div>
              <div className="text-slate-400">Starting scan in directory: /workspace/terraform</div>
              <div className="text-slate-300">Passed checks: 2, Failed checks: 1, Skipped checks: 0, Parsing errors: 0</div>
              <div className="text-emerald-400 flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>CKV_AWS_116: Ensure no security groups allow ingress from 0.0.0.0/0 to port 22 (SSH) - PASSED</span>
              </div>
              <div className="text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>CKV_AWS_19: Ensure AWS S3 bucket has versioning enabled - PASSED</span>
              </div>
              <div className="text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>CKV_AWS_21: Ensure AWS CloudTrail is enabled in all regions - WARNING</span>
              </div>
              <div className="text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>CKV_AWS_117: Ensure security group egress is restricted - WARNING</span>
              </div>
              <div className="text-rose-400 flex items-center gap-1.5">
                <XCircle className="w-3.5 h-3.5" />
                <span>CKV_AWS_23: Ensure AWS S3 bucket has server-side encryption enabled - FAILED</span>
              </div>
              <div className="text-rose-400 font-bold pt-1">Scan complete: 1 failed, 2 passed, 2 warnings</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating IDE Quick Action Panel */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-2 z-40">
        <button 
          onClick={() => onNavigateTab("ai-architect")}
          className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 font-bold text-xs rounded-xl shadow-2xl flex items-center space-x-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Generate Sigma Rule (AI)</span>
        </button>
        <button 
          onClick={() => onNavigateTab("cicd")}
          className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-emerald-300 font-bold text-xs rounded-xl shadow-2xl flex items-center space-x-2 cursor-pointer"
        >
          <Play className="w-4 h-4 text-emerald-400" />
          <span>Run Checkov Scan</span>
        </button>
      </div>
    </div>
  );
};
