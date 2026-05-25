export declare class SendMediaController {
    sendMedia(instanceName: string, body: {
        mediaUrl: string;
        caption?: string;
    }): {
        message: string;
        instanceName: string;
        mediaUrl: string;
        caption: string | undefined;
    };
}
