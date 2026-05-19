"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerMapper = void 0;
class CustomerMapper {
    static toResponse(customer) {
        return {
            id: customer.id,
            name: customer.name,
            phone: customer.phone,
            address: customer.address,
            service: customer.service,
            city: customer.city,
        };
    }
}
exports.CustomerMapper = CustomerMapper;
//# sourceMappingURL=customer.mapper.js.map