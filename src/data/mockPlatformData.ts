import { VulnerabilityItem, CloudSecurityFinding, PolicyRule, SbomItem, AuditLogEntry, ScannerEngine, BackgroundJob, ApiEndpoint, CicdPipelineGate, ObservabilityMetric } from "../types";

export const sampleVulnerabilities: VulnerabilityItem[] = [
  {
    id: "VULN-101",
    cveId: "CVE-2024-3094",
    cwe: "CWE-506: Embedded Malicious Code",
    title: "XZ Utils Backdoor Remote Code Execution",
    severity: "CRITICAL",
    cvssScore: 10.0,
    scanner: "Trivy (Container/SCA)",
    asset: "k8s-vector-worker:v2.18.4",
    project: "Core Data Platform",
    repository: "github.com/dragopress/vector-ingest",
    branch: "main",
    commit: "9f8e71b",
    packageName: "xz-utils",
    installedVersion: "5.6.0-1",
    fixedVersion: "5.6.1-1",
    status: "Open",
    assignee: "alex.devsecops@company.com",
    dueDate: "2026-08-06",
    mttrDays: 1.5,
    remediation: "Upgrade xz-utils package to version 5.6.1-1 or rebuild image from alpine:3.19 base.",
    aiExplanation: "The XZ Utils backdoor injects malicious code during build time into liblzma, allowing SSH authentication bypass. Immediate version bump required.",
    aiFixSnippet: "# Dockerfile fix\nRUN apk update && apk add --no-cache xz-utils>=5.6.1-r0",
    ticketId: "SEC-4892",
    createdAt: "2026-08-01T10:14:00Z"
  },
  {
    id: "VULN-102",
    cveId: "CVE-2023-4863",
    cwe: "CWE-122: Heap-based Buffer Overflow",
    title: "Heap Buffer Overflow in libwebp",
    severity: "CRITICAL",
    cvssScore: 9.8,
    scanner: "Semgrep (SAST)",
    asset: "auth-service-repo",
    project: "Identity & Access",
    repository: "github.com/dragopress/auth-service",
    branch: "release/v2.4",
    commit: "4a2c110",
    packageName: "libwebp",
    installedVersion: "1.3.1",
    fixedVersion: "1.3.2",
    status: "In Progress",
    assignee: "sarah.sec@company.com",
    dueDate: "2026-08-07",
    mttrDays: 2.0,
    remediation: "Update libwebp dependency to >= 1.3.2 in package.json.",
    aiExplanation: "Out-of-bounds write in Huffman coding rendering logic allows arbitrary code execution via crafted WebP images.",
    aiFixSnippet: "// package.json\n\"dependencies\": {\n  \"libwebp\": \"^1.3.2\"\n}",
    ticketId: "SEC-4811",
    createdAt: "2026-08-02T14:22:00Z"
  },
  {
    id: "VULN-103",
    cveId: "SECRET-AWS-001",
    cwe: "CWE-798: Use of Hard-coded Credentials",
    title: "AWS Access Key Hardcoded in Git History",
    severity: "CRITICAL",
    cvssScore: 9.5,
    scanner: "Gitleaks (Secrets)",
    asset: "payment-service/config/aws.go",
    project: "Payment Infrastructure",
    repository: "github.com/dragopress/payment-service",
    branch: "main",
    commit: "8c71b0a",
    status: "Open",
    assignee: "lead-devops@company.com",
    dueDate: "2026-08-05",
    mttrDays: 0.5,
    remediation: "Revoke AWS key AKIAIOSFODNN7EXAMPLE immediately and rotate credentials using AWS Secrets Manager.",
    aiExplanation: "Plaintext AWS IAM credentials detected in commit history. Exposed keys must be revoked immediately via AWS CLI.",
    aiFixSnippet: "// Use AWS SDK IAM role / environment variable lookup\ncfg, err := config.LoadDefaultConfig(ctx)",
    ticketId: "SEC-4901",
    createdAt: "2026-08-03T09:05:00Z"
  },
  {
    id: "VULN-104",
    cveId: "CVE-2024-21626",
    cwe: "CWE-403: Exposure of File Descriptor",
    title: "runc Container Escape via Leaked File Descriptor",
    severity: "HIGH",
    cvssScore: 8.6,
    scanner: "Grype",
    asset: "eks-node-group-alpha",
    project: "Container Platform",
    repository: "github.com/dragopress/k8s-infra",
    branch: "main",
    commit: "1b4e209",
    packageName: "runc",
    installedVersion: "1.1.11",
    fixedVersion: "1.1.12",
    status: "In Progress",
    assignee: "k8s-admin@company.com",
    dueDate: "2026-08-10",
    mttrDays: 3.2,
    remediation: "Update runc container runtime on EKS worker nodes to >= 1.1.12.",
    aiExplanation: "Attacker inside container can exploit working directory file descriptors to access host filesystem.",
    aiFixSnippet: "# Cluster node patch script\nsudo apt-get install --only-upgrade runc",
    ticketId: "SEC-4720",
    createdAt: "2026-08-02T18:30:00Z"
  },
  {
    id: "VULN-105",
    cveId: "CWE-89-CODEQL-01",
    cwe: "CWE-89: SQL Injection",
    title: "Unsanitized User Input in SQL Query Execution",
    severity: "HIGH",
    cvssScore: 8.8,
    scanner: "CodeQL",
    asset: "user-service/db/queries.ts",
    project: "User Management",
    repository: "github.com/dragopress/user-service",
    branch: "feature/search",
    commit: "3d91f2c",
    status: "Open",
    assignee: "frontend-lead@company.com",
    dueDate: "2026-08-08",
    mttrDays: 2.5,
    remediation: "Replace string interpolation with parameterized db.query($1, [input]) format.",
    aiExplanation: "Direct string concatenation into raw SQL queries creates a high-risk blind SQL injection vector.",
    aiFixSnippet: "// Use parameterized prepared statements\nconst result = await db.query('SELECT * FROM users WHERE email = $1', [email]);",
    ticketId: "SEC-4912",
    createdAt: "2026-08-04T07:15:00Z"
  },
  {
    id: "VULN-106",
    cveId: "CVE-2023-30533",
    cwe: "CWE-1321: Prototype Pollution",
    title: "Prototype Pollution in SheetJS / xlsx dependency",
    severity: "MEDIUM",
    cvssScore: 6.5,
    scanner: "OWASP Dependency-Check",
    asset: "analytics-reporting/package.json",
    project: "Analytics Engine",
    repository: "github.com/dragopress/analytics-reporting",
    branch: "main",
    commit: "6f120aa",
    packageName: "xlsx",
    installedVersion: "0.18.5",
    fixedVersion: "0.19.3",
    status: "Open",
    assignee: "data-eng@company.com",
    dueDate: "2026-08-14",
    mttrDays: 4.1,
    remediation: "Upgrade xlsx package to version 0.19.3 or sanitize object prototypes.",
    aiExplanation: "Specially crafted spreadsheet files can modify Object.prototype leading to denial of service or property injection.",
    aiFixSnippet: "npm install xlsx@0.19.3 --save-exact",
    ticketId: "SEC-4940",
    createdAt: "2026-08-03T11:45:00Z"
  },
  {
    id: "VULN-107",
    cveId: "NET-NMAP-01",
    cwe: "CWE-284: Improper Access Control",
    title: "Open Redis Port 6379 Exposed Without Authentication",
    severity: "HIGH",
    cvssScore: 8.1,
    scanner: "Nmap (Network)",
    asset: "10.0.4.15:6379 (Internal Cache Cluster)",
    project: "Infrastructure Ops",
    repository: "github.com/dragopress/network-topology",
    branch: "main",
    commit: "2e90f11",
    status: "Open",
    assignee: "net-sec@company.com",
    dueDate: "2026-08-07",
    mttrDays: 1.1,
    remediation: "Enable requirepass authentication in redis.conf and restrict security group access.",
    aiExplanation: "Unauthenticated Redis port allows remote attackers to read/write cached data and execute command injections.",
    aiFixSnippet: "# redis.conf\nrequirepass <STRONG_GENERATED_SECRET>\nbind 127.0.0.1",
    ticketId: "SEC-4955",
    createdAt: "2026-08-04T09:30:00Z"
  },
  {
    id: "VULN-108",
    cveId: "ZAP-SQLI-04",
    cwe: "CWE-89: SQL Injection",
    title: "SQL Injection in User Search Endpoint",
    severity: "HIGH",
    cvssScore: 8.2,
    scanner: "OWASP ZAP (DAST)",
    asset: "https://api.devsecops.internal/v1/users/search",
    project: "Public API Gateway",
    repository: "github.com/dragopress/api-gateway",
    branch: "main",
    commit: "7d018bb",
    status: "Open",
    assignee: "sec-ops@company.com",
    dueDate: "2026-08-08",
    mttrDays: 2.8,
    remediation: "Use parameterized SQL queries or ORM input sanitization instead of string concatenation.",
    aiExplanation: "Dynamic DAST fuzzing injected single quotes resulting in database error stack trace revealing table schema.",
    aiFixSnippet: "const query = db.select('*').from('users').where({ search_term: req.query.q });",
    ticketId: "SEC-4933",
    createdAt: "2026-08-04T08:12:00Z"
  }
];

