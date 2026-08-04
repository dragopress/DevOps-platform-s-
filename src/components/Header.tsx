import React, { useRef, useState, useEffect } from "react";
import { ActiveTab, CustomVariables, SigmaRule, ProjectPackage } from "../types";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { CommandPalette, ALL_NAVIGATION_ITEMS } from "./CommandPalette";
import { 
  ShieldCheck, 
  Code2, 
  Activity, 
  Database, 
  GitBranch, 
  Bot, 
  Lock, 
  Server,
  Zap,
  Download,
  Upload,
  CheckCircle2,
  AlertCircle,
  X,
  Boxes,
  ChevronDown,
  Layers,
  ShoppingBag,
  Laptop,
  Workflow,
  BarChart3,
  LayoutDashboard,
  Bug,
  Cloud,
  FileText,
  Terminal,
  ShieldAlert,
  Globe,
  Cpu,
  Search,
  Star,
  Command,
  SlidersHorizontal,
  Menu
} from "lucide-react";

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  vars: CustomVariables;
  setVars: React.Dispatch<React.SetStateAction<CustomVariables>>;
  liveEps: number;
  rules: SigmaRule[];
  setRules: React.Dispatch<React.SetStateAction<SigmaRule[]>>;
  onImportPackage: (importedData: ProjectPackage) => void;
  isSidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
}

