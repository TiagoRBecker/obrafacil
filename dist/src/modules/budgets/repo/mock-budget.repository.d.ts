import { BudgetEntity } from '../entity/budget.entity';
import { BudgetRepositoryInterface, PaginatedBudgets } from './budget.repository.interface';
export declare class MockBudgetRepository implements BudgetRepositoryInterface {
    private readonly budgets;
    create(budget: BudgetEntity): Promise<BudgetEntity>;
    update(id: string, budget: BudgetEntity): Promise<BudgetEntity>;
    findById(id: string): Promise<BudgetEntity | null>;
    findAll(skip: number, take: number): Promise<PaginatedBudgets>;
    findByCustomerAndStartDate(customerId: string, date: string): Promise<BudgetEntity | null>;
    findMessageTracking(messageId: string): Promise<{
        id: number;
        orderId: string;
        messageId: string;
    } | null>;
    createTrackingMessage(messageId: string, orerId: string): Promise<void>;
    delete(id: string): Promise<void>;
    updateStatus(id: string): Promise<void>;
}
