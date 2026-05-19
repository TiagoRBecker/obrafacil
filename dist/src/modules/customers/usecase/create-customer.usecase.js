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
var CreateCustomerUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCustomerUseCase = void 0;
const common_1 = require("@nestjs/common");
const customer_entity_1 = require("../entity/customer.entity");
const customer_repo_inteface_1 = require("../repo/customer.repo.inteface");
const customer_mapper_1 = require("./customer.mapper");
let CreateCustomerUseCase = CreateCustomerUseCase_1 = class CreateCustomerUseCase {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
        this.logger = new common_1.Logger(CreateCustomerUseCase_1.name);
    }
    async execute(input) {
        this.logger.log(`Iniciando criação de cliente - telefone: ${input.phone}`);
        const existCustomer = await this.customerRepository.findByphone(input.phone);
        if (existCustomer?.phone) {
            this.logger.warn(`Conflito: telefone já cadastrado - ${input.phone}`);
            throw new common_1.ConflictException('Já existe um usuario com o numero de telefone cadastrado');
        }
        try {
            this.logger.log(`Criando cliente - nome: ${input.name}`);
            const customer = customer_entity_1.CustomerEntity.create({
                name: input.name,
                phone: input.phone,
                service: input.service,
                address: input.address,
                city: input.city,
            });
            const createdCustomer = await this.customerRepository.create(customer);
            this.logger.log(`Cliente criado com sucesso - ID: ${createdCustomer.id}, nome: ${createdCustomer.name}`);
            return customer_mapper_1.CustomerMapper.toResponse(createdCustomer);
        }
        catch (error) {
            this.logger.error(`Erro ao criar cliente - telefone: ${input.phone}, erro: ${error.message || error}`);
            throw new common_1.BadRequestException('Erro ao criar o usuario. Consulte a area logs para maiores informaçoes ');
        }
    }
};
exports.CreateCustomerUseCase = CreateCustomerUseCase;
exports.CreateCustomerUseCase = CreateCustomerUseCase = CreateCustomerUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [customer_repo_inteface_1.CustomerRepositoryInterface])
], CreateCustomerUseCase);
//# sourceMappingURL=create-customer.usecase.js.map