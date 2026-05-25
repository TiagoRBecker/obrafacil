"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppSession = void 0;
class WhatsAppSession {
    constructor(props) {
        this.props = props;
        Object.assign(this, props);
    }
    static create(props) {
        return new WhatsAppSession({
            ...props,
            id: props.id ?? crypto.randomUUID(),
        });
    }
}
exports.WhatsAppSession = WhatsAppSession;
//# sourceMappingURL=whatsapp-session.entity.js.map