import React, { useState, useEffect, useRef } from 'react';
import { CustomVariables, SigmaRule, ActiveTab } from '../types';
import { 
  ShieldCheck, 
  Activity, 
  Globe, 
  Sparkles, 
  Search, 
  Bell, 
  Paperclip, 
  Mic, 
  ArrowUpRight, 
  Database, 
  Cpu, 
  ChevronRight, 
  AlertTriangle, 
  Zap, 
  Radio, 
  RefreshCw,
  Send,
  Layers,
  Lock,
  GitBranch,
  Boxes,
  MessageSquare
} from 'lucide-react';

interface GlassmorphismHubViewProps {
  vars: CustomVariables;
  rules: SigmaRule[];
  onNavigateTab: (tab: ActiveTab) => void;
}

export const GlassmorphismHubView: React.FC<GlassmorphismHubViewProps> = ({
  vars,
  rules,
  onNavigateTab
}) => {
  const [aiQuery, setAiQuery] = useState<string>("");
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const quickPrompts = [
    "Show me top threats in the last 24h",
    "Which assets are most targeted?",
    "What changed in detections today?",
    "Summarize critical events"
  ];

  // Canvas Globe Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;

    const threatNodes = [
      { lat: 55.75, lon: 37.61, name: "RU", type: "Malware", color: "#ec4899" }, // Moscow
      { lat: 52.36, lon: 4.90, name: "NL", type: "C2", color: "#a855f7" },      // Amsterdam
      { lat: 37.77, lon: -122.41, name: "US", type: "Phishing", color: "#06b6d4" }, // SF
      { lat: 52.52, lon: 13.40, name: "DE", type: "Vulnerability", color: "#f97316" }, // Berlin
      { lat: 1.35, lon: 103.81, name: "SG", type: "DataFlow", color: "#10b981" }, // Singapore
      { lat: 35.67, lon: 139.65, name: "JP", type: "Malware", color: "#ec4899" }, // Tokyo
      { lat: -23.55, lon: -46.63, name: "BR", type: "C2", color: "#a855f7" }    // Sao Paulo
    ];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;
      const radius = Math.min(w, h) * 0.38;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Cosmic background glow
      const bgGlow = ctx.createRadialGradient(cx, cy, radius * 0.2, cx, cy, radius * 1.6);
      bgGlow.addColorStop(0, 'rgba(139, 92, 246, 0.15)');
      bgGlow.addColorStop(0.5, 'rgba(6, 182, 212, 0.08)');
      bgGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, w, h);

      // Globe Outer Circle
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Latitude lines
      for (let i = -60; i <= 60; i += 30) {
        const rad = (i * Math.PI) / 180;
        const rLat = radius * Math.cos(rad);
        const yLat = cy + radius * Math.sin(rad);

        ctx.beginPath();
        ctx.ellipse(cx, yLat, rLat, rLat * 0.3, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.stroke();
      }

      // Longitude lines rotating
      angle += 0.005;
      for (let i = 0; i < 12; i++) {
        const lonAngle = angle + (i * Math.PI) / 6;
        const xRad = radius * Math.sin(lonAngle);
        if (Math.cos(lonAngle) > 0) {
          ctx.beginPath();
          ctx.ellipse(cx, cy, Math.abs(xRad), radius, 0, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(139, 92, 246, 0.12)';
          ctx.stroke();
        }
      }

      // Draw threat nodes & arcs
      const projectedNodes: Array<{ x: number; y: number; node: typeof threatNodes[0] }> = [];
      threatNodes.forEach((node) => {
        const lonRad = ((node.lon + angle * 50) * Math.PI) / 180;
        const latRad = (node.lat * Math.PI) / 180;

        const x = cx + radius * Math.cos(latRad) * Math.sin(lonRad);
        const y = cy - radius * Math.sin(latRad);
        const visible = Math.cos(latRad) * Math.cos(lonRad) > -0.2;

        if (visible) {
          projectedNodes.push({ x, y, node });

          // Glowing Dot
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fillStyle = node.color;
          ctx.shadowColor = node.color;
          ctx.shadowBlur = 12;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Pulse ring
          ctx.beginPath();
          ctx.arc(x, y, 8 + Math.sin(Date.now() * 0.005) * 3, 0, Math.PI * 2);
          ctx.strokeStyle = node.color;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // Arcs connecting nodes
      for (let i = 0; i < projectedNodes.length - 1; i++) {
        const p1 = projectedNodes[i];
        const p2 = projectedNodes[i + 1];

        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2 - 40;

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.quadraticCurveTo(midX, midY, p2.x, p2.y);
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleSendPrompt = (promptText?: string) => {
    const q = promptText || aiQuery;
    if (!q.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: q }]);
    if (!promptText) setAiQuery("");

    setTimeout(() => {
      let botResp = "Analysis complete. Threat landscape displays 0 critical exploits on EKS Vector clusters.";
      if (q.includes("24h")) {
        botResp = "Top threats (24h): Ransomware activity from 185.234.219.23 (RU) and C2 Beaconing to darkgate[.]top (NL).";
      } else if (q.includes("assets")) {
        botResp = "Most targeted assets: EKS Vector workers (3,410 attempts) and S3 Iceberg Data Lake buckets.";
      }
      setMessages(prev => [...prev, { role: 'assistant', text: botResp }]);
    }, 600);
  };

  return (
    <div className="bg-gradient-to-br from-[#0c051d] via-[#140a2e] to-[#080214] text-white font-sans min-h-screen -mx-4 -my-6 p-6 relative overflow-hidden">
      {/* Background Glowing Cosmic Orbs */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-cyan-600/15 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header Bar */}
      <header className="glass-card p-4 rounded-2xl mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-gradient-to-tr from-purple-600 to-cyan-500 rounded-xl shadow-lg shadow-purple-500/30">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              DevSecOps
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Threat Intelligence Hub
              </span>
            </h1>
            <p className="text-xs text-slate-400">Security Pipeline Studio</p>
          </div>
        </div>

        {/* Header Tabs Navigation */}
        <div className="flex items-center space-x-1 bg-white/5 p-1 rounded-xl border border-white/10">
          {[
            { id: "topology", label: "Topology", icon: Activity },
            { id: "threat-detection", label: "Threat Engine", icon: ShieldCheck },
            { id: "data-lake", label: "Data Lake", icon: Database },
            { id: "cicd", label: "CI/CD", icon: GitBranch },
            { id: "services", label: "Services", icon: Boxes },
            { id: "ai-architect", label: "AI Architect", icon: Sparkles }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onNavigateTab(tab.id as ActiveTab)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all flex items-center space-x-1.5 cursor-pointer"
              >
                <Icon className="w-3.5 h-3.5 text-purple-400" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Header Controls */}
        <div className="flex items-center space-x-3">
          <button className="p-2 text-slate-300 hover:text-white glass-card rounded-lg">
            <Search className="w-4 h-4" />
          </button>
          <button className="p-2 text-slate-300 hover:text-white glass-card rounded-lg relative">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-bold text-[9px] flex items-center justify-center">3</span>
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold text-xs flex items-center justify-center shadow-lg border border-white/20">
            AS
          </div>
        </div>
      </header>

      {/* Main Glass Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* Left Column Glass Cards */}
        <div className="lg:col-span-3 space-y-4">
          {/* Card 1: Threat Score Gauge */}
          <div className="glass-card glass-card-hover p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider">THREAT SCORE</span>
              <span className="text-rose-400 font-bold">High</span>
            </div>

            <div className="flex items-center justify-center py-2 relative">
              <div className="w-32 h-32 rounded-full border-8 border-transparent border-t-amber-500 border-r-rose-500 border-l-emerald-500 flex flex-col items-center justify-center relative shadow-[0_0_20px_rgba(244,63,94,0.3)]">
                <span className="text-4xl font-extrabold text-white tracking-tight">73</span>
                <span className="text-xs text-slate-400">/100</span>
              </div>
            </div>

            <div className="text-center text-xs text-rose-400 font-medium flex items-center justify-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>8 pts vs yesterday</span>
            </div>
          </div>

          {/* Card 2: Active Sigma Rules */}
          <div className="glass-card glass-card-hover p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider">ACTIVE SIGMA RULES</span>
              <span className="text-emerald-400 text-[11px] font-bold">↑ 2 vs yesterday</span>
            </div>

            <div className="text-3xl font-extrabold text-white">{rules.length || 9}</div>
            
            {/* Sparkline Graph */}
            <div className="h-10 w-full flex items-end space-x-1 pt-1">
              {[40, 60, 45, 80, 55, 70, 90, 65, 85, 100].map((val, i) => (
                <div 
                  key={i} 
                  className="flex-1 bg-gradient-to-t from-cyan-500 to-purple-500 rounded-t" 
                  style={{ height: `${val}%` }} 
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/10">
              <span>Rule executions (24h)</span>
              <span className="text-cyan-300 font-bold">1,248</span>
            </div>
          </div>

          {/* Card 3: Iceberg Storage Usage */}
          <div className="glass-card glass-card-hover p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider">ICEBERG TABLES</span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-500/20 text-purple-300 rounded-xl border border-purple-500/30">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">3 <span className="text-lg font-normal text-slate-400">Tables</span></div>
                <div className="text-xl font-bold text-cyan-300">45.5 GB</div>
              </div>
            </div>

            {/* Storage Usage Gauge Bar */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Storage Usage</span>
                <span>45.5 GB / 200 GB</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-500 to-purple-500 h-full w-[22%] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Center Column: 3D Interactive Global Threat Globe */}
        <div className="lg:col-span-6 glass-card p-6 rounded-2xl flex flex-col justify-between relative min-h-[500px]">
          {/* Section Header */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-cyan-400 animate-spin-slow" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Global Threat Intelligence Stage</h2>
            </div>
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Global Threat Intel Feed</span>
            </div>
          </div>

          {/* 3D Canvas Globe Element */}
          <div className="relative flex-1 min-h-[380px] w-full flex items-center justify-center my-2">
            <canvas ref={canvasRef} className="w-full h-full max-h-[420px]" />
          </div>

          {/* Globe Legend & Refresh Status */}
          <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-3 border-t border-white/10 z-10 gap-2">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-full bg-pink-500"></span><span>Malware</span></span>
              <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span><span>C2 Servers</span></span>
              <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span><span>Phishing</span></span>
              <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span><span>Vulnerabilities</span></span>
              <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span><span>Data Flows</span></span>
            </div>

            <div className="flex items-center space-x-2 text-slate-400 font-mono text-[11px]">
              <span>Updated: 10:24:35 AM UTC</span>
              <RefreshCw className="w-3.5 h-3.5 cursor-pointer hover:text-white" />
            </div>
          </div>
        </div>

        {/* Right Column: Real-Time Event Stream Cards */}
        <div className="lg:col-span-3 glass-card p-5 rounded-2xl flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Radio className="w-4 h-4 text-rose-400 animate-pulse" />
              REAL-TIME EVENT STREAM
            </span>
            <span className="text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-full font-bold">
              LIVE
            </span>
          </div>

          {/* Event Stream Cards List */}
          <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[420px] pr-1">
            {[
              { id: 1, sev: "CRITICAL", title: "Ransomware Activity Detected", detail: "Source IP: 185.234.219.23", time: "10:24:31 AM UTC", country: "RU" },
              { id: 2, sev: "HIGH", title: "C2 Communication Attempt", detail: "Domain: hxxps://darkgate[.]top", time: "10:24:12 AM UTC", country: "NL" },
              { id: 3, sev: "MEDIUM", title: "Exploitation Attempt Blocked", detail: "CVE-2024-3094", time: "10:23:47 AM UTC", country: "US" },
              { id: 4, sev: "HIGH", title: "Suspicious PowerShell Activity", detail: "User: svc_devops", time: "10:23:21 AM UTC", country: "DE" },
              { id: 5, sev: "MEDIUM", title: "Brute Force Login Attempt", detail: "Target: gitlab.internal", time: "10:22:58 AM UTC", country: "SG" }
            ].map((ev) => (
              <div key={ev.id} className="glass-card p-3 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group space-y-1">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                    ev.sev === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {ev.sev}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{ev.country}</span>
                </div>
                <div className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors">{ev.title}</div>
                <div className="text-[11px] text-slate-400">{ev.detail}</div>
                <div className="text-[9px] text-slate-500">{ev.time}</div>
              </div>
            ))}
          </div>

          <button className="w-full py-2 text-center text-xs text-purple-300 hover:text-white font-semibold transition-colors flex items-center justify-center gap-1">
            <span>View all events</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Floating Glass AI Assistant Chat Prompt Bar */}
      <div className="glass-card p-4 rounded-2xl max-w-5xl mx-auto space-y-3 shadow-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/40">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-bold text-white">AI Assistant</span>
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <p className="text-xs text-slate-400">Ask about threats, detections, or data lake telemetry</p>
          </div>
        </div>

        {/* Input Bar */}
        <div className="relative flex items-center">
          <input
            type="text"
            value={aiQuery}
            onChange={(e) => setAiQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendPrompt()}
            placeholder="Ask anything about your threat landscape..."
            className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-all pr-24"
          />
          <div className="absolute right-2 flex items-center space-x-1">
            <button className="p-2 text-slate-400 hover:text-white rounded-lg">
              <Paperclip className="w-4 h-4" />
            </button>
            <button className="p-2 text-slate-400 hover:text-white rounded-lg">
              <Mic className="w-4 h-4" />
            </button>
            <button 
              onClick={() => handleSendPrompt()}
              className="p-2 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white rounded-lg shadow-md transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Prompt Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendPrompt(p)}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-xs text-slate-300 transition-all cursor-pointer flex items-center space-x-1"
            >
              <span>{p}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
