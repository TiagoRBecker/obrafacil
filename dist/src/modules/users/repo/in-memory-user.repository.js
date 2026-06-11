"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryUserRepository = void 0;
const common_1 = require("@nestjs/common");
let InMemoryUserRepository = class InMemoryUserRepository {
    constructor(seed) {
        this.data = new Map();
        if (seed) {
            for (const [key, value] of Object.entries(seed)) {
                this.data.set(key.toLowerCase(), value);
            }
        }
    }
    async findByEmail(email) {
        return this.data.get(email.toLowerCase()) ?? null;
    }
    async findById(id) {
        for (const user of this.data.values()) {
            if (user.id === id)
                return user;
        }
        return null;
    }
    async create(user) {
        return user;
    }
};
exports.InMemoryUserRepository = InMemoryUserRepository;
exports.InMemoryUserRepository = InMemoryUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], InMemoryUserRepository);
//# sourceMappingURL=in-memory-user.repository.js.map