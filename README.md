# Enterprise SaaS Multi-Pillar & Microservices Operating Platform

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.1-38bdf8.svg)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.21-000000.svg)](https://expressjs.com/)
[![Gemini AI](https://img.shields.io/badge/Google_Gemini-3.6_Flash-8E44AD.svg)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An enterprise-grade, multi-pillar SaaS control plane and microservices operating platform simulating mission-critical enterprise workflows across **Core Enterprise SaaS (ERP/SCM/HCM/FinTech/MarTech)**, **Workspace & Low-Code Platform**, **Cybersecurity & Endpoint Operations**, **DevOps & Intelligent Operations (AIOps)**, and **Enterprise DataConnect Columnar Analytics**.

---

## 📋 Table of Contents
1. [System Architecture & Pillar Ecosystem](#-system-architecture--pillar-ecosystem)
2. [Complete Directory & File Structure](#-complete-directory--file-structure)
3. [Modules & UI Components Reference](#-modules--ui-components-reference)
4. [Services & Backend API Layer](#-services--backend-api-layer)
5. [Isolated Microservice Repositories](#-isolated-microservice-repositories)
6. [Design Systems & Multi-Theme Engine](#-design-systems--multi-theme-engine)
7. [Type System & Data Models](#-type-system--data-models)
8. [Dependencies & Build Configuration](#-dependencies--build-configuration)
9. [Testing & Quality Assurance Framework](#-testing--quality-assurance-framework)
10. [Recommendations & Enhancement Roadmap](#-recommendations--enhancement-roadmap)
11. [Quickstart & Local Development](#-quickstart--local-development)

---

## 🏛️ System Architecture & Pillar Ecosystem

```
+----------------------------------------------------------------------------------------------------+
|                                ENTERPRISE SAAS CONTROL PLANE                                       |
|               (Multi-Tenant Isolation, RBAC, Tenant Metering & Global Switching)                   |
+----------------------------------------------------------------------------------------------------+
                                                  |
       +--------------------+---------------------+--------------------+--------------------+
       |                    |                     |                    |                    |
       v                    v                     v                    v                    v
+--------------+   +-----------------+   +-----------------+   +------------------+   +------------------+
|  PILLAR 1:   |   |   PILLAR 2:     |   |   PILLAR 3:     |   |    PILLAR 4:     |   |    PILLAR 5:     |
| Enterprise   |   | Workspace &     |   | Cybersecurity & |   | DevOps &         |   | Enterprise Data  |
| Core Suite   |   | Low-Code        |   | Endpoint Ops    |   | Intelligent Ops  |   | & Analytics      |
|              |   |                 |   |                 |   | (AIOps)          |   |                  |
| - ERP Ledger |   | - Collab Canvas |   | - AppSec SAST   |   | - Workload Sched.|   | - DataConnect    |
| - SCM Supply |   | - App Builder   |   | - UEM Agent     |   | - CD Pipelines   |   |   ETL Pipeline   |
| - HCM HR     |   | - E-Signature   |   | - Patch Engine  |   | - Agentic AIOps  |   | - Columnar Query |
| - Core Bank  |   |   Engine        |   |   Auto-Remediat.|   | - Rollback Hooks |   | - BI Dashboard   |
| - MarTech    |   +-----------------+   +-----------------+   +------------------+   +------------------+
+--------------+            |                     |                    |                    |
                            v                     v                    v                    v
                   [ gRPC / GraphQL ]    [ gRPC / GraphQL ]   [ gRPC / GraphQL ]   [ gRPC / GraphQL ]
                            |                     |                    |                    |
                            v                     v                    v                    v
                   +-----------------+   +-----------------+   +------------------+   +------------------+
                   | Repo:           |   | Repo:           |   | Repo:            |   | Repo:            |
                   | workspace-      |   | cybersecurity-  |   | devops-aiops-    |   | enterprise-data- |
                   | lowcode-service |   | endpoint-ops    |   | orchestration    |   | analytics-service|
                   | (Port 50058)    |   | (Port 50059)    |   | (Port 50060)     |   | (Port 50061)     |
                   +-----------------+   +-----------------+   +------------------+   +------------------+
```

---

## 📁 Complete Directory & File Structure

```
.
├── .env.example                     # Environment variable declarations (e.g. GEMINI_API_KEY)
├── .gitignore                        # Git exclusion rules for dependencies & build artifacts
├── README.md                         # Comprehensive project documentation
├── index.html                        # Main HTML entry point served by Vite
├── metadata.json                     # Application metadata, frame permissions & major capabilities
├── package.json                      # Project manifest, dependencies, and build scripts
├── server.ts                         # Custom Express + Vite dev/production full-stack server
├── tsconfig.json                     # TypeScript compiler configuration & strict rules
├── vite.config.ts                    # Vite build tool and Tailwind plugin configuration
├── assets/                           # Static assets & brand media
├── services/                         # Microservice backend repositories
│   ├── ai-architect-service/         # Dockerfile, db-connection.ts, schema.graphql, service.proto
│   ├── cicd-scanner-service/         # Dockerfile, db-connection.ts, schema.graphql, service.proto
│   ├── datalake-s3-service/          # Dockerfile, db-connection.ts, schema.graphql, service.proto
│   ├── policy-compliance-service/    # Dockerfile, db-connection.ts, schema.graphql, service.proto
│   ├── threat-detection-service/     # Dockerfile, db-connection.ts, schema.graphql, service.proto
│   └── topology-architecture-service/# Dockerfile, db-connection.ts, schema.graphql, service.proto
└── src/                              # Client frontend source code
    ├── App.tsx                       # Main React application entry point & view dispatcher
    ├── main.tsx                      # DOM root mount script with ThemeProvider context
    ├── index.css                     # Global CSS entry importing Tailwind CSS
    ├── theme.css                     # Theme engine CSS custom properties (variables)
    ├── types.ts                      # Shared TypeScript definitions, interfaces & enums
    ├── context/
    │   └── ThemeContext.tsx          # React Context state provider for theme switching
    ├── services/
    │   └── aiArchitectService.ts     # Service layer bridging frontend & Gemini remediation API
    ├── utils/
    │   └── sigmaValidator.ts         # SIGMA YAML rule syntax validator & health analyzer
    ├── data/                         # Mock dataset generators & static templates
    │   ├── isolatedServicesData.ts   # Microservice metadata & database specs
    │   ├── mockPlatformData.ts       # Platform KPIs, vulnerabilities, jobs, endpoints
    │   ├── mockSecurityData.ts       # SIEM logs, threat alerts, topology nodes
    │   ├── sigmaTemplateLibrary.ts   # Default SIGMA rule templates
    │   └── terraformFiles.ts         # Sample Terraform HCL code templates
    └── components/                   # 36 Specialized UI Module Components
        ├── AccessControlPanel.tsx            # RBAC, SAML/OIDC SSO & Tenant Isolation
        ├── AiArchitect.tsx                   # AI Threat Modeling & IaC Remediation
        ├── AiSigmaGenerator.tsx              # Natural Language SIGMA Rule Synthesizer
        ├── ApiExplorer.tsx                   # OpenAPI REST & Webhook Tester
        ├── ArchitectureTopology.tsx          # Microservice Topology Visualizer
        ├── BackgroundWorkers.tsx             # Job Queue & Worker Node Monitor
        ├── CiCdScanner.tsx                   # SAST/DAST Pipeline Integration
        ├── CloudSecurityModules.tsx          # CSPM & KSPM Infrastructure Auditor
        ├── CyberpunkSocView.tsx              # Dark High-Density SOC Dashboard
        ├── CybersecurityEndpointModule.tsx   # Endpoint Fleet UEM & Patch Engine
        ├── D3TopologyGraph.tsx               # D3.js Force-Directed Network Graph
        ├── DataLakeWorkbench.tsx             # S3 Audit Logs & Parquet SQL Console
        ├── DeploymentInfra.tsx               # Multi-Cluster Air-Gapped K8s Controls
        ├── DeploymentSimulator.tsx           # Canary & Blue/Green Rollout Engine
        ├── DevOpsAiOpsModule.tsx             # Workload Scheduler & Agentic AIOps
        ├── DeveloperExperience.tsx           # Pre-commit Hooks & DX Security Metrics
        ├── DeveloperIdeView.tsx              # Embedded IDE with Live Linter & Auto-Fixes
        ├── EnterpriseDataAnalyticsModule.tsx # DataConnect ETL & SIMD Vector Store
        ├── EnterpriseSaaSControlPlane.tsx    # Multi-Tenant Control Plane & Licensing
        ├── EnterpriseSaasView.tsx            # Clean Light Corporate SaaS Layout
        ├── GlassmorphismHubView.tsx          # Glassmorphism Modern UI Concept
        ├── Header.tsx                        # Global Navigation & Active View Header
        ├── InfrastructurePolicyCheck.tsx     # OPA Rego Infrastructure Auditor
        ├── MartechCommerceModule.tsx         # CDP Identity Graph & B2B Headless Store
        ├── PolicyAsCodeEngine.tsx            # Policy-as-Code Studio & Validator
        ├── ReportingEngine.tsx               # PDF/JSON Executive Compliance Reports
        ├── SecurityDashboard.tsx             # Global Threat Scorecard & Incident Feed
        ├── SecurityObservability.tsx         # SIEM Log Ingestion & Elastic Console
        ├── ServicesExplorer.tsx              # gRPC/GraphQL Schema Inspector
        ├── SupplyChainSecurity.tsx           # SBOM CycloneDX Generator & SCA
        ├── TerraformInspector.tsx            # HCL IaC Drift Detector & Analyzer
        ├── TestingSuite.tsx                  # E2E & Security Test Suite Runner
        ├── ThemeSwitcher.tsx                 # Real-Time Design Theme Switcher
        ├── ThreatDetectionSandbox.tsx        # YARA/SIGMA Sandbox & Malware Emulator
        ├── VulnerabilityManagement.tsx       # CVE Tracker & Quick-Patch Generator
        └── WorkspaceLowCodeModule.tsx        # Visual App Builder & E-Sign Engine
```

---

## 🧩 Modules & UI Components Reference

### 🏢 1. Core Enterprise SaaS Control Plane (`EnterpriseSaaSControlPlane.tsx`)
* **Functions & State**: `selectedTenant`, `orgMetrics`, `licenseAllocation`
* **Capabilities**: Organization switcher with mandatory tenant scoping, vanity domain routing, license quota enforcement, and double-entry financial ledger summaries.

### 🛍️ 2. MarTech & Commerce Module (`MartechCommerceModule.tsx`)
* **Functions & State**: `activeCampaigns`, `identityGraphNodes`, `checkoutCart`
* **Capabilities**: Customer Data Platform (CDP) identity graph, multi-channel automated campaign trigger orchestrator, headless commerce API sandbox.

### 🎨 3. Workspace & Low-Code Module (`WorkspaceLowCodeModule.tsx`)
* **Functions & State**: `canvasElements`, `formWidgetSchema`, `eSignDocuments`
* **Capabilities**: Vector collaboration canvas, WYSIWYG drag-and-drop web app builder, and SHA-256 cryptographic document e-signature verification engine.

### 🛡️ 4. Cybersecurity & Endpoint Module (`CybersecurityEndpointModule.tsx`)
* **Functions & State**: `endpointFleet`, `agentTelemetry`, `patchQueue`
* **Capabilities**: Unified Endpoint Management (UEM) fleet tracking, OS security compliance enforcement (FileVault/BitLocker), and automated patch rollouts.

### ⚙️ 5. DevOps & Intelligent Operations (AIOps) (`DevOpsAiOpsModule.tsx`)
* **Functions & State**: `scheduledJobs`, `cdPipelines`, `agenticLogs`
* **Capabilities**: Enterprise workload scheduler, multi-cluster continuous deployment pipelines with dual-signoff release controls, and Gemini-driven log diagnostic self-healing engine.

### 📊 6. Enterprise Data & Analytics Module (`EnterpriseDataAnalyticsModule.tsx`)
* **Functions & State**: `etlPipelines`, `columnarQueryMetrics`, `biDashboardWidgets`
* **Capabilities**: Visual ETL DataConnect pipeline builder, memory-aligned SIMD vector query simulator (<15ms latency over 100M rows), and executive BI dashboards.

### ⚡ 7. Vulnerability Management (`VulnerabilityManagement.tsx`)
* **Functions & State**: `vulns`, `patchingVulnId`, `handleQuickPatch()`
* **Capabilities**: CVE score tracking, Jira ticket integration, and one-click AI Architect Quick-Patch generation (Terraform HCL or Dockerfile).

### 🤖 8. AI Threat Architect (`AiArchitect.tsx`)
* **Functions & State**: `threatModelPrompt`, `generatedArchitecture`, `remediationCode`
* **Capabilities**: Natural language threat model generation, attack surface analysis, and interactive DevSecOps assistant.

### 🔍 9. AI SIGMA Rule Synthesizer (`AiSigmaGenerator.tsx`)
* **Functions & State**: `promptText`, `generatedRule`, `handleSynthesize()`
* **Capabilities**: Synthesizes production-ready SIGMA YAML detection rules from raw natural language threat descriptions, with instant syntax validation.

---

## 🛠️ Services & Backend API Layer

### Express Server (`server.ts`)
* **Port & Host**: `3000`, `0.0.0.0`
* **Endpoints**:
  * `GET /api/health`: Health status probe returning `{ status: "ok" }`.
  * `POST /api/ai/generate-remediation`: Invokes `@google/genai` (Gemini 3.6 Flash / Flash Latest) to produce structured JSON containing a Terraform/Dockerfile code snippet and technical remediation explanation.
* **Middleware**: Integrates Vite middleware in development mode and serves static dist bundle in production.

### Frontend Service Layer (`src/services/aiArchitectService.ts`)
* **Exported Functions**:
  * `generateRemediationPatch(vulnerability, type)`: Async function querying `/api/ai/generate-remediation` with automatic fallback to a client-side heuristic patch generator if the server is offline.
  * `generateVulnerabilityRemediation`: Alias wrapper for backward compatibility.

### Utility Modules (`src/utils/sigmaValidator.ts`)
* **Exported Functions**:
  * `validateSigmaRule(yamlContent)`: Parses SIGMA YAML strings, validates mandatory keys (`title`, `logsource`, `detection`, `condition`), checks structure health, and returns actionable syntax error messages.

---

## 📦 Isolated Microservice Repositories

The project includes 6 isolated backend microservice repositories located under `/services/`:

| Microservice Directory | Port | Protocol | Primary Database | Key Schema Files |
| :--- | :--- | :--- | :--- | :--- |
| `ai-architect-service` | 50058 | gRPC + GraphQL | PostgreSQL (`ai_architect_db`) | `service.proto`, `schema.graphql` |
| `cicd-scanner-service` | 50059 | gRPC + GraphQL | PostgreSQL (`cicd_scanner_db`) | `service.proto`, `schema.graphql` |
| `datalake-s3-service` | 50060 | gRPC + GraphQL | PostgreSQL + MinIO | `service.proto`, `schema.graphql` |
| `policy-compliance-service` | 50061 | gRPC + GraphQL | PostgreSQL (`policy_db`) | `service.proto`, `schema.graphql` |
| `threat-detection-service` | 50062 | gRPC + GraphQL | PostgreSQL + Redis | `service.proto`, `schema.graphql` |
| `topology-architecture-service` | 50063 | gRPC + GraphQL | PostgreSQL + Neo4j | `service.proto`, `schema.graphql` |

---

## 🎨 Design Systems & Multi-Theme Engine

The platform features 4 distinct visual themes configured via CSS custom properties in `src/theme.css` and managed by `ThemeContext.tsx`:

1. **Cyberpunk SOC (`cyberpunk`)**: High-contrast dark background (`#050811`), cyan (`#00D4FF`) & neon green (`#00FF88`) typography, JetBrains Mono font family.
2. **Enterprise SaaS (`enterprise`)**: Clean corporate light theme (`#f8fafc`), dark slate headers (`#0f172a`), subtle slate borders (`#e2e8f0`), Inter font family.
3. **Developer-First (`developer`)**: VS Code inspired dark palette (`#1e1e1e`), muted syntax blues (`#9cdcfe`), Fira Code monospace typography.
4. **Glassmorphism (`glassmorphism`)**: Deep violet canvas (`#0d0722`), translucent frosted glass cards (`rgba(255,255,255,0.07)`), purple neon accents (`#8b5cf6`).

---

## 📐 Type System & Data Models

All shared interface models are defined in `src/types.ts`:

* **`ActiveTab`**: Enum string union representing the 27 primary view states.
* **`VulnerabilityItem`**: Data model for security findings (`id`, `cveId`, `severity`, `scanner`, `asset`, `aiFixSnippet`, `ticketId`).
* **`BackgroundJob`**: Model for async scan execution (`id`, `type`, `status`, `progressPercent`, `workerNode`, `logs`).
* **`ApiEndpoint`**: OpenAPI route specification model (`method`, `path`, `summary`, `sampleResponse`).
* **`ScannerEngine`**: Security scanner status model (`id`, `category`, `status`, `activeRulesCount`).

---

## ⚙️ Dependencies & Build Configuration

### Production Dependencies (`package.json`)
* `@google/genai` (^2.4.0): Official Google Gemini AI TypeScript SDK.
* `react` & `react-dom` (^19.0.1): Modern React library.
* `express` (^4.21.2): Server web framework.
* `d3` (^7.9.0): Data-driven document manipulation for network topology graph rendering.
* `motion` (^12.23.24): Framer Motion successor for fluid UI transitions.
* `lucide-react` (^0.546.0): Modern icon library.
* `jszip` (^3.10.1): In-browser ZIP archive generation.

### Build Tools & Scripts
* `npm run dev`: Runs `tsx server.ts` to launch Express + Vite dev server.
* `npm run build`: Bundles client via `vite build` and compiles `server.ts` into a single CommonJS `dist/server.cjs` via `esbuild`.
* `npm run start`: Starts production Node server via `node dist/server.cjs`.
* `npm run lint`: Executes `tsc --noEmit` static type checks.

---

## 🧪 Testing & Quality Assurance Framework

### Automated In-App Test Suite (`src/components/TestingSuite.tsx`)
The platform includes an embedded automated test runner capable of executing 4 categories of tests:

1. **Unit Tests**: Verifies SIGMA validator logic, string utilities, and theme state transitions.
2. **Integration Tests**: Tests `/api/ai/generate-remediation` endpoint connectivity and fallback switching.
3. **Security Regression Tests**: Verifies XSS sanitization, CSP header compliance, and secret redaction.
4. **Performance Benchmark Tests**: Benchmarks D3 force graph layout computations and table rendering cycles.

### Static Analysis
Type-safety is enforced via TypeScript strict checks (`tsc --noEmit`). Run `npm run lint` before committing changes.

---

## 💡 Recommendations & Enhancement Roadmap

### 1. Architectural Enhancements
* **Microservices Protocol Buffers Generation**: Integrate `@grpc/grpc-js` and `protoc` code generation scripts to auto-generate TypeScript interfaces directly from `.proto` definitions.
* **Redis Event Bus**: Implement Redis Pub/Sub for real-time WebSocket state distribution across multi-tenant control plane nodes.

### 2. Security Enhancements
* **OAuth2 / OIDC Authorization Code Flow**: Replace client-side auth mocks with server-side OAuth proxy handling PKCE token exchanges.
* **Vault KMS Integration**: Integrate HashiCorp Vault SDK for dynamic secret rotation in the IaC generator.

### 3. Performance Enhancements
* **Web Workers for SIGMA Analysis**: Offload heavy SIGMA rule parsing and D3 graph force layout computations to background Web Workers.
* **Virtualization**: Apply `@tanstack/react-virtual` to large vulnerability tables (10,000+ findings) for 60fps scrolling performance.

---

## 🚀 Quickstart & Local Development

### Prerequisites
* **Node.js**: `v18.0.0` or higher
* **npm** or **bun**

### 1. Installation
```bash
git clone https://github.com/your-org/enterprise-saas-platform.git
cd enterprise-saas-platform
npm install
```

### 2. Environment Setup
Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```
Add your Gemini API Key to enable AI Architect remediation generation:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 4. Build and Lint
```bash
# Type check codebase
npm run lint

# Build production bundle
npm run build
```

---

## 📄 License
This platform is open-source under the [MIT License](LICENSE).
