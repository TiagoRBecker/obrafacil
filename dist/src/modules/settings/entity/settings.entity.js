"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsEntity = void 0;
class SettingsEntity {
    constructor(props) {
        this.props = props;
    }
    static create(props) {
        return new SettingsEntity({
            ...props,
            name: props.name,
            specialty: props.specialty,
            phone: props.phone,
            email: props.email,
            address: props.address,
            logoUrl: props.logoUrl
        });
    }
    get id() {
        return this.props.id;
    }
    get name() {
        return this.props.name;
    }
    get specialty() {
        return this.props.specialty;
    }
    get phone() {
        return this.props.phone;
    }
    get email() {
        return this.props.email;
    }
    get address() {
        return this.props.address;
    }
    get logoUrl() {
        return this.props.logoUrl;
    }
    toJSON() {
        return {
            ...this.props,
        };
    }
}
exports.SettingsEntity = SettingsEntity;
//# sourceMappingURL=settings.entity.js.map