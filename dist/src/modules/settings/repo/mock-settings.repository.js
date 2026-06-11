"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockSettingsRepository = void 0;
const common_1 = require("@nestjs/common");
const settings_entity_1 = require("../entity/settings.entity");
let MockSettingsRepository = class MockSettingsRepository {
    constructor() {
        this.settings = new Map([
            [
                'settings-1',
                settings_entity_1.SettingsEntity.create({
                    id: 'settings-1',
                    name: 'Joao Mendonca',
                    specialty: 'Electrician',
                    phone: '(11) 98765-4321',
                    email: 'joao@eletrica.com',
                    address: 'Sao Paulo e Grande ABC',
                    logoUrl: 'https://example.com/logo.png',
                }),
            ],
        ]);
    }
    async create(settings) {
        this.settings.set(settings.id, settings);
        return settings;
    }
    async update(settings) {
        this.settings.set(settings.id, settings);
        return settings;
    }
    async findByfirst() {
        return this.settings[0] ?? null;
    }
    async findByEmail(email) {
        return this.settings.get(email) ?? null;
    }
};
exports.MockSettingsRepository = MockSettingsRepository;
exports.MockSettingsRepository = MockSettingsRepository = __decorate([
    (0, common_1.Injectable)()
], MockSettingsRepository);
//# sourceMappingURL=mock-settings.repository.js.map