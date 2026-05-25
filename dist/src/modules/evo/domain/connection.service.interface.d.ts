export interface ConnectionService {
    connect(instanceName: string): Promise<any>;
}
