"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryUserRepository = void 0;
const common_1 = require("@nestjs/common");
let InMemoryUserRepository = class InMemoryUserRepository {
    constructor() {
        this.users = new Map();
    }
    async findByEmail(email) {
        return this.users.get(email.toLowerCase()) ?? null;
    }
    async findById(email) {
        return this.users.get(email.toLowerCase()) ?? null;
    }
    async create(user) {
        this.users.set(user.email.toLowerCase(), user);
        return user;
    }
    async insertSettingsUser(settinsId, userId) {
        throw "";
    }
};
exports.InMemoryUserRepository = InMemoryUserRepository;
exports.InMemoryUserRepository = InMemoryUserRepository = __decorate([
    (0, common_1.Injectable)()
], InMemoryUserRepository);
//# sourceMappingURL=in-memory-user.repository.js.map