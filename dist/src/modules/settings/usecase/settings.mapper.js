"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsMapper = void 0;
class SettingsMapper {
    static toResponse(settings) {
        return {
            id: settings.id,
            name: settings.name,
            specialty: settings.specialty,
            logoUrl: settings.logoUrl,
            address: settings.address,
            email: settings.email,
            phone: settings.phone
        };
    }
}
exports.SettingsMapper = SettingsMapper;
//# sourceMappingURL=settings.mapper.js.map