export type StageStatus = 'completed' | 'active' | 'pending';

export interface MilestoneStage {
  id: number;
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  status: StageStatus;
  estimatedTime?: string;
  completedAt?: string;
  startedAt?: string;
  location?: string;
  handlerName: string;
  handlerRole: string;
  handlerAvatar?: string;
  securityCode?: string;
  documentsChecked?: string[];
  notes?: string;
  logs?: {
    time: string;
    action: string;
    operator: string;
    icon?: string;
  }[];
}

export interface CourierInfo {
  id: string;
  name: string;
  badgeId: string;
  phone: string;
  avatar: string;
  rating: number;
  deliveriesCount: number;
  vehicleType: string;
  plateNumber: string;
  isVerified: boolean;
  securityCert: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  pages: number;
  copyCount: number;
  classification: 'Tối Mật' | 'Mật - Pháp Lý' | 'Bản Gốc Duy Nhất' | 'Chứng Thực';
  isOriginal: boolean;
  securityHash: string;
}

export interface SecuritySeal {
  sealId: string;
  qrCodeUrl: string;
  integrityStatus: 'Nguyên vẹn 100%' | 'Cảnh báo vi phạm' | 'Chờ kích hoạt';
  tamperEvident: boolean;
  rfidTracked: boolean;
  sensorShock: string; // e.g. "Bình thường (0.2G)"
  sensorHumidity: string; // e.g. "52% RH (Chuẩn an toàn giấy tờ)"
  sensorTemp: string; // e.g. "24.5°C"
}

export interface DocumentPackage {
  trackingId: string;
  documentType: string;
  category: string;
  securityLevel: 'Cấp độ 3 (Ký số & Niêm phong mã hoá)' | 'Cấp độ 2' | 'Cấp độ 1';
  sender: {
    name: string;
    organization: string;
    address: string;
    contactPhone: string;
  };
  receiver: {
    name: string;
    organization: string;
    address: string;
    contactPhone: string;
  };
  currentLocation: string;
  nextDestination: string;
  distanceRemainingKm: number;
  overallProgress: number; // 0 - 100%
  currentStageId: number; // 1 - 6
  eta: string;
  stages: MilestoneStage[];
  courier: CourierInfo;
  documents: DocumentItem[];
  securitySeal: SecuritySeal;
  epodDetails?: {
    podId: string;
    timestampTSA: string;
    senderSignatureUrl?: string;
    receiverSignatureUrl?: string;
    sha256Hash: string;
    legalCertification: string;
  };
}
