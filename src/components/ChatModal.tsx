import React, { useState } from 'react';
import { X, Send, ShieldCheck, CheckCheck, Clock } from 'lucide-react';
import { CourierInfo } from '../types';

interface ChatModalProps {
  courier: CourierInfo;
  trackingId: string;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'courier';
  text: string;
  time: string;
}

export const ChatModal: React.FC<ChatModalProps> = ({
  courier,
  trackingId,
  onClose,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'courier',
      text: `Xin chào Quý khách! Tôi là ${courier.name} (Bảo an viên phụ trách hồ sơ ${trackingId}). Thùng bảo mật đang di chuyển an toàn trên đường, tôi sẽ liên hệ trước 5 phút khi đến điểm bàn giao.`,
      time: '14:10 CH',
    },
  ]);
  const [inputText, setInputText] = useState('');

  const QUICK_REPLIES = [
    'Tôi đang đợi ở tầng 1 quầy an ninh',
    'Khi đến hãy gọi chuông phòng 102',
    'Bên nhận đã chuẩn bị mã OTP đối soát',
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      time: 'Vừa xong',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Simulate smart quick response from courier
    setTimeout(() => {
      const replies = [
        'Dạ tôi đã nhận được thông tin ghi chú của Quý khách. Tôi sẽ lưu ý khi tiếp cận điểm hẹn.',
        'Dạ vâng! Tôi đang qua ngã tư Pasteur, dự kiến 8 phút nữa sẽ tới nơi ạ.',
        'Đã ghi nhận, tem niêm phong và thùng an ninh vẫn được kiểm soát 100% nguyên vẹn.',
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'courier',
          text: randomReply,
          time: 'Vừa xong',
        },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white/95 backdrop-blur-md w-full max-w-lg rounded-2xl shadow-2xl border border-white/80 overflow-hidden flex flex-col h-[520px] max-h-[90vh] animate-in zoom-in-95 duration-200"
        id="modal-chat-courier"
      >
        
        {/* Chat Header */}
        <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={courier.avatar}
                alt={courier.name}
                className="w-10 h-10 rounded-full object-cover border border-slate-600"
                referrerPolicy="no-referrer"
              />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-900 absolute bottom-0 right-0"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-bold text-white">{courier.name}</h4>
                <span className="text-[10px] bg-blue-500/30 text-blue-300 px-1.5 py-0.2 rounded border border-blue-400/40">
                  Thẻ {courier.badgeId}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Kênh đàm thoại nội bộ an ninh bảo mật</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
          <div className="text-center my-2">
            <span className="bg-slate-200/80 text-slate-600 text-[10px] px-2.5 py-1 rounded-full font-medium">
              Cuộc trò chuyện được mã hóa đầu cuối bảo mật hồ sơ
            </span>
          </div>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[82%] p-3 rounded-2xl leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-xs'
                    : 'bg-white text-slate-800 border border-slate-200 shadow-xs rounded-bl-xs'
                }`}
              >
                {msg.text}
              </div>
              <div className="flex items-center gap-1 mt-1 px-1 text-[10px] text-slate-400">
                <span>{msg.time}</span>
                {msg.sender === 'user' && <CheckCheck className="w-3 h-3 text-blue-500" />}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Replies Strip */}
        <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[11px]">
          <span className="text-slate-400 font-medium shrink-0">Mẫu nhanh:</span>
          {QUICK_REPLIES.map((qr, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(qr)}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 whitespace-nowrap transition-colors cursor-pointer"
            >
              {qr}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Nhập tin nhắn bảo mật cho nhân viên giao nhận..."
            className="flex-1 text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim()}
            className="p-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl transition-colors cursor-pointer"
            id="btn-send-chat"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
