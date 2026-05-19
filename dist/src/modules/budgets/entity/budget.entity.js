"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetEntity = void 0;
class BudgetEntity {
    constructor(props) {
        this.props = props;
        this.guard(props);
    }
    static create(props) {
        return new BudgetEntity({
            ...props,
            id: '',
            customerId: props.customerId,
            createdAt: new Date(),
            discount: props.discount,
            name: props.name.trim(),
            phone: props.phone.trim(),
            address: props.address.trim(),
            observations: props.observations.trim(),
            title: props.title.trim(),
            description: props.description.trim(),
            finalObservations: props.finalObservations.trim(),
            materials: props.materials.map((m) => ({
                ...m,
                name: m.name.trim(),
                unit: m.unit.trim(),
            })),
        });
    }
    get name() {
        return this.props.name;
    }
    get phone() {
        return this.props.phone;
    }
    get address() {
        return this.props.address;
    }
    get observations() {
        return this.props.observations;
    }
    get valueHour() {
        return this.props.valueHour;
    }
    get estimatedHours() {
        return this.props.estimatedHours;
    }
    get numberEmployees() {
        return this.props.numberEmployees;
    }
    get title() {
        return this.props.title;
    }
    get description() {
        return this.props.description;
    }
    get typeCharge() {
        return this.props.typeCharge;
    }
    get materials() {
        return this.props.materials;
    }
    get initDate() {
        return this.props.initDate;
    }
    get endDate() {
        return this.props.endDate;
    }
    get validityDate() {
        return this.props.validityDate;
    }
    get discount() {
        return this.props.discount;
    }
    get finalObservations() {
        return this.props.finalObservations;
    }
    get totalValue() {
        return this.props.totalValue;
    }
    get materialValue() {
        return this.props.materialValue;
    }
    get laborValue() {
        return this.props.laborValue;
    }
    get id() {
        return this.props.id;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get customerId() {
        return this.props.customerId;
    }
    get status() {
        return this.props.status;
    }
    static toDTO(props) {
        return new BudgetEntity({
            ...props,
            id: props.id,
            createdAt: props.createdAt,
            discount: props.discount,
            laborValue: props.laborValue ?? 0,
            materialValue: props.materialValue,
            totalValue: props.totalValue,
            name: props.name,
            phone: props.phone,
            address: props.address,
            observations: props.observations,
            title: props.title,
            description: props.description,
            finalObservations: props.finalObservations,
            status: props.status,
            materials: props?.materials?.map((m) => ({
                ...m,
                name: m.name,
                unit: m.unit,
            })),
        });
    }
    toJSON() {
        return { ...this.props };
    }
    guard(props) {
        if (props) {
            if (props.laborValue < 0)
                throw new Error('O valor da mão de obra não pode ser menor que 0 ');
            if (props.totalValue < 0)
                throw new Error('O valor total não pode ser menor que 0 ');
            if (props.materialValue < 0)
                throw new Error('O valor dos materaias  não pode menor que 0 ');
        }
    }
}
exports.BudgetEntity = BudgetEntity;
//# sourceMappingURL=budget.entity.js.map