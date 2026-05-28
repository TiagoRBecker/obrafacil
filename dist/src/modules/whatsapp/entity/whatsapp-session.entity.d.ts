export interface WhatsAppProps {
    id: string;
    instance: string;
    status: string;
    qrCode?: string | null;
}
export declare class WhatsAppSession {
    readonly props: WhatsAppProps;
    private constructor();
    static create(props: Omit<WhatsAppProps, 'id'> & {
        id?: string;
    }): WhatsAppSession;
}