export const sampleScannerEngines: ScannerEngine[] = [
  { id: "SCAN-SEMGREP", name: "Semgrep (SAST)", category: "SAST", version: "v1.72.0", status: "ONLINE", activeRulesCount: 1420, description: "Fast lightweight static analysis engine for code syntax pattern matching.", supportedLanguages: ["TypeScript", "Go", "Python", "Java", "Ruby", "C#"] },
  { id: "SCAN-CODEQL", name: "CodeQL", category: "SAST", version: "v2.16.2", status: "ONLINE", activeRulesCount: 890, description: "Deep semantic dataflow and taint tracking query engine.", supportedLanguages: ["C/C++", "C#", "Go", "Java", "JavaScript/TypeScript", "Python"] },
  { id: "SCAN-TRIVY", name: "Trivy (Container/SCA)", category: "Container", version: "v0.49.1", status: "SCANNING", activeRulesCount: 45000, description: "Comprehensive scanner for OS packages, application dependencies, and container images.", supportedLanguages: ["Docker", "Alpine", "Debian", "npm", "PyPI", "Go modules"] },
  { id: "SCAN-GITLEAKS", name: "Gitleaks (Secrets)", category: "Secrets", version: "v8.18.2", status: "ONLINE", activeRulesCount: 160, description: "High performance secret detection scanner for git history, environment variables, and files.", supportedLanguages: ["All Text Files", "Git Commits"] },
  { id: "SCAN-OWASP-DEP", name: "OWASP Dependency-Check", category: "SCA", version: "v9.0.9", status: "ONLINE", activeRulesCount: 32000, description: "Software Composition Analysis tool detecting disclosure of publicly disclosed vulnerabilities.", supportedLanguages: ["Java", "Node.js", "Python", "Ruby", "NET"] },
  { id: "SCAN-GRYPE", name: "Grype", category: "SCA", version: "v0.74.0", status: "ONLINE", activeRulesCount: 41000, description: "Vulnerability scanner for container images and filesystems created by Anchore.", supportedLanguages: ["Container Images", "SBOM files (CycloneDX, SPDX)"] },
  { id: "SCAN-NMAP", name: "Nmap (Network Scanning)", category: "Network", version: "7.94", status: "ONLINE", activeRulesCount: 650, description: "Network exploration and security auditing port scanner.", supportedLanguages: ["IP Networks", "CIDR Blocks", "Domain Names"] },
  { id: "SCAN-OWASP-ZAP", name: "OWASP ZAP (DAST)", category: "DAST", version: "2.14.0", status: "IDLE", activeRulesCount: 420, description: "Dynamic Application Security Testing web scanner for active penetration testing.", supportedLanguages: ["HTTP/REST", "GraphQL", "WebSockets", "HTML5"] },
  { id: "SCAN-CHECKOV", name: "Checkov (IaC)", category: "IaC", version: "v3.2.112", status: "ONLINE", activeRulesCount: 1100, description: "Static code analysis tool for Infrastructure-as-Code files.", supportedLanguages: ["Terraform", "CloudFormation", "Kubernetes", "ARM Templates", "Dockerfiles"] }
];

