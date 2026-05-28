"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersController = void 0;
const create_customer_controller_1 = require("./create.customer.controller");
const delete_customer_controller_1 = require("./delete.customer.controller");
const findAll_customer_controller_1 = require("./findAll.customer.controller");
const findById_customer_controller_1 = require("./findById.customer.controller");
const update_customer_controller_1 = require("./update.customer.controller");
exports.CustomersController = [
    create_customer_controller_1.CreateCustomerController,
    findAll_customer_controller_1.FindAllCustomersController,
    findById_customer_controller_1.FindByIdCustomerController,
    delete_customer_controller_1.DeleteCustomerController,
    update_customer_controller_1.UpdateCustomerController,
];
//# sourceMappingURL=index.js.map