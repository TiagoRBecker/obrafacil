"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockTeamMemberRepository = void 0;
const common_1 = require("@nestjs/common");
const team_member_entity_1 = require("../entity/team-member.entity");
let MockTeamMemberRepository = class MockTeamMemberRepository {
    constructor() {
        this.members = new Map([
            [
                'team-1',
                team_member_entity_1.TeamMemberEntity.create({
                    id: 'team-1',
                    name: 'Joao Mendonca',
                    jobTitle: 'Electrician',
                    email: 'joao@eletrica.com',
                    phone: '(11) 98765-4321',
                    status: "FREE",
                    createdAt: new Date('2026-03-01T10:00:00.000Z'),
                    updatedAt: new Date('2026-03-01T10:00:00.000Z'),
                }),
            ],
            [
                'team-2',
                team_member_entity_1.TeamMemberEntity.create({
                    id: 'team-2',
                    name: 'Carlos Pereira',
                    jobTitle: 'Electrical Assistant',
                    email: 'carlos@eletrica.com',
                    phone: '(11) 97654-3210',
                    status: "FREE",
                    createdAt: new Date('2026-03-02T10:00:00.000Z'),
                    updatedAt: new Date('2026-03-02T10:00:00.000Z'),
                }),
            ],
            [
                'team-3',
                team_member_entity_1.TeamMemberEntity.create({
                    id: 'team-3',
                    name: 'Marcos Silva',
                    jobTitle: 'Technician',
                    email: 'marcos@eletrica.com',
                    phone: '(11) 96543-2109',
                    status: "FREE",
                    createdAt: new Date('2026-03-03T10:00:00.000Z'),
                    updatedAt: new Date('2026-03-03T10:00:00.000Z'),
                }),
            ],
        ]);
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
exports.MockTeamMemberRepository = MockTeamMemberRepository;
exports.MockTeamMemberRepository = MockTeamMemberRepository = __decorate([
    (0, common_1.Injectable)()
], MockTeamMemberRepository);
//# sourceMappingURL=mock-team-member.repository.js.map