import React from 'react';
import {
  FileCheck2,
  Map,
  AlertOctagon,
  PhoneCall,
  ShieldCheck,
  Download,
  FileSignature
} from 'lucide-react';
import { DocumentPackage } from '../types';

interface FooterActionsProps {
  packageData: DocumentPackage;
  onOpenEpod: () => void;
  onOpenMap: () => void;
  onOpenEmergency: () => void;
}

export const FooterActions: React.FC<FooterActionsProps> = ({
  packageData,
  onOpenEpod,
  onOpenMap,
  onOpenEmergency,
}) => {
  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-white shadow-sm p-4 sm:p-6 space-y-4">
      
      {/* Action Buttons Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        
        {/* 1. Xem biên bản bàn giao điện tử (e-POD) */}
        <button
          onClick={onOpenEpod}
          className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-200 transition-all group cursor-pointer border border-white/20"
          id="btn-action-view-epod"
        >
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0 backdrop-blur-xs">
              <FileSignature className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xs text-blue-100 font-medium">Chứng từ pháp lý</div>
              <div className="text-sm font-bold text-white group-hover:translate-x-0.5 transition-transform">
                Xem Biên Bản Bàn Giao Điện Tử (e-POD)
              </div>
            </div>
          </div>
          <span className="text-xs bg-white/20 px-2.5 py-1 rounded-lg font-mono hidden sm:inline-block backdrop-blur-xs">
            TSA
          </span>
        </button>

        {/* 2. Xem lộ trình bản đồ chi tiết */}
        <button
          onClick={onOpenMap}
          className="flex items-center justify-between p-4 rounded-2xl bg-white/80 backdrop-blur-xs hover:bg-white border border-white/90 text-slate-800 shadow-xs hover:border-slate-200 transition-all group cursor-pointer"
          id="btn-action-view-map"
        >
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
              <Map className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">GPS Thời gian thực</div>
              <div className="text-sm font-bold text-slate-900 group-hover:translate-x-0.5 transition-transform">
                Xem Lộ Trình Bản Đồ Chi Tiết
              </div>
            </div>
          </div>
          <span className="text-xs text-blue-600 font-semibold hidden sm:inline-block">
            Mở &rarr;
          </span>
        </button>

        {/* 3. Báo cáo sự cố / Yêu cầu hỗ trợ khẩn cấp */}
        <button
          onClick={onOpenEmergency}
          className="flex items-center justify-between p-4 rounded-2xl bg-rose-50/80 backdrop-blur-xs hover:bg-rose-100/90 border border-rose-200/80 text-rose-900 shadow-xs transition-all group cursor-pointer"
          id="btn-action-emergency"
        >
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-rose-200">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-rose-600 font-medium">Đường dây nóng 24/7</div>
              <div className="text-sm font-bold text-rose-900 group-hover:translate-x-0.5 transition-transform">
                Báo Cáo Sự Cố & Hỗ Trợ Khẩn
              </div>
            </div>
          </div>
          <span className="text-xs font-bold text-rose-700 bg-rose-200/70 px-2.5 py-0.5 rounded-full hidden sm:inline-block">
            SOS
          </span>
        </button>

      </div>

      {/* Bottom Bar: Trust Assurance & Legal Compliance */}
      <div className="pt-3 border-t border-slate-200/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Hồ sơ được bảo hiểm rủi ro tài liệu pháp lý lên đến <strong>5.000.000.000 VNĐ</strong> bởi Bảo hiểm Bảo Việt.
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-400">
          <span>Tiêu chuẩn ISO 27001</span>
          <span>•</span>
          <span>Nghị định 130/2018/NĐ-CP</span>
          <span>•</span>
          <span className="text-slate-600 font-medium">Hotline: 1800 8899</span>
        </div>
      </div>

    </div>
  );
};