export const sampleBackgroundJobs: BackgroundJob[] = [
  { id: "JOB-9901", type: "scanner_execution", repository: "dragopress/vector-ingest", branch: "main", scanner: "Semgrep & Trivy", status: "RUNNING", progressPercent: 78, durationSeconds: 42, startedAt: "2026-08-04T14:40:00Z", workerNode: "worker-node-az-1a", logs: ["[00:01] Git clone completed successfully", "[00:15] Semgrep SAST engine scanned 142 files in 14.2s", "[00:30] Trivy container image scan in progress... 78%"] },
  { id: "JOB-9902", type: "repo_clone", repository: "dragopress/auth-service", branch: "release/v2.4", scanner: "Gitleaks", status: "RUNNING", progressPercent: 45, durationSeconds: 18, startedAt: "2026-08-04T14:42:10Z", workerNode: "worker-node-az-1b", logs: ["[00:02] Fetching shallow clone from GitHub API", "[00:10] Unpacking objects: 45%"] },
  { id: "JOB-9903", type: "report_generation", repository: "dragopress/payment-service", branch: "main", scanner: "All Scanners", status: "COMPLETED", progressPercent: 100, durationSeconds: 115, startedAt: "2026-08-04T14:30:00Z", workerNode: "worker-node-az-2a", logs: ["[00:00] Initializing SARIF & PDF report generator", "[01:40] Generated 24-page Executive PDF Report & SARIF v2.1.0", "[01:55] Report stored in S3 bucket secops-reports-lake"] },
  { id: "JOB-9904", type: "webhook_dispatch", repository: "dragopress/k8s-infra", branch: "main", scanner: "Checkov", status: "COMPLETED", progressPercent: 100, durationSeconds: 4, startedAt: "2026-08-04T14:35:00Z", workerNode: "worker-node-az-1a", logs: ["[00:00] Event 'scan.completed' triggered", "[00:04] HTTP 200 OK sent to Slack & Jira webhooks"] }
];

