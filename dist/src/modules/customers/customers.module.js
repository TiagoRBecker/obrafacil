"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersModule = void 0;
const common_1 = require("@nestjs/common");
const admin_token_guard_1 = require("../../guards/admin-token.guard");
const customers_controller_1 = require("./customers.controller");
const customers_service_1 = require("./customers.service");
const mock_customer_repository_1 = require("./repo/mock-customer.repository");
const customer_repo_inteface_1 = require("./repo/customer.repo.inteface");
const create_customer_usecase_1 = require("./usecase/create-customer.usecase");
const delete_customer_usecase_1 = require("./usecase/delete-customer.usecase");
const find_all_customers_usecase_1 = require("./usecase/find-all-customers.usecase");
const find_customer_by_id_usecase_1 = require("./usecase/find-customer-by-id.usecase");
const update_customer_usecase_1 = require("./usecase/update-customer.usecase");
const customer_repo_1 = require("./repo/customer.repo");
const prisma_1 = require("../../db/prisma");
const user_module_1 = require("../Users/user.module");
let CustomersModule = class CustomersModule {
};
exports.CustomersModule = CustomersModule;
exports.CustomersModule = CustomersModule = __decorate([
    (0, common_1.Module)({
        controllers: [customers_controller_1.CustomersController],
        imports: [user_module_1.UserModule],
        providers: [
            customers_service_1.CustomersService,
            create_customer_usecase_1.CreateCustomerUseCase,
            update_customer_usecase_1.UpdateCustomerUseCase,
            find_customer_by_id_usecase_1.FindCustomerByIdUseCase,
            find_all_customers_usecase_1.FindAllCustomersUseCase,
            delete_customer_usecase_1.DeleteCustomerUseCase,
            admin_token_guard_1.AdminTokenGuard,
            mock_customer_repository_1.MockCustomerRepository,
            prisma_1.PrismaService,
            {
                provide: customer_repo_inteface_1.CustomerRepositoryInterface,
                useClass: customer_repo_1.CustomerRepo,
            },
        ],
        exports: [customer_repo_inteface_1.CustomerRepositoryInterface]
    })
], CustomersModule);
//# sourceMappingURL=customers.module.js.map