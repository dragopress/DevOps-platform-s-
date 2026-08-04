import React, { useState } from 'react';
import { CustomVariables, SigmaRule, ActiveTab } from '../types';
import { defaultSigmaRules } from '../data/mockSecurityData';
import { 
  ShieldCheck, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Search, 
  Bell, 
  HelpCircle, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  Maximize2, 
  Plus, 
  Minus, 
  Lock, 
  Database, 
  Cpu, 
  Server, 
  Radio, 
  Sliders,
  ExternalLink,
  Code2,
  GitBranch,
  Boxes,
  UserCheck
} from 'lucide-react';

interface EnterpriseSaasViewProps {
  vars: CustomVariables;
  rules: SigmaRule[];
  liveEps: number;
  onNavigateTab: (tab: ActiveTab) => void;
}

export const EnterpriseSaasView: React.FC<EnterpriseSaasViewProps> = ({
  vars,
  rules,
  liveEps,
  onNavigateTab
}) => {
  const [selectedService, setSelectedService] = useState<string>("CICD Scanner");
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const services = [
    { name: "CICD Scanner", status: "Healthy", tab: "cicd" as ActiveTab },
    { name: "Threat Detection", status: "Healthy", tab: "threat-detection" as ActiveTab },
    { name: "AI Architect", status: "Healthy", tab: "ai-architect" as ActiveTab },
    { name: "Compliance Engine", status: "Healthy", tab: "cicd" as ActiveTab },
    { name: "Policy Orchestrator", status: "Healthy", tab: "saas-architecture" as ActiveTab },
    { name: "Secrets Manager", status: "Healthy", tab: "access-control" as ActiveTab },
    { name: "Data Lake Ingestion", status: "Healthy", tab: "data-lake" as ActiveTab }
  ];

  const tableRules = rules.length > 0 ? rules : defaultSigmaRules;
  const filteredRules = tableRules.filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (r.mitreAttackId && r.mitreAttackId.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="bg-slate-50 text-slate-900 font-sans min-h-screen -mx-4 -my-6 p-6">
      {/* SaaS Light Header */}
      <header className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-md shadow-blue-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">DevSecOps</h1>
            <p className="text-xs text-slate-500">Security Pipeline Studio</p>
          </div>
        </div>

        {/* Header Navigation Pills */}
        <div className="flex items-center space-x-1 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          {[
            { id: "topology", label: "Pipeline Topology", icon: Activity },
            { id: "terraform", label: "Terraform Code", icon: Code2 },
            { id: "threat-detection", label: "Live Threat Engine", icon: ShieldCheck },
            { id: "data-lake", label: "Data Lake", icon: Database },
            { id: "cicd", label: "CI/CD", icon: GitBranch },
            { id: "services", label: "Services", icon: Boxes },
            { id: "saas-architecture", label: "Enterprise Suite", icon: Layers }
          ].map((nav) => {
            const Icon = nav.icon;
            return (
              <button
                key={nav.id}
                onClick={() => onNavigateTab(nav.id as ActiveTab)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-white transition-all flex items-center space-x-1.5 cursor-pointer"
              >
                <Icon className="w-3.5 h-3.5 text-slate-500" />
                <span>{nav.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Header Controls */}
        <div className="flex items-center space-x-3">
          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
            <Bell className="w-4 h-4" />
          </button>
          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
            <HelpCircle className="w-4 h-4" />
          </button>
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-md">
            AD
          </div>
        </div>
      </header>

      {/* Main SaaS Content Area: Sidebar + Grid */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Collapsible Services Sidebar */}
        <div className={`bg-white border border-slate-200 rounded-2xl p-4 shadow-sm transition-all duration-300 ${
          sidebarCollapsed ? "w-16" : "w-full lg:w-64"
        }`}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            {!sidebarCollapsed && <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Services</span>}
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              <ChevronLeft className={`w-4 h-4 transition-transform ${sidebarCollapsed ? "rotate-180" : ""}`} />
            </button>
          </div>

          <div className="space-y-1">
            {services.map((svc) => (
              <button
                key={svc.name}
                onClick={() => {
                  setSelectedService(svc.name);
                  onNavigateTab(svc.tab);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  selectedService === svc.name 
                    ? "bg-blue-50 text-blue-700 font-semibold" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  {!sidebarCollapsed && <span>{svc.name}</span>}
                </div>
                {!sidebarCollapsed && <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
              </button>
            ))}
          </div>
        </div>

        {/* Center Main Stage */}
        <div className="flex-1 space-y-6">
          {/* Top 4 Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Metric 1 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center space-x-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{liveEps.toLocaleString()}</div>
                <div className="text-xs text-slate-500 font-medium">EPS (Events Per Second)</div>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center space-x-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-600">99.9%</div>
                <div className="text-xs text-slate-500 font-medium">Uptime (Last 30 Days)</div>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center space-x-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">7 / 7</div>
                <div className="text-xs text-slate-500 font-medium">Checkov Passed Scans</div>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center space-x-4">
              <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">0</div>
                <div className="text-xs text-slate-500 font-medium">Critical Unresolved Alerts</div>
              </div>
            </div>
          </div>

          {/* Middle Row: Circular Topology Diagram + Sigma Rules Table */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Card: Circular Pipeline Topology Diagram */}
            <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-800">Pipeline Topology</h3>
                <div className="flex items-center space-x-2">
                  <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded border border-slate-200">
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <select className="text-xs border border-slate-200 rounded-lg px-2 py-1 bg-white text-slate-700 font-medium">
                    <option>View: Logical</option>
                    <option>View: Physical</option>
                  </select>
                </div>
              </div>

              {/* Clean Light Circular Topology Map */}
              <div className="relative h-80 bg-slate-50 rounded-xl border border-slate-200 p-4 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full border-2 border-blue-200/80 relative flex items-center justify-center">
                  {[
                    { id: 1, label: "CICD Scanner", icon: GitBranch, angle: 0 },
                    { id: 2, label: "Threat Detection", icon: ShieldCheck, angle: 51 },
                    { id: 3, label: "AI Architect", icon: Cpu, angle: 102 },
                    { id: 4, label: "Compliance Engine", icon: CheckCircle2, angle: 153 },
                    { id: 5, label: "Policy Orchestrator", icon: Lock, angle: 204 },
                    { id: 6, label: "Secrets Manager", icon: Lock, angle: 255 },
                    { id: 7, label: "Data Lake Ingestion", icon: Database, angle: 306 }
                  ].map((node) => {
                    const rad = (node.angle * Math.PI) / 180;
                    const r = 125;
                    const x = r * Math.cos(rad);
                    const y = r * Math.sin(rad);
                    const Icon = node.icon;
                    return (
                      <div 
                        key={node.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
                        style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
                      >
                        <div className="w-10 h-10 rounded-full bg-white border-2 border-blue-400 shadow-md flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-700 mt-1 whitespace-nowrap bg-white/90 px-1.5 py-0.5 rounded shadow-xs border border-slate-200">
                          {node.label}
                        </span>
                        <span className="flex items-center space-x-1 text-[9px] text-emerald-600 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          <span>Healthy</span>
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Controls */}
                <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-white border border-slate-200 rounded-lg p-1 shadow-xs">
                  <button className="p-1 hover:bg-slate-100 rounded text-slate-600"><Plus className="w-3.5 h-3.5" /></button>
                  <button className="p-1 hover:bg-slate-100 rounded text-slate-600"><Minus className="w-3.5 h-3.5" /></button>
                  <button className="p-1 hover:bg-slate-100 rounded text-slate-600"><Maximize2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Total Nodes: 7</span>
                <span className="text-blue-600 font-semibold cursor-pointer flex items-center gap-1">
                  Data / Events Flow <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>

            {/* Right Card: Sigma Rules Data Table */}
            <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-800">Sigma Rules</h3>
                <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  View All Rules <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="p-2.5">Title</th>
                      <th className="p-2.5">Level</th>
                      <th className="p-2.5">Status</th>
                      <th className="p-2.5">MITRE ID</th>
                      <th className="p-2.5">Author</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredRules.slice(0, 6).map((rule) => (
                      <tr key={rule.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-2.5 font-medium text-slate-900">{rule.title}</td>
                        <td className="p-2.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                            rule.level === 'critical' ? 'bg-rose-100 text-rose-700' :
                            rule.level === 'high' ? 'bg-amber-100 text-amber-700' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {rule.level}
                          </span>
                        </td>
                        <td className="p-2.5">
                          <span className="flex items-center space-x-1 text-emerald-600 font-medium text-[11px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            <span>Active</span>
                          </span>
                        </td>
                        <td className="p-2.5 font-mono text-slate-600">{rule.mitreAttackId || 'T1136'}</td>
                        <td className="p-2.5 text-slate-500">{rule.author || 'Sigma HQ'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                <div className="flex items-center space-x-2">
                  <span>Rows per page:</span>
                  <select className="border border-slate-200 rounded px-1.5 py-0.5 bg-white text-slate-700">
                    <option>10</option>
                    <option>25</option>
                  </select>
                </div>
                <div>1-10 of {tableRules.length}</div>
                <div className="flex items-center space-x-1">
                  <button className="p-1 hover:bg-slate-100 rounded text-slate-400"><ChevronLeft className="w-4 h-4" /></button>
                  <button className="p-1 hover:bg-slate-100 rounded text-slate-400"><ChevronRight className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
