import { BudgetEntity } from '../entity/budget.entity';
import { BudgetRepositoryInterface } from './budget.repository.interface';
import { PrismaService } from '../../../db/prisma';
export declare class BudgetRepo extends BudgetRepositoryInterface {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(budget: BudgetEntity): Promise<BudgetEntity>;
    findAll(): Promise<BudgetEntity[]>;
    findByCustomerAndStartDate(customerId: string, date: string): Promise<BudgetEntity | null>;
    findById(id: string): Promise<BudgetEntity | null>;
    update(id: string, budget: Omit<BudgetEntity, 'id' | 'customerId'>): Promise<BudgetEntity>;
    updateStatus(id: string): Promise<void>;
    createTrackingMessage(messageId: string, orderId: string): Promise<void>;
    findMessageTracking(messageId: string): Promise<{
        id: number;
        orderId: string;
        messageId: string;
    } | null>;
    delete(id: string): Promise<void>;
}
