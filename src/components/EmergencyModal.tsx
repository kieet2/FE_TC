import React, { useState } from 'react';
import {
  X,
  AlertTriangle,
  PhoneCall,
  ShieldAlert,
  Send,
  CheckCircle2,
  Lock,
  Clock,
  MapPin
} from 'lucide-react';
import { DocumentPackage } from '../types';

interface EmergencyModalProps {
  packageData: DocumentPackage;
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  packageData,
  onClose,
}) => {
  const [selectedIncident, setSelectedIncident] = useState('Nghi ngờ vi phạm niêm phong hoặc rách tem');
  const [incidentNote, setIncidentNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const INCIDENT_TYPES = [
    'Nghi ngờ vi phạm niêm phong hoặc rách tem seal',
    'Yêu cầu dừng khẩn cấp / Tạm giữ hồ sơ tại trạm an ninh',
    'Thay đổi người nhận / Điểm bàn giao sang vị trí công chứng mới',
    'Kẹt xe nghiêm trọng / Trễ hẹn làm việc với đối tác quá 30 phút',
    'Yêu cầu xác minh lại danh tính nhân sự vận chuyển',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white/95 backdrop-blur-md w-full max-w-xl rounded-2xl shadow-2xl border border-white/80 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        id="modal-emergency-support"
      >
        
        {/* Header with Alert styling */}
        <div className="px-6 py-4 bg-rose-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-xs font-semibold text-rose-100 uppercase tracking-wider">
                Trung Tâm Phản Ứng Nhanh 24/7
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Báo Cáo Sự Cố & Hỗ Trợ Khẩn Cấp
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-rose-200 hover:text-white hover:bg-rose-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          
          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                Đã Kích Hoạt Lệnh Hỗ Trợ Khẩn Cấp!
              </h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Đội ngũ điều phối an ninh & Giám sát trưởng hồ sơ pháp lý đã nhận được tín hiệu cảnh báo.
                Chuyên viên an ninh sẽ liên hệ với bạn trong vòng <strong>60 giây</strong> qua số điện thoại đăng ký.
              </p>
              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Đã hiểu & Quay lại theo dõi
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Hotline Callout Banner */}
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-rose-900 uppercase">
                    Đường dây nóng can thiệp tức thì
                  </div>
                  <div className="text-xs text-rose-700">
                    Trường hợp khẩn cấp liên quan đến tính bảo mật hồ sơ:
                  </div>
                </div>

                <a
                  href="tel:18008899"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 animate-bounce" />
                  <span>Gọi 1800 8899 (Miễn cước)</span>
                </a>
              </div>

              {/* Incident Reporting Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Loại sự cố / Tình huống phát sinh:
                  </label>
                  <div className="space-y-2">
                    {INCIDENT_TYPES.map((type) => (
                      <label
                        key={type}
                        className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                          selectedIncident === type
                            ? 'bg-rose-50/70 border-rose-300 text-rose-950 font-semibold'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="incident"
                          checked={selectedIncident === type}
                          onChange={() => setSelectedIncident(type)}
                          className="mt-0.5 text-rose-600 focus:ring-rose-500"
                        />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Mô tả chi tiết bổ sung (không bắt buộc):
                  </label>
                  <textarea
                    rows={3}
                    value={incidentNote}
                    onChange={(e) => setIncidentNote(e.target.value)}
                    placeholder="Nhập thông tin cụ thể (ví dụ: tôi cần lùi giờ bàn giao sang 15:00 do đối tác chưa đến kịp...)"
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 space-y-1">
                  <div>Mã hồ sơ kích hoạt: <strong className="font-mono text-slate-800">{packageData.trackingId}</strong></div>
                  <div>Nhân viên phụ trách hiện tại: <strong className="text-slate-800">{packageData.courier.name}</strong> ({packageData.courier.phone})</div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                  >
                    Hủy bỏ
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Đang gửi tín hiệu SOS...' : 'Gửi Yêu Cầu Khẩn Cấp'}</span>
                  </button>
                </div>
              </form>
            </>
          )}

        </div>

      </div>
    </div>
  );
};
