import React, { useState } from 'react';
import {
  Phone,
  MessageSquare,
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  QrCode,
  Lock,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Activity,
  Maximize2
} from 'lucide-react';
import { DocumentPackage } from '../types';

interface CurrentStageCardProps {
  packageData: DocumentPackage;
  onOpenQrModal: () => void;
  onOpenChatModal: () => void;
  onCallCourier: () => void;
}

export const CurrentStageCard: React.FC<CurrentStageCardProps> = ({
  packageData,
  onOpenQrModal,
  onOpenChatModal,
  onCallCourier,
}) => {
  const [showDocList, setShowDocList] = useState(false);
  const { courier, securitySeal, stages, currentStageId } = packageData;
  const currentStage = stages.find((s) => s.id === currentStageId) || stages[0];

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-white shadow-sm overflow-hidden">
      
      {/* Top Header Strip: Current Stage Overview */}
      <div className="bg-slate-900/95 backdrop-blur-md text-white px-5 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/40 text-blue-300 flex items-center justify-center font-bold text-sm shrink-0">
            0{currentStage.stepNumber}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">
                Tác Vụ Hiện Tại Đang Thực Hiện
              </span>
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {currentStage.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/20 text-xs">
          <Clock className="w-4 h-4 text-blue-300" />
          <span className="text-slate-200">Cập nhật GPS:</span>
          <span className="font-semibold text-white">30 giây trước</span>
        </div>
      </div>

      {/* Main Content Grid: 3 Logical Columns */}
      <div className="p-5 sm:p-6 lg:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ============================================================ */}
        {/* COLUMN 1: Courier / Responsible Personnel Info (4 cols) */}
        {/* ============================================================ */}
        <div className="lg:col-span-4 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200/50 pb-6 lg:pb-0 lg:pr-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Nhân sự bảo an giao nhận</span>
            </div>

            {/* Courier Profile Header */}
            <div className="flex items-start gap-3.5">
              <div className="relative">
                <img
                  src={courier.avatar}
                  alt={courier.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md ring-2 ring-blue-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-0.5 rounded-full ring-2 border border-white" title="Đã xác minh sinh trắc học">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-slate-900">{courier.name}</h4>
                  <span className="text-[10px] font-semibold bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded-md border border-blue-200/80 shadow-xs">
                    Chính chủ
                  </span>
                </div>
                <p className="text-xs font-mono text-slate-500">Mã thẻ: {courier.badgeId}</p>

                {/* Rating & Stats */}
                <div className="flex items-center gap-2 pt-1 text-xs">
                  <div className="flex items-center text-amber-500 font-bold gap-0.5">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{courier.rating}</span>
                  </div>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500">{courier.deliveriesCount} chuyến an toàn</span>
                </div>
              </div>
            </div>

            {/* Vehicle & Security Certificate details */}
            <div className="mt-4 p-3 bg-white/60 backdrop-blur-xs rounded-xl border border-white/80 space-y-1.5 text-xs shadow-xs">
              <div className="flex items-start justify-between gap-2">
                <span className="text-slate-500">Phương tiện:</span>
                <span className="font-semibold text-slate-800 text-right">{courier.plateNumber}</span>
              </div>
              <p className="text-[11px] text-slate-500 italic line-clamp-1">{courier.vehicleType}</p>
              <div className="pt-1.5 border-t border-slate-200/50 flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span className="line-clamp-1">{courier.securityCert}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons: Direct Call & Secure Message */}
          <div className="mt-4 pt-3 flex items-center gap-2.5">
            <button
              onClick={onCallCourier}
              className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-md shadow-blue-200 cursor-pointer"
              id="btn-call-courier"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Gọi ({courier.phone})</span>
            </button>

            <button
              onClick={onOpenChatModal}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/80 backdrop-blur-xs hover:bg-white text-slate-700 border border-white/90 font-semibold text-xs transition-colors shadow-xs cursor-pointer"
              id="btn-chat-courier"
              title="Gửi tin nhắn bảo mật trực tiếp"
            >
              <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
              <span>Nhắn tin</span>
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* COLUMN 2: Time, Location & Route Status (4 cols) */}
        {/* ============================================================ */}
        <div className="lg:col-span-4 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200/50 pb-6 lg:pb-0 lg:pr-6">
          <div className="space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Thời gian & Địa điểm hành trình</span>
            </div>

            {/* Current Location vs Next Destination */}
            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-blue-500 before:to-emerald-500">
              
              {/* Current Spot */}
              <div className="relative">
                <span className="absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full bg-blue-600 border-2 border-white ring-2 ring-blue-200" />
                <div className="text-[11px] font-semibold text-blue-600 uppercase">
                  Vị trí cập nhật tức thời:
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug mt-0.5">
                  {packageData.currentLocation}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">Tốc độ: 28 km/h • GPS độ lệch &lt; 2m</p>
              </div>

              {/* Destination Spot */}
              <div className="relative">
                <span className="absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full bg-emerald-600 border-2 border-white ring-2 ring-emerald-200" />
                <div className="text-[11px] font-semibold text-emerald-700 uppercase">
                  Điểm đến tiếp theo (Bàn giao):
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug mt-0.5">
                  {packageData.nextDestination}
                </p>
                <div className="mt-1 flex items-center gap-2 text-[11px] font-medium text-slate-500">
                  <span>Còn lại: <strong className="text-slate-800">{packageData.distanceRemainingKm} km</strong></span>
                  <span>•</span>
                  <span>Dự kiến: <strong className="text-blue-700">{packageData.eta}</strong></span>
                </div>
              </div>

            </div>
          </div>

          {/* Collapsible Document List Preview */}
          <div className="mt-4 pt-3 border-t border-slate-200/50">
            <button
              onClick={() => setShowDocList(!showDocList)}
              className="w-full flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-blue-600 py-1 transition-colors cursor-pointer"
              id="btn-toggle-doc-list"
            >
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Danh mục {packageData.documents.length} tài liệu niêm phong</span>
              </span>
              <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${showDocList ? 'rotate-90' : ''}`} />
            </button>

            {showDocList && (
              <div className="mt-2 space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {packageData.documents.map((doc) => (
                  <div key={doc.id} className="p-2 rounded-xl bg-white/60 backdrop-blur-xs text-[11px] border border-white/80 flex items-start justify-between gap-2 shadow-xs">
                    <span className="font-medium text-slate-800 line-clamp-1">{doc.title}</span>
                    <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded-md shrink-0 border border-blue-100">
                      {doc.classification}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ============================================================ */}
        {/* COLUMN 3: Security Seal & QR Code Verification (4 cols) */}
        {/* ============================================================ */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-blue-600" />
                <span>Mã Niêm Phong & Đối Soát QR</span>
              </span>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shadow-xs">
                {securitySeal.integrityStatus}
              </span>
            </div>

            {/* Seal & QR display card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/50 backdrop-blur-xs border border-blue-100 flex items-center justify-between gap-4 shadow-xs">
              <div className="space-y-1.5">
                <div className="text-[11px] font-medium text-slate-500">Mã Seal Điện Tử:</div>
                <div className="text-base font-mono font-extrabold text-blue-900 tracking-wider">
                  {securitySeal.sealId}
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">
                  Quét mã QR tại điểm tiếp nhận để đối soát tình trạng niêm phong và kích hoạt mở thùng an ninh.
                </p>
              </div>

              {/* QR Code preview with zoom button */}
              <div className="relative shrink-0 group">
                <img
                  src={securitySeal.qrCodeUrl}
                  alt={`QR Code ${securitySeal.sealId}`}
                  className="w-20 h-20 bg-white p-1 rounded-xl border border-white shadow-xs object-contain cursor-pointer"
                  onClick={onOpenQrModal}
                />
                <button
                  onClick={onOpenQrModal}
                  className="absolute inset-0 bg-slate-900/40 rounded-xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  title="Phóng to mã QR"
                  id="btn-expand-qr"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* IoT Sensor indicators (Safe shock, humidity, temp) */}
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-xl bg-white/60 backdrop-blur-xs border border-white/80 shadow-xs">
                <div className="text-[10px] text-slate-400 font-medium">Cảm biến rung</div>
                <div className="text-xs font-bold text-slate-800 mt-0.5">{securitySeal.sensorShock}</div>
              </div>
              <div className="p-2 rounded-xl bg-white/60 backdrop-blur-xs border border-white/80 shadow-xs">
                <div className="text-[10px] text-slate-400 font-medium">Độ ẩm buồng</div>
                <div className="text-xs font-bold text-emerald-700 mt-0.5">{securitySeal.sensorHumidity}</div>
              </div>
              <div className="p-2 rounded-xl bg-white/60 backdrop-blur-xs border border-white/80 shadow-xs">
                <div className="text-[10px] text-slate-400 font-medium">Nhiệt độ</div>
                <div className="text-xs font-bold text-slate-800 mt-0.5">{securitySeal.sensorTemp}</div>
              </div>
            </div>
          </div>

          {/* Bottom Security Note */}
          <div className="mt-4 pt-3 border-t border-slate-200/50 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1 text-emerald-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Chống bóc tách vi phạm (Tamper-evident)</span>
            </span>
            <button
              onClick={onOpenQrModal}
              className="text-blue-600 hover:underline font-semibold cursor-pointer"
            >
              Mở lớn QR
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
