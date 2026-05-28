"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetsController = void 0;
const create_budget_controller_1 = require("./create.budget.controller");
const delete_budget_controller_1 = require("./delete.budget.controller");
const findAll_budget_controller_1 = require("./findAll.budget.controller");
const findById_budget_controller_1 = require("./findById.budget.controller");
const update_budget_controller_1 = require("./update.budget.controller");
exports.BudgetsController = [
    create_budget_controller_1.CreateBudgetsController,
    findAll_budget_controller_1.FindAllBudgetsController,
    findById_budget_controller_1.FindByIdBudgetsController,
    delete_budget_controller_1.DeleteBudgetsController,
    update_budget_controller_1.UpdateBudgetsController,
];
//# sourceMappingURL=index.js.map