"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = exports.resources = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["USER"] = "user";
    UserRole["SELLER"] = "seller";
})(UserRole || (exports.UserRole = UserRole = {}));
exports.resources = [
    'account',
    'customer',
    'order',
    'team',
    'settings',
];
exports.actions = [
    'create',
    'read',
    'update',
    'delete',
];
//# sourceMappingURL=index.js.map