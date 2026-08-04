import React, { useState } from 'react';
import { Server, Box, Layers, ShieldCheck, Download, Copy, Check, HardDrive, RefreshCcw, KeyRound } from 'lucide-react';

export const DeploymentInfra: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'k8s' | 'docker-compose' | 'helm' | 'vault'>('k8s');
  const [copied, setCopied] = useState(false);

  const k8sManifest = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: devsecops-scanner-worker
  namespace: secops-platform
  labels:
    app.kubernetes.io/name: secops-worker
    app.kubernetes.io/part-of: devsecops-studio
spec:
  replicas: 4
  selector:
    matchLabels:
      app: secops-worker
  template:
    metadata:
      labels:
        app: secops-worker
    spec:
      containers:
      - name: worker
        image: devsecops/scanner-worker:v2.18.7
        resources:
          limits:
            cpu: "2"
            memory: "4Gi"
          requests:
            cpu: "500m"
            memory: "1Gi"
        env:
        - name: KAFKA_BROKERS
          value: "msk-broker-1.secops.internal:9092"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: secops-db-secret
              key: connection_string
        readinessProbe:
          httpGet:
            path: /healthz
            port: 8080
          initialDelaySeconds: 10
          periodSeconds: 5`;

  const dockerComposeYaml = `version: '3.8'

services:
  devsecops-api:
    image: devsecops/api-server:latest
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgres://secops:pass@postgres:5432/secops_db
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: secops_db
      POSTGRES_USER: secops
      POSTGRES_PASSWORD: secure_devsecops_pass
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    command: redis-server --requirepass secure_redis_pass

volumes:
  pgdata:`;

  const helmValuesYaml = `global:
  environment: production
  domain: devsecops.company.internal

replicaCount: 3

image:
  repository: registry.company.internal/secops/platform
  pullPolicy: IfNotPresent
  tag: "v2.18.7"

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: true
  className: nginx
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
  hosts:
    - host: devsecops.company.internal
      paths:
        - path: /
          pathType: Prefix

autoscaling:
  enabled: true
  minReplicas: 3
  maxReplicas: 12
  targetCPUUtilizationPercentage: 75`;

  const vaultConfig = `# HashiCorp Vault Secret Management Integration
path "secret/data/devsecops/*" {
  capabilities = ["read", "list"]
}

path "sys/mounts" {
  capabilities = ["read"]
}`;

  const getCurrentCode = () => {
    switch (activeTab) {
      case 'k8s': return k8sManifest;
      case 'docker-compose': return dockerComposeYaml;
      case 'helm': return helmValuesYaml;
      case 'vault': default: return vaultConfig;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCurrentCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-xl">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Production Deployment & Scaling Engine</h1>
            <p className="text-xs text-slate-400">
              Kubernetes Manifests • Helm Charts • Docker Compose • HashiCorp Vault Secret Mgmt • High Availability
            </p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all cursor-pointer shadow"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
          <span>{copied ? 'Copied to Clipboard' : 'Copy Manifest'}</span>
        </button>
      </div>

      {/* HA Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center space-x-3">
          <Box className="w-8 h-8 text-cyan-400 p-1.5 bg-cyan-500/10 rounded-lg" />
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Kubernetes Pods</div>
            <div className="text-base font-bold text-white">4 Active Replicas (HPA)</div>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center space-x-3">
          <HardDrive className="w-8 h-8 text-emerald-400 p-1.5 bg-emerald-500/10 rounded-lg" />
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Automated Backups</div>
            <div className="text-base font-bold text-white">Daily S3 Snapshots (30d)</div>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center space-x-3">
          <KeyRound className="w-8 h-8 text-amber-400 p-1.5 bg-amber-500/10 rounded-lg" />
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Secret Management</div>
            <div className="text-base font-bold text-white">HashiCorp Vault / AWS KMS</div>
          </div>
        </div>
      </div>

      {/* Manifest Selector and View */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
        <div className="flex border-b border-slate-800 text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab('k8s')}
            className={`px-4 py-2 font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'k8s' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Kubernetes Manifest (deployment.yaml)
          </button>
          <button
            onClick={() => setActiveTab('helm')}
            className={`px-4 py-2 font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'helm' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Helm Chart Values (values.yaml)
          </button>
          <button
            onClick={() => setActiveTab('docker-compose')}
            className={`px-4 py-2 font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'docker-compose' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Docker Compose (docker-compose.yml)
          </button>
          <button
            onClick={() => setActiveTab('vault')}
            className={`px-4 py-2 font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'vault' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Vault Policy Config
          </button>
        </div>

        <pre className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-cyan-300 overflow-x-auto max-h-96 leading-relaxed">
          {getCurrentCode()}
        </pre>
      </div>
    </div>
  );
};
