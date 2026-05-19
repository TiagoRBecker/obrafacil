"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryTeamMemberRepository = void 0;
const common_1 = require("@nestjs/common");
let InMemoryTeamMemberRepository = class InMemoryTeamMemberRepository {
    constructor() {
        this.members = new Map();
    }
    async create(member) {
        this.members.set(member.data?.id, member);
        return member;
    }
    async update(id, member) {
        this.members.set(member.data?.id, member);
        return member;
    }
    async findById(id) {
        return this.members.get(id) ?? null;
    }
    async findByEmail(email) {
        const normalizedEmail = email.toLowerCase();
        for (const member of this.members.values()) {
            if (member.data.email === normalizedEmail) {
                return member;
            }
        }
        return null;
    }
    async findByPhone(email) {
        const normalizedEmail = email.toLowerCase();
        for (const member of this.members.values()) {
            if (member.data.email === normalizedEmail) {
                return member;
            }
        }
        return null;
    }
    async findAll() {
        return [...this.members.values()];
    }
    async delete(id) {
        this.members.delete(id);
    }
};
exports.InMemoryTeamMemberRepository = InMemoryTeamMemberRepository;
exports.InMemoryTeamMemberRepository = InMemoryTeamMemberRepository = __decorate([
    (0, common_1.Injectable)()
], InMemoryTeamMemberRepository);
//# sourceMappingURL=in-memory-team-member.repository.js.map