import React from 'react';
import { useTheme, ThemeType } from '../context/ThemeContext';
import { Zap, Building2, Code2, Sparkles, MonitorCheck } from 'lucide-react';

interface ThemeSwitcherProps {
  className?: string;
  variant?: 'header' | 'floating';
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ className = '', variant = 'header' }) => {
  const { theme, setTheme } = useTheme();

  const themes: { id: ThemeType; label: string; desc: string; icon: React.FC<{ className?: string }>; color: string }[] = [
    {
      id: 'cyberpunk',
      label: 'Cyberpunk SOC',
      desc: 'High-contrast Command Center with Cyan/Neon grid',
      icon: Zap,
      color: 'from-cyan-500 to-emerald-500'
    },
    {
      id: 'enterprise',
      label: 'Enterprise SaaS',
      desc: 'Clean light dashboard with structured cards & metrics',
      icon: Building2,
      color: 'from-sky-500 to-blue-600'
    },
    {
      id: 'developer',
      label: 'Developer IDE',
      desc: 'VS Code workspace layout with code tabs & terminal',
      icon: Code2,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'glassmorphism',
      label: 'Glassmorphism Hub',
      desc: 'Cosmic indigo gradient with glass cards & 3D Threat Globe',
      icon: Sparkles,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  if (variant === 'floating') {
    return (
      <div className={`fixed bottom-5 right-5 z-50 flex items-center bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-1.5 rounded-2xl shadow-2xl ${className}`}>
        <div className="flex items-center space-x-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 flex items-center gap-1">
            <MonitorCheck className="w-3.5 h-3.5 text-cyan-400" />
            Theme:
          </span>
          {themes.map((t) => {
            const Icon = t.icon;
            const isActive = theme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                title={`${t.label} - ${t.desc}`}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                  isActive
                    ? `bg-gradient-to-r ${t.color} text-white shadow-md scale-105`
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800/80 ${className}`}>
      {themes.map((t) => {
        const Icon = t.icon;
        const isActive = theme === t.id;
        return (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            title={`${t.label}: ${t.desc}`}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
              isActive
                ? `bg-gradient-to-r ${t.color} text-white shadow-md font-bold`
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
};
