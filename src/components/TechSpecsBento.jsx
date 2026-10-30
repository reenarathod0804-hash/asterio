import React from 'react';
import {
  Sparkles,
  Shield,
  Zap,
  Cpu,
  CheckCircle2,
  Layers,
  Activity
} from 'lucide-react';
import { TECH_INNOVATIONS } from '../data/footwearData';
import { AsterioLogo } from './AsterioLogo';
import { sounds } from '../utils/soundEffects';

export function TechSpecsBento({ onExploreTechClick }) {
  const getIcon = (name) => {
    switch (name) {
      case 'Sparkles': return <Sparkles size={20} className="text-[#f4f4f2]" />;
      case 'Shield': return <Shield size={20} className="text-[#9eb8a8]" />;
      case 'Zap': return <Zap size={20} className="text-[#d6d9e0]" />;
      case 'Cpu': return <Cpu size={20} className="text-[#cbd0dc]" />;
      default: return <Layers size={20} className="text-white" />;
    }
  };

  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 border-b border-[rgba(255,255,255,0.06)] relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-[radial-gradient(circle,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgba(255,255,255,0.035)] border border-[rgba(255,255,255,0.08)] text-xs font-tech text-[#9eb8a8] mb-3">
            <Activity size={13} />
            <span>ARCHITECTURAL MATERIAL LAB</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-white uppercase tracking-tight">
            ENGINEERED IN SILENCE
          </h2>
          <p className="font-body text-[#9aa0ad] text-xs sm:text-base mt-2.5 sm:mt-3 leading-relaxed">
            Mastercrafted with Tuscan full-grain calfskin, natural vulcanized gum outsoles, and orthotic memory matrix footbeds.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
          {TECH_INNOVATIONS.map((tech) => (
            <div
              key={tech.number}
              className="glass-panel p-5 sm:p-6 flex flex-col justify-between border border-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.2)] hover:shadow-2xl transition-all duration-300 group bg-[rgba(15,16,21,0.65)]"
            >
              <div>
                <div className="flex items-center justify-between mb-5 sm:mb-6">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getIcon(tech.icon)}
                  </div>
                  <span className="font-tech text-xs text-[#525662] font-semibold tracking-widest">
                    [{tech.number}]
                  </span>
                </div>

                <div className="text-[10px] font-tech text-[#727785] uppercase tracking-wider mb-1">
                  {tech.subtitle}
                </div>
                <h3 className="font-display font-bold text-base text-white mb-2 group-hover:text-[#f4f4f2] transition-colors">
                  {tech.title}
                </h3>
                <p className="font-body text-xs text-[#9aa0ad] leading-relaxed">
                  {tech.desc}
                </p>
              </div>

              <div className="pt-4 sm:pt-5 mt-5 sm:mt-6 border-t border-[rgba(255,255,255,0.05)] flex items-center justify-between text-xs font-tech text-[#8c919d]">
                <span className="flex items-center gap-1.5 text-white font-medium">
                  <CheckCircle2 size={13} className="text-[#9eb8a8]" /> LAB VERIFIED
                </span>
                <span className="text-[10px] text-[#525662]">AST-SPEC 004</span>
              </div>
            </div>
          ))}
        </div>

        {/* Brand Guarantee Bar */}
        <div 
          className="mt-8 sm:mt-10 p-5 sm:p-6 rounded-2xl bg-[rgba(15,16,21,0.65)] border border-[rgba(255,255,255,0.07)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ marginTop: '2.5rem' }}
        >
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-[rgba(255,255,255,0.12)] bg-[#12141a] flex items-center justify-center flex-shrink-0">
              <AsterioLogo size="sm" showWordmark={false} />
            </div>
            <div>
              <div className="font-display font-bold text-xs sm:text-sm text-white">
                THE ASTERIO ARCHIVAL INTEGRITY PLEDGE
              </div>
              <div className="font-body text-[11px] sm:text-xs text-[#8c919d] mt-0.5">
                Guaranteed genuine archive release. Double-boxed in archival storage packaging with encrypted NFC verification.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-auto">
            <span className="text-xs font-tech text-[#9eb8a8] border border-[rgba(158,184,168,0.25)] bg-[rgba(158,184,168,0.08)] px-3 py-1.5 rounded-full">
              100% NFC SIGNED
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}

export default TechSpecsBento;
