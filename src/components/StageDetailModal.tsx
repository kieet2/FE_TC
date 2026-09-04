import React from 'react';
import {
  X,
  CheckCircle2,
  Clock,
  User,
  ShieldCheck,
  FileText,
  FileCheck,
  MapPin,
  ChevronRight,
  Hash
} from 'lucide-react';
import { MilestoneStage } from '../types';

interface StageDetailModalProps {
  stage: MilestoneStage | null;
  onClose: () => void;
  onJumpToStage: (stageId: number) => void;
  totalStages: number;
}

export const StageDetailModal: React.FC<StageDetailModalProps> = ({
  stage,
  onClose,
  onJumpToStage,
  totalStages,
}) => {
  if (!stage) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white/95 backdrop-blur-md w-full max-w-2xl rounded-2xl shadow-2xl border border-white/80 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        id="modal-stage-detail"
      >
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-500/50 text-blue-400 font-mono font-bold flex items-center justify-center text-sm">
              0{stage.stepNumber}
            </span>
            <div>
              <div className="text-xs text-blue-400 font-semibold uppercase tracking-wider">
                Chi tiết chặng {stage.stepNumber}/{totalStages}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {stage.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            id="btn-close-stage-modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          
          {/* Status & Subtitle */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-semibold text-slate-500">Mục tiêu nghiệp vụ:</div>
              <div className="text-slate-800 font-medium mt-0.5">{stage.subtitle}</div>
            </div>

            <div>
              {stage.status === 'completed' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Đã hoàn tất ({stage.completedAt})
                </span>
              )}
              {stage.status === 'active' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300">
                  <Clock className="w-4 h-4 text-amber-600 animate-spin" style={{ animationDuration: '4s' }} />
                  Đang tiến hành ({stage.estimatedTime})
                </span>
              )}
              {stage.status === 'pending' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                  Chưa diễn ra
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Quy trình chi tiết
            </h4>
            <p className="text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-slate-200/80">
              {stage.description}
            </p>
          </div>

          {/* Personnel & Security Code Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Người phụ trách chặng
              </div>
              <div className="font-bold text-slate-900">{stage.handlerName}</div>
              <div className="text-xs text-slate-500 mt-0.5">{stage.handlerRole}</div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Mã bảo an đối soát
              </div>
              <div className="font-mono font-bold text-blue-700">{stage.securityCode || 'BẢO MẬT HỆ THỐNG'}</div>
              <div className="text-xs text-emerald-600 font-medium mt-0.5">Xác thực chứng thực số SHA-256</div>
            </div>
          </div>

          {/* Documents Checked in this Stage (if any) */}
          {stage.documentsChecked && stage.documentsChecked.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-blue-600" />
                <span>Chứng từ đã kiểm đếm & niêm phong tại chặng này</span>
              </h4>
              <div className="space-y-1.5">
                {stage.documentsChecked.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 bg-blue-50/50 border border-blue-100 rounded-lg text-xs text-slate-800 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activity Timeline Logs */}
          {stage.logs && stage.logs.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Nhật ký sự kiện thời gian thực (Audit Trail)
              </h4>
              <div className="space-y-3 relative pl-4 before:absolute before:left-1 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {stage.logs.map((log, idx) => (
                  <div key={idx} className="relative pl-3">
                    <span className="absolute -left-[17px] top-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-semibold text-slate-700">{log.time}</span>
                      <span className="text-[11px] bg-slate-100 px-1.5 py-0.5 rounded font-mono">{log.operator}</span>
                    </div>
                    <p className="text-xs text-slate-800 mt-0.5 font-medium">{log.action}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {stage.notes && (
            <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900">
              <span className="font-bold">Ghi chú giám sát: </span>
              {stage.notes}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => onJumpToStage(stage.id)}
            className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
          >
            <span>Đặt chặng này làm trạng thái hiển thị chính</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
};
