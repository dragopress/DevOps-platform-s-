import React, { useState } from 'react';
import { Terminal, Key, Webhook, Send, Copy, Check, ShieldCheck, Code2, Server, Globe } from 'lucide-react';
import { sampleApiEndpoints } from '../data/mockPlatformData';
import { ApiEndpoint } from '../types';

export const ApiExplorer: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint>(sampleApiEndpoints[0]);
  const [requestBody, setRequestBody] = useState<string>(selectedEndpoint.sampleRequest || '{}');
  const [activeTab, setActiveTab] = useState<'request' | 'headers' | 'auth'>('request');
  const [responseOutput, setResponseOutput] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [bearerToken, setBearerToken] = useState<string>('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzZWNvcHMtYWRtaW4iLCJpYXQiOjE3NTQzMzUxMTF9...');

  const handleSelectEndpoint = (ep: ApiEndpoint) => {
    setSelectedEndpoint(ep);
    setRequestBody(ep.sampleRequest || '{}');
    setResponseOutput(null);
  };

  const handleExecute = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setResponseOutput(selectedEndpoint.sampleResponse);
      setIsExecuting(false);
    }, 450);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-xl">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Production REST API & Webhooks Explorer</h1>
            <p className="text-xs text-slate-400">
              OAuth2 / OIDC Token Exchange • REST & GraphQL Endpoints • Webhook Event Dispatcher
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-semibold rounded-lg flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>v1 REST API ACTIVE</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Endpoint Sidebar */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">API Endpoints</h2>
          <div className="space-y-1.5">
            {sampleApiEndpoints.map((ep) => (
              <button
                key={ep.path}
                onClick={() => handleSelectEndpoint(ep)}
                className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer flex items-center space-x-2.5 ${
                  selectedEndpoint.path === ep.path
                    ? "bg-cyan-950/60 border-cyan-500/50 text-cyan-200 shadow-md"
                    : "bg-slate-950/40 border-slate-800 text-slate-300 hover:bg-slate-800/60"
                }`}
              >
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  ep.method === 'GET' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                  ep.method === 'POST' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                  'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}>
                  {ep.method}
                </span>
                <div className="flex-1 truncate">
                  <div className="font-mono text-slate-100 font-semibold truncate">{ep.path}</div>
                  <div className="text-[10px] text-slate-400 truncate">{ep.summary}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* API Playground Main */}
        <div className="lg:col-span-8 space-y-4">
          {/* Request Header bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4 shadow-lg">
            <div className="flex items-center space-x-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-xs">
              <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 font-bold rounded">
                {selectedEndpoint.method}
              </span>
              <span className="text-slate-200 flex-1 truncate">https://api.devsecops.internal{selectedEndpoint.path}</span>
              <button
                onClick={handleExecute}
                disabled={isExecuting}
                className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg flex items-center space-x-1.5 transition-all cursor-pointer shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isExecuting ? 'Sending...' : 'Send Request'}</span>
              </button>
            </div>

            {/* Request tabs */}
            <div className="flex border-b border-slate-800 text-xs">
              <button
                onClick={() => setActiveTab('request')}
                className={`px-4 py-2 font-medium border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'request' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Body (JSON)
              </button>
              <button
                onClick={() => setActiveTab('auth')}
                className={`px-4 py-2 font-medium border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'auth' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Authorization (JWT)
              </button>
            </div>

            {activeTab === 'request' && (
              <textarea
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
                rows={6}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-xs text-cyan-300 focus:outline-none focus:border-cyan-500"
              />
            )}

            {activeTab === 'auth' && (
              <div className="space-y-2">
                <label className="text-xs text-slate-400 font-semibold">Bearer Token (JWT / OAuth2)</label>
                <div className="flex items-center space-x-2">
                  <Key className="w-4 h-4 text-amber-400" />
                  <input
                    type="text"
                    value={bearerToken}
                    onChange={(e) => setBearerToken(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 font-mono text-xs text-amber-300 focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Response Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>HTTP Response</span>
              </span>
              {responseOutput && (
                <button
                  onClick={() => handleCopy(responseOutput)}
                  className="text-xs text-slate-400 hover:text-white flex items-center space-x-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy JSON'}</span>
                </button>
              )}
            </div>

            {responseOutput ? (
              <pre className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 font-mono text-xs text-emerald-400 overflow-x-auto max-h-72">
                {responseOutput}
              </pre>
            ) : (
              <div className="p-8 text-center text-xs text-slate-500 italic border border-dashed border-slate-800 rounded-xl">
                Click "Send Request" to test this production API endpoint in real time.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
