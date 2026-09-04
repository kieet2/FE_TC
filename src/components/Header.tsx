import React, { useState } from 'react';
import {
  FileText,
  Copy,
  Check,
  Share2,
  HelpCircle,
  ShieldCheck,
  ChevronDown,
  RefreshCw,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { DocumentPackage } from '../types';

interface HeaderProps {
  packageData: DocumentPackage;
  onSelectPackage: (pkg: DocumentPackage) => void;
  availablePackages: DocumentPackage[];
  onOpenShareModal: () => void;
  onOpenHelpModal: () => void;
  isSimulating: boolean;
  onToggleSimulation: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  packageData,
  onSelectPackage,
  availablePackages,
  onOpenShareModal,
  onOpenHelpModal,
  isSimulating,
  onToggleSimulation,
}) => {
  const [copied, setCopied] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(packageData.trackingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isCompleted = packageData.currentStageId === 6 && packageData.stages[5]?.status === 'completed';

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-white/80 sticky top-0 z-30 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
          
          {/* Left Column: Tracking ID & Document Type */}
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              {/* Brand / Logo icon */}
              <div className="flex items-center gap-2 bg-blue-50/80 backdrop-blur-xs text-blue-800 px-2.5 py-1 rounded-xl border border-blue-100 font-medium text-xs shadow-xs">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Bàn Giao An Ninh Pháp Lý</span>
              </div>

              {/* Tracking ID with Copy Button */}
              <div className="inline-flex items-center gap-1.5 bg-white/70 backdrop-blur-xs hover:bg-white transition-all px-2.5 py-1 rounded-xl border border-white/90 shadow-xs text-xs font-mono font-semibold text-slate-800">
                <span className="text-slate-400 font-sans font-normal">Mã:</span>
                <span>{packageData.trackingId}</span>
                <button
                  onClick={handleCopyId}
                  title="Sao chép mã hồ sơ"
                  className="p-0.5 hover:text-blue-600 transition-colors text-slate-500 ml-0.5 cursor-pointer"
                  id="btn-copy-tracking-id"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Status Badge */}
              {isCompleted ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100/90 text-emerald-700 border border-emerald-200 backdrop-blur-xs shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Đã bàn giao hoàn tất
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100/90 text-amber-800 border border-amber-200 backdrop-blur-xs shadow-xs">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                  Đang luân chuyển
                </span>
              )}

              {/* Security level badge */}
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-medium bg-white/70 backdrop-blur-xs text-slate-600 border border-white/90 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                {packageData.securityLevel}
              </span>
            </div>

            {/* Document Title & Switcher dropdown */}
            <div className="relative">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-blue-50/80 rounded-lg text-blue-600 shrink-0 hidden sm:flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug">
                  {packageData.documentType}
                </h1>
                
                {/* Switcher button */}
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="p-1 hover:bg-white/80 rounded-md text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                  title="Đổi hồ sơ mẫu"
                  id="btn-switch-sample-doc"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Dropdown Menu for Switching Documents */}
              {dropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute left-0 mt-2 w-80 sm:w-96 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/80 z-50 p-2 space-y-1">
                    <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Chọn hồ sơ kiểm tra
                    </div>
                    {availablePackages.map((pkg) => (
                      <button
                        key={pkg.trackingId}
                        onClick={() => {
                          onSelectPackage(pkg);
                          setDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition-all flex items-start justify-between gap-2 cursor-pointer ${
                          pkg.trackingId === packageData.trackingId
                            ? 'bg-blue-50/90 text-blue-900 font-semibold border border-blue-100'
                            : 'hover:bg-slate-50/90 text-slate-700'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <p className="font-mono text-[11px] text-blue-600">{pkg.trackingId}</p>
                          <p className="line-clamp-1">{pkg.documentType}</p>
                          <p className="text-[11px] text-slate-400">{pkg.category}</p>
                        </div>
                        {pkg.trackingId === packageData.trackingId && (
                          <Check className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Column: Utility Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 self-start md:self-center">
            {/* Live Simulation Button */}
            <button
              onClick={onToggleSimulation}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer ${
                isSimulating
                  ? 'bg-amber-500 text-white hover:bg-amber-600 ring-2 ring-amber-300 shadow-amber-500/20'
                  : 'bg-white/80 hover:bg-white text-slate-700 border border-white/80 backdrop-blur-xs'
              }`}
              id="btn-toggle-simulation"
              title="Mô phỏng tự động diễn tiến lộ trình giao nhận"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">
                {isSimulating ? 'Đang mô phỏng GPS...' : 'Mô phỏng chuyển động'}
              </span>
              <span className="sm:hidden">{isSimulating ? 'Dừng' : 'Mô phỏng'}</span>
            </button>

            {/* Share Progress Button */}
            <button
              onClick={onOpenShareModal}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-white/80 hover:bg-white text-slate-700 border border-white/80 transition-all shadow-xs cursor-pointer backdrop-blur-xs"
              id="btn-share-progress"
              title="Chia sẻ tiến độ giao nhận hồ sơ"
            >
              <Share2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Chia sẻ</span>
            </button>

            {/* Help / Support Button */}
            <button
              onClick={onOpenHelpModal}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-white/80 hover:bg-white text-slate-700 border border-white/80 transition-all shadow-xs cursor-pointer backdrop-blur-xs"
              id="btn-quick-help"
              title="Trợ giúp & Hỗ trợ khẩn cấp"
            >
              <HelpCircle className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">Trợ giúp</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
