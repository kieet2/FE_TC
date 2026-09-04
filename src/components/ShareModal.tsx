import React, { useState } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  QrCode,
  ShieldCheck,
  Send,
  MessageSquare,
  Mail,
  Lock
} from 'lucide-react';
import { DocumentPackage } from '../types';

interface ShareModalProps {
  packageData: DocumentPackage;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ packageData, onClose }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPin, setCopiedPin] = useState(false);

  const shareUrl = `${window.location.origin}/?track=${packageData.trackingId}`;
  const accessPin = '9842';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyPin = () => {
    navigator.clipboard.writeText(accessPin);
    setCopiedPin(true);
    setTimeout(() => setCopiedPin(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white/95 backdrop-blur-md w-full max-w-md rounded-2xl shadow-2xl border border-white/80 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        id="modal-share-progress"
      >
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Share2 className="w-5 h-5 text-blue-400" />
            <h3 className="text-sm sm:text-base font-bold text-white">
              Chia Sẻ Tiến Độ Bàn Giao
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 text-sm">
          
          {/* Security Notice */}
          <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 flex items-start gap-2.5 text-xs text-blue-900">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Liên kết được bảo vệ bằng mã PIN bảo mật. Người nhận chỉ có thể xem tiến độ thực tế, không thể chỉnh sửa hoặc can thiệp thông tin.
            </p>
          </div>

          {/* Share Link Field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Đường dẫn theo dõi trực tiếp:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 select-all"
              />
              <button
                onClick={handleCopyLink}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
              >
                {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLink ? 'Đã chép' : 'Chép'}</span>
              </button>
            </div>
          </div>

          {/* Access PIN Field */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-[11px] text-slate-500 font-medium">Mã PIN xác thực xem tiến độ:</div>
              <div className="font-mono text-base font-bold text-slate-900 tracking-wider">{accessPin}</div>
            </div>
            <button
              onClick={handleCopyPin}
              className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg border border-slate-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copiedPin ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPin ? 'Đã sao chép' : 'Chép PIN'}</span>
            </button>
          </div>

          {/* QR Code Quick Scan for Mobile */}
          <div className="pt-2 text-center">
            <div className="text-xs text-slate-500 mb-2">Hoặc quét mã QR để mở nhanh trên điện thoại:</div>
            <div className="inline-block p-2 bg-white border border-slate-200 rounded-xl shadow-xs">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(shareUrl)}`}
                alt="QR Share"
                className="w-28 h-28 mx-auto"
              />
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
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
