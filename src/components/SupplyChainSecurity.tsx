import React, { useState } from 'react';
import { 
  Boxes, 
  ShieldCheck, 
  CheckCircle2, 
  Download, 
  FileCode2, 
  Key, 
  Sparkles, 
  Layers, 
  ExternalLink,
  Lock,
  Award
} from 'lucide-react';
import { SbomItem } from '../types';
import { sampleSbomItems } from '../data/mockPlatformData';

export const SupplyChainSecurity: React.FC = () => {
  const [sbomItems, setSbomItems] = useState<SbomItem[]>(sampleSbomItems);
  const [activeFormat, setActiveFormat] = useState<'table' | 'cyclonedx' | 'spdx'>('table');
  const [signedSuccess, setSignedSuccess] = useState<string | null>(null);

  const cycloneDxJson = JSON.stringify({
    bomFormat: "CycloneDX",
    specVersion: "1.5",
    version: 1,
    serialNumber: "urn:uuid:3e6712ab-4d1e-4509-90b1-123456789abc",
    metadata: {
      timestamp: "2026-08-04T13:00:00Z",
      tools: [{ vendor: "DevSecOps Studio", name: "SBOM Engine", version: "2.4.0" }]
    },
    components: sbomItems.map(item => ({
      type: item.type,
      name: item.name,
      version: item.version,
      purl: item.purl,
      licenses: [{ license: { id: item.license } }]
    }))
  }, null, 2);

  const handleSimulateCosign = (id: string) => {
    setSbomItems(prev => prev.map(item => item.id === id ? { ...item, signedWithCosign: true, slsaLevel: 'Level 3' } : item));
    setSignedSuccess(`Image ${id} signed with Cosign keyless mTLS OIDC authority & registered in Rekor transparency log!`);
    setTimeout(() => setSignedSuccess(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-xl">
            <Boxes className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Software Supply Chain Security (SLSA Level 3)</h1>
            <p className="text-xs text-slate-400">
              SBOM Generation (CycloneDX/SPDX), Cosign Artifact Signing & Sigstore Rekor Transparency Log
            </p>
          </div>
        </div>

        {/* SBOM Export Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveFormat('cyclonedx')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              activeFormat === 'cyclonedx' ? 'bg-purple-600 text-white border-purple-500' : 'bg-slate-800 text-slate-300 border-slate-700'
            }`}
          >
            CycloneDX 1.5 JSON
          </button>
          <button
            onClick={() => setActiveFormat('table')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              activeFormat === 'table' ? 'bg-purple-600 text-white border-purple-500' : 'bg-slate-800 text-slate-300 border-slate-700'
            }`}
          >
            Dependencies Table
          </button>
        </div>
      </div>

      {signedSuccess && (
        <div className="p-4 bg-purple-950/90 border border-purple-600/80 rounded-xl text-xs text-purple-200 flex items-center space-x-2 animate-fadeIn">
          <ShieldCheck className="w-4 h-4 text-purple-400" />
          <span>{signedSuccess}</span>
        </div>
      )}

      {/* Main View: Table vs CycloneDX */}
      {activeFormat === 'table' ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-purple-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">SOFTWARE BILL OF MATERIALS (SBOM)</span>
            </div>
            <span className="text-xs text-slate-400">SLSA Provenance: <strong className="text-emerald-400">Level 3 Compliant</strong></span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Component / Dependency</th>
                  <th className="p-3.5">Type</th>
                  <th className="p-3.5">PURL</th>
                  <th className="p-3.5">License</th>
                  <th className="p-3.5">Cosign Sign</th>
                  <th className="p-3.5">SLSA Rank</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {sbomItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 font-bold text-white">
                      {item.name} <span className="text-slate-400 font-normal">v{item.version}</span>
                    </td>
                    <td className="p-3.5 uppercase text-[10px] font-mono text-cyan-400">{item.type}</td>
                    <td className="p-3.5 font-mono text-[10px] text-slate-400 max-w-xs truncate">{item.purl}</td>
                    <td className="p-3.5 font-mono text-emerald-400">{item.license}</td>
                    <td className="p-3.5">
                      {item.signedWithCosign ? (
                        <span className="text-emerald-400 font-bold flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Cosign Signed</span>
                        </span>
                      ) : (
                        <span className="text-amber-400 font-bold">Unsigned</span>
                      )}
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {item.slsaLevel}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      {!item.signedWithCosign && (
                        <button
                          onClick={() => handleSimulateCosign(item.id)}
                          className="px-2.5 py-1 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded text-[10px] transition-all cursor-pointer flex items-center space-x-1 ml-auto"
                        >
                          <Key className="w-3 h-3" />
                          <span>Sign with Cosign</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
            <span className="font-mono font-bold text-purple-400">CycloneDX v1.5 Output</span>
            <button
              onClick={() => navigator.clipboard.writeText(cycloneDxJson)}
              className="text-cyan-400 hover:text-white flex items-center space-x-1 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Copy JSON</span>
            </button>
          </div>
          <pre className="bg-slate-950 p-4 rounded-xl text-xs font-mono text-emerald-400 overflow-x-auto max-h-96 border border-slate-800">
            {cycloneDxJson}
          </pre>
        </div>
      )}
    </div>
  );
};
