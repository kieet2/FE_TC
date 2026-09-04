import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FilePlus,
  ShieldAlert,
  UserCheck,
  PackageCheck,
  Truck,
  FileCheck2,
  Check,
  Clock,
  ChevronRight,
  MapPin,
  ExternalLink,
  Sparkles,
  Info,
  Layers,
  Sliders,
  FileText
} from 'lucide-react';
import { MilestoneStage, DocumentPackage } from '../types';

interface InteractiveRoadmapProps {
  packageData: DocumentPackage;
  onSelectStage: (stage: MilestoneStage) => void;
  onJumpToStage: (stageId: number) => void;
}

const STAGE_ICONS = [
  FilePlus,      // 1. Khởi tạo & Đăng ký
  ShieldAlert,   // 2. Tiếp nhận & Xác nhận
  UserCheck,     // 3. Phân bổ nhân sự
  PackageCheck,  // 4. Lấy & Niêm phong
  Truck,         // 5. Đang vận chuyển
  FileCheck2,    // 6. Bàn giao & Hoàn tất
];

export const InteractiveRoadmap: React.FC<InteractiveRoadmapProps> = ({
  packageData,
  onSelectStage,
  onJumpToStage,
}) => {
  const [hoveredStageId, setHoveredStageId] = useState<number | null>(null);
  const [roadmapViewMode, setRoadmapViewMode] = useState<'horizontal' | 'timeline'>('horizontal');

  const { stages, currentStageId } = packageData;

  // Calculate position percentage of vehicle marker (0% to 100%)
  // 6 stages: 0, 20%, 40%, 60%, 80%, 100%
  // Or when on stage 5, it sits around 80% with micro movement
  const markerPercent = Math.min(100, Math.max(0, ((currentStageId - 1) / (stages.length - 1)) * 100));

  // Determine stage status
  const getStageStatus = (stage: MilestoneStage, index: number) => {
    if (stage.status === 'completed') return 'completed';
    if (stage.id === currentStageId) return 'active';
    if (stage.id < currentStageId) return 'completed';
    return 'pending';
  };

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-white shadow-sm p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Ambient glass light reflection */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/30 via-indigo-50/20 to-transparent rounded-full -mr-32 -mt-32 pointer-events-none" />

      {/* Top Section: Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-6 border-b border-slate-200/50 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-blue-600 shadow-xs shadow-blue-400"></span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Lộ Trình Bàn Giao Hồ Sơ Trực Quan
            </h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 shadow-xs">
              6 Chặng Tiêu Chuẩn
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Nhấn vào bất kỳ chặng nào để mở rộng nhật ký thao tác & thông tin thẩm duyệt niêm phong.
          </p>
        </div>

        {/* View Toggle & Step Simulator Quick Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Quick Stage Selectors for testing / review */}
          <div className="hidden xl:flex items-center gap-1 bg-white/80 backdrop-blur-xs p-1 rounded-xl text-[11px] font-medium text-slate-600 border border-white/90 shadow-xs">
            <span className="px-2 text-slate-400">Chọn chặng:</span>
            {stages.map((st) => (
              <button
                key={st.id}
                onClick={() => onJumpToStage(st.id)}
                className={`w-6 h-6 rounded-lg font-bold transition-all cursor-pointer ${
                  st.id === currentStageId
                    ? 'bg-blue-600 text-white shadow-xs shadow-blue-300'
                    : 'hover:bg-slate-100 text-slate-600'
                }`}
                title={`Chuyển trạng thái đến chặng ${st.id}: ${st.title}`}
              >
                {st.id}
              </button>
            ))}
          </div>

          {/* View mode toggle (Horizontal vs Detailed Timeline) */}
          <div className="inline-flex rounded-xl bg-white/80 backdrop-blur-xs p-1 border border-white/90 shadow-xs text-xs">
            <button
              onClick={() => setRoadmapViewMode('horizontal')}
              className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                roadmapViewMode === 'horizontal'
                  ? 'bg-blue-600 text-white shadow-xs shadow-blue-300'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ngang (Roadmap)
            </button>
            <button
              onClick={() => setRoadmapViewMode('timeline')}
              className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                roadmapViewMode === 'timeline'
                  ? 'bg-blue-600 text-white shadow-xs shadow-blue-300'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Dọc (Chi tiết)
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 1. HORIZONTAL ROADMAP VIEW */}
      {/* ============================================================ */}
      {roadmapViewMode === 'horizontal' && (
        <div className="mt-8 mb-4 relative z-10">
          
          {/* Active Stage ETA Banner on top of journey line */}
          <div className="flex items-center justify-between mb-8 px-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Chặng hiện thời:
              </span>
              <span className="text-xs font-bold text-slate-800 bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-xl border border-white/90 shadow-xs">
                Chặng {currentStageId}/6 - {stages[currentStageId - 1]?.title}
              </span>
            </div>

            {/* Live ETA indicator */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50/90 text-blue-900 border border-blue-200/80 text-xs font-semibold shadow-xs backdrop-blur-xs">
              <Clock className="w-3.5 h-3.5 text-blue-600 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Dự kiến hoàn thành: <strong className="text-blue-700">{packageData.eta}</strong></span>
            </div>
          </div>

          {/* Journey Line & Interactive Milestones Container */}
          <div className="relative px-2 sm:px-6 py-6">
            
            {/* 1. Base Inactive Line (Gray) */}
            <div className="absolute top-[50px] left-6 right-6 h-1.5 bg-slate-200/80 rounded-full" />

            {/* 2. Completed / Active Gradient Progress Line */}
            <motion.div
              className="absolute top-[50px] left-6 h-1.5 rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-blue-500 shadow-sm"
              initial={{ width: 0 }}
              animate={{
                width: `calc(${markerPercent}% - ${markerPercent > 0 ? '12px' : '0px'})`,
              }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />

            {/* 3. DYNAMIC VEHICLE / SHIPPER MARKER */}
            <motion.div
              className="absolute top-[28px] -ml-6 z-20 pointer-events-none"
              initial={{ left: '0%' }}
              animate={{ left: `${markerPercent}%` }}
              transition={{ duration: 0.9, type: 'spring', damping: 20 }}
            >
              <div className="relative flex flex-col items-center">
                {/* Vehicle Pin Icon with Radar Ripple */}
                <div className="relative">
                  <div className="absolute -inset-1.5 bg-blue-500/30 rounded-full animate-ping" />
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-300 border-2 border-white ring-2 ring-blue-300">
                    <Truck className="w-5 h-5" />
                  </div>
                </div>

                {/* Floating Tooltip */}
                <div className="mt-1 bg-slate-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md whitespace-nowrap flex items-center gap-1 backdrop-blur-xs border border-white/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Vị trí xe
                </div>
              </div>
            </motion.div>

            {/* 4. 6 Standard Milestones Nodes */}
            <div className="grid grid-cols-6 gap-1 sm:gap-4 relative z-10">
              {stages.map((stage, idx) => {
                const status = getStageStatus(stage, idx);
                const IconComponent = STAGE_ICONS[idx] || FileText;
                const isCurrentActive = stage.id === currentStageId;
                const isCompleted = status === 'completed';
                const isPending = status === 'pending';

                return (
                  <div
                    key={stage.id}
                    className="flex flex-col items-center text-center group cursor-pointer"
                    onClick={() => onSelectStage(stage)}
                    onMouseEnter={() => setHoveredStageId(stage.id)}
                    onMouseLeave={() => setHoveredStageId(null)}
                    id={`milestone-node-${stage.id}`}
                  >
                    {/* Node Circle with Frosted Glass styling */}
                    <div className="relative mb-3 flex flex-col items-center">
                      
                      {/* Active Node Bounce Indicator Pin */}
                      {isCurrentActive && (
                        <div className="absolute -top-11 animate-bounce pointer-events-none z-20">
                          <div className="bg-blue-600 text-white px-2 py-0.5 rounded-md text-[10px] font-bold shadow-lg shadow-blue-200 whitespace-nowrap">
                            Vị trí hiện tại
                          </div>
                          <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-blue-600 mx-auto" />
                        </div>
                      )}

                      {/* Active Node Radar Ring */}
                      {isCurrentActive && (
                        <div className="absolute -inset-2 rounded-full bg-blue-500/20 animate-ping pointer-events-none" />
                      )}

                      {/* Main Node Icon Button */}
                      <button
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 relative z-10 border-4 border-white cursor-pointer ${
                          isCompleted
                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200 group-hover:scale-105'
                            : isCurrentActive
                            ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 ring-4 ring-blue-50 group-hover:scale-105'
                            : 'bg-slate-200 text-slate-400 group-hover:bg-slate-300 group-hover:text-slate-600'
                        }`}
                        title={`${stage.title} - Nhấn để xem chi tiết`}
                      >
                        {isCompleted ? (
                          <Check className="w-5 h-5 stroke-[2.5]" />
                        ) : (
                          <IconComponent className="w-5 h-5" />
                        )}
                      </button>
                    </div>

                    {/* Step Title & Subtitle */}
                    <div className="space-y-1 w-full max-w-[120px]">
                      <h3
                        className={`text-[11px] font-bold uppercase tracking-wider leading-tight line-clamp-2 transition-colors ${
                          isCompleted
                            ? 'text-emerald-600 group-hover:text-emerald-700'
                            : isCurrentActive
                            ? 'text-blue-700 font-extrabold group-hover:text-blue-800'
                            : 'text-slate-400 group-hover:text-slate-600'
                        }`}
                      >
                        {stage.title}
                      </h3>

                      {isCurrentActive && (
                        <p className="text-[10px] font-medium text-slate-400">
                          ETA: 14:30
                        </p>
                      )}

                      {/* Status pill under title */}
                      <div className="pt-0.5">
                        {isCompleted ? (
                          <span className="inline-flex items-center text-[10px] font-semibold text-emerald-700 bg-emerald-50/90 px-1.5 py-0.5 rounded-md border border-emerald-200/70">
                            Xong
                          </span>
                        ) : isCurrentActive ? (
                          <span className="inline-flex items-center text-[10px] font-semibold text-blue-800 bg-blue-100/90 px-1.5 py-0.5 rounded-md border border-blue-300 animate-pulse">
                            Đang xử lý
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-[10px] font-medium text-slate-400 bg-slate-100/90 px-1.5 py-0.5 rounded-md">
                            Chờ
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quick Peek Tooltip on Hover */}
                    <AnimatePresence>
                      {hoveredStageId === stage.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute -bottom-28 z-30 w-56 bg-slate-900/95 text-white p-3 rounded-2xl shadow-xl text-left pointer-events-none backdrop-blur-md border border-white/20"
                        >
                          <div className="text-[11px] font-mono text-blue-300 mb-0.5">
                            Chặng 0{stage.stepNumber} • {stage.handlerRole}
                          </div>
                          <p className="text-xs font-semibold text-white">{stage.title}</p>
                          <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                            {stage.description}
                          </p>
                          <div className="mt-2 pt-1.5 border-t border-slate-700/60 flex items-center justify-between text-[10px] text-slate-400">
                            <span>Phụ trách: {stage.handlerName}</span>
                            <span className="text-blue-300 underline">Xem chi tiết &rarr;</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Note about Interactivity */}
          <div className="mt-6 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                <span>Đã xong</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block animate-pulse"></span>
                <span className="font-medium text-slate-700">Đang diễn ra (Active)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block"></span>
                <span>Chưa diễn ra</span>
              </span>
            </div>

            <span className="text-slate-400 text-[11px] italic">
              *Hệ thống mã hoá bảo mật chuẩn Viettel-CA và timestamp TSA quốc tế
            </span>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 2. DETAILED VERTICAL ACCORDION TIMELINE VIEW */}
      {/* ============================================================ */}
      {roadmapViewMode === 'timeline' && (
        <div className="mt-6 space-y-3.5">
          {stages.map((stage, idx) => {
            const status = getStageStatus(stage, idx);
            const IconComponent = STAGE_ICONS[idx] || FileText;
            const isCurrentActive = stage.id === currentStageId;
            const isCompleted = status === 'completed';

            return (
              <div
                key={stage.id}
                onClick={() => onSelectStage(stage)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 backdrop-blur-xs ${
                  isCurrentActive
                    ? 'bg-blue-50/90 border-blue-200 shadow-md shadow-blue-100 ring-2 ring-blue-400/40'
                    : isCompleted
                    ? 'bg-white/80 border-white/90 hover:border-emerald-200 hover:bg-white shadow-xs'
                    : 'bg-white/40 border-white/60 text-slate-400'
                }`}
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 border-2 border-white shadow-md ${
                      isCompleted
                        ? 'bg-emerald-500 text-white shadow-emerald-200'
                        : isCurrentActive
                        ? 'bg-blue-600 text-white shadow-blue-200 ring-4 ring-blue-100'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {isCompleted ? <Check className="w-5 h-5 stroke-[2.5]" /> : <IconComponent className="w-5 h-5" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-400">0{stage.stepNumber}</span>
                      <h4 className="text-sm font-bold text-slate-900">{stage.title}</h4>
                      {isCurrentActive && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                          Đang xử lý
                        </span>
                      )}
                      {isCompleted && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                          Hoàn tất
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">{stage.description}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-1.5 text-[11px] text-slate-500">
                      <span>Người phụ trách: <strong className="text-slate-700">{stage.handlerName}</strong></span>
                      {stage.completedAt && <span>Thời gian: {stage.completedAt}</span>}
                      {stage.estimatedTime && <span className="text-blue-700 font-semibold">{stage.estimatedTime}</span>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <span className="text-xs text-blue-600 font-semibold">Chi tiết nhật ký</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
