export interface WhatsAppProps {
  id: string;
  instance: string;
  status: string;
  qrCode?: string | null;
}

export class WhatsAppSession {
  private constructor( readonly props: WhatsAppProps) {
    Object.assign(this, props);
  }

  static create(props: Omit<WhatsAppProps, 'id'> & { id?: string }): WhatsAppSession {
    return new WhatsAppSession({
      ...props,
      id: props.id ?? crypto.randomUUID(),
    });
  }
}