export const sampleApiEndpoints: ApiEndpoint[] = [
  { method: "POST", path: "/api/v1/scans/trigger", summary: "Trigger async scan job across multiple security scanners", category: "Scans", sampleRequest: "{\n  \"repository\": \"github.com/dragopress/auth-service\",\n  \"branch\": \"main\",\n  \"scanners\": [\"Semgrep\", \"Trivy\", \"Gitleaks\"]\n}", sampleResponse: "{\n  \"jobId\": \"JOB-9905\",\n  \"status\": \"QUEUED\",\n  \"estimatedDuration\": 45\n}" },
  { method: "GET", path: "/api/v1/scans/{jobId}/results", summary: "Retrieve normalized vulnerability results for a scan job", category: "Scans", sampleResponse: "{\n  \"jobId\": \"JOB-9903\",\n  \"vulnerabilitiesCount\": 3,\n  \"criticalCount\": 1,\n  \"items\": [ ... ]\n}" },
  { method: "GET", path: "/api/v1/projects", summary: "List tracked repositories, security score, and MTTR metrics", category: "Projects", sampleResponse: "[\n  { \"id\": \"proj-1\", \"name\": \"Core Ingestion\", \"score\": 92, \"mttrDays\": 1.4 }\n]" },
  { method: "POST", path: "/api/v1/auth/token", summary: "OAuth2 / OIDC JWT token exchange for API access", category: "Auth", sampleRequest: "{\n  \"grant_type\": \"client_credentials\",\n  \"client_id\": \"secops_app_id\",\n  \"client_secret\": \"<SECRET>\"\n}", sampleResponse: "{\n  \"access_token\": \"eyJhbGciOi...\",\n  \"token_type\": \"Bearer\",\n  \"expires_in\": 3600\n}" },
  { method: "POST", path: "/api/v1/webhooks", summary: "Register webhook endpoints for Slack, Teams, Jira, or custom HTTP", category: "Webhooks", sampleRequest: "{\n  \"targetUrl\": \"https://hooks.slack.com/services/...\",\n  \"events\": [\"scan.critical_found\", \"gate.failed\"]\n}", sampleResponse: "{\n  \"webhookId\": \"wh_77102\",\n  \"status\": \"ACTIVE\"\n}" },
  { method: "POST", path: "/api/v1/reports/generate", summary: "Generate PDF, HTML, SARIF, JSON, or CSV compliance report", category: "Reports", sampleRequest: "{\n  \"format\": \"SARIF\",\n  \"projectId\": \"Core Ingestion\",\n  \"timeframe\": \"30d\"\n}", sampleResponse: "{\n  \"downloadUrl\": \"https://api.devsecops.internal/v1/downloads/report-881.sarif\",\n  \"format\": \"SARIF\"\n}" }
];

export const sampleCicdGates: CicdPipelineGate[] = [
  { platform: "GitHub Actions", failOnCritical: true, maxHighVulnerabilities: 0, allowUnsignedImages: false, blockExposedSecrets: true, requireApprovedLicenses: true, status: "GATE_ENFORCED" },
  { platform: "GitLab CI", failOnCritical: true, maxHighVulnerabilities: 2, allowUnsignedImages: false, blockExposedSecrets: true, requireApprovedLicenses: true, status: "GATE_ENFORCED" },
  { platform: "Jenkins", failOnCritical: true, maxHighVulnerabilities: 1, allowUnsignedImages: true, blockExposedSecrets: true, requireApprovedLicenses: false, status: "AUDIT_ONLY" },
  { platform: "Azure DevOps", failOnCritical: true, maxHighVulnerabilities: 0, allowUnsignedImages: false, blockExposedSecrets: true, requireApprovedLicenses: true, status: "GATE_ENFORCED" },
  { platform: "CircleCI", failOnCritical: false, maxHighVulnerabilities: 5, allowUnsignedImages: true, blockExposedSecrets: false, requireApprovedLicenses: false, status: "DISABLED" }
];

