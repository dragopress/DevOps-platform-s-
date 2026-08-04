import React, { useRef, useState } from "react";
import { ActiveTab, CustomVariables, SigmaRule, ProjectPackage } from "../types";
import { ThemeSwitcher } from "./ThemeSwitcher";
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
  FileJson,
  CheckCircle2,
  AlertCircle,
  X,
  Boxes,
  ChevronDown,
  Layers,
  ShoppingBag,
  LayoutGrid,
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
  Cpu
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
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  vars,
  setVars,
  liveEps,
  rules,
  setRules,
  onImportPackage
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isConfigMenuOpen, setIsConfigMenuOpen] = useState<boolean>(false);

  const categories = [
    { id: "ALL", label: "All Modules" },
    { id: "SECURITY", label: "Posture & Security" },
    { id: "CICD", label: "CI/CD & Supply Chain" },
    { id: "TELEMETRY", label: "Threats & Observability" },
    { id: "ENTERPRISE", label: "Enterprise & AI" }
  ];

  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  const tabs: { id: ActiveTab; label: string; category: string; icon: React.FC<{ className?: string }> }[] = [
    { id: "security-dashboard", label: "Security Posture", category: "SECURITY", icon: LayoutDashboard },
    { id: "topology", label: "Pipeline Topology", category: "SECURITY", icon: Activity },
    { id: "vulnerability-mgmt", label: "Vulnerability DB", category: "SECURITY", icon: Bug },
    { id: "cloud-security", label: "Multi-Cloud & K8s", category: "SECURITY", icon: Cloud },
    { id: "policy-as-code", label: "Policy as Code (OPA)", category: "SECURITY", icon: FileText },
    { id: "testing-suite", label: "Automated Test Suite", category: "SECURITY", icon: Activity },
    
    { id: "cicd", label: "DevSecOps CI/CD", category: "CICD", icon: GitBranch },
    { id: "supply-chain", label: "Supply Chain & Cosign", category: "CICD", icon: Boxes },
    { id: "api-explorer", label: "REST API & Webhooks", category: "CICD", icon: Globe },
    { id: "background-workers", label: "Async Job Queue", category: "CICD", icon: Cpu },
    { id: "deployment-infra", label: "Deployment & Helm", category: "CICD", icon: Server },
    { id: "developer-exp", label: "Developer CLI & Tools", category: "CICD", icon: Terminal },
    { id: "terraform", label: "Terraform Code", category: "CICD", icon: Code2 },
    
    { id: "threat-detection", label: "Live Threat Engine", category: "TELEMETRY", icon: ShieldCheck },
    { id: "observability-siem", label: "Observability & SIEM", category: "TELEMETRY", icon: ShieldAlert },
    { id: "data-lake", label: "Matano S3 Lake", category: "TELEMETRY", icon: Database },
    { id: "services", label: "Service Repos", category: "TELEMETRY", icon: Boxes },

    { id: "ai-architect", label: "AI Security Architect", category: "ENTERPRISE", icon: Bot },
    { id: "reporting-engine", label: "Enterprise Reports", category: "ENTERPRISE", icon: FileText },
    { id: "access-control", label: "RBAC & Permissions", category: "ENTERPRISE", icon: Lock },
    { id: "saas-architecture", label: "Enterprise SaaS", category: "ENTERPRISE", icon: Layers },
    { id: "cybersecurity-endpoint", label: "Endpoint Ops", category: "ENTERPRISE", icon: Laptop },
    { id: "devops-aiops", label: "DevOps & AIOps", category: "ENTERPRISE", icon: Workflow },
    { id: "enterprise-data-analytics", label: "Data Analytics", category: "ENTERPRISE", icon: BarChart3 }
  ];

  const filteredTabs = activeCategory === "ALL" ? tabs : tabs.filter(t => t.category === activeCategory);

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

  return (
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

      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
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

        {/* Status Metrics Pills & Package Actions */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
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

          {/* Clean Configuration Action Bar */}
          <div className="relative flex items-center space-x-2 pl-2 border-l border-slate-800">
            <button
              onClick={handleExportPackage}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg transition-all border border-slate-700 cursor-pointer text-xs shadow"
              title="Download pipeline configuration and Sigma rules as JSON"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export Config</span>
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

      {/* Navigation Tabs with Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat.id
                  ? "bg-slate-700 text-white shadow"
                  : "bg-slate-800/40 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Filtered Tabs Scroll Bar */}
        <nav className="flex space-x-1.5 overflow-x-auto no-scrollbar">
          {filteredTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-md"
                    : "bg-slate-850 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-cyan-400" : "text-slate-400"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

