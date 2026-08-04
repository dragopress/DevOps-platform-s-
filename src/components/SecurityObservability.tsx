import React, { useState } from 'react';
import { 
  Activity, 
  Bell, 
  FileText, 
  ShieldCheck, 
  Database, 
  Server, 
  Sliders, 
  ExternalLink,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { sampleAuditLogs } from '../data/mockPlatformData';

export const SecurityObservability: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'grafana' | 'alerts' | 'audit'>('grafana');
  const [logs, setLogs] = useState(sampleAuditLogs);

  const alertChannels = [
    { name: "Slack #secops-alerts", type: "Slack Webhook", status: "Active", events: "Critical & High Findings" },
    { name: "Microsoft Teams SecOps", type: "Teams Connector", status: "Active", events: "Policy Enforcement Failures" },
    { name: "PagerDuty On-Call", type: "PagerDuty API", status: "Active", events: "Critical Vulnerabilities & Leaks" },
    { name: "Splunk HEC SIEM", type: "HTTP Event Collector", status: "Active", events: "All Audit Logs & Telemetry" },
    { name: "Datadog Logs API", type: "Datadog Agent", status: "Active", events: "Prometheus Metrics" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-xl">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Security Observability & SIEM Integration</h1>
            <p className="text-xs text-slate-400">
              Prometheus Security Metrics Exporter, Grafana Dashboards, Alerting Matrix & Immutable Audit Logs
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 p-2 rounded-2xl">
        {[
          { id: 'grafana', label: 'Grafana & Prometheus Metrics', icon: Activity },
          { id: 'alerts', label: 'Alerting & SIEM Integrations', icon: Bell },
          { id: 'audit', label: 'Immutable Audit Logs', icon: FileText }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
                activeTab === tab.id 
                  ? 'bg-rose-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Grafana & Prometheus Metrics */}
      {activeTab === 'grafana' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <div className="text-xs font-bold text-slate-400 uppercase">PROMETHEUS EPS METRIC</div>
              <div className="text-3xl font-black text-white mt-1">18,450 / s</div>
              <div className="text-xs text-emerald-400 font-semibold mt-1">Vector Ingestion Normal</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <div className="text-xs font-bold text-slate-400 uppercase">OPA REGO DENIALS (24H)</div>
              <div className="text-3xl font-black text-amber-400 mt-1">12 Blocked</div>
              <div className="text-xs text-amber-400 font-semibold mt-1">0 False Positives</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <div className="text-xs font-bold text-slate-400 uppercase">SIEM LOG BUFFER LATENCY</div>
              <div className="text-3xl font-black text-cyan-400 mt-1">4.2 ms</div>
              <div className="text-xs text-emerald-400 font-semibold mt-1">Kafka Queue Clean</div>
            </div>
          </div>

          {/* Prometheus Exporter Code */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
              <span className="font-mono font-bold text-rose-400">Prometheus Metrics Endpoint (/metrics)</span>
              <span className="text-slate-500 text-[10px]">HTTP 200 OK</span>
            </div>
            <pre className="bg-slate-950 p-4 rounded-xl text-xs font-mono text-cyan-300 border border-slate-800 overflow-x-auto">
{`# HELP devsecops_vulnerabilities_total Total vulnerabilities detected by scanner
# TYPE devsecops_vulnerabilities_total gauge
devsecops_vulnerabilities_total{severity="critical",scanner="trivy"} 2
devsecops_vulnerabilities_total{severity="high",scanner="semgrep"} 4
devsecops_vulnerabilities_total{severity="critical",scanner="gitleaks"} 0

# HELP devsecops_pipeline_executions_total Pipeline security executions
devsecops_pipeline_executions_total{status="passed"} 1248
devsecops_pipeline_executions_total{status="failed"} 3`}
            </pre>
          </div>
        </div>
      )}

      {/* Tab 2: Alerting & SIEM Integrations */}
      {activeTab === 'alerts' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider">SIEM & NOTIFICATION CONNECTIONS</span>
            <span className="text-xs text-emerald-400 font-bold">5 Active Integration Webhooks</span>
          </div>

          <div className="divide-y divide-slate-800">
            {alertChannels.map((channel, idx) => (
              <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-800/40 transition-colors">
                <div>
                  <div className="text-sm font-bold text-white">{channel.name}</div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">{channel.type} • Triggers on: {channel.events}</div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {channel.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Immutable Audit Logs */}
      {activeTab === 'audit' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider">IMMUTABLE SECURITY AUDIT LOGS</span>
            <span className="text-xs text-slate-400">Cryptographically Chained (SHA-256)</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Timestamp</th>
                  <th className="p-3.5">Actor</th>
                  <th className="p-3.5">Action</th>
                  <th className="p-3.5">Resource</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 font-mono">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/40 transition-colors font-mono">
                    <td className="p-3.5 text-slate-400 text-[11px]">{log.timestamp}</td>
                    <td className="p-3.5 text-white font-bold">{log.actor}</td>
                    <td className="p-3.5 text-cyan-400 font-bold">{log.action}</td>
                    <td className="p-3.5 text-slate-300">{log.resource}</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        log.status === 'SUCCESS' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-400">{log.ipAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
