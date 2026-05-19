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
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
const create_customer_usecase_1 = require("./usecase/create-customer.usecase");
const delete_customer_usecase_1 = require("./usecase/delete-customer.usecase");
const find_all_customers_usecase_1 = require("./usecase/find-all-customers.usecase");
const find_customer_by_id_usecase_1 = require("./usecase/find-customer-by-id.usecase");
const update_customer_usecase_1 = require("./usecase/update-customer.usecase");
let CustomersService = class CustomersService {
    constructor(createCustomerUseCase, updateCustomerUseCase, findCustomerByIdUseCase, findAllCustomersUseCase, deleteCustomerUseCase) {
        this.createCustomerUseCase = createCustomerUseCase;
        this.updateCustomerUseCase = updateCustomerUseCase;
        this.findCustomerByIdUseCase = findCustomerByIdUseCase;
        this.findAllCustomersUseCase = findAllCustomersUseCase;
        this.deleteCustomerUseCase = deleteCustomerUseCase;
    }
    create(input) {
        return this.createCustomerUseCase.execute(input);
    }
    update(id, input) {
        return this.updateCustomerUseCase.execute(id, input);
    }
    findById(id) {
        return this.findCustomerByIdUseCase.execute(id);
    }
    findAll() {
        return this.findAllCustomersUseCase.execute();
    }
    delete(id) {
        return this.deleteCustomerUseCase.execute(id);
    }
};
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [create_customer_usecase_1.CreateCustomerUseCase,
        update_customer_usecase_1.UpdateCustomerUseCase,
        find_customer_by_id_usecase_1.FindCustomerByIdUseCase,
        find_all_customers_usecase_1.FindAllCustomersUseCase,
        delete_customer_usecase_1.DeleteCustomerUseCase])
], CustomersService);
//# sourceMappingURL=customers.service.js.map