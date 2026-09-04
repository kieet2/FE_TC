/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { samplePackages } from './data/mockData';
import { DocumentPackage, MilestoneStage, StageStatus } from './types';
import { Header } from './components/Header';
import { InteractiveRoadmap } from './components/InteractiveRoadmap';
import { CurrentStageCard } from './components/CurrentStageCard';
import { FooterActions } from './components/FooterActions';
import { StageDetailModal } from './components/StageDetailModal';
import { EpodModal } from './components/EpodModal';
import { LiveRouteMapModal } from './components/LiveRouteMapModal';
import { EmergencyModal } from './components/EmergencyModal';
import { QrModal } from './components/QrModal';
import { ShareModal } from './components/ShareModal';
import { ChatModal } from './components/ChatModal';
import { HelpModal } from './components/HelpModal';
import {
  PhoneCall,
  CheckCircle2,
  AlertCircle,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';

export default function App() {
  // Current active package
  const [currentPackage, setCurrentPackage] = useState<DocumentPackage>(samplePackages[0]);
  
  // Modals state
  const [selectedStageForModal, setSelectedStageForModal] = useState<MilestoneStage | null>(null);
  const [isEpodOpen, setIsEpodOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Simulation state
  const [isSimulating, setIsSimulating] = useState(false);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Jump to specific stage (1 to 6)
  const handleJumpToStage = (stageId: number) => {
    setCurrentPackage((prev) => {
      const updatedStages = prev.stages.map((stage) => {
        if (stage.id < stageId) {
          return {
            ...stage,
            status: 'completed' as const,
            completedAt: stage.completedAt || 'Đã hoàn tất',
          };
        } else if (stage.id === stageId) {
          return {
            ...stage,
            status: (stageId === 6 && prev.currentStageId === 6 ? 'completed' : 'active') as StageStatus,
          };
        } else {
          return {
            ...stage,
            status: 'pending' as const,
          };
        }
      });

      const progressMap: Record<number, number> = {
        1: 15,
        2: 30,
        3: 50,
        4: 65,
        5: 80,
        6: 100,
      };

      return {
        ...prev,
        currentStageId: stageId,
        overallProgress: progressMap[stageId] || 80,
        stages: updatedStages,
        distanceRemainingKm: stageId === 6 ? 0 : Math.max(0.2, (6 - stageId) * 0.8),
        eta: stageId === 6 ? 'Đã hoàn tất bàn giao' : `14:${30 + stageId * 2} (Còn ${(6 - stageId) * 6} phút)`,
      };
    });

    showToast(`Đã chuyển trạng thái sang Chặng ${stageId}: ${currentPackage.stages[stageId - 1]?.title}`);
  };

  // Real-time Simulation effect
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setCurrentPackage((prev) => {
        let nextStageId = prev.currentStageId + 1;
        if (nextStageId > 6) {
          nextStageId = 1; // loop back for continuous demonstration
        }
        
        const updatedStages = prev.stages.map((stage) => {
          if (stage.id < nextStageId) {
            return { ...stage, status: 'completed' as const };
          } else if (stage.id === nextStageId) {
            return { ...stage, status: 'active' as const };
          } else {
            return { ...stage, status: 'pending' as const };
          }
        });

        return {
          ...prev,
          currentStageId: nextStageId,
          stages: updatedStages,
          distanceRemainingKm: nextStageId === 6 ? 0 : (6 - nextStageId) * 0.7,
        };
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isSimulating]);

  // Calling courier action
  const handleCallCourier = () => {
    showToast(`Đang kết nối cuộc gọi an ninh đến ${currentPackage.courier.name} (${currentPackage.courier.phone})...`);
    window.location.href = `tel:${currentPackage.courier.phone.replace(/\s+/g, '')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/60 via-indigo-50/40 to-slate-100 text-slate-800 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900 relative overflow-x-hidden">
      
      {/* Decorative ambient frosted blur spheres */}
      <div className="fixed top-12 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed top-1/2 -right-20 w-[28rem] h-[28rem] bg-indigo-200/25 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed -bottom-20 left-10 w-80 h-80 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* 1. Header (Thanh đầu mối) */}
      <Header
        packageData={currentPackage}
        onSelectPackage={(pkg) => {
          setCurrentPackage(pkg);
          showToast(`Đã tải dữ liệu hồ sơ: ${pkg.trackingId}`);
        }}
        availablePackages={samplePackages}
        onOpenShareModal={() => setIsShareOpen(true)}
        onOpenHelpModal={() => setIsHelpOpen(true)}
        isSimulating={isSimulating}
        onToggleSimulation={() => {
          setIsSimulating(!isSimulating);
          showToast(!isSimulating ? 'Đã bật chế độ tự động mô phỏng tiến trình lộ trình' : 'Đã tạm dừng mô phỏng');
        }}
      />

      {/* Main Page Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 space-y-6">
        
        {/* Quick Simulation Banner with Frosted Glass styling */}
        <div className="bg-gradient-to-r from-slate-900/90 via-blue-950/90 to-indigo-950/90 backdrop-blur-md text-white rounded-2xl p-4 sm:p-5 shadow-lg shadow-slate-900/10 border border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4 text-blue-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-300">
                  Hệ Thống Theo Dõi Bàn Giao Hồ Sơ Trực Quan
                </span>
                <span className="text-[10px] font-bold bg-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/40 backdrop-blur-xs">
                  Real-time Active
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                Giao diện Frosted Glass với 6 chặng, marker phương tiện, mã niêm phong QR và biên bản e-POD có thể tương tác trực tiếp.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsSimulating(!isSimulating)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer backdrop-blur-xs ${
                isSimulating
                  ? 'bg-amber-500 text-white hover:bg-amber-600 ring-2 ring-amber-300 shadow-amber-500/20'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
              id="btn-banner-sim-toggle"
            >
              {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isSimulating ? 'Tạm dừng mô phỏng' : 'Tự động chạy tiến trình'}</span>
            </button>

            <button
              onClick={() => handleJumpToStage(1)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors cursor-pointer backdrop-blur-xs"
              title="Khởi tạo lại từ Chặng 1"
              id="btn-reset-stage-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2. Interactive Visual Roadmap (Khu vực Roadmap trung tâm) */}
        <section aria-label="Roadmap giao nhận hồ sơ">
          <InteractiveRoadmap
            packageData={currentPackage}
            onSelectStage={(stage) => setSelectedStageForModal(stage)}
            onJumpToStage={handleJumpToStage}
          />
        </section>

        {/* 3. Current Stage Card (Thẻ chi tiết tác vụ hiện tại) */}
        <section aria-label="Tác vụ hiện tại">
          <CurrentStageCard
            packageData={currentPackage}
            onOpenQrModal={() => setIsQrOpen(true)}
            onOpenChatModal={() => setIsChatOpen(true)}
            onCallCourier={handleCallCourier}
          />
        </section>

        {/* 4. Footer / Action Area */}
        <section aria-label="Các hành động chính">
          <FooterActions
            packageData={currentPackage}
            onOpenEpod={() => setIsEpodOpen(true)}
            onOpenMap={() => setIsMapOpen(true)}
            onOpenEmergency={() => setIsEmergencyOpen(true)}
          />
        </section>

      </main>

      {/* Persistent Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
          <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Interactive Modals */}
      
      {/* 1. Stage Detail Modal */}
      {selectedStageForModal && (
        <StageDetailModal
          stage={selectedStageForModal}
          onClose={() => setSelectedStageForModal(null)}
          onJumpToStage={(stageId) => {
            handleJumpToStage(stageId);
            setSelectedStageForModal(null);
          }}
          totalStages={currentPackage.stages.length}
        />
      )}

      {/* 2. e-POD Electronic Proof of Delivery Modal */}
      {isEpodOpen && (
        <EpodModal
          packageData={currentPackage}
          onClose={() => setIsEpodOpen(false)}
        />
      )}

      {/* 3. Live GPS Route Map Modal */}
      {isMapOpen && (
        <LiveRouteMapModal
          packageData={currentPackage}
          onClose={() => setIsMapOpen(false)}
        />
      )}

      {/* 4. Emergency SOS Modal */}
      {isEmergencyOpen && (
        <EmergencyModal
          packageData={currentPackage}
          onClose={() => setIsEmergencyOpen(false)}
        />
      )}

      {/* 5. QR Code Zoom Modal */}
      {isQrOpen && (
        <QrModal
          packageData={currentPackage}
          onClose={() => setIsQrOpen(false)}
        />
      )}

      {/* 6. Share Progress Modal */}
      {isShareOpen && (
        <ShareModal
          packageData={currentPackage}
          onClose={() => setIsShareOpen(false)}
        />
      )}

      {/* 7. Direct Courier Chat Modal */}
      {isChatOpen && (
        <ChatModal
          courier={currentPackage.courier}
          trackingId={currentPackage.trackingId}
          onClose={() => setIsChatOpen(false)}
        />
      )}

      {/* 8. Help Center Modal */}
      {isHelpOpen && (
        <HelpModal
          onClose={() => setIsHelpOpen(false)}
        />
      )}

    </div>
  );
}
