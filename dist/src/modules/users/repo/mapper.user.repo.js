"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapperToPrisma = void 0;
const user_entity_1 = require("../entity/user.entity");
class MapperToPrisma {
    constructor() { }
    static toDto(data) {
        return user_entity_1.UserEntity.toDto({
            id: data?.id,
            email: data?.email,
            name: data?.name,
            passwordHash: data?.password,
            role: data?.role?.name ?? '',
        });
    }
    static toDtoContext(raw) {
        return {
            id: raw.id,
            email: raw.email,
            name: raw.name,
            passwordHash: raw.password,
            role: raw.role?.name ?? '',
            permission: raw.role?.permissions,
        };
    }
}
exports.MapperToPrisma = MapperToPrisma;
//# sourceMappingURL=mapper.user.repo.js.map