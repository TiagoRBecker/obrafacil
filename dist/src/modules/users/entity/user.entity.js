"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
class UserEntity {
    constructor(props) {
        this.props = props;
    }
    static create(props) {
        return new UserEntity({
            ...props,
            email: props.email?.toLowerCase(),
        });
    }
    get id() {
        return this.props.id;
    }
    get name() {
        return this.props.name;
    }
    get email() {
        return this.props.email;
    }
    get role() {
        return this.props.role;
    }
    get passwordHash() {
        return this.props.passwordHash;
    }
    get permission() {
        return this.props.permission;
    }
    static toDto(props) {
        return new UserEntity({ ...props, id: props.id });
    }
}
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map