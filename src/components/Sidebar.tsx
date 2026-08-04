import React, { useState } from "react";
import { ActiveTab } from "../types";
import { ALL_NAVIGATION_ITEMS, NavigationItem } from "./CommandPalette";
import { 
  Building2, 
  Workflow, 
  ShieldCheck, 
  Cpu, 
  Database, 
  ChevronRight, 
  ChevronDown, 
  ChevronLeft, 
  Menu, 
  Star, 
  Sparkles, 
  Layers, 
  Search, 
  SlidersHorizontal,
  Bookmark
} from "lucide-react";

export interface DomainPillar {
  id: string;
  title: string;
  subtitle: string;
  icon: React.FC<{ className?: string }>;
  badge: string;
  color: string;
  textColor: string;
  bgGlow: string;
  tabIds: ActiveTab[];
}

export const DOMAIN_PILLARS: DomainPillar[] = [
  {
    id: "pillar-enterprise",
    title: "1. Core Enterprise SaaS",
    subtitle: "ERP, SCM, HCM, FinTech, MarTech & Control Plane",
    icon: Building2,
    badge: "4 Modules",
    color: "from-blue-500 to-indigo-600",
    textColor: "text-blue-400",
    bgGlow: "bg-blue-500/10 border-blue-500/30",
    tabIds: ["saas-architecture", "martech-commerce", "access-control", "reporting-engine"]
  },
  {
    id: "pillar-workspace",
    title: "2. Workspace & Low-Code",
    subtitle: "Vector Canvas, Visual App Builder & E-Sign",
    icon: Workflow,
    badge: "3 Modules",
    color: "from-purple-500 to-pink-600",
    textColor: "text-purple-400",
    bgGlow: "bg-purple-500/10 border-purple-500/30",
    tabIds: ["workspace-lowcode", "developer-exp", "api-explorer"]
  },
  {
    id: "pillar-cybersecurity",
    title: "3. Cybersecurity & Endpoint",
    subtitle: "SOC, CVE Tracker, SAST/DAST, UEM & AI Threat Architect",
    icon: ShieldCheck,
    badge: "9 Modules",
    color: "from-cyan-500 to-emerald-600",
    textColor: "text-cyan-400",
    bgGlow: "bg-cyan-500/10 border-cyan-500/30",
    tabIds: [
      "security-dashboard",
      "vulnerability-mgmt",
      "ai-architect",
      "cloud-security",
      "cybersecurity-endpoint",
      "threat-detection",
      "observability-siem",
      "policy-as-code",
      "supply-chain"
    ]
  },
  {
    id: "pillar-devops",
    title: "4. DevOps & Intelligent AIOps",
    subtitle: "AIOps Scheduler, CI/CD, Helm & IaC Drift Detector",
    icon: Cpu,
    badge: "5 Modules",
    color: "from-amber-500 to-orange-600",
    textColor: "text-amber-400",
    bgGlow: "bg-amber-500/10 border-amber-500/30",
    tabIds: ["devops-aiops", "cicd", "deployment-infra", "terraform", "background-workers"]
  },
  {
    id: "pillar-analytics",
    title: "5. Enterprise Data & Analytics",
    subtitle: "DataConnect ETL, S3 Lake, Topology & Testing Suite",
    icon: Database,
    badge: "5 Modules",
    color: "from-emerald-500 to-teal-600",
    textColor: "text-emerald-400",
    bgGlow: "bg-emerald-500/10 border-emerald-500/30",
    tabIds: ["enterprise-data-analytics", "data-lake", "topology", "services", "testing-suite"]
  }
];

