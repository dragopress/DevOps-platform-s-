import React, { useState } from 'react';
import { Cpu, Play, RefreshCw, CheckCircle2, Clock, AlertTriangle, Terminal, HardDrive, Layers, Server } from 'lucide-react';
import { sampleBackgroundJobs } from '../data/mockPlatformData';
import { BackgroundJob } from '../types';

export const BackgroundWorkers: React.FC = () => {
  const [jobs, setJobs] = useState<BackgroundJob[]>(sampleBackgroundJobs);
  const [selectedJob, setSelectedJob] = useState<BackgroundJob>(sampleBackgroundJobs[0]);
  const [triggerMsg, setTriggerMsg] = useState<string | null>(null);

  const handleTriggerJob = () => {
    const newJob: BackgroundJob = {
      id: `JOB-${Math.floor(9900 + Math.random() * 100)}`,
      type: "scanner_execution",
      repository: "dragopress/user-service",
      branch: "main",
      scanner: "Semgrep & CodeQL",
      status: "RUNNING",
      progressPercent: 12,
      durationSeconds: 5,
      startedAt: new Date().toISOString(),
      workerNode: "worker-node-az-1b",
      logs: [
        "[00:01] Received queue trigger from Webhook/CI",
        "[00:03] Git clone initiated for dragopress/user-service:main",
        "[00:05] Semgrep SAST rules compiled. Scanning AST..."
      ]
    };

    setJobs(prev => [newJob, ...prev]);
    setSelectedJob(newJob);
    setTriggerMsg("Triggered new async scan job on worker-node-az-1b!");
    setTimeout(() => setTriggerMsg(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-xl">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Async Background Scans & Job Queue Engine</h1>
            <p className="text-xs text-slate-400">
              Distributed Worker Pool • Async Repo Cloning • Multi-Scanner Execution Jobs • Webhook Dispatch
            </p>
          </div>
        </div>

        <button
          onClick={handleTriggerJob}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center space-x-2 transition-all cursor-pointer shadow-md"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Dispatch New Async Scan</span>
        </button>
      </div>

      {triggerMsg && (
        <div className="p-3 bg-indigo-950/80 border border-indigo-700/80 text-indigo-300 rounded-xl text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-indigo-400" />
          <span>{triggerMsg}</span>
        </div>
      )}

      {/* Worker Stats bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center space-x-3">
          <Server className="w-8 h-8 text-cyan-400 p-1.5 bg-cyan-500/10 rounded-lg" />
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Active Workers</div>
            <div className="text-lg font-bold text-white">6 Nodes</div>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center space-x-3">
          <RefreshCw className="w-8 h-8 text-amber-400 p-1.5 bg-amber-500/10 rounded-lg animate-spin" />
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Jobs Running</div>
            <div className="text-lg font-bold text-white">{jobs.filter(j => j.status === 'RUNNING').length} Active</div>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center space-x-3">
          <CheckCircle2 className="w-8 h-8 text-emerald-400 p-1.5 bg-emerald-500/10 rounded-lg" />
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Completed (24h)</div>
            <div className="text-lg font-bold text-white">1,482 Jobs</div>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center space-x-3">
          <Clock className="w-8 h-8 text-indigo-400 p-1.5 bg-indigo-500/10 rounded-lg" />
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Avg Job Duration</div>
            <div className="text-lg font-bold text-white">34.2s</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Jobs Queue Table */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Job Queue Status</h2>
          <div className="space-y-2">
            {jobs.map((job) => (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  selectedJob.id === job.id
                    ? "bg-indigo-950/60 border-indigo-500/50 shadow-md"
                    : "bg-slate-950/40 border-slate-800 hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-white">{job.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      job.status === 'RUNNING' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      job.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                      'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}>
                      {job.status}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{job.workerNode}</span>
                </div>

                <div className="text-xs text-slate-300 mt-1 font-semibold">
                  {job.repository} <span className="text-slate-500">({job.branch})</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">Scanners: {job.scanner}</div>

                {/* Progress bar */}
                <div className="mt-2.5 space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>Progress</span>
                    <span>{job.progressPercent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        job.status === 'COMPLETED' ? 'bg-emerald-400' : 'bg-indigo-400'
                      }`}
                      style={{ width: `${job.progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Job Worker Logs */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 flex flex-col">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Worker Node Output Log</span>
            </span>
            <span className="font-mono text-xs text-indigo-300 font-semibold">{selectedJob.id}</span>
          </div>

          <div className="flex-1 bg-slate-950 border border-slate-800/80 rounded-xl p-3 font-mono text-xs space-y-1 text-slate-300 overflow-y-auto max-h-80">
            {selectedJob.logs.map((log, idx) => (
              <div key={idx} className="text-emerald-400 leading-relaxed">
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