export const sampleObservabilityMetrics: ObservabilityMetric[] = [
  { name: "secops_scans_total", type: "counter", value: "14,892", unit: "scans", status: "healthy" },
  { name: "secops_vulnerabilities_detected", type: "gauge", value: "248", unit: "active findings", status: "healthy" },
  { name: "secops_worker_queue_depth", type: "gauge", value: "2 jobs", unit: "queued", status: "healthy" },
  { name: "secops_scan_duration_seconds_p99", type: "histogram", value: "34.2s", unit: "seconds", status: "healthy" },
  { name: "secops_policy_evaluations_per_sec", type: "gauge", value: "480", unit: "eval/sec", status: "healthy" },
  { name: "secops_mttr_days_avg", type: "gauge", value: "2.1 days", unit: "days", status: "healthy" }
];


export const sampleCloudFindings: CloudSecurityFinding[] = [
  {
    id: "CLOUD-AWS-01",
    provider: "AWS",
    service: "S3",
    checkId: "CKV_AWS_19",
    checkName: "Ensure S3 Bucket Versioning is Enabled",
    severity: "MEDIUM",
    status: "PASSED",
    resource: "aws_s3_bucket.secops_datalake",
    remediationCode: `resource "aws_s3_bucket_versioning" "datalake" {\n  bucket = aws_s3_bucket.secops_datalake.id\n  versioning_configuration {\n    status = "Enabled"\n  }\n}`
  },
  {
    id: "CLOUD-AWS-02",
    provider: "AWS",
    service: "IAM",
    checkId: "CKV_AWS_60",
    checkName: "Ensure IAM Policy Does Not Allow Full Admin Privileges (*:*)",
    severity: "CRITICAL",
    status: "FAILED",
    resource: "aws_iam_policy.developer_access",
    remediationCode: `// Replace Action = "*" with specific scoped actions\nActions = [\n  "s3:GetObject",\n  "s3:ListBucket"\n]`
  },
  {
    id: "CLOUD-K8S-01",
    provider: "Kubernetes",
    service: "Pods",
    checkId: "CKV_K8S_16",
    checkName: "Container Should Not Run as Root User",
    severity: "HIGH",
    status: "FAILED",
    resource: "Deployment/vector-worker",
    remediationCode: `securityContext:\n  runAsNonRoot: true\n  runAsUser: 10001\n  allowPrivilegeEscalation: false`
  },
  {
    id: "CLOUD-GCP-01",
    provider: "GCP",
    service: "Cloud Storage",
    checkId: "CKV_GCP_28",
    checkName: "Ensure Uniform Bucket-Level Access is Enabled",
    severity: "MEDIUM",
    status: "PASSED",
    resource: "google_storage_bucket.audit_logs",
    remediationCode: `uniform_bucket_level_access = true`
  },
  {
    id: "CLOUD-AZURE-01",
    provider: "Azure",
    service: "Key Vault",
    checkId: "CKV_AZURE_42",
    checkName: "Ensure Key Vault Soft Delete is Enabled",
    severity: "HIGH",
    status: "PASSED",
    resource: "azurerm_key_vault.production_secrets",
    remediationCode: `soft_delete_retention_days = 90`
  },
  {
    id: "CLOUD-DOCKER-01",
    provider: "Docker",
    service: "Dockerfile",
    checkId: "CKV_DOCKER_2",
    checkName: "Ensure HEALTHCHECK Instruction is Present",
    severity: "LOW",
    status: "WARNING",
    resource: "services/auth-service/Dockerfile",
    remediationCode: `HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:3000/health || exit 1`
  }
];