interface SidebarProps {
  activeTab: ActiveTab;
  onNavigateTab: (tab: ActiveTab) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  favorites: ActiveTab[];
  onToggleFavorite: (tab: ActiveTab) => void;
  onOpenCommandPalette: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onNavigateTab,
  isCollapsed,
  onToggleCollapse,
  favorites,
  onToggleFavorite,
  onOpenCommandPalette
}) => {
  // Keep track of expanded pillar sections in sidebar
  const [expandedPillars, setExpandedPillars] = useState<Record<string, boolean>>({
    "pillar-enterprise": true,
    "pillar-workspace": true,
    "pillar-cybersecurity": true,
    "pillar-devops": true,
    "pillar-analytics": true
  });

  const togglePillar = (pillarId: string) => {
    setExpandedPillars((prev) => ({
      ...prev,
      [pillarId]: !prev[pillarId]
    }));
  };

  // Find active pillar
  const activePillar = DOMAIN_PILLARS.find((p) => p.tabIds.includes(activeTab)) || DOMAIN_PILLARS[2];

  return (
    <aside
      className={`relative z-30 flex flex-col bg-slate-900/95 border-r border-slate-800 text-slate-100 transition-all duration-300 select-none ${
        isCollapsed ? "w-16" : "w-72"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-3.5 border-b border-slate-800/90 bg-slate-950/60">
        {!isCollapsed ? (
          <div className="flex items-center space-x-2.5 overflow-hidden">
            <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider truncate">
                5 Domain Pillars
              </h2>
              <p className="text-[10px] text-slate-400 truncate">SaaS & DevSecOps Platform</p>
            </div>
          </div>
        ) : (
          <div className="mx-auto p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Layers className="w-4 h-4" />
          </div>
        )}

        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
          title={isCollapsed ? "Expand Sidebar (27 Modules)" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Quick Search Button in Sidebar */}
      {!isCollapsed && (
        <div className="p-2.5 border-b border-slate-800/80">
          <button
            onClick={onOpenCommandPalette}
            className="w-full flex items-center justify-between px-3 py-2 bg-slate-950/80 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs text-slate-400 hover:text-slate-200 transition-all cursor-pointer group"
          >
            <span className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span>Search 26 views...</span>
            </span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 border border-slate-700 rounded text-slate-300">⌘K</kbd>
          </button>
        </div>
      )}

      {/* Domain Pillars List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-3">
        {DOMAIN_PILLARS.map((pillar) => {
          const PillarIcon = pillar.icon;
          const isPillarActive = pillar.tabIds.includes(activeTab);
          const isExpanded = expandedPillars[pillar.id] ?? true;
          const pillarItems = ALL_NAVIGATION_ITEMS.filter((item) => pillar.tabIds.includes(item.id));

          if (isCollapsed) {
            // Icon-only collapsed rail view
            return (
              <div key={pillar.id} className="relative group flex flex-col items-center">
                <button
                  onClick={() => {
                    // Navigate to first item in this pillar if not currently active
                    if (!isPillarActive && pillar.tabIds[0]) {
                      onNavigateTab(pillar.tabIds[0]);
                    }
                  }}
                  className={`p-2.5 rounded-xl transition-all cursor-pointer relative ${
                    isPillarActive
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-lg"
                      : "hover:bg-slate-800/80 text-slate-400 hover:text-slate-200"
                  }`}
                  title={`${pillar.title} - ${pillar.subtitle}`}
                >
                  <PillarIcon className="w-5 h-5" />
                  {isPillarActive && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  )}
                </button>

                {/* Collapsed Tooltip Submenu */}
                <div className="absolute left-full top-0 ml-2 hidden group-hover:flex flex-col bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 w-64 z-50 text-xs animate-fade-in">
                  <div className="pb-2 mb-2 border-b border-slate-800">
                    <p className={`font-bold ${pillar.textColor}`}>{pillar.title}</p>
                    <p className="text-[10px] text-slate-400">{pillar.subtitle}</p>
                  </div>
                  <div className="space-y-1">
                    {pillarItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => onNavigateTab(item.id)}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                            isActive
                              ? "bg-cyan-500/20 text-cyan-200 font-semibold border border-cyan-500/40"
                              : "hover:bg-slate-800 text-slate-300"
                          }`}
                        >
                          <span className="flex items-center gap-2 truncate">
                            <Icon className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{item.label}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          }

          // Fully expanded sidebar pillar block
          return (
            <div
              key={pillar.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isPillarActive
                  ? pillar.bgGlow + " shadow-md"
                  : "bg-slate-950/40 border-slate-800/80 hover:border-slate-700/80"
              }`}
            >
              {/* Pillar Header Accordion Button */}
              <button
                onClick={() => togglePillar(pillar.id)}
                className="w-full flex items-center justify-between p-3 text-left transition-all cursor-pointer hover:bg-slate-850/50"
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <div
                    className={`p-2 rounded-xl bg-gradient-to-br ${pillar.color} text-white shadow-sm shrink-0`}
                  >
                    <PillarIcon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className={`text-xs font-bold truncate ${isPillarActive ? "text-white" : "text-slate-200"}`}>
                      {pillar.title}
                    </h3>
                    <p className="text-[10px] text-slate-400 truncate">{pillar.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5 shrink-0 ml-1">
                  <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-slate-900 border border-slate-700/80 text-slate-400">
                    {pillar.badge}
                  </span>
                  <div className="text-slate-400 hover:text-white transition-transform">
                    {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  </div>
                </div>
              </button>

              {/* Sub-navigation Items */}
              {isExpanded && (
                <div className="p-1.5 pt-0 space-y-0.5 border-t border-slate-800/40">
                  {pillarItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    const isFav = favorites.includes(item.id);

                    return (
                      <div
                        key={item.id}
                        className={`group relative flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-all cursor-pointer ${
                          isActive
                            ? "bg-cyan-500/25 text-cyan-200 font-semibold border border-cyan-500/50 shadow-inner"
                            : "hover:bg-slate-800/70 text-slate-300 border border-transparent"
                        }`}
                        onClick={() => onNavigateTab(item.id)}
                      >
                        <div className="flex items-center space-x-2.5 min-w-0 pr-1">
                          <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-cyan-400" : "text-slate-400 group-hover:text-slate-200"}`} />
                          <span className="truncate text-[11px] font-medium">{item.label}</span>
                        </div>

                        <div className="flex items-center space-x-1 shrink-0">
                          {isFav && (
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" title="Pinned to Favorites" />
                          )}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleFavorite(item.id);
                            }}
                            className={`p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-700 text-slate-400 hover:text-amber-400`}
                            title={isFav ? "Unpin Favorite" : "Pin Favorite"}
                          >
                            <Star className={`w-3 h-3 ${isFav ? "fill-amber-400 text-amber-400" : ""}`} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sidebar Footer */}
      {!isCollapsed && (
        <div className="p-3 border-t border-slate-800 bg-slate-950/80 text-[10px] text-slate-400 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>26 Active Modules</span>
          </span>
          <span className="font-mono text-slate-500">v1.0.0</span>
        </div>
      )}
    </aside>
  );
};
