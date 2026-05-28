"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemorySettingsRepository = void 0;
const common_1 = require("@nestjs/common");
let InMemorySettingsRepository = class InMemorySettingsRepository {
    constructor() {
        this.settings = new Map();
    }
    async create(settings) {
        this.settings.set(settings.id, settings);
        return settings;
    }
    async update(settings) {
        this.settings.set(settings.id, settings);
        return settings;
    }
    async findById(id) {
        return this.settings.get(id) ?? null;
    }
    async findByEmail(email) {
        return this.settings.get(email) ?? null;
    }
};
exports.InMemorySettingsRepository = InMemorySettingsRepository;
exports.InMemorySettingsRepository = InMemorySettingsRepository = __decorate([
    (0, common_1.Injectable)()
], InMemorySettingsRepository);
//# sourceMappingURL=in-memory-settings.repository.js.map