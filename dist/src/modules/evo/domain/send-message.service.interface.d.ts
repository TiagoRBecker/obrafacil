export interface SendMessageService {
    sendMessage(to: string, message: string): Promise<any>;
    sendMedia(to: string, mediaBase64: string, fileName: string, caption?: string): Promise<any>;
}
