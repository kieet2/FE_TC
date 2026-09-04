import React, { useState } from 'react';
import { X, QrCode, Lock, Copy, Check, ShieldCheck, Download } from 'lucide-react';
import { DocumentPackage } from '../types';

interface QrModalProps {
  packageData: DocumentPackage;
  onClose: () => void;
}

export const QrModal: React.FC<QrModalProps> = ({ packageData, onClose }) => {
  const [copied, setCopied] = useState(false);
  const seal = packageData.securitySeal;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(seal.sealId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white/95 backdrop-blur-md w-full max-w-sm rounded-2xl shadow-2xl border border-white/80 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 text-center"
        id="modal-qr-enlarged"
      >
        
        {/* Header */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">Mã QR Đối Soát Niêm Phong</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* QR Body */}
        <div className="p-6 space-y-4">
          <div className="inline-block p-4 bg-white border-2 border-dashed border-blue-400 rounded-2xl shadow-sm">
            <img
              src={seal.qrCodeUrl}
              alt={`QR ${seal.sealId}`}
              className="w-48 h-48 object-contain mx-auto"
            />
          </div>

          <div className="space-y-1">
            <div className="text-xs text-slate-500 font-medium">Mã niêm phong điện tử:</div>
            <div className="inline-flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 font-mono font-bold text-sm text-blue-950">
              <span>{seal.sealId}</span>
              <button
                onClick={handleCopyCode}
                className="text-slate-500 hover:text-blue-600 cursor-pointer"
                title="Sao chép mã seal"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 text-xs text-blue-900 leading-relaxed text-left space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Hướng dẫn kiểm tra tại chỗ:</span>
            </div>
            <p className="text-slate-600">
              Bên tiếp nhận dùng camera điện thoại hoặc thiết bị quét chuyên dụng để quét mã này nhằm đối soát tính nguyên vẹn trước khi mở niêm phong hồ sơ gốc.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200">
          <button
            onClick={onClose}
            className="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
};
