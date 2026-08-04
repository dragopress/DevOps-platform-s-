import React, { useState, useEffect } from 'react';
import { CustomVariables, SigmaRule, ActiveTab } from '../types';
import { D3TopologyGraph } from './D3TopologyGraph';
import { initialPipelineNodes, sampleLogEvents } from '../data/mockSecurityData';
import { 
  ShieldCheck, 
  Activity, 
  Terminal, 
  CheckCircle2, 
  Radio, 
  Zap, 
  Server, 
  Maximize2, 
  Minimize2, 
  RotateCcw,
  Sliders,
  Bell,
  HelpCircle,
  Code2,
  Database,
  GitBranch,
  Boxes,
  Lock,
  Cpu,
  Layers
} from 'lucide-react';

interface CyberpunkSocViewProps {
  vars: CustomVariables;
  rules: SigmaRule[];
  liveEps: number;
  onNavigateTab: (tab: ActiveTab) => void;
  onOpenTerraformModule: (moduleName: string) => void;
}

export const CyberpunkSocView: React.FC<CyberpunkSocViewProps> = ({
  vars,
  rules,
  liveEps,
  onNavigateTab,
  onOpenTerraformModule
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>("msk-kafka");
  const [autoScroll, setAutoScroll] = useState<boolean>(true);
  const [activeSubTab, setActiveSubTab] = useState<ActiveTab>("topology");

  // Simulated live terminal events stream
  const [liveEvents, setLiveEvents] = useState([
    { id: "1", time: "11:24:35.632", severity: "CRITICAL", title: "IAM User Privilege Escalation", rule: "proc_creation_win_priv_esc" },
    { id: "2", time: "11:24:32.104", severity: "CRITICAL", title: "AWS STS AssumeRole Anomaly", rule: "cloud_aws_sts_anomalous" },
    { id: "3", time: "11:24:28.901", severity: "HIGH", title: "S3 Bucket Policy Modified", rule: "cloud_aws_s3_bucket_mod" },
    { id: "4", time: "11:24:25.771", severity: "HIGH", title: "Exfiltration to Unusual IP", rule: "network_ti_suspicious_egress" },
    { id: "5", time: "11:24:21.544", severity: "CRITICAL", title: "Malicious PowerShell Detected", rule: "proc_creation_win_powershell" },
    { id: "6", time: "11:24:18.233", severity: "HIGH", title: "Kubernetes API Server Anomaly", rule: "k8s_api_server_anomaly" },
    { id: "7", time: "11:24:15.912", severity: "HIGH", title: "Multiple Failed Login Attempts", rule: "authentication_bruteforce" },
    { id: "8", time: "11:24:12.487", severity: "CRITICAL", title: "Container Escape Attempt", rule: "container_escape_attempt" },
    { id: "9", time: "11:24:08.356", severity: "HIGH", title: "AWS Console Login from TOR Exit", rule: "cloud_aws_tor_login" },
    { id: "10", time: "11:24:05.113", severity: "HIGH", title: "Unusual DNS Tunnel Activity", rule: "network_dns_tunnel" },
    { id: "11", time: "11:24:01.884", severity: "CRITICAL", title: "Ransomware Behavior Detected", rule: "ransomware_behavior" },
    { id: "12", time: "11:23:58.672", severity: "HIGH", title: "K8s Secret Access Anomaly", rule: "k8s_secret_access_anomaly" },
    { id: "13", time: "11:23:55.221", severity: "HIGH", title: "S3 Enumeration Activity", rule: "cloud_aws_s3_enum" },
    { id: "14", time: "11:23:51.009", severity: "CRITICAL", title: "C2 Communication Detected", rule: "c2_communication_http" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`;
      const sampleTitles = [
        { title: "Unauthorized KMS Key Access", rule: "kms_unauthorized_decrypt", sev: "CRITICAL" },
        { title: "EC2 Instance Metadata Access", rule: "cloud_aws_imds_access", sev: "HIGH" },
        { title: "Suspicious User-Agent Detected", rule: "web_suspicious_user_agent", sev: "HIGH" },
        { title: "Kafka Topic ACL Modified", rule: "kafka_acl_modification", sev: "HIGH" }
      ];
      const random = sampleTitles[Math.floor(Math.random() * sampleTitles.length)];
      setLiveEvents(prev => [
        { id: Date.now().toString(), time: timeStr, severity: random.sev, title: random.title, rule: random.rule },
        ...prev.slice(0, 18)
      ]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#050811] text-cyan-400 font-mono min-h-screen -mx-4 -my-6 p-4 border border-cyan-900/40 cyberpunk-grid">
      {/* Top Cyber Command Header */}
      <div className="flex items-center justify-between border-b border-cyan-900/60 pb-3 mb-4 bg-[#0a1020]/80 p-3 rounded-lg backdrop-blur">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-cyan-950 border border-cyan-500/50 rounded text-cyan-400 shadow-[0_0_15px_rgba(0,212,255,0.3)]">
            <ShieldCheck className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-widest text-white uppercase flex items-center gap-2">
              DEVSECOPS
              <span className="text-xs text-cyan-400 font-normal tracking-normal text-cyan-300">SECURITY PIPELINE STUDIO</span>
            </h1>
          </div>
        </div>

        {/* Cyber Navigation Subtabs */}
        <div className="hidden lg:flex items-center space-x-1 bg-black/60 p-1 border border-cyan-900/80 rounded">
          {[
            { id: "topology", label: "PIPELINE TOPOLOGY", icon: Activity },
            { id: "terraform", label: "TERRAFORM CODE", icon: Code2 },
            { id: "threat-detection", label: "LIVE THREAT ENGINE", icon: ShieldCheck },
            { id: "data-lake", label: "MATANO S3 LAKE", icon: Database },
            { id: "cicd", label: "CI/CD PIPELINE", icon: GitBranch },
            { id: "services", label: "SERVICE REPOS", icon: Boxes }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveSubTab(tab.id as ActiveTab);
                  onNavigateTab(tab.id as ActiveTab);
                }}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-[0_0_10px_rgba(0,212,255,0.4)]"
                    : "text-slate-400 hover:text-cyan-300 hover:bg-slate-900"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Top Right Utilities */}
        <div className="flex items-center space-x-3 text-xs">
          <div className="relative">
            <button className="p-1.5 text-cyan-400 hover:text-white bg-cyan-950/40 border border-cyan-800 rounded relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-500 text-slate-950 font-bold text-[9px] flex items-center justify-center">3</span>
            </button>
          </div>
          <button className="p-1.5 text-cyan-400 hover:text-white bg-cyan-950/40 border border-cyan-800 rounded">
            <Terminal className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-cyan-400 hover:text-white bg-cyan-950/40 border border-cyan-800 rounded">
            <HelpCircle className="w-4 h-4" />
          </button>
          <span className="px-2.5 py-1 bg-cyan-950 text-cyan-300 border border-cyan-500/40 rounded font-bold text-xs">SOC</span>
        </div>
      </div>

      {/* Main Command Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Live Pipeline Metrics & Checkov Scan Results */}
        <div className="lg:col-span-3 space-y-4">
          {/* Live Pipeline Metrics Panel */}
          <div className="bg-[#0a101d] border border-cyan-900/80 rounded-lg p-4 shadow-[0_0_20px_rgba(0,0,0,0.8)] relative">
            <div className="flex items-center justify-between border-b border-cyan-900/60 pb-2 mb-3">
              <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                LIVE PIPELINE METRICS
              </span>
              <Maximize2 className="w-3 h-3 text-slate-500 cursor-pointer hover:text-cyan-400" />
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-widest">EVENTS PER SECOND (EPS)</div>
                <div className="text-3xl font-extrabold text-emerald-400 tracking-tight font-mono mt-0.5 shadow-[0_0_15px_rgba(0,255,136,0.2)]">
                  {liveEps.toLocaleString()}
                </div>
                <div className="text-[10px] text-emerald-400 mt-0.5">events/sec</div>
              </div>

              {/* Sparkline Canvas / SVG graph */}
              <div className="h-16 w-full bg-black/60 rounded border border-cyan-900/40 p-1 flex items-end space-x-1">
                {[35, 45, 60, 40, 55, 75, 50, 65, 80, 70, 85, 90, 65, 85, 95, 80, 88].map((h, i) => (
                  <div 
                    key={i} 
                    className="flex-1 bg-emerald-500/80 hover:bg-emerald-400 rounded-t transition-all"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-cyan-950">
                <div>
                  <span className="text-[10px] text-slate-400 block">THROUGHPUT (EPS)</span>
                  <span className="text-emerald-400 font-bold">18.45K <span className="text-[9px] text-emerald-300">↑ 12.7%</span></span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">EVENTS PROCESSED</span>
                  <span className="text-cyan-300 font-bold">2.68B</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-cyan-950">
                <span className="text-[10px] text-slate-400">PIPELINE HEALTH</span>
                <span className="flex items-center gap-1 text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  HEALTHY
                </span>
              </div>
            </div>
          </div>

          {/* Checkov Scan Results Panel */}
          <div className="bg-[#0a101d] border border-cyan-900/80 rounded-lg p-4 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between border-b border-cyan-900/60 pb-2 mb-3">
              <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                CHECKOV SCAN RESULTS
              </span>
              <RotateCcw className="w-3 h-3 text-slate-500 cursor-pointer hover:text-cyan-400" />
            </div>

            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-500 flex flex-col items-center justify-center bg-emerald-950/20 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-bold text-white mt-0.5">7/7</span>
              </div>
              <div>
                <div className="text-lg font-bold text-emerald-400 uppercase tracking-wider">PASSED</div>
                <div className="text-[10px] text-slate-400">0 Security Policy Violations</div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>POLICIES PASSED</span>
                <span className="text-emerald-400 font-bold">7</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>POLICIES FAILED</span>
                <span className="text-slate-500 font-bold">0</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>POLICIES SKIPPED</span>
                <span className="text-slate-500 font-bold">0</span>
              </div>
              <div className="flex justify-between text-slate-400 pt-1 border-t border-cyan-950">
                <span>LAST SCAN</span>
                <span className="text-cyan-400 font-mono">11:24:18</span>
              </div>
            </div>

            {/* Checkov bar charts */}
            <div className="mt-4 pt-3 border-t border-cyan-950 grid grid-cols-7 gap-1 items-end h-16 text-[9px] text-slate-500 text-center">
              {[
                { name: "IAM", v: 80 },
                { name: "S3", v: 100 },
                { name: "KMS", v: 90 },
                { name: "VPC", v: 100 },
                { name: "EKS", v: 95 },
                { name: "EC2", v: 85 },
                { name: "ALL", v: 100 }
              ].map((b, i) => (
                <div key={i} className="flex flex-col items-center gap-1 h-full justify-end">
                  <div 
                    className="w-full bg-emerald-500/80 rounded-t"
                    style={{ height: `${b.v}%` }}
                  />
                  <span>{b.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Stage: D3 Cyber Pipeline Topology Diagram */}
        <div className="lg:col-span-6 bg-[#0a101d] border border-cyan-900/80 rounded-lg p-4 flex flex-col justify-between shadow-[0_0_25px_rgba(0,0,0,0.9)] relative overflow-hidden">
          {/* Section Header */}
          <div className="flex items-center justify-between border-b border-cyan-900/60 pb-3 mb-3">
            <div className="flex items-center space-x-2">
              <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
              <h2 className="text-sm font-bold text-white tracking-widest uppercase">PIPELINE TOPOLOGY</h2>
            </div>
            <div className="flex items-center space-x-2 text-[11px]">
              <span className="text-slate-400 font-mono">7 NODES • 12 EDGES</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold text-[10px]">
                ALL SYSTEMS OPERATIONAL
              </span>
            </div>
          </div>

          {/* D3 Central Canvas Container */}
          <div className="relative min-h-[460px] bg-[#050811] rounded border border-cyan-900/40 p-2 flex-1 flex items-center justify-center">
            <D3TopologyGraph
              nodes={initialPipelineNodes}
              selectedNodeId={selectedNodeId}
              onSelectNode={(node) => setSelectedNodeId(node.id)}
              vars={vars}
            />

            {/* Topology Legend Overlay */}
            <div className="absolute bottom-3 right-3 bg-black/80 border border-cyan-900/80 rounded p-2 text-[10px] space-y-1">
              <div className="text-cyan-400 font-bold mb-1 border-b border-cyan-900/40 pb-0.5 uppercase">LEGEND</div>
              <div className="flex items-center space-x-2 text-cyan-300">
                <span className="w-2 h-0.5 bg-cyan-400"></span>
                <span>DATA FLOW</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <span className="w-2 h-0.5 bg-slate-500 border-dashed"></span>
                <span>CONTROL FLOW</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>HEALTHY</span>
              </div>
              <div className="flex items-center space-x-2 text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>DEGRADED</span>
              </div>
              <div className="flex items-center space-x-2 text-red-400">
                <span className="w-2 h-2 rounded-full bg-red-400"></span>
                <span>CRITICAL</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Threat Engine Feed (Terminal Style) */}
        <div className="lg:col-span-3 bg-[#0a101d] border border-cyan-900/80 rounded-lg p-4 shadow-[0_0_20px_rgba(0,0,0,0.8)] flex flex-col h-full">
          <div className="flex items-center justify-between border-b border-cyan-900/60 pb-2 mb-3">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">LIVE THREAT ENGINE FEED</span>
            </div>
            <div className="flex items-center space-x-2">
              <label className="flex items-center space-x-1 text-[10px] text-slate-400 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={autoScroll} 
                  onChange={(e) => setAutoScroll(e.target.checked)} 
                  className="rounded bg-black border-cyan-800 text-cyan-500"
                />
                <span>AUTO-SCROLL</span>
              </label>
            </div>
          </div>

          {/* Terminal Events List */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1 text-[11px] font-mono max-h-[480px]">
            {liveEvents.map((ev) => (
              <div 
                key={ev.id} 
                className="p-2 rounded bg-black/60 border border-cyan-950 hover:border-cyan-800 transition-colors flex items-start justify-between gap-2"
              >
                <div className="space-y-0.5 overflow-hidden">
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-500 text-[10px]">{ev.time}</span>
                    <span className={`px-1.5 py-0.2 rounded font-bold text-[9px] ${
                      ev.severity === 'CRITICAL' 
                        ? 'bg-red-950 text-red-400 border border-red-800' 
                        : 'bg-amber-950 text-amber-400 border border-amber-800'
                    }`}>
                      {ev.severity}
                    </span>
                  </div>
                  <div className="text-slate-200 font-semibold truncate">{ev.title}</div>
                  <div className="text-cyan-500/80 text-[10px] truncate">{ev.rule}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Event Summary Counts */}
          <div className="pt-3 border-t border-cyan-950 mt-3 grid grid-cols-2 gap-2 text-[10px] text-slate-400">
            <div>
              TOTAL EVENTS (1H): <span className="text-cyan-300 font-bold">24,892</span>
            </div>
            <div className="text-right">
              CRITICAL: <span className="text-red-400 font-bold">312</span>
            </div>
            <div>
              HIGH: <span className="text-amber-400 font-bold">1,942</span>
            </div>
            <div className="text-right">
              LOW: <span className="text-slate-400 font-bold">16,407</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cyber Bottom Status Footer Bar */}
      <div className="mt-4 pt-3 border-t border-cyan-900/60 bg-[#0a101d] rounded-lg p-3 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-4">
        <div className="flex flex-wrap items-center gap-6 font-mono text-[11px]">
          <div>
            AWS REGION: <span className="text-cyan-400 font-bold">{vars.awsRegion}</span>
          </div>
          <div>
            ENVIRONMENT: <span className="text-emerald-400 font-bold uppercase">{vars.environment}</span>
          </div>
          <div>
            ACCOUNT ID: <span className="text-slate-300 font-bold">111122223333</span>
          </div>
          <div>
            DEPLOYMENT: <span className="text-cyan-300 font-bold">v2.18.7</span>
          </div>
          <div>
            PIPELINE UPTIME: <span className="text-emerald-400 font-bold">18d 04h 22m 11s</span>
          </div>
          <div>
            DATA RETENTION: <span className="text-amber-400 font-bold">90 DAYS</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-[11px]">
          <span>TIME SYNC: <span className="text-cyan-300">11:24:36 UTC</span></span>
          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
            ALL SYSTEMS OPERATIONAL
          </span>
        </div>
      </div>
    </div>
  );
};
