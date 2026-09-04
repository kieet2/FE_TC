import React, { useState, useEffect } from 'react';
import {
  X,
  MapPin,
  Navigation,
  Layers,
  Compass,
  Radio,
  Clock,
  ShieldAlert,
  Car,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { DocumentPackage } from '../types';

interface LiveRouteMapModalProps {
  packageData: DocumentPackage;
  onClose: () => void;
}

export const LiveRouteMapModal: React.FC<LiveRouteMapModalProps> = ({
  packageData,
  onClose,
}) => {
  const [mapLayer, setMapLayer] = useState<'streets' | 'satellite'>('streets');
  const [courierPosition, setCourierPosition] = useState(65); // percentage along route (0 to 100)

  // Subtle real-time vibration/progress simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setCourierPosition((prev) => {
        if (prev >= 96) return 65; // loop gently
        return prev + 0.4;
      });
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white/95 backdrop-blur-md w-full max-w-4xl rounded-2xl shadow-2xl border border-white/80 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        id="modal-live-map"
      >
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-500/40 text-blue-400 flex items-center justify-center">
              <Navigation className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                  Giám Sát Hành Trình GPS Vệ Tinh
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Tuyến Đường Vận Chuyển An Ninh Bảo Mật
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Map Style Toggle */}
            <div className="hidden sm:inline-flex rounded-lg bg-slate-800 p-1 border border-slate-700 text-xs">
              <button
                onClick={() => setMapLayer('streets')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  mapLayer === 'streets' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Bản đồ đường bộ
              </button>
              <button
                onClick={() => setMapLayer('satellite')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  mapLayer === 'satellite' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Vệ tinh
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Map Canvas Simulation Area */}
        <div className="relative h-[420px] sm:h-[460px] bg-slate-100 overflow-hidden select-none">
          
          {/* Map Graphic Layer */}
          <div className={`absolute inset-0 transition-all duration-300 ${
            mapLayer === 'satellite' ? 'bg-slate-900' : 'bg-[#eef2f6]'
          }`}>
            
            {/* SVG Urban Grid Map Layout (District 1, HCMC) */}
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path
                    d="M 60 0 L 0 0 0 60"
                    fill="none"
                    stroke={mapLayer === 'satellite' ? '#1e293b' : '#e2e8f0'}
                    strokeWidth="1"
                  />
                </pattern>
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="60%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>

              {/* Grid Background */}
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Major Streets (Simulated Roads) */}
              <path d="M 0 100 L 900 100" stroke={mapLayer === 'satellite' ? '#334155' : '#cbd5e1'} strokeWidth="18" fill="none" />
              <path d="M 0 240 L 900 240" stroke={mapLayer === 'satellite' ? '#334155' : '#cbd5e1'} strokeWidth="22" fill="none" />
              <path d="M 0 380 L 900 380" stroke={mapLayer === 'satellite' ? '#334155' : '#cbd5e1'} strokeWidth="16" fill="none" />

              <path d="M 140 0 L 140 500" stroke={mapLayer === 'satellite' ? '#334155' : '#cbd5e1'} strokeWidth="16" fill="none" />
              <path d="M 380 0 L 380 500" stroke={mapLayer === 'satellite' ? '#334155' : '#cbd5e1'} strokeWidth="24" fill="none" />
              <path d="M 640 0 L 640 500" stroke={mapLayer === 'satellite' ? '#334155' : '#cbd5e1'} strokeWidth="18" fill="none" />

              {/* Street Names */}
              <text x="390" y="30" fill={mapLayer === 'satellite' ? '#94a3b8' : '#64748b'} fontSize="11" fontWeight="bold">
                Đường Lê Duẩn
              </text>
              <text x="50" y="235" fill={mapLayer === 'satellite' ? '#94a3b8' : '#64748b'} fontSize="11" fontWeight="bold">
                Đại lộ Nguyễn Huệ
              </text>
              <text x="650" y="30" fill={mapLayer === 'satellite' ? '#94a3b8' : '#64748b'} fontSize="11" fontWeight="bold">
                Đường Pasteur (Điểm đến)
              </text>
              <text x="50" y="375" fill={mapLayer === 'satellite' ? '#94a3b8' : '#64748b'} fontSize="11" fontWeight="bold">
                Đường Hải Triều (Tòa Bitexco)
              </text>

              {/* Authorized Secured Delivery Path (Curved Route) */}
              <path
                id="deliveryPath"
                d="M 140 380 Q 220 380 260 300 T 380 240 Q 520 240 580 160 T 640 100"
                fill="none"
                stroke="url(#routeGradient)"
                strokeWidth="6"
                strokeDasharray="8 4"
                strokeLinecap="round"
              />

              {/* Completed Track Segment (Solid) */}
              <path
                d="M 140 380 Q 220 380 260 300 T 380 240"
                fill="none"
                stroke="#10b981"
                strokeWidth="7"
                strokeLinecap="round"
              />
            </svg>

            {/* Waypoint 1: Bitexco (Start Point) */}
            <div className="absolute left-[120px] top-[340px] z-10 flex flex-col items-center">
              <div className="bg-emerald-600 text-white p-2 rounded-xl shadow-lg border-2 border-white flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span className="text-xs font-bold whitespace-nowrap">Xuất phát: Tòa Bitexco</span>
              </div>
              <span className="text-[10px] bg-slate-900/80 text-emerald-300 font-mono px-1.5 py-0.5 rounded mt-1">
                13:45 CH • Đã seal
              </span>
            </div>

            {/* Waypoint 2: Security Checkpoint 1 (Nguyen Hue) */}
            <div className="absolute left-[330px] top-[260px] z-10 flex flex-col items-center">
              <div className="bg-blue-800 text-white px-2 py-1 rounded-lg text-[10px] font-bold border border-blue-400 flex items-center gap-1 shadow-sm">
                <Radio className="w-3 h-3 text-blue-300" />
                <span>Trạm kiểm soát an ninh 01</span>
              </div>
            </div>

            {/* LIVE COURIER MARKER (Calculated on simulated curve) */}
            <div 
              className="absolute z-30 flex flex-col items-center transition-all duration-700 pointer-events-none"
              style={{
                left: `${140 + (courierPosition / 100) * 460}px`,
                top: `${380 - (courierPosition / 100) * 260}px`,
              }}
            >
              {/* Radar pulse rings */}
              <div className="relative">
                <div className="absolute -inset-3 bg-blue-500/40 rounded-full animate-ping" />
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xl border-3 border-white ring-4 ring-blue-400/50">
                  <Car className="w-6 h-6" />
                </div>
              </div>

              <div className="mt-1 bg-slate-950/90 text-white text-xs px-2.5 py-1 rounded-lg shadow-xl border border-blue-500/40 whitespace-nowrap flex items-center gap-1.5 backdrop-blur-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-bold">{packageData.courier.name}</span>
                <span className="text-slate-400">({packageData.courier.plateNumber})</span>
              </div>
            </div>

            {/* Waypoint 3: Destination (Phòng Công chứng Số 1 - 97 Pasteur) */}
            <div className="absolute left-[560px] top-[60px] z-10 flex flex-col items-center">
              <div className="bg-amber-600 text-white p-2 rounded-xl shadow-lg border-2 border-white flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span className="text-xs font-bold whitespace-nowrap">Đích: Phòng Công chứng Số 1</span>
              </div>
              <span className="text-[10px] bg-slate-900/80 text-amber-300 font-mono px-1.5 py-0.5 rounded mt-1">
                97 Pasteur, Q.1 • ETA: {packageData.eta}
              </span>
            </div>

          </div>

          {/* Floating Live Telemetry HUD Card */}
          <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-200/80 shadow-lg text-xs space-y-2 max-w-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                <span>Tín hiệu GPS Vệ Tinh</span>
              </span>
              <span className="font-mono text-emerald-700 font-semibold text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded">
                TRỰC TIẾP
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-slate-400">Khoảng cách còn lại:</span>
                <div className="font-bold text-slate-900">{packageData.distanceRemainingKm} km</div>
              </div>
              <div>
                <span className="text-slate-400">Vận tốc hiện tại:</span>
                <div className="font-bold text-slate-900">28.4 km/h</div>
              </div>
              <div>
                <span className="text-slate-400">Tình trạng giao thông:</span>
                <div className="font-semibold text-emerald-700">Thông thoáng</div>
              </div>
              <div>
                <span className="text-slate-400">Độ trễ tín hiệu:</span>
                <div className="font-mono font-semibold text-slate-800">&lt; 0.2s</div>
              </div>
            </div>
          </div>

          {/* Floating Map Compass / Legend */}
          <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
            <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 shadow-md">
              <span className="text-slate-400">Lộ trình: </span>
              <strong className="text-blue-700">Hải Triều &rarr; Lê Duẩn &rarr; Pasteur</strong>
            </div>
          </div>

        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Cảm biến định vị kép GPS + Glonass độ chính xác cấp quân sự cho hồ sơ pháp lý.
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Đóng Bản Đồ
          </button>
        </div>

      </div>
    </div>
  );
};
