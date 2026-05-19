import { BudgetEntity } from '../entity/budget.entity';
import { BudgetRepositoryInterface } from './budget.repository.interface';
export declare class InMemoryBudgetRepository implements BudgetRepositoryInterface {
    private readonly budgets;
    create(budget: BudgetEntity): Promise<BudgetEntity>;
    update(id: string, budget: BudgetEntity): Promise<BudgetEntity>;
    findById(id: string): Promise<BudgetEntity | null>;
    findByCustomerAndStartDate(customerId: string, date: string): Promise<BudgetEntity | null>;
    findAll(): Promise<BudgetEntity[]>;
    createTrackingMessage(messageId: string, orerId: string): Promise<void>;
    findMessageTracking(messageId: string): Promise<{
        id: number;
        orderId: string;
        messageId: string;
    } | null>;
    delete(id: string): Promise<void>;
    updateStatus(id: string): Promise<void>;
}
