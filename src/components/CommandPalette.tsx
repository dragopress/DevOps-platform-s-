import React, { useState, useEffect, useRef } from "react";
import { ActiveTab, CustomVariables } from "../types";
import { 
  Search, 
  Command, 
  X, 
  Star, 
  ArrowRight, 
  LayoutDashboard, 
  Activity, 
  Bug, 
  Cloud, 
  FileText, 
  GitBranch, 
  Boxes, 
  Globe, 
  Cpu, 
  Server, 
  Terminal, 
  Code2, 
  ShieldCheck, 
  ShieldAlert, 
  Database, 
  Bot, 
  Lock, 
  Layers, 
  Laptop, 
  Workflow, 
  BarChart3, 
  ShoppingBag, 
  Download, 
  Upload, 
  Moon, 
  Sun, 
  CheckCircle2,
  Sparkles
} from "lucide-react";

export interface NavigationItem {
  id: ActiveTab;
  label: string;
  category: "SECURITY" | "CICD" | "TELEMETRY" | "ENTERPRISE" | "DEVTOOLS";
  categoryLabel: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  tags: string[];
}

export const ALL_NAVIGATION_ITEMS: NavigationItem[] = [
  // SECURITY & POSTURE
  { id: "security-dashboard", label: "Security Posture Scorecard", category: "SECURITY", categoryLabel: "Posture & Security", description: "Global threat posture, security scorecard & active alerts", icon: LayoutDashboard, tags: ["scorecard", "risk", "dashboard", "cve", "posture"] },
  { id: "topology", label: "Pipeline Topology Visualizer", category: "SECURITY", categoryLabel: "Posture & Security", description: "Interactive end-to-end architecture & node dataflow topology", icon: Activity, tags: ["graph", "architecture", "d3", "kafka", "pipeline"] },
  { id: "vulnerability-mgmt", label: "Vulnerability Management (CVE)", category: "SECURITY", categoryLabel: "Posture & Security", description: "Scanned vulnerability findings, CVSS scores & quick patching", icon: Bug, tags: ["cve", "patch", "quickpatch", "remediation", "trivy"] },
  { id: "cloud-security", label: "Multi-Cloud & K8s CSPM", category: "SECURITY", categoryLabel: "Posture & Security", description: "AWS, Azure, GCP & Kubernetes compliance posture audit", icon: Cloud, tags: ["cspm", "kspm", "aws", "gcp", "k8s", "kubernetes"] },
  { id: "policy-as-code", label: "Policy as Code Studio (OPA)", category: "SECURITY", categoryLabel: "Posture & Security", description: "OPA Rego policy testing, validator & infrastructure rules", icon: FileText, tags: ["rego", "opa", "policy", "compliance"] },
  { id: "testing-suite", label: "Automated Test Suite Runner", category: "SECURITY", categoryLabel: "Posture & Security", description: "Unit, integration, security regression & benchmark runner", icon: CheckCircle2, tags: ["tests", "unit", "e2e", "benchmark", "qa"] },

  // CI/CD & SUPPLY CHAIN
  { id: "cicd", label: "DevSecOps CI/CD Scanner", category: "CICD", categoryLabel: "CI/CD & Supply Chain", description: "SAST/DAST scan gates, pipeline triggers & build results", icon: GitBranch, tags: ["sast", "dast", "pipeline", "gitleaks", "semgrep"] },
  { id: "supply-chain", label: "Supply Chain & Cosign (SBOM)", category: "CICD", categoryLabel: "CI/CD & Supply Chain", description: "CycloneDX SBOM generator, cosign verification & SCA analysis", icon: Boxes, tags: ["sbom", "cosign", "cyclonedx", "attestation", "sca"] },
  { id: "api-explorer", label: "REST API & Webhooks Explorer", category: "CICD", categoryLabel: "CI/CD & Supply Chain", description: "OpenAPI specification tester & webhook execution logs", icon: Globe, tags: ["openapi", "rest", "swagger", "webhook", "api"] },
  { id: "background-workers", label: "Async Job Queue & Workers", category: "CICD", categoryLabel: "CI/CD & Supply Chain", description: "Worker node pool, job throughput & task queue telemetry", icon: Cpu, tags: ["jobs", "queue", "workers", "throughput", "async"] },
  { id: "deployment-infra", label: "Deployment & Helm Manager", category: "CICD", categoryLabel: "CI/CD & Supply Chain", description: "Multi-cluster Helm charts, rollout status & air-gap controls", icon: Server, tags: ["helm", "deploy", "airgap", "cluster"] },
  { id: "developer-exp", label: "Developer Experience & Tools", category: "CICD", categoryLabel: "CI/CD & Supply Chain", description: "Pre-commit hook validator, CLI diagnostics & DX friction", icon: Terminal, tags: ["cli", "hooks", "linter", "dx"] },
  { id: "terraform", label: "Terraform HCL Inspector", category: "CICD", categoryLabel: "CI/CD & Supply Chain", description: "IaC drift analyzer, Checkov security checks & HCL viewer", icon: Code2, tags: ["terraform", "hcl", "checkov", "drift", "iac"] },

  // THREATS & OBSERVABILITY
  { id: "threat-detection", label: "Live Threat Engine & Sandbox", category: "TELEMETRY", categoryLabel: "Threats & Observability", description: "YARA rule runner, malware sandbox & active event emulator", icon: ShieldCheck, tags: ["sandbox", "yara", "malware", "threats", "emulator"] },
  { id: "observability-siem", label: "SIEM & Log Observability", category: "TELEMETRY", categoryLabel: "Threats & Observability", description: "Elastic-style log search, ingestion metrics & SIEM console", icon: ShieldAlert, tags: ["siem", "logs", "elastic", "eps", "telemetry"] },
  { id: "data-lake", label: "Matano S3 Data Lake", category: "TELEMETRY", categoryLabel: "Threats & Observability", description: "Parquet SQL engine, S3 bucket reader & security lake audit", icon: Database, tags: ["matano", "parquet", "s3", "sql", "lake"] },
  { id: "services", label: "Microservices Repository", category: "TELEMETRY", categoryLabel: "Threats & Observability", description: "gRPC service protos, GraphQL schemas & database specs", icon: Boxes, tags: ["grpc", "graphql", "proto", "microservices"] },

  // ENTERPRISE & AI
  { id: "ai-architect", label: "AI Security Threat Architect", category: "ENTERPRISE", categoryLabel: "Enterprise & AI", description: "Gemini-powered IaC & Dockerfile quick-patch generator", icon: Bot, tags: ["gemini", "ai", "remediation", "patch", "architect"] },
  { id: "reporting-engine", label: "Executive Compliance Reports", category: "ENTERPRISE", categoryLabel: "Enterprise & AI", description: "SOC 2, ISO 27001, HIPAA report generator (PDF & JSON)", icon: FileText, tags: ["reports", "soc2", "iso27001", "hipaa", "pdf"] },
  { id: "access-control", label: "RBAC & Permissions Control", category: "ENTERPRISE", categoryLabel: "Enterprise & AI", description: "Fine-grained permission matrix & SAML/OIDC SSO configuration", icon: Lock, tags: ["rbac", "sso", "saml", "oidc", "permissions"] },
  { id: "saas-architecture", label: "Enterprise SaaS Control Plane", category: "ENTERPRISE", categoryLabel: "Enterprise & AI", description: "Multi-tenant tenant isolation, domain router & licensing", icon: Layers, tags: ["saas", "tenant", "isolation", "licensing"] },
  { id: "martech-commerce", label: "MarTech & B2B Commerce CDP", category: "ENTERPRISE", categoryLabel: "Enterprise & AI", description: "CDP identity graph, automated campaigns & B2B checkout", icon: ShoppingBag, tags: ["cdp", "commerce", "identity", "martech"] },
  { id: "workspace-lowcode", label: "Workspace & Low-Code Canvas", category: "ENTERPRISE", categoryLabel: "Enterprise & AI", description: "Vector drawing canvas, drag-drop app builder & E-Sign", icon: Workflow, tags: ["canvas", "builder", "lowcode", "esign"] },
  { id: "cybersecurity-endpoint", label: "Endpoint Fleet & UEM Ops", category: "ENTERPRISE", categoryLabel: "Enterprise & AI", description: "UEM device health, OS patch rollouts & malware probes", icon: Laptop, tags: ["endpoint", "uem", "fleet", "patching"] },
  { id: "devops-aiops", label: "DevOps Scheduler & AIOps", category: "ENTERPRISE", categoryLabel: "Enterprise & AI", description: "Workload cron scheduler & self-healing log monitor", icon: Workflow, tags: ["aiops", "cron", "scheduler", "selfhealing"] },
  { id: "enterprise-data-analytics", label: "Enterprise DataConnect & SIMD", category: "ENTERPRISE", categoryLabel: "Enterprise & AI", description: "DataConnect ETL builder, SIMD vector store & BI charts", icon: BarChart3, tags: ["analytics", "etl", "simd", "vector", "bi"] }
];

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: ActiveTab;
  onNavigateTab: (tab: ActiveTab) => void;
  favorites: ActiveTab[];
  onToggleFavorite: (tab: ActiveTab) => void;
  onExportConfig: () => void;
  onImportConfig: () => void;
  vars: CustomVariables;
  setVars: React.Dispatch<React.SetStateAction<CustomVariables>>;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  activeTab,
  onNavigateTab,
  favorites,
  onToggleFavorite,
  onExportConfig,
  onImportConfig,
  vars,
  setVars
}) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter items based on query
  const filteredNavItems = ALL_NAVIGATION_ITEMS.filter((item) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.label.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.categoryLabel.toLowerCase().includes(q) ||
      item.tags.some((t) => t.includes(q))
    );
  });

  // Action items
  const quickActions = [
    {
      id: "action-export",
      label: "Export Pipeline Config (JSON)",
      description: "Download JSON configuration and Sigma detection rules",
      icon: Download,
      action: () => {
        onExportConfig();
        onClose();
      }
    },
    {
      id: "action-import",
      label: "Import Pipeline Config (JSON)",
      description: "Upload JSON config file to restore environment",
      icon: Upload,
      action: () => {
        onImportConfig();
        onClose();
      }
    },
    {
      id: "action-env-prod",
      label: "Switch Environment to PROD",
      description: "Change target environment variables to Production",
      icon: Sparkles,
      action: () => {
        setVars((prev) => ({ ...prev, environment: "prod" }));
        onClose();
      }
    },
    {
      id: "action-env-staging",
      label: "Switch Environment to STAGING",
      description: "Change target environment variables to Staging",
      icon: Sparkles,
      action: () => {
        setVars((prev) => ({ ...prev, environment: "staging" }));
        onClose();
      }
    }
  ].filter(act => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return act.label.toLowerCase().includes(q) || act.description.toLowerCase().includes(q);
  });

  const totalResults = filteredNavItems.length + quickActions.length;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (totalResults || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + totalResults) % (totalResults || 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex < filteredNavItems.length) {
        const item = filteredNavItems[selectedIndex];
        if (item) {
          onNavigateTab(item.id);
          onClose();
        }
      } else {
        const actionIdx = selectedIndex - filteredNavItems.length;
        const act = quickActions[actionIdx];
        if (act) {
          act.action();
        }
      }
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden text-slate-100 flex flex-col max-h-[80vh] transition-all"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Header Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-900/90 gap-3">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a module name, CVE, tool, or quick action... (e.g., 'CVE', 'Terraform', 'Export')"
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm focus:outline-none font-medium"
          />
          {query && (
            <button 
              onClick={() => setQuery("")}
              className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono bg-slate-800 border border-slate-700 text-slate-400 rounded">
            <kbd>ESC</kbd> to close
          </span>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 space-y-4 max-h-[60vh] custom-scrollbar">
          {totalResults === 0 ? (
            <div className="p-8 text-center text-slate-400">
              <Command className="w-8 h-8 text-slate-600 mx-auto mb-2 animate-bounce" />
              <p className="text-sm font-semibold text-slate-300">No matching modules or actions found</p>
              <p className="text-xs text-slate-500 mt-1">Try searching for keywords like "Security", "SAST", "Patch", or "OPA"</p>
            </div>
          ) : (
            <>
              {/* Modules List */}
              {filteredNavItems.length > 0 && (
                <div>
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Platform Modules ({filteredNavItems.length})</span>
                    <span className="text-[10px] text-slate-500">Use ↑↓ to navigate • ↵ to select</span>
                  </div>
                  <div className="space-y-1 mt-1">
                    {filteredNavItems.map((item, idx) => {
                      const isSelected = idx === selectedIndex;
                      const isFav = favorites.includes(item.id);
                      const Icon = item.icon;
                      const isActiveCurrent = activeTab === item.id;

                      return (
                        <div
                          key={item.id}
                          onClick={() => {
                            onNavigateTab(item.id);
                            onClose();
                          }}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all cursor-pointer ${
                            isSelected
                              ? "bg-cyan-500/15 border border-cyan-500/40 text-cyan-200 shadow-md"
                              : "hover:bg-slate-800/60 text-slate-300 border border-transparent"
                          }`}
                        >
                          <div className="flex items-center space-x-3 min-w-0 pr-2">
                            <div className={`p-2 rounded-lg shrink-0 ${
                              isSelected
                                ? "bg-cyan-500/20 text-cyan-400"
                                : "bg-slate-800 text-slate-400 group-hover:text-slate-200"
                            }`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center space-x-2">
                                <span className={`font-semibold truncate ${isSelected ? "text-white" : "text-slate-200"}`}>
                                  {item.label}
                                </span>
                                {isActiveCurrent && (
                                  <span className="px-1.5 py-0.2 text-[9px] font-bold rounded bg-cyan-500/30 text-cyan-300 border border-cyan-500/40">
                                    CURRENT
                                  </span>
                                )}
                                <span className="px-1.5 py-0.2 text-[9px] font-mono rounded bg-slate-800 text-slate-400 border border-slate-700">
                                  {item.categoryLabel}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-400 truncate mt-0.5">
                                {item.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 shrink-0">
                            {/* Favorite Star Toggle */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleFavorite(item.id);
                              }}
                              className={`p-1.5 rounded-lg transition-all ${
                                isFav 
                                  ? "text-amber-400 bg-amber-400/10 hover:bg-amber-400/20" 
                                  : "text-slate-500 hover:text-amber-400 hover:bg-slate-800"
                              }`}
                              title={isFav ? "Remove from Favorites" : "Pin to Favorites bar"}
                            >
                              <Star className={`w-3.5 h-3.5 ${isFav ? "fill-amber-400" : ""}`} />
                            </button>
                            <ArrowRight className={`w-3.5 h-3.5 transition-transform ${
                              isSelected ? "text-cyan-400 translate-x-1" : "text-slate-600 opacity-0 group-hover:opacity-100"
                            }`} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quick Actions List */}
              {quickActions.length > 0 && (
                <div className="pt-2 border-t border-slate-800">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    System & Quick Actions
                  </div>
                  <div className="space-y-1 mt-1">
                    {quickActions.map((act, actIdx) => {
                      const overallIdx = filteredNavItems.length + actIdx;
                      const isSelected = overallIdx === selectedIndex;
                      const ActIcon = act.icon;

                      return (
                        <div
                          key={act.id}
                          onClick={act.action}
                          onMouseEnter={() => setSelectedIndex(overallIdx)}
                          className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all cursor-pointer ${
                            isSelected
                              ? "bg-amber-500/15 border border-amber-500/40 text-amber-200 shadow-md"
                              : "hover:bg-slate-800/60 text-slate-300 border border-transparent"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg shrink-0 ${
                              isSelected ? "bg-amber-500/20 text-amber-400" : "bg-slate-800 text-slate-400"
                            }`}>
                              <ActIcon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-semibold text-slate-200">{act.label}</p>
                              <p className="text-[11px] text-slate-400">{act.description}</p>
                            </div>
                          </div>
                          <kbd className="px-2 py-0.5 text-[10px] font-mono bg-slate-800 border border-slate-700 text-slate-400 rounded">
                            ACTION
                          </kbd>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Command Palette Footer */}
        <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] font-mono text-slate-300">⌘K</kbd> / <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] font-mono text-slate-300">Ctrl+K</kbd> to open
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> Star to pin quick link
            </span>
          </div>
          <span className="font-mono text-cyan-400">26 Modules Ready</span>
        </div>
      </div>
    </div>
  );
};
