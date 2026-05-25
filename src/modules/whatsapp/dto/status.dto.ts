export interface ConnectionUpdateData {
  instance: string;
  state: 'open' | 'close' | 'connecting' | 'refused';
  statusReason?: number;
}
 
export interface QrCodeUpdatedData {
  qrcode: { base64: string; code: string };
}