"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    security: {
        jwtAccessSecret: process.env.JWT_ACCESS_SECRET ?? 'change-me-in-production',
        jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? '55m',
        jwtRefreshSecret: process.env.JWT_REFRESH_SECRET ?? 'change-me-in-production',
        jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? '15d',
    },
});
//# sourceMappingURL=security.config.js.map