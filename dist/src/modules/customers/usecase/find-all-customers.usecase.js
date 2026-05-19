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
var FindAllCustomersUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllCustomersUseCase = void 0;
const common_1 = require("@nestjs/common");
const customer_repo_inteface_1 = require("../repo/customer.repo.inteface");
const customer_mapper_1 = require("./customer.mapper");
let FindAllCustomersUseCase = FindAllCustomersUseCase_1 = class FindAllCustomersUseCase {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
        this.logger = new common_1.Logger(FindAllCustomersUseCase_1.name);
    }
    async execute() {
        this.logger.log('Buscando todos os clientes');
        const customers = await this.customerRepository.findAll();
        this.logger.log(`Encontrados ${customers.length} clientes`);
        const data = customers.map(customer_mapper_1.CustomerMapper.toResponseWithOders);
        return data;
    }
};
exports.FindAllCustomersUseCase = FindAllCustomersUseCase;
exports.FindAllCustomersUseCase = FindAllCustomersUseCase = FindAllCustomersUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [customer_repo_inteface_1.CustomerRepositoryInterface])
], FindAllCustomersUseCase);
//# sourceMappingURL=find-all-customers.usecase.js.map