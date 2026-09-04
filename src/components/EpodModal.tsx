import React, { useState } from 'react';
import {
  X,
  Printer,
  Download,
  ShieldCheck,
  CheckCircle2,
  FileSignature,
  QrCode,
  Lock,
  Stamp,
  Calendar,
  Building,
  Check
} from 'lucide-react';
import { DocumentPackage } from '../types';

interface EpodModalProps {
  packageData: DocumentPackage;
  onClose: () => void;
}

export const EpodModal: React.FC<EpodModalProps> = ({ packageData, onClose }) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white/95 backdrop-blur-md w-full max-w-3xl rounded-2xl shadow-2xl border border-white/80 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        id="modal-epod-view"
      >
        
        {/* Modal Top Bar */}
        <div className="px-6 py-3.5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <FileSignature className="w-5 h-5 text-blue-400" />
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Biên Bản Bàn Giao Điện Tử (e-POD)
              </h3>
              <p className="text-[11px] text-slate-400">
                Chứng chỉ số Timestamp TSA • Mã chứng thực: {packageData.epodDetails?.podId || 'EPOD-2026-VN'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="In biên bản"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Legal Document Sheet Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800 bg-slate-50/50">
          
          {/* Certificate Paper Header */}
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs relative overflow-hidden space-y-6">
            
            {/* Stamp Watermark in Background */}
            <div className="absolute right-6 top-8 opacity-5 pointer-events-none select-none">
              <Stamp className="w-64 h-64 text-blue-900 rotate-12" />
            </div>

            {/* National Header Style */}
            <div className="text-center space-y-1 pb-4 border-b border-slate-200">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
              </div>
              <div className="text-[11px] font-medium text-slate-600 underline underline-offset-4">
                Độc lập - Tự do - Hạnh phúc
              </div>
              <div className="pt-3">
                <h2 className="text-base sm:text-lg font-extrabold text-blue-950 uppercase tracking-tight">
                  BIÊN BẢN GIAO NHẬN & NIÊM PHONG HỒ SƠ PHÁP LÝ ĐIỆN TỬ
                </h2>
                <p className="text-xs font-mono text-slate-500 mt-0.5">
                  Số: {packageData.trackingId} / BBGN-E-POD
                </p>
              </div>
            </div>

            {/* General Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                <div className="font-bold text-slate-900 uppercase text-[10px] text-blue-700">1. Đơn Vị Gửi Hồ Sơ</div>
                <div><strong>Đại diện:</strong> {packageData.sender.name}</div>
                <div><strong>Cơ quan:</strong> {packageData.sender.organization}</div>
                <div><strong>Địa chỉ:</strong> {packageData.sender.address}</div>
                <div><strong>Điện thoại:</strong> {packageData.sender.contactPhone}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                <div className="font-bold text-slate-900 uppercase text-[10px] text-emerald-700">2. Đơn Vị Tiếp Nhận</div>
                <div><strong>Người nhận:</strong> {packageData.receiver.name}</div>
                <div><strong>Cơ quan:</strong> {packageData.receiver.organization}</div>
                <div><strong>Địa chỉ:</strong> {packageData.receiver.address}</div>
                <div><strong>Điện thoại:</strong> {packageData.receiver.contactPhone}</div>
              </div>
            </div>

            {/* Courier Dispatch Information */}
            <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-bold text-blue-900">3. Đơn Vị Vận Chuyển An Ninh: </span>
                <span>{packageData.courier.name} (Thẻ bảo an: {packageData.courier.badgeId})</span>
              </div>
              <div className="text-slate-600">
                Biển số xe: <strong>{packageData.courier.plateNumber}</strong>
              </div>
            </div>

            {/* Document Inventory Table */}
            <div>
              <div className="text-xs font-bold text-slate-900 uppercase mb-2">
                4. Danh Mục Hồ Sơ Gốc Bàn Giao Niêm Phong ({packageData.documents.length} Mục)
              </div>
              <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-2.5 w-12 text-center">STT</th>
                      <th className="p-2.5">Tên Tài Liệu / Giấy Tờ Pháp Lý</th>
                      <th className="p-2.5 text-center w-24">Phân Loại</th>
                      <th className="p-2.5 text-center w-16">Số bản</th>
                      <th className="p-2.5 text-center w-24">Tình trạng</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {packageData.documents.map((doc, idx) => (
                      <tr key={doc.id} className="hover:bg-slate-50/70">
                        <td className="p-2.5 text-center font-mono text-slate-500">0{idx + 1}</td>
                        <td className="p-2.5">
                          <div className="font-medium text-slate-900">{doc.title}</div>
                          <div className="text-[10px] font-mono text-slate-400">Hash SHA-256: {doc.securityHash.slice(0, 24)}...</div>
                        </td>
                        <td className="p-2.5 text-center">
                          <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                            {doc.classification}
                          </span>
                        </td>
                        <td className="p-2.5 text-center font-semibold">{doc.copyCount} ({doc.pages} trang)</td>
                        <td className="p-2.5 text-center text-emerald-700 font-medium">Nguyên vẹn</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Seal & Tamper Confirmation */}
            <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold uppercase text-[11px]">
                  <Lock className="w-4 h-4" />
                  <span>Xác nhận kiểm tra niêm phong số</span>
                </div>
                <div>Mã seal: <strong className="font-mono text-blue-300">{packageData.securitySeal.sealId}</strong></div>
                <div className="text-slate-300">
                  Tình trạng kiểm tra: {packageData.securitySeal.integrityStatus} • Cảm biến va đập {packageData.securitySeal.sensorShock}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <img
                  src={packageData.securitySeal.qrCodeUrl}
                  alt="Mã QR seal"
                  className="w-14 h-14 bg-white p-1 rounded-lg"
                />
                <div className="text-left text-[11px] text-slate-400 font-mono">
                  <div>Xác thực số 2 chiều</div>
                  <div className="text-emerald-400 font-semibold">VERIFIED HASH</div>
                </div>
              </div>
            </div>

            {/* Signatures & TSA Stamp Block */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200 text-center text-xs">
              
              {/* Bên gửi */}
              <div className="space-y-2 p-3 bg-slate-50/80 rounded-xl border border-slate-100">
                <div className="font-bold text-slate-700 uppercase text-[10px]">Đại diện Bên gửi</div>
                <div className="text-[11px] text-slate-500">Đã ký số Token CA</div>
                <div className="h-14 flex items-center justify-center">
                  <div className="font-serif italic font-bold text-blue-900 text-sm border-b border-blue-400 pb-0.5">
                    Lê Minh Trí
                  </div>
                </div>
                <div className="text-[10px] text-emerald-700 font-mono flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Ký số lúc 11:20 SA</span>
                </div>
              </div>

              {/* Nhân viên giao nhận */}
              <div className="space-y-2 p-3 bg-slate-50/80 rounded-xl border border-slate-100">
                <div className="font-bold text-slate-700 uppercase text-[10px]">Nhân viên An ninh Vận chuyển</div>
                <div className="text-[11px] text-slate-500">Ký sinh trắc học thiết bị cầm tay</div>
                <div className="h-14 flex items-center justify-center">
                  <div className="font-serif italic font-bold text-slate-900 text-sm border-b border-slate-400 pb-0.5">
                    Trần Văn Hoàng
                  </div>
                </div>
                <div className="text-[10px] text-emerald-700 font-mono flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Ký nhận lúc 13:45 CH</span>
                </div>
              </div>

              {/* Bên nhận */}
              <div className="space-y-2 p-3 bg-slate-50/80 rounded-xl border border-slate-100">
                <div className="font-bold text-slate-700 uppercase text-[10px]">Đại diện Bên nhận</div>
                <div className="text-[11px] text-slate-500">Chữ ký điện tử đối soát OTP</div>
                <div className="h-14 flex items-center justify-center">
                  {packageData.epodDetails?.receiverSignatureUrl ? (
                    <div className="font-serif italic font-bold text-emerald-900 text-sm border-b border-emerald-400 pb-0.5">
                      Võ Thị Minh Châu
                    </div>
                  ) : (
                    <div className="text-[11px] text-amber-700 italic bg-amber-50 px-2 py-1 rounded border border-amber-200">
                      Sẵn sàng ký khi xe tới điểm hẹn
                    </div>
                  )}
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {packageData.epodDetails?.receiverSignatureUrl ? 'Đã hoàn tất ký nhận' : 'Chờ xác thực OTP'}
                </div>
              </div>

            </div>

            {/* Legal Notice */}
            <div className="pt-2 text-[10px] text-slate-400 text-center leading-relaxed">
              Biên bản bàn giao điện tử này có giá trị pháp lý tương đương bản giấy theo Luật Giao dịch điện tử số 20/2023/QH15.
              Mã thời gian TSA được cấp bởi tổ chức cung cấp dịch vụ chứng thực chữ ký số công cộng.
            </div>

          </div>

        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-3.5 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Mã băm SHA-256 đối soát: <strong className="font-mono text-slate-700">{packageData.epodDetails?.sha256Hash.slice(0, 16)}...</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors shadow-xs cursor-pointer"
              id="btn-download-epod"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Đã tải PDF thành công!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Tải Biên Bản PDF</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
