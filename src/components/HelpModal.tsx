import React from 'react';
import { X, HelpCircle, ShieldCheck, PhoneCall, FileQuestion, Lock, CheckCircle2 } from 'lucide-react';

interface HelpModalProps {
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ onClose }) => {
  const FAQS = [
    {
      q: 'Làm thế nào để đảm bảo hồ sơ gốc không bị thất lạc hoặc can thiệp?',
      a: 'Toàn bộ giấy tờ được niêm phong trong thùng chuyên dụng tích hợp khoá mã pin OTP một lần, tem niêm phong vật lý chống bóc tách (Tamper-evident) và cảm biến IoT giám sát lực rung chấn, độ ẩm liên tục.',
    },
    {
      q: 'Mã QR đối soát niêm phong dùng để làm gì?',
      a: 'Khi nhân viên giao nhận tới nơi, người nhận dùng điện thoại quét mã QR trên nắp thùng niêm phong. Hệ thống sẽ so khớp mã băm SHA-256 từ máy chủ cơ sở dữ liệu quốc gia để xác nhận chưa từng có can thiệp.',
    },
    {
      q: 'Biên bản bàn giao điện tử e-POD có giá trị pháp lý không?',
      a: 'Biên bản e-POD được đóng dấu thời gian TSA (Time Stamp Authority) và chứng thực chữ ký số công cộng theo Luật Giao dịch điện tử số 20/2023/QH15, có giá trị pháp lý đầy đủ trước Tòa án và Cơ quan Nhà nước.',
    },
    {
      q: 'Nếu phát hiện tem niêm phong có dấu hiệu rách hoặc trễ hẹn?',
      a: 'Người dùng nhấn ngay nút "Báo Cáo Sự Cố & Hỗ Trợ Khẩn" hoặc gọi hotline 1800 8899. Hệ thống sẽ lập tức khóa quy trình bàn giao và kích hoạt thanh tra an ninh.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white/95 backdrop-blur-md w-full max-w-xl rounded-2xl shadow-2xl border border-white/80 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        id="modal-help-center"
      >
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Trung Tâm Trợ Giúp & Hướng Dẫn</h3>
              <p className="text-[11px] text-slate-400">Quy chuẩn bàn giao an ninh tài liệu pháp lý</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
          
          {/* Quick Hotline */}
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="font-bold text-slate-900 text-sm">Hỗ Trợ Trực Tiếp 24/7</div>
              <p className="text-slate-600">Đội ngũ luật sư & chuyên viên điều phối trực tuyến</p>
            </div>
            <a
              href="tel:18008899"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shrink-0"
            >
              <PhoneCall className="w-4 h-4" />
              <span>1800 8899 (Miễn cước)</span>
            </a>
          </div>

          {/* 6 Stage Standard Explanation */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Quy trình bàn giao 6 bước khép kín</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-blue-700">1. Khởi tạo & Đăng ký:</span> Lập danh mục và mã hóa bản scan.
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-blue-700">2. Tiếp nhận & Xác nhận:</span> Duyệt và cấp mã seal số.
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-blue-700">3. Phân bổ nhân sự:</span> Gán bảo an viên có chứng chỉ.
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-blue-700">4. Lấy & Niêm phong:</span> Ký nhận gốc, đóng tem seal QR.
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-blue-700">5. Đang vận chuyển:</span> Giám sát GPS & cảm biến va đập.
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-blue-700">6. Bàn giao & Hoàn tất:</span> Đối soát QR, OTP & ký e-POD.
              </div>
            </div>
          </div>

          {/* FAQs list */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider mb-2 flex items-center gap-1.5">
              <FileQuestion className="w-4 h-4 text-blue-600" />
              <span>Câu hỏi thường gặp</span>
            </h4>
            <div className="space-y-2.5">
              {FAQS.map((faq, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                  <div className="font-bold text-slate-900">{faq.q}</div>
                  <div className="text-slate-600 leading-relaxed">{faq.a}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Đã hiểu
          </button>
        </div>

      </div>
    </div>
  );
};