const DEFAULT_FAVORITES: ActiveTab[] = [
  "security-dashboard",
  "vulnerability-mgmt",
  "ai-architect",
  "threat-detection",
  "cicd"
];

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  vars,
  setVars,
  liveEps,
  rules,
  setRules,
  onImportPackage,
  isSidebarCollapsed = false,
  onToggleSidebar
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState<ActiveTab[]>(() => {
    try {
      const saved = localStorage.getItem("secops_favorite_tabs");
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_FAVORITES;
  });

  const toggleFavorite = (tab: ActiveTab) => {
    setFavorites((prev) => {
      let updated: ActiveTab[];
      if (prev.includes(tab)) {
        updated = prev.filter((t) => t !== tab);
      } else {
        updated = [...prev, tab];
      }
      try {
        localStorage.setItem("secops_favorite_tabs", JSON.stringify(updated));
      } catch (err) {
        console.warn("Could not save favorites to localStorage", err);
      }
      return updated;
    });
  };

  // Listen for Cmd+K or Ctrl+K or / keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const categories = [
    { id: "ALL", label: "All Modules", count: ALL_NAVIGATION_ITEMS.length },
    { id: "SECURITY", label: "Posture & Security", count: ALL_NAVIGATION_ITEMS.filter(i => i.category === "SECURITY").length },
    { id: "CICD", label: "CI/CD & Supply Chain", count: ALL_NAVIGATION_ITEMS.filter(i => i.category === "CICD").length },
    { id: "TELEMETRY", label: "Threats & Observability", count: ALL_NAVIGATION_ITEMS.filter(i => i.category === "TELEMETRY").length },
    { id: "ENTERPRISE", label: "Enterprise & AI", count: ALL_NAVIGATION_ITEMS.filter(i => i.category === "ENTERPRISE").length }
  ];

  const filteredTabs = activeCategory === "ALL" 
    ? ALL_NAVIGATION_ITEMS 
    : ALL_NAVIGATION_ITEMS.filter((t) => t.category === activeCategory);

  const handleExportPackage = () => {
    const pkg = {
      version: "1.0.0",
      exportedAt: new Date().toISOString(),
      studio: "DevSecOps Security Pipeline Studio",
      pipelineConfig: vars,
      sigmaRules: rules,
      vars: vars,
      rules: rules,
      activeRuleId: rules[0]?.id
    };

    const blob = new Blob([JSON.stringify(pkg, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `secops-config-${vars.environment}-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setToastMessage({
      type: "success",
      text: `Exported vars configuration & ${rules.length} Sigma rules as JSON!`
    });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);

        const loadedVars = parsed.pipelineConfig || parsed.vars;
        const loadedRules = parsed.sigmaRules || parsed.rules;

        if (!loadedVars && !loadedRules) {
          throw new Error("Invalid JSON file. Missing 'vars'/'pipelineConfig' or 'rules'/'sigmaRules'.");
        }

        const projectPkg: ProjectPackage = {
          version: parsed.version || "1.0.0",
          exportedAt: parsed.exportedAt || new Date().toISOString(),
          studio: parsed.studio || "DevSecOps Security Pipeline Studio",
          pipelineConfig: loadedVars || vars,
          sigmaRules: loadedRules || rules
        };

        onImportPackage(projectPkg);

        const importedRuleCount = (loadedRules && Array.isArray(loadedRules)) ? loadedRules.length : rules.length;
        setToastMessage({
          type: "success",
          text: `Restored configuration! Loaded environment (${(loadedVars && loadedVars.environment) || vars.environment}) with ${importedRuleCount} rules.`
        });
        setTimeout(() => setToastMessage(null), 5000);
      } catch (err: any) {
        setToastMessage({
          type: "error",
          text: `Import failed: ${err.message || "Invalid JSON configuration format."}`
        });
        setTimeout(() => setToastMessage(null), 5000);
      }
    };
    reader.readAsText(file);
    if (e.target) e.target.value = "";
  };

  // Find metadata for current active tab
  const activeTabMeta = ALL_NAVIGATION_ITEMS.find((t) => t.id === activeTab) || ALL_NAVIGATION_ITEMS[0];
  const isCurrentFav = favorites.includes(activeTab);

  return (
    <>
      <header className="bg-slate-900 border-b border-slate-800 text-slate-100 sticky top-0 z-40 shadow-xl">
        {/* Toast Notification Banner */}
        {toastMessage && (
          <div className={`px-4 py-2 border-b text-xs flex items-center justify-between font-mono animate-fade-in ${
            toastMessage.type === 'success' 
              ? 'bg-cyan-950/90 border-cyan-800 text-cyan-200' 
              : 'bg-red-950/90 border-red-800 text-red-200'
          }`}>
            <div className="flex items-center space-x-2">
              {toastMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              )}
              <span>{toastMessage.text}</span>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white cursor-pointer">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Top Banner & Control Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            {onToggleSidebar && (
              <button
                onClick={onToggleSidebar}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                title={isSidebarCollapsed ? "Expand 5 Domain Pillars Sidebar" : "Collapse Sidebar"}
              >
                <Menu className="w-5 h-5 text-cyan-400" />
              </button>
            )}
            <div className="p-2.5 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 rounded-xl text-cyan-400 shadow-inner">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold tracking-tight text-white">
                  DevSecOps Security Pipeline Studio
                </h1>
                <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  PLATFORM READY
                </span>
              </div>
              <p className="text-xs text-slate-400">
                AI Security Review • End-to-End CI/CD Scanning • OPA Policy Engine • SLSA Supply Chain
              </p>
            </div>
          </div>

          {/* Search Trigger & Status Metrics Bar */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            {/* Command Palette Trigger Input / Button */}
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="flex items-center space-x-2.5 px-3 py-1.5 bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl border border-slate-700/80 transition-all cursor-pointer shadow-inner group"
              title="Open Command Palette (⌘K)"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="text-slate-400 text-xs font-medium">Search modules...</span>
              <span className="flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 group-hover:bg-slate-700 border border-slate-700 rounded text-cyan-300">
                <Command className="w-2.5 h-2.5" />K
              </span>
            </button>

            {/* Theme Selector Pill Bar */}
            <ThemeSwitcher variant="header" />

            {/* Live EPS */}
            <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800/80 rounded-lg border border-slate-700/60">
              <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span className="text-slate-400">Throughput:</span>
              <span className="font-mono font-semibold text-amber-300">{liveEps.toLocaleString()} EPS</span>
            </div>

            {/* Security Gate */}
            <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-950/50 rounded-lg border border-emerald-700/50 text-emerald-300">
              <Lock className="w-3.5 h-3.5" />
              <span>Gate:</span>
              <span className="font-semibold text-emerald-400">PASSED</span>
            </div>

            {/* Environment Selector */}
            <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
              {(["dev", "staging", "prod"] as const).map((env) => (
                <button
                  key={env}
                  onClick={() => setVars((prev) => ({ ...prev, environment: env }))}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium uppercase tracking-wider transition-all cursor-pointer ${
                    vars.environment === env
                      ? "bg-cyan-500 text-slate-950 font-bold shadow"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {env}
                </button>
              ))}
            </div>

            {/* Configuration Action Bar */}
            <div className="relative flex items-center space-x-2 pl-2 border-l border-slate-800">
              <button
                onClick={handleExportPackage}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg transition-all border border-slate-700 cursor-pointer text-xs shadow"
                title="Download pipeline configuration and Sigma rules as JSON"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>Export</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg transition-all border border-slate-700 cursor-pointer text-xs shadow"
                title="Upload JSON file to restore configuration"
              >
                <Upload className="w-3.5 h-3.5 text-amber-400" />
                <span>Import</span>
              </button>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".json,application/json"
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Favorites / Quick Links Bar */}
        <div className="bg-slate-950/90 border-t border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar">
            <div className="flex items-center space-x-1 text-[11px] text-amber-400 font-semibold shrink-0 pr-2 border-r border-slate-800">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>Favorites:</span>
            </div>

            {favorites.length === 0 ? (
              <span className="text-slate-500 text-[11px] italic">No pinned modules. Star modules in Command Palette or tabs!</span>
            ) : (
              favorites.map((favId) => {
                const item = ALL_NAVIGATION_ITEMS.find((n) => n.id === favId);
                if (!item) return null;
                const Icon = item.icon;
                const isActive = activeTab === favId;

                return (
                  <button
                    key={favId}
                    onClick={() => setActiveTab(favId)}
                    className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? "bg-amber-400/20 text-amber-200 border border-amber-400/50 font-semibold shadow"
                        : "bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800"
                    }`}
                  >
                    <Icon className={`w-3 h-3 ${isActive ? "text-amber-400" : "text-slate-400"}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })
            )}
          </div>

          {/* Quick Module Dropdown Switcher */}
          <div className="relative shrink-0 flex items-center space-x-2">
            <button
              onClick={() => toggleFavorite(activeTab)}
              className={`p-1 rounded transition-colors cursor-pointer ${
                isCurrentFav ? "text-amber-400 hover:text-amber-300" : "text-slate-500 hover:text-slate-300"
              }`}
              title={isCurrentFav ? "Unpin current tab from favorites" : "Pin current tab to favorites bar"}
            >
              <Star className={`w-4 h-4 ${isCurrentFav ? "fill-amber-400" : ""}`} />
            </button>
            <div className="relative">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value as ActiveTab)}
                className="bg-slate-900 text-slate-300 hover:text-white border border-slate-800 text-[11px] font-medium rounded-lg px-2.5 py-1 pr-6 focus:outline-none focus:border-cyan-500 cursor-pointer appearance-none"
              >
                {ALL_NAVIGATION_ITEMS.map((item) => (
                  <option key={item.id} value={item.id} className="bg-slate-900 text-slate-200">
                    [{item.categoryLabel}] {item.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Grouped Workspace Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Category Group Selector Pills */}
          <div className="flex items-center space-x-1 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? "bg-slate-700 text-white shadow border border-slate-600"
                    : "bg-slate-800/40 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-transparent"
                }`}
              >
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                  activeCategory === cat.id ? "bg-cyan-500/30 text-cyan-200" : "bg-slate-900 text-slate-500"
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Filtered Tabs List */}
          <nav className="flex space-x-1.5 overflow-x-auto no-scrollbar">
            {filteredTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const isFav = favorites.includes(tab.id);

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-md font-semibold"
                      : "bg-slate-850 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-transparent"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-cyan-400" : "text-slate-400 group-hover:text-slate-200"}`} />
                  <span>{tab.label}</span>
                  {isFav && (
                    <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        activeTab={activeTab}
        onNavigateTab={setActiveTab}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        onExportConfig={handleExportPackage}
        onImportConfig={() => fileInputRef.current?.click()}
        vars={vars}
        setVars={setVars}
      />
    </>
  );
};
