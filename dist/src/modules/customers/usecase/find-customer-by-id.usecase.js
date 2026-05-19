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
var FindCustomerByIdUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindCustomerByIdUseCase = void 0;
const common_1 = require("@nestjs/common");
const customer_repo_inteface_1 = require("../repo/customer.repo.inteface");
const customer_mapper_1 = require("./customer.mapper");
let FindCustomerByIdUseCase = FindCustomerByIdUseCase_1 = class FindCustomerByIdUseCase {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
        this.logger = new common_1.Logger(FindCustomerByIdUseCase_1.name);
    }
    async execute(id) {
        this.logger.log(`Buscando cliente por ID: ${id}`);
        const customer = await this.customerRepository.findById(id);
        if (!customer?.id) {
            this.logger.error(`Cliente não encontrado - ID: ${id}`);
            throw new common_1.NotFoundException('Customer not found.');
        }
        this.logger.log(`Cliente encontrado - ID: ${id}, nome: ${customer.name}`);
        return customer_mapper_1.CustomerMapper.toResponse(customer);
    }
};
exports.FindCustomerByIdUseCase = FindCustomerByIdUseCase;
exports.FindCustomerByIdUseCase = FindCustomerByIdUseCase = FindCustomerByIdUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [customer_repo_inteface_1.CustomerRepositoryInterface])
], FindCustomerByIdUseCase);
//# sourceMappingURL=find-customer-by-id.usecase.js.map