"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsController = void 0;
const upsert_settings_controller_1 = require("./upsert.settings.controller");
const findById_settings_controller_1 = require("./findById.settings.controller");
exports.SettingsController = [
    findById_settings_controller_1.FindByIdSettingsController,
    upsert_settings_controller_1.UpsertSettingsController
];
//# sourceMappingURL=index.js.map