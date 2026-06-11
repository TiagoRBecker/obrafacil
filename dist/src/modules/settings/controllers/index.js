"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsController = void 0;
const upsert_settings_controller_1 = require("./upsert.settings.controller");
const findById_settings_controller_1 = require("./findById.settings.controller");
const create_settings_controller_1 = require("./create.settings.controller");
exports.SettingsController = [
    create_settings_controller_1.CreateSettingsController,
    findById_settings_controller_1.FindByIdSettingsController,
    upsert_settings_controller_1.UpsertSettingsController
];
//# sourceMappingURL=index.js.map