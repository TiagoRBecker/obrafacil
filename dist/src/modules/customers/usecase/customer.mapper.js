"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerMapper = void 0;
class CustomerMapper {
    static toResponse(data) {
        return {
            id: data.id,
            name: data.name,
            phone: data.phone,
            address: data.address,
            service: data.service,
            city: data.city,
        };
    }
    static toResponseWithOrders(data) {
        const { customer, orders } = data;
        return {
            id: customer.id,
            name: customer.name,
            phone: customer.phone,
            address: customer.address,
            service: customer.service,
            city: customer.city,
            orders: orders || []
        };
    }
}
exports.CustomerMapper = CustomerMapper;
//# sourceMappingURL=customer.mapper.js.map