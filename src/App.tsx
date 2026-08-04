import React, { useState, useEffect } from "react";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { Header } from "./components/Header";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { CyberpunkSocView } from "./components/CyberpunkSocView";
import { EnterpriseSaasView } from "./components/EnterpriseSaasView";
import { DeveloperIdeView } from "./components/DeveloperIdeView";
import { GlassmorphismHubView } from "./components/GlassmorphismHubView";
import { ArchitectureTopology } from "./components/ArchitectureTopology";
import { SecurityDashboard } from "./components/SecurityDashboard";
import { VulnerabilityManagement } from "./components/VulnerabilityManagement";
import { CloudSecurityModules } from "./components/CloudSecurityModules";
import { PolicyAsCodeEngine } from "./components/PolicyAsCodeEngine";
import { SupplyChainSecurity } from "./components/SupplyChainSecurity";
import { DeveloperExperience } from "./components/DeveloperExperience";
import { SecurityObservability } from "./components/SecurityObservability";
import { TerraformInspector } from "./components/TerraformInspector";
import { ThreatDetectionSandbox } from "./components/ThreatDetectionSandbox";
import { DataLakeWorkbench } from "./components/DataLakeWorkbench";
import { CiCdScanner } from "./components/CiCdScanner";
import { ServicesExplorer } from "./components/ServicesExplorer";
import { EnterpriseSaaSControlPlane } from "./components/EnterpriseSaaSControlPlane";
import { MartechCommerceModule } from "./components/MartechCommerceModule";
import { WorkspaceLowCodeModule } from "./components/WorkspaceLowCodeModule";
import { CybersecurityEndpointModule } from "./components/CybersecurityEndpointModule";
import { DevOpsAiOpsModule } from "./components/DevOpsAiOpsModule";
import { EnterpriseDataAnalyticsModule } from "./components/EnterpriseDataAnalyticsModule";
import { AccessControlPanel } from "./components/AccessControlPanel";
import { AiArchitect } from "./components/AiArchitect";
import { ApiExplorer } from "./components/ApiExplorer";
import { BackgroundWorkers } from "./components/BackgroundWorkers";
import { DeploymentInfra } from "./components/DeploymentInfra";
import { TestingSuite } from "./components/TestingSuite";
import { ReportingEngine } from "./components/ReportingEngine";
import { CustomVariables, SigmaRule, ActiveTab } from "./types";
import { initialPipelineNodes, defaultSigmaRules, icebergTables, checkovResults } from "./data/mockSecurityData";

const AppContent: React.FC = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<ActiveTab>("topology");
  const [selectedNodeId, setSelectedNodeId] = useState<string>("msk-kafka");
  const [selectedTerraformModule, setSelectedTerraformModule] = useState<string>("networking");
  const [liveEps, setLiveEps] = useState<number>(18450);

  const [vars, setVars] = useState<CustomVariables>({
    awsRegion: "us-east-1",
    environment: "prod",
    mskClusterArn: "arn:aws:kafka:us-east-1:111122223333:cluster/secops-msk/a1b2c3d4",
    mskTopicName: "secops.telemetry.events.v1",
    eksClusterName: "secops-pipeline-prod-eks",
    vectorNamespace: "secops-telemetry",
    sigmaS3Bucket: "secops-pipeline-prod-sigma-rules",
    matanoS3Bucket: "secops-pipeline-prod-lake-storage",
    checkovFailOnSeverity: "HIGH",
    codePipelineName: "secops-pipeline-prod-cicd"
  });

  const [rules, setRules] = useState<SigmaRule[]>(defaultSigmaRules);

  // Live EPS Fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveEps(prev => Math.floor(prev + (Math.random() * 300 - 150)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenTerraformModule = (moduleName: string) => {
    setSelectedTerraformModule(moduleName);
    setActiveTab("terraform");
  };

  // Render content based on current theme and selected activeTab
  const renderMainView = () => {
    // Top-level View Theme defaults
    if (activeTab === "topology") {
      switch (theme) {
        case "glassmorphism":
          return (
            <GlassmorphismHubView
              vars={vars}
              rules={rules}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          );
        case "enterprise":
          return (
            <EnterpriseSaasView
              vars={vars}
              rules={rules}
              liveEps={liveEps}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          );
        case "developer":
          return (
            <DeveloperIdeView
              vars={vars}
              rules={rules}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onOpenTerraformModule={handleOpenTerraformModule}
            />
          );
        case "cyberpunk":
        default:
          return (
            <CyberpunkSocView
              vars={vars}
              rules={rules}
              liveEps={liveEps}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onOpenTerraformModule={handleOpenTerraformModule}
            />
          );
      }
    }

    // Specific Module Tab views
    switch (activeTab) {
      case "security-dashboard":
        return <SecurityDashboard liveEps={liveEps} rulesCount={rules.length} onNavigate={setActiveTab} />;
      case "vulnerability-mgmt":
        return <VulnerabilityManagement onOpenTerraform={handleOpenTerraformModule} />;
      case "cloud-security":
        return <CloudSecurityModules vars={vars} onNavigate={setActiveTab} />;
      case "policy-as-code":
        return <PolicyAsCodeEngine rules={rules} checkovResults={checkovResults} />;
      case "supply-chain":
        return <SupplyChainSecurity vars={vars} onOpenTerraform={handleOpenTerraformModule} />;
      case "developer-exp":
        return <DeveloperExperience onNavigate={setActiveTab} />;
      case "observability-siem":
        return <SecurityObservability liveEps={liveEps} rules={rules} />;
      case "terraform":
        return (
          <TerraformInspector
            selectedModule={selectedTerraformModule}
            onSelectModule={setSelectedTerraformModule}
            vars={vars}
            onUpdateVars={setVars}
          />
        );
      case "threat-detection":
        return (
          <ThreatDetectionSandbox
            rules={rules}
            onAddRule={(newRule) => setRules(prev => [newRule, ...prev])}
            liveEps={liveEps}
          />
        );
      case "data-lake":
        return <DataLakeWorkbench tables={icebergTables} vars={vars} />;
      case "cicd":
        return <CiCdScanner vars={vars} checkovResults={checkovResults} onNavigate={setActiveTab} />;
      case "services":
        return <ServicesExplorer onOpenTerraform={handleOpenTerraformModule} />;
      case "saas-architecture":
        return <EnterpriseSaaSControlPlane onNavigate={setActiveTab} />;
      case "martech-commerce":
        return <MartechCommerceModule onNavigate={setActiveTab} />;
      case "workspace-lowcode":
        return <WorkspaceLowCodeModule onNavigate={setActiveTab} />;
      case "cybersecurity-endpoint":
        return <CybersecurityEndpointModule onNavigate={setActiveTab} />;
      case "devops-aiops":
        return <DevOpsAiOpsModule onNavigate={setActiveTab} />;
      case "enterprise-data-analytics":
        return <EnterpriseDataAnalyticsModule onNavigate={setActiveTab} />;
      case "access-control":
        return <AccessControlPanel onNavigate={setActiveTab} />;
      case "ai-architect":
        return (
          <AiArchitect
            vars={vars}
            onGenerateRule={(newRule) => setRules(prev => [newRule, ...prev])}
            onNavigate={setActiveTab}
          />
        );
      case "api-explorer":
        return <ApiExplorer />;
      case "background-workers":
        return <BackgroundWorkers />;
      case "deployment-infra":
        return <DeploymentInfra />;
      case "testing-suite":
        return <TestingSuite />;
      case "reporting-engine":
        return <ReportingEngine />;
      default:
        return (
          <ArchitectureTopology
            nodes={initialPipelineNodes}
            selectedNodeId={selectedNodeId}
            onSelectNode={setSelectedNodeId}
            vars={vars}
            onOpenTerraform={handleOpenTerraformModule}
          />
        );
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300 bg-[var(--color-bg-primary,#050811)] text-[var(--color-text-primary,#00D4FF)]">
      {/* Universal Header with Module Navigation & Quick Configuration */}
      <Header
        vars={vars}
        onUpdateVars={setVars}
        rules={rules}
        onUpdateRules={setRules}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        liveEps={liveEps}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderMainView()}
      </main>

      {/* Floating Theme Switcher Bar (Quickly toggle between Cyberpunk SOC, Enterprise SaaS, Developer IDE, Glassmorphism Hub) */}
      <ThemeSwitcher variant="floating" />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