export const samplePolicyRules: PolicyRule[] = [
  {
    id: "POL-OPA-01",
    name: "Enforce Private S3 Bucket ACL",
    engine: "OPA / Rego",
    description: "Blocks deployment of any S3 bucket that has public read/write permissions enabled.",
    severity: "CRITICAL",
    enforcement: "Enforce (Block)",
    status: "Active",
    regoCode: `package terraform.s3

default allow = false

allow {
    input.resource.aws_s3_bucket[name].acl == "private"
    not input.resource.aws_s3_bucket[name].grant
}`
  },
  {
    id: "POL-KYV-01",
    name: "Require Memory & CPU Limits on Pods",
    engine: "Kyverno",
    description: "Kubernetes policy preventing noisy neighbors by mandating resource limits on all pods.",
    severity: "HIGH",
    enforcement: "Enforce (Block)",
    status: "Active",
    regoCode: `apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: require-pod-limits
spec:
  validationFailureAction: Enforce
  rules:
  - name: check-container-limits
    match:
      resources:
        kinds:
        - Pod
    validate:
      message: "CPU and memory limits are required."
      pattern:
        spec:
          containers:
          - resources:
              limits:
                cpu: "?*"
                memory: "?*"`
  },
  {
    id: "POL-REG-02",
    name: "Disallow Unsigned Container Images",
    engine: "OPA / Rego",
    description: "Validates Cosign/Sigstore digital signature metadata before admitting image to EKS.",
    severity: "CRITICAL",
    enforcement: "Enforce (Block)",
    status: "Active",
    regoCode: `package k8s.admission

deny[msg] {
    input.request.kind.kind == "Pod"
    image := input.request.object.spec.containers[_].image
    not cosign_verified(image)
    msg := sprintf("Container image %v is missing valid Cosign signature!", [image])
}`
  }
];

export const sampleSbomItems: SbomItem[] = [
  {
    id: "SBOM-001",
    name: "express",
    version: "4.19.2",
    type: "npm-dependency",
    purl: "pkg:npm/express@4.19.2",
    license: "MIT",
    supplier: "npm registry / Express.js",
    vulnerabilitiesCount: 0,
    signedWithCosign: true,
    slsaLevel: "Level 3"
  },
  {
    id: "SBOM-002",
    name: "vector",
    version: "0.38.0",
    type: "container",
    purl: "pkg:oci/timberio/vector@sha256:7f8a92...?",
    license: "MPL-2.0",
    supplier: "Timber.io / Datadog",
    vulnerabilitiesCount: 1,
    signedWithCosign: true,
    slsaLevel: "Level 3"
  },
  {
    id: "SBOM-003",
    name: "confluent-kafka-go",
    version: "v2.3.0",
    type: "library",
    purl: "pkg:golang/github.com/confluentinc/confluent-kafka-go@v2.3.0",
    license: "Apache-2.0",
    supplier: "Confluent Inc.",
    vulnerabilitiesCount: 0,
    signedWithCosign: true,
    slsaLevel: "Level 2"
  },
  {
    id: "SBOM-004",
    name: "openssl",
    version: "3.0.13-r0",
    type: "operating-system",
    purl: "pkg:apk/alpine/openssl@3.0.13-r0",
    license: "Apache-2.0",
    supplier: "Alpine Linux Project",
    vulnerabilitiesCount: 0,
    signedWithCosign: true,
    slsaLevel: "Level 3"
  }
];

export const sampleAuditLogs: AuditLogEntry[] = [
  {
    id: "AUD-901",
    timestamp: "2026-08-04T13:45:12Z",
    actor: "alex.dev@corp.internal",
    role: "Developer",
    action: "TRIGGER_CHECK_SCAN",
    resource: "terraform/modules/networking",
    status: "SUCCESS",
    ipAddress: "192.168.1.104"
  },
  {
    id: "AUD-902",
    timestamp: "2026-08-04T12:30:00Z",
    actor: "secops-bot@github-actions",
    role: "Admin",
    action: "VERIFY_COSIGN_SIGNATURE",
    resource: "ghcr.io/org/vector-worker:v2.18.4",
    status: "SUCCESS",
    ipAddress: "140.82.112.4"
  },
  {
    id: "AUD-903",
    timestamp: "2026-08-04T11:15:22Z",
    actor: "unauthorized-api-token",
    role: "Auditor",
    action: "MODIFY_SIGMA_RULE",
    resource: "proc_creation_win_powershell",
    status: "DENIED",
    ipAddress: "45.154.255.82"
  },
  {
    id: "AUD-904",
    timestamp: "2026-08-04T09:02:44Z",
    actor: "sarah.lead@corp.internal",
    role: "Admin",
    action: "ENFORCE_OPA_POLICY",
    resource: "POL-OPA-01: Enforce Private S3 Bucket ACL",
    status: "SUCCESS",
    ipAddress: "10.0.12.88"
  }
];
