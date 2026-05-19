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
var UpdateCustomerUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCustomerUseCase = void 0;
const common_1 = require("@nestjs/common");
const customer_entity_1 = require("../entity/customer.entity");
const customer_repo_inteface_1 = require("../repo/customer.repo.inteface");
const customer_mapper_1 = require("./customer.mapper");
let UpdateCustomerUseCase = UpdateCustomerUseCase_1 = class UpdateCustomerUseCase {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
        this.logger = new common_1.Logger(UpdateCustomerUseCase_1.name);
    }
    async execute(id, input) {
        this.logger.log(`Iniciando atualização do cliente - ID: ${id}`);
        try {
            const currentCustomer = await this.customerRepository.findById(id);
            if (!currentCustomer?.id) {
                this.logger.error(`Cliente não encontrado - ID: ${id}`);
                throw new common_1.NotFoundException('Customer not found.');
            }
            this.logger.log(`Atualizando cliente - nome: ${input.name}`);
            const current = currentCustomer.toJSON();
            const updatedCustomer = customer_entity_1.CustomerEntity.create({
                ...current,
                name: input.name,
                phone: input.phone,
                address: input.address,
                city: input.city,
                service: input.service
            });
            const savedCustomer = await this.customerRepository.update(currentCustomer?.id, updatedCustomer);
            this.logger.log(`Cliente atualizado com sucesso - ID: ${id}`);
            return customer_mapper_1.CustomerMapper.toResponse(updatedCustomer);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            this.logger.error(`Erro ao atualizar cliente - ID: ${id}, erro: ${error.message || error}`);
            throw new common_1.BadRequestException(`Erro ao atualizar o usuario `);
        }
    }
};
exports.UpdateCustomerUseCase = UpdateCustomerUseCase;
exports.UpdateCustomerUseCase = UpdateCustomerUseCase = UpdateCustomerUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [customer_repo_inteface_1.CustomerRepositoryInterface])
], UpdateCustomerUseCase);
//# sourceMappingURL=update-customer.usecase.js.